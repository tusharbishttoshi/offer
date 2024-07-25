const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Bank = require("../models/bankModel");
const Astro = require("../models/astroModel.js");
const ErrorHandler = require("../utils/errorhander.js");
const SessionModel = require("../models/SessionModel.js");
const { default: mongoose } = require('mongoose');

// exports.addBank = catchAsyncErrors(async (req, res) => {
//     const { id, amount } = req.body
//     const a = await Astro.findOne({ _id: id })
//     a.balance = a.balance - Number(amount)
//     const b = await Bank.create({ id, amount, balance: a.balance })
//     console.log(b)
//     res.status(200).json({ success: true })
// })
// exports.bankAccount = catchAsyncErrors(async (req, res) => {
//     const { id } = req.query
//     const banks = await Bank.find({ id })
//     res.status(200).json({ success: true, invoice: banks })
// })

//======================NEW API======================//

const generateRandomString = (length) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};



exports.addBank = catchAsyncErrors(async (req, res) => {
    let { id, amount } = req.body;

    if (!id) {
        return res.status(404).json({ success: false, message: "Astrologer id required." });
    }
    if (!amount) {
        return res.status(404).json({ success: false, message: "Amount is required." });
    }

    let astro = await Astro.findById(id);


    if (!astro) {
        return res.status(404).json({ success: false, message: "Astrologer not found" });
    }

    let creditAmount = parseInt(amount);

    if (creditAmount > astro.balance) {
        return res.status(404).json({ success: false, message: "sorry, credit amount is greater than astro balance amount." });
    }

    astro.balance -= Number(creditAmount);
    await astro.save();
    // const transactionID = "10" + generateRandomString(10); 
    const transactionID = await SessionModel.find({ $or: [{ userPaid: { $ne: 0 } }, { refundId: { $ne: null } }] })

    let bank_count = await Bank.find()
   let transactionId = transactionID.length + bank_count.length
    const bank = await Bank.create({ astro: astro._id, amount, transactionID: transactionId + 100000000000, balance: astro.balance }); // Create bank record with astro's ID

    res.status(200).json({ success: true });
});

exports.bankAccount = catchAsyncErrors(async (req, res) => {
    let { id } = req.query;
    let banks = await Bank.find({ astro: id });
    res.status(200).json({ success: true, invoice: banks });
});

exports.transactionList = catchAsyncErrors(async (req, res, next) => {
    let { page, limit, astro, fromDate, toDate, sortField, sortOrder, search } = req.body;
    sortField = sortField ? sortField : "createdAt";
    sortOrder = sortOrder == "asc" ? 1 : -1;
    page = page ? (page == 0 ? 1 : parseInt(page)) : 1;
    limit = limit ? parseInt(limit) : 10;
    let offset = (page - 1) * limit;


    let pipeline = [
        {
            '$lookup': {
                'from': 'astros',
                'localField': 'astro',
                'foreignField': '_id',
                'as': 'astroData'
            }
        }, {
            '$unwind': {
                'path': '$astroData',
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$addFields': {
                'name': '$astroData.name'
            }
        },
        {
            $project: {
                __v: 0
            }
        }
    ]
   

    if (astro) {
        pipeline.push({ $match: { astro: new mongoose.Types.ObjectId(astro) } })
    }
    if (fromDate && toDate) {
        toDate = new Date(toDate)
        e_date = toDate.setDate(toDate.getDate() + 1);
        pipeline.push({ $match: { createdAt: { $gte: new Date(fromDate), $lte: new Date(e_date) } } })
    }
    if (search) {
        pipeline.push({
            $match: {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                ],
            },
        });
    }
    let count = (await Bank.aggregate(pipeline)).length
    pipeline.push({ $sort: { [sortField]: sortOrder } });
    pipeline.push({ $skip: offset });
    pipeline.push({ $limit: limit });
    let list = await Bank.aggregate(pipeline)

    res.json({ success: true, page, count, list });
});

exports.transactionLists = async (req, res) => {

    let { page, limit, fromDate, toDate, search } = req.body
   
    page = page ? (page == 0 ? 1 : parseInt(page)) : 1;
    limit = limit ? parseInt(limit) : 10;

    let pipeline = [
       
        {
            '$lookup': {
                'from': 'users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'user',
                pipeline: [
                    {
                        $project: {
                            name: 1
                        }
                    }
                ]
            }
        }, {
            '$unwind': {
                'path': '$user',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            '$addFields': {
                'astroPrevBalance': {
                    '$trunc': [
                        '$astroPrevBalance', 2
                    ]
                }
            }
        },
        {
            '$addFields': {
                'adminEarn': {
                    '$trunc': [
                        '$adminEarn', 2
                    ]
                }
            }
        }, {
            '$lookup': {
                'from': 'astros',
                'localField': 'astro',
                'foreignField': '_id',
                'as': 'astro',
                pipeline: [
                    {
                        $project: {
                            name: 1
                        }
                    }
                ]
            }
        }, {
            '$unwind': {
                'path': '$astro',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            $addFields: {
                "user_name": "$user.name",
                'astro_name': '$astro.name'
            }
        },

    ]
    let astroSessionEarn = await SessionModel.aggregate(pipeline)
    let bankPipeline = [
        {
            '$lookup': {
                'from': 'astros',
                'localField': 'astro',
                'foreignField': '_id',
                'as': 'astro',
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            balance: 1
                        }
                    }
                ]
            }
        }, {
            '$unwind': {
                'path': '$astro',
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$addFields': {
                'astro_name': '$astro.name'
            }
        },
    ]
    let astorBankInvoice = await Bank.aggregate(bankPipeline)

    if (astorBankInvoice.length > 0) {
        astorBankInvoice = astorBankInvoice.map(invoice => {
            invoice.balance = parseFloat(invoice.balance.toFixed(2));
            invoice.user = { name: "System" },
            invoice.system = "System"
            return invoice;
        });
        astroSessionEarn = [...astroSessionEarn, ...astorBankInvoice];
        astroSessionEarn.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }


    function paginateAndSearchByDate(array, page, limit, fromDate, toDate, search) {
        let filteredArray = array;
        if (search) {
            filteredArray = array.filter(item =>
                (item?.user?.name?.toLowerCase().includes(search.toLowerCase())) ||
                (item?.astro?.name?.toLowerCase().includes(search.toLowerCase()))

            );
        }

        if (fromDate && toDate) {
            filteredArray = filteredArray.filter(item => {
                const itemDate = new Date(item.createdAt);
                toDate = new Date(toDate)
                e_date = toDate.setDate(toDate.getDate() + 1);

                return itemDate >= new Date(fromDate) && itemDate <= new Date(e_date);
            });
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedArray = filteredArray.slice(startIndex, endIndex);

        return paginatedArray;
    }

    const paginatedData = paginateAndSearchByDate(astroSessionEarn, page, limit, fromDate, toDate, search);
    let count = astroSessionEarn.length
    res.status(200).json({ success: true, page, count, paginatedData });
}