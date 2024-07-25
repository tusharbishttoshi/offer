const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const SessionModel = require("../models/SessionModel.js");
const bankModel = require("../models/bankModel.js");
const Cancle = require("../models/cancleModel.js");
const { default: mongoose } = require('mongoose');

exports.addCancle = catchAsyncErrors(async (req, res) => {
    const { astro, reason, user, time } = req.body


    const a = await Cancle.create({
        astro, reason, user, time
    })
    console.log(a)
    res.status(201).json({
        success: true
    })
});

exports.cancelReqeust = catchAsyncErrors(async (req, res) => {
    let  { astro, astrologer, reason, user, time } = req.body

    const xh = await SessionModel.find({ userPaid: { $lte: 0 } })
    let bank_count = await bankModel.find()
    transactionId = xh.length + bank_count.length
    astro = astro ? astro : astrologer
    const a = await SessionModel.create({
        astro, reason, user, time, id: xh.length + 1000000
    })
    console.log(a)
    res.status(201).json({
        success: true
    })
});
exports.getCancle = catchAsyncErrors(async (req, res) => {
    const c = await Cancle.find()
    res.status(201).json({
        c,
        success: true
    })
})
exports.astro = catchAsyncErrors(async (req, res) => {
    try {
        const { id } = req.params
        const a = await Cancle.find({ astro: id }).populate("user", "name")

        res.status(201).json({
            a,
            success: true
        })
    } catch (error) {
        console.log(error)
    }

})

exports.cancelReqeustList = catchAsyncErrors(async (req, res, next) => {
    let { page, limit, fromDate, toDate, sortField, sortOrder, search, astro } = req.body;

    sortField = sortField ? sortField : "createdAt";
    sortOrder = sortOrder == "asc" ? 1 : -1;
    page = page ? (page == 0 ? 1 : parseInt(page)) : 1;
    limit = limit ? parseInt(limit) : 10;
    let offset = (page - 1) * limit;

    let pipeline = [
        {
            $match: {
                astro: new mongoose.Types.ObjectId(astro),
                userPaid: 0
            }
        },
        {
            '$lookup': {
                'from': 'users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'userData',
            }
        }, {
            '$unwind': {
                'path': '$userData',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            '$addFields': {
                'balance': {
                    '$trunc': [
                        '$userData.balance', 2
                    ]
                },
                user_name: "$userData.name"
            }
        },

    ]

    if (fromDate && toDate) {
        toDate = new Date(toDate)
        e_date = toDate.setDate(toDate.getDate() + 1);

        pipeline.push({ $match: { createdAt: { $gte: new Date(fromDate), $lte: new Date(e_date) } } })
    }
    if (search) {
        pipeline.push({
            $match: {
                $or: [
                    { user_name: { $regex: search, $options: "i" } },

                ],
            },
        });
    }
    let count = (await SessionModel.aggregate(pipeline)).length
    pipeline.push({ $sort: { [sortField]: sortOrder } });
    pipeline.push({ $skip: offset });
    pipeline.push({ $limit: limit });
    let list = await SessionModel.aggregate(pipeline)

    res.json({ success: true, page, count, list });
});