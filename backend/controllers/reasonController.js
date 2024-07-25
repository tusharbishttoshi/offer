const { default: mongoose } = require("mongoose");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const reasonModel = require("../models/reasonModel");

exports.addReason = catchAsyncErrors(async (req, res, next) => {
    let { title, description, user } = req.body;

    let check = await reasonModel.findOne({ title: title })
    if (check) {
        return res.status(200).send({ success: false, message: "This title is already exists!" })
    }

    const create = await reasonModel.create({ title, description, user })

    res.json({
        success: true,
        create
    })
});

exports.updateReason = catchAsyncErrors(async (req, res, next) => {
    let { id, title, description, status } = req.body;

    let check = await reasonModel.findOne({ _id: { $ne: id }, title: title })
    if (check) {
        return res.status(200).send({ success: false, message: "This title is already exists!" })
    }
    let obj = {}
    if (title) obj.title = title
    if (description) obj.description = description
    if (status == true || status == false) obj.status = status

    const user = await reasonModel.findByIdAndUpdate(id, obj, { new: true })

    if (status == true || status == false) {
        res.json({ success: true, message: "reason updated successfully!", user })

    } else {
        res.json({ success: true, user })
    }
});

exports.reason = catchAsyncErrors(async (req, res, next) => {
    let { id } = req.body;

    const user = await reasonModel.findById(id)

    res.json({ success: true, user })
});

exports.deleteReason = catchAsyncErrors(async (req, res, next) => {
    let { id } = req.body;

    const user = await reasonModel.findByIdAndDelete(id)

    res.json({ success: true, user })
});

exports.reasonList = catchAsyncErrors(async (req, res, next) => {
    let { page, limit, id, sortField, sortOrder, search } = req.body;

    sortField = sortField ? sortField : "createdAt";
    sortOrder = sortOrder == "asc" ? 1 : -1;
    page = page ? (page == 0 ? 1 : parseInt(page)) : 1;
    limit = limit ? parseInt(limit) : 10;
    let offset = (page - 1) * limit;


    let pipeline = [

        {
            $project: {
                __v: 0
            }
        }
    ]

    if (id) {
        pipeline.push({ $match: { _id: new mongoose.Types.ObjectId(id) } })
    }

    if (search) {
        pipeline.push({
            $match: {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { description: { $regex: search, $options: "i" } },
                    { status: { $regex: search, $options: "i" } },
                ],
            },
        });
    }
    let count = (await reasonModel.aggregate(pipeline)).length
    pipeline.push({ $sort: { [sortField]: sortOrder } });
    pipeline.push({ $skip: offset });
    pipeline.push({ $limit: limit });
    let list = await reasonModel.aggregate(pipeline)

    res.json({ success: true, page, count, list });
});

exports.ReasonDropDown = catchAsyncErrors(async (req, res, next) => {

    const reason = await reasonModel.find({ user: null, status: true })

    res.json({ success: true, reason })
});