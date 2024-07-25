const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const sessionModel = require('../models/SessionModel.js');
const User = require("../models/userModel");
const Astro = require("../models/astroModel");
const sendEmail = require("../utils/sendEmail");

const ErrorHandler = require("../utils/errorhander.js");
const { default: mongoose } = require("mongoose");
const userModel = require("../models/userModel");
const astroModel = require("../models/astroModel");
const bankModel = require("../models/bankModel.js");
const RechargeModel = require("../models/RechargeModel.js");
const adminModel = require("../models/adminModel");

const axios = require('axios');
const { google } = require('googleapis');
const key = require('../serviceAccountKey.json');
const firebase_admin = require("firebase-admin");

const generateRandomString = (length) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

exports.addUser = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
    const e = await admin.findOne({ email })
    if (e) return next(new ErrorHandler("this email is already exist", 404));
    const user = await admin.create(req.body)
    const adminUser = await admin.findOne({ _id: user._id }).select("-__v").populate("role", "-__v")
    res.json({
        success: true,
        adminUser
    })
});

exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, } = req.body;
    console.log(req.body);
    const adminUser = await admin.findOne({ email }).select("+password")
    console.log({ adminUser });
    if (!adminUser) return next(new ErrorHandler("Invalid name or password", 401));
    const isPasswordMatched = await adminUser.comparePassword(password);
    if (!isPasswordMatched) return next(new ErrorHandler("Invalid name or password", 401));
    res.json({
        success: true,
        adminUser
    })
});

exports.adminAccounts = catchAsyncErrors(async (req, res, next) => {
    const adminUsers = await admin.find().select("-__v").populate("role")
    console.log(adminUsers)
    res.json({
        success: true,
        adminUsers
    })
});

exports.adminProfile = catchAsyncErrors(async (req, res, next) => {
    let id = req.body.id
    let adminUsers = await admin.findById(id).populate("role")
    let user = await userModel.countDocuments()
    let astro = await astroModel.countDocuments()
    let session = await sessionModel.aggregate([
        {
            '$group': {
                '_id': 'null',
                'total': {
                    '$sum': {
                        $add: ['$adminEarn', '$astroEarn']
                    }
                }
            }
        }
    ])
    console.log(session);
    if (adminUsers) {
        adminUsers._doc.user_count = user
        adminUsers._doc.astro_count = astro
        adminUsers._doc.totalIncome = session.length > 0 ? (session[0].total).toFixed(2) : 0
    }
    res.json({
        success: true,
        adminUsers
    })
});

exports.updateAccounts = catchAsyncErrors(async (req, res, next) => {
    const { userId, role, email, number, name, password } = req.body
    let u = {}
    if (role) u.role = role
    if (email) u.email = email
    if (name) u.name = name
    if (number) u.number = number
    if (password) {
        const nPassword = await bcrypt.hash(password, 10);
        u.password = nPassword
    }
    await admin.findByIdAndUpdate({ _id: userId }, { ...u }, { new: true })
    const adminUsers = await admin.find().select("-__v").populate("role", "-__v")
    res.json({
        success: true,
        adminUsers
    })
});

exports.deleteAccount = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    await admin.findByIdAndDelete({ _id: id })
    const adminUsers = await admin.find().select("-__v").populate("role", "-__v")
    res.json({
        success: true,
        adminUsers
    })
});

exports.viewRefundRequest = catchAsyncErrors(async (req, res, next) => {
    let { page, limit, refundStatus, user } = req.body;
    page = page ? (page == 0 ? 1 : parseInt(page)) : 1;
    limit = limit ? parseInt(limit) : 10;
    let offset = (page - 1) * limit;


    let pipeline = [

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
            '$lookup': {
                'from': 'users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'userinfo',
                pipeline: [
                    {
                        $project: {
                            name: 1,
                            email: 1
                        }
                    }
                ]
            }
        }, {
            '$unwind': {
                'path': '$userinfo',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            '$lookup': {
                'from': 'reasons',
                'localField': 'userReason',
                'foreignField': '_id',
                'as': 'reasons'
            }
        },
        {
            '$unwind': {
                'path': '$reasons',
                'preserveNullAndEmptyArrays': true
            }
        },
        //
        {
            '$lookup': {
                'from': 'sessions',
                'localField': '_id',
                'foreignField': 'refundId',
                'as': 'refund',
                pipeline: [
                    {
                        $project: {
                            transactionID: 1,
                            id: 1
                        }
                    }
                ]
            }
        }, {
            '$unwind': {
                'path': '$refund',
                'preserveNullAndEmptyArrays': true
            }
        },
        //
        {
            $sort: {
                createdAt: -1
            }
        }
    ]

    if (user) {
        pipeline.push({ $match: { user: new mongoose.Types.ObjectId(user) } })
    }
    if (refundStatus) {
        pipeline.push({ $match: { refundStatus: refundStatus } })
    }

    let totalRefundRequests = (await sessionModel.aggregate(pipeline)).length
    pipeline.push({ $skip: offset });
    pipeline.push({ $limit: limit });
    let refundRequest = await sessionModel.aggregate(pipeline)

    res.json({
        success: true,
        totalCount: totalRefundRequests,
        currentPage: page,
        refundRequest
    });
});

exports.sessionList = catchAsyncErrors(async (req, res, next) => {
    let { page, limit, id, fromDate, endDate, search, type } = req.body;
    search = search ? search : ""
    page = page ? (page == 0 ? 1 : parseInt(page)) : 1;
    limit = limit ? parseInt(limit) : 10;
    let offset = (page - 1) * limit;


    let pipeline = [
        {
            $match: {
                refundId: null
            }
        },
        {
            '$lookup': {
                'from': 'astros',
                'localField': 'astro',
                'foreignField': '_id',
                'as': 'astro_data'
            }
        }, {
            '$unwind': {
                'path': '$astro_data',
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'user_data'
            }
        }, {
            '$unwind': {
                'path': '$user_data',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            '$lookup': {
                'from': 'reasons',
                'localField': 'userReason',
                'foreignField': '_id',
                'as': 'reasons'
            }
        },
        {
            '$unwind': {
                'path': '$reasons',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            '$addFields': {
                'astro_name': '$astro_data.name',
                'user_name': '$user_data.name'
            }
        },

        {
            $project: {
                user_data: 0,
                astro_data: 0
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ]
    if (fromDate && endDate) {
        endDate = new Date(endDate)
        e_date = endDate.setDate(endDate.getDate() + 1);

        pipeline.push({ $match: { createdAt: { $gte: new Date(fromDate), $lte: new Date(e_date) } } })
    }

    if (id) {
        pipeline.push({ $match: { _id: new mongoose.Types.ObjectId(id) } })
    }

    if (type) {
        pipeline.push({ $match: { refundStatus: type } })
    }
    if (search) {
        pipeline.push({
            $match: {
                $or: [
                    { user_name: { $regex: search, $options: "i" } },
                    { astro_name: { $regex: search, $options: "i" } },
                ],
            },
        });
    }
    let count = (await sessionModel.aggregate(pipeline)).length
    pipeline.push({ $skip: offset });
    pipeline.push({ $limit: limit });
    let list = await sessionModel.aggregate(pipeline)

    res.json({ success: true, page, count, list });
});

exports.refundMoney = catchAsyncErrors(async (req, res, next) => {
    try {
        let { sessionId, status, reason } = req.body;

        if (!sessionId) {
            return res.status(200).json({ status: false, msg: "Session ID required!" });
        }

        if (!status || (status != 0 && status != 1)) {
            return res.status(200).json({ status: false, msg: "Invalid status!" });
        }
        const transactionID = await sessionModel.find({ $or: [{ userPaid: { $ne: 0 } }, { refundId: { $ne: null } }] })

        // let addId = xh[0].id + 1
        let bank_count = await bankModel.find()
        let transactionId = transactionID.length + bank_count.length
        let checkSession = await sessionModel.findById(sessionId);

        if (!checkSession) {
            return res.status(200).json({ status: false, msg: "Invalid session ID or no session found." });
        }

        if (status == "0") {
            await sessionModel.findByIdAndUpdate(sessionId, { refundStatus: "rejected" });

            // let transactionID = "10" + generateRandomString(10);
            sessionId = sessionId.toString()
            let obj = {
                astro: checkSession.astro,
                user: checkSession.user,
                refundId: sessionId,
                // id: addId,
                astroPrevBalance: checkSession.astroPrevBalance,
                amount_type_astro: "debit",
                amount_type_user: "credit",
                userPaid: 0,
                astroEarn: 0,
                adminEarn: 0,
                userPaidPrise: checkSession.userPaidPrise,
                astroEarnPrise: checkSession.astroEarnPrise,
                refundStatus: 'completed',
                timeInSeconds: parseInt("00:00"),
                transactionID: transactionId + 100000000000
            }
            let addSession = await sessionModel.create(obj)
            return res.status(200).json({ success: true, msg: "Refund request rejected." });
        } else if (status == "1") {
            // Update user balance
            let user = await User.findById(checkSession.user);
            user.balance += checkSession.userPaid;
            await user.save();

            // Update astro balance
            let astro = await Astro.findById(checkSession.astro);
            astro.balance -= checkSession.astroEarn;
            await astro.save();

            // Update admin balance
            // let isadmin = await admin.findOne(); // Assuming there's only one admin
            let updateAdmin = await admin.findOneAndUpdate({}, { $inc: { balance: -checkSession.adminEarn } })
            // isadmin.balance -= checkSession.adminEarn;
            // await isadmin.save();

            let d = await sessionModel.findByIdAndUpdate(sessionId, { refundStatus: "refund_completed" });

            if (d) {
                // let transactionID = "10" + generateRandomString(10);
                let sessionId = (checkSession._id).toString()
                let obj = {
                    astro: checkSession.astro,
                    user: checkSession.user,
                    refundId: sessionId,
                    // id: addId,
                    astroPrevBalance: checkSession.astroPrevBalance,
                    refundAmount: -checkSession.userPaid,
                    amount_type_astro: "debit",
                    amount_type_user: "credit",
                    userPaid: -checkSession.userPaid,
                    astroEarn: -checkSession.astroEarn,
                    adminEarn: -checkSession.adminEarn,
                    refundStatus: 'completed',
                    adminReason: reason || "",
                    userPaidPrise: checkSession.userPaidPrise,
                    astroEarnPrise: checkSession.astroEarnPrise,
                    timeInSeconds: checkSession.timeInSeconds,
                    transactionID: transactionId + 100000000000
                }
                let addSession = await sessionModel.create(obj)
            }
            return res.status(200).json({ success: true, msg: "Refund completed successfully." });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ status: false, msg: "Server error" });
    }
})

exports.userList = catchAsyncErrors(async (req, res, next) => {
    let { page, limit, id, fromDate, endDate, sortField, sortOrder, search } = req.body;
    sortField = sortField ? sortField : "createdAt";
    sortOrder = sortOrder == "asc" ? 1 : -1;
    page = page ? (page == 0 ? 1 : parseInt(page)) : 1;
    limit = limit ? parseInt(limit) : 10;
    let offset = (page - 1) * limit;


    let pipeline = [
        {
            '$lookup': {
                'from': 'sessions',
                'localField': '_id',
                'foreignField': 'user',
                'as': 'counting',
                'pipeline': [
                    {
                        '$group': {
                            '_id': '$user',
                            'time': {
                                '$sum': '$timeInSeconds'
                            },
                            'total': {
                                '$sum': '$userPaid'
                            }
                        }
                    }
                ]
            }
        }, {
            '$unwind': {
                'path': '$counting',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            $project: {
                __v: 0
            }
        }
    ]
    if (fromDate && endDate) {
        endDate = new Date(endDate)
        e_date = endDate.setDate(endDate.getDate() + 1);

        pipeline.push({ $match: { createdAt: { $gte: new Date(fromDate), $lte: new Date(e_date) } } })
    }

    if (id) {
        pipeline.push({ $match: { _id: new mongoose.Types.ObjectId(id) } })
    }

    if (search) {
        pipeline.push({
            $match: {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { zodiac: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                ],
            },
        });
    }
    let count = (await userModel.aggregate(pipeline)).length
    pipeline.push({ $sort: { [sortField]: sortOrder } });
    pipeline.push({ $skip: offset });
    pipeline.push({ $limit: limit });
    let list = await userModel.aggregate(pipeline)

    res.json({ success: true, page, count, list });
});

exports.astrologerList = catchAsyncErrors(async (req, res, next) => {
    let { page, limit, id, fromDate, endDate, sortField, sortOrder, search } = req.body;

    sortField = sortField ? sortField : "isOnline";
    sortOrder = sortOrder == "desc" ? -1 : 1;
    page = page ? (page == 0 ? 1 : parseInt(page)) : 1;
    limit = limit ? parseInt(limit) : 10;
    let offset = (page - 1) * limit;


    let pipeline = [
        {
            '$lookup': {
                'from': 'sessions',
                'localField': '_id',
                'foreignField': 'astro',
                'as': 'counting',
                'pipeline': [
                    {
                        '$group': {
                            '_id': '$astro',
                            'time': {
                                '$sum': '$timeInSeconds'
                            },
                            'total': {
                                '$sum': '$astroEarn'
                            }
                        }
                    }
                ]
            }
        }, {
            '$unwind': {
                'path': '$counting',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            $project: {
                __v: 0
            }
        }
    ]
    if (fromDate && endDate) {
        endDate = new Date(endDate)
        e_date = endDate.setDate(endDate.getDate() + 1);

        pipeline.push({ $match: { createdAt: { $gte: new Date(fromDate), $lte: new Date(e_date) } } })
    }

    if (id) {
        pipeline.push({ $match: { _id: new mongoose.Types.ObjectId(id) } })
    }

    if (search) {
        pipeline.push({
            $match: {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { gender: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                ],
            },
        });
    }
    let count = (await astroModel.aggregate(pipeline)).length
    pipeline.push({ $sort: { [sortField]: sortOrder } });
    pipeline.push({ $skip: offset });
    pipeline.push({ $limit: limit });
    let list = await astroModel.aggregate(pipeline)

    res.json({ success: true, page, count, list });
});

exports.dashBoardCount = catchAsyncErrors(async (req, res, next) => {

    let user = await userModel.countDocuments()
    let astro = await astroModel.countDocuments()
    let chat = await sessionModel.countDocuments({ refundId: null })
    let recharge = await RechargeModel.aggregate([
        {
            '$group': {
                '_id': null,
                'total': {
                    '$sum': '$amount'
                }
            }
        }
    ])
    let refund = await sessionModel.aggregate([
        {
            '$match': {
                'refundId': {
                    '$ne': null
                }
            }
        }, {
            '$group': {
                '_id': null,
                'total': {
                    '$sum': '$refundAmount'
                }
            }
        }
    ])

    let earning = await adminModel.findOne()



    res.json({
        success: true,
        astro,
        user,
        chat,
        recharge: recharge.length > 0 ? recharge[0].total : 0,
        refund: refund.length > 0 ? parseFloat((refund[0].total).toFixed(2)) : 0,
        earning: parseFloat((earning.balance).toFixed(2))
    })
});

exports.dashBoardUserGraph = catchAsyncErrors(async (req, res, next) => {

    let frequency = req.body.frequency
    let pipeline = [];
    if (frequency == 'daily') {
        let date = await before_after_Date(-30)

        pipeline = [
            {
                $match: { createdAt: { $gte: new Date(date) } }
            },
            {
                '$group': {
                    '_id': {
                        'date': {
                            '$dayOfYear': '$createdAt'
                        }
                    },
                    'total_user': {
                        '$sum': 1
                    },
                    'createdAt': {
                        '$last': '$$ROOT.createdAt'
                    }
                }
            }, {
                '$project': {
                    'id': {
                        '$concat': [
                            {
                                '$dateToString': {
                                    'date': '$createdAt',
                                    'format': '%d '
                                }
                            }, {
                                '$switch': {
                                    'branches': [
                                        {
                                            'case': {
                                                '$eq': [
                                                    '01', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'JAN'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '02', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'FEB'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '03', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'MAR'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '04', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'APR'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '05', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'MAY'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '06', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'JUN'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '07', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'JUL'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '08', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'AUG'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '09', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'SEP'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '10', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'OCT'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '11', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'NOV'
                                        }
                                    ],
                                    'default': 'DEC'
                                }
                            }
                        ]
                    },
                    'total_user': 1,
                    'createdAt': 1,
                    '_id': 0
                }
            }, {
                '$sort': {
                    'createdAt': 1,
                    'id': 1
                }
            }
        ]
    } else if (frequency == 'weekly') {
        pipeline = [
            {
                '$group': {
                    '_id': {
                        'date': {
                            '$week': '$createdAt'
                        }
                    },
                    'total_user': {
                        '$sum': 1
                    },
                    'createdAt': {
                        '$last': '$$ROOT.createdAt'
                    }
                }
            }, {
                '$project': {
                    'id': '$_id.date',
                    'total_user': 1,
                    'createdAt': 1,
                    '_id': 0
                }
            }, {
                '$sort': {
                    'createdAt': 1,
                    'id': 1
                }
            }
        ]

    } else if (frequency == 'monthly') {
        let date = await before_after_Date(-365)
        pipeline = [
            {
                $match: { createdAt: { $gte: new Date(date) } }
            },
            {
                '$group': {
                    '_id': {
                        'date': {
                            '$month': '$createdAt'
                        }
                    },
                    'total_user': {
                        '$sum': 1
                    },
                    'createdAt': {
                        '$last': '$$ROOT.createdAt'
                    }
                }
            }, {
                '$project': {
                    'id': {
                        '$switch': {
                            'branches': [
                                {
                                    'case': {
                                        '$eq': [
                                            1, '$_id.date'
                                        ]
                                    },
                                    'then': 'JAN'
                                }, {
                                    'case': {
                                        '$eq': [
                                            2, '$_id.date'
                                        ]
                                    },
                                    'then': 'FEB'
                                }, {
                                    'case': {
                                        '$eq': [
                                            3, '$_id.date'
                                        ]
                                    },
                                    'then': 'MAR'
                                }, {
                                    'case': {
                                        '$eq': [
                                            4, '$_id.date'
                                        ]
                                    },
                                    'then': 'APR'
                                }, {
                                    'case': {
                                        '$eq': [
                                            5, '$_id.date'
                                        ]
                                    },
                                    'then': 'MAY'
                                }, {
                                    'case': {
                                        '$eq': [
                                            6, '$_id.date'
                                        ]
                                    },
                                    'then': 'JUN'
                                }, {
                                    'case': {
                                        '$eq': [
                                            7, '$_id.date'
                                        ]
                                    },
                                    'then': 'JUL'
                                }, {
                                    'case': {
                                        '$eq': [
                                            8, '$_id.date'
                                        ]
                                    },
                                    'then': 'AUG'
                                }, {
                                    'case': {
                                        '$eq': [
                                            9, '$_id.date'
                                        ]
                                    },
                                    'then': 'SEP'
                                }, {
                                    'case': {
                                        '$eq': [
                                            10, '$_id.date'
                                        ]
                                    },
                                    'then': 'OCT'
                                }, {
                                    'case': {
                                        '$eq': [
                                            11, '$_id.date'
                                        ]
                                    },
                                    'then': 'NOV'
                                }
                            ],
                            'default': 'DEC'
                        }
                    },
                    'total_user': 1,
                    'createdAt': 1,
                    '_id': 0
                }
            }, {
                '$sort': {
                    'createdAt': 1,
                    'id': 1
                }
            }
        ]
    } else if (frequency == 'quarterly') {
        pipeline = [
            {
                '$group': {
                    '_id': {
                        'date': {
                            'year': {
                                '$year': '$createdAt'
                            },
                            'id': {
                                '$ceil': {
                                    '$divide': [
                                        {
                                            '$month': '$createdAt'
                                        }, 3
                                    ]
                                }
                            }
                        }
                    },
                    'total_user': {
                        '$sum': 1
                    },
                    'createdAt': {
                        '$last': '$$ROOT.createdAt'
                    }
                }
            }, {
                '$project': {
                    'id': '$_id.date.id',
                    'year': '$_id.date.year',
                    'total_user': 1,
                    'createdAt': 1,
                    '_id': 0
                }
            }, {
                '$sort': {
                    'createdAt': 1,
                    'id': 1
                }
            }
        ]


    } else if (frequency == 'yearly') {
        pipeline = [
            {
                '$group': {
                    '_id': {
                        'date': {
                            '$year': '$createdAt'
                        }
                    },
                    'total_user': {
                        '$sum': 1
                    },
                    'createdAt': {
                        '$last': '$$ROOT.createdAt'
                    }
                }
            }, {
                '$project': {
                    'id': '$_id.date',
                    'total_user': 1,
                    'createdAt': 1,
                    '_id': 0
                }
            }, {
                '$sort': {
                    'createdAt': 1,
                    'id': 1
                }
            }
        ]
    } else {
        return res.status(200).send({ success: false, message: "invalid frequency", data: null })
    }
    let response = await userModel.aggregate(pipeline);

    let user = await userModel.countDocuments()
    let astro = await astroModel.countDocuments()
    let chat = await sessionModel.countDocuments({ refundId: null })
    let recharge = await RechargeModel.aggregate([
        {
            '$group': {
                '_id': null,
                'total': {
                    '$sum': '$amount'
                }
            }
        }
    ])
    let refund = await sessionModel.aggregate([
        {
            '$match': {
                'refundId': {
                    '$ne': null
                }
            }
        }, {
            '$group': {
                '_id': null,
                'total': {
                    '$sum': '$refundAmount'
                }
            }
        }
    ])

    let earning = await adminModel.findOne()
    res.json({
        success: true,
        response,
        user,
        astro,
        chat,
        recharge: recharge.length > 0 ? recharge[0].total : 0,
        refund: refund.length > 0 ? parseFloat((refund[0].total).toFixed(2)) : 0,
        earning: parseFloat((earning.balance).toFixed(2))
    })
});

const before_after_Date = (days) => {
    var date = new Date();
    date.setDate(date.getDate() + parseInt(days));
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    month = month.length > 1 ? month : '0' + month;
    day = day.length > 1 ? day : '0' + day;

    //console.log({year,month,day})
    var finalDate = year + '-' + month + '-' + day;
    return finalDate;
}

exports.chatList = catchAsyncErrors(async (req, res, next) => {
    let { page, limit, fromDate, endDate, search, sortField, sortOrder, user, astro, type } = req.body;
    sortField = sortField ? sortField : "createdAt";
    sortOrder = sortOrder == "asc" ? 1 : -1;
    search = search ? search : ""
    page = page ? (page == 0 ? 1 : parseInt(page)) : 1;
    limit = limit ? parseInt(limit) : 10;
    let offset = (page - 1) * limit;


    let pipeline = [
        {
            $match: { refundId: null }
        },
        {
            '$lookup': {
                'from': 'astros',
                'localField': 'astro',
                'foreignField': '_id',
                'as': 'astro_data'
            }
        }, {
            '$unwind': {
                'path': '$astro_data',
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'user_data'
            }
        }, {
            '$unwind': {
                'path': '$user_data',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            '$addFields': {
                'astro_name': '$astro_data.name',
                'user_name': '$user_data.name'
            }
        },
        {
            $project: {
                user_data: 0,
                astro_data: 0
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ]
    if (fromDate && endDate) {
        endDate = new Date(endDate)
        e_date = endDate.setDate(endDate.getDate() + 1);

        pipeline.push({ $match: { createdAt: { $gte: new Date(fromDate), $lte: new Date(e_date) } } })
    }
    if (type == "Reject") {
        pipeline.push({ $match: { userPaid: { $eq: 0 } } })
    }
    if (type == "Complete") {
        pipeline.push({ $match: { userPaid: { $ne: 0 } } })
    }
    if (astro) {
        pipeline.push({ $match: { astro: new mongoose.Types.ObjectId(astro) } })
    }
    if (user) {
        pipeline.push({ $match: { user: new mongoose.Types.ObjectId(user) } })
    }

    if (search) {
        pipeline.push({
            $match: {
                $or: [
                    { user_name: { $regex: search, $options: "i" } },
                    { astro_name: { $regex: search, $options: "i" } },
                ],
            },
        });
    }
    let count = (await sessionModel.aggregate(pipeline)).length
    pipeline.push({ $sort: { [sortField]: sortOrder } });
    pipeline.push({ $skip: offset });

    pipeline.push({ $limit: limit });
    let list = await sessionModel.aggregate(pipeline)

    res.json({ success: true, page, count, list });
});

exports.addSubAdmin = catchAsyncErrors(async (req, res, next) => {
    const { email, name, password, number, role, gender } = req.body;
    const e = await admin.findOne({ email })

    if (e) return next(new ErrorHandler("this email is already exist", 404));
    const f = await admin.findOne({ number })
    if (f) return next(new ErrorHandler("this number is already exist", 404));

    let obj = {
        email: email,
        name: name,
        password: password,
        number: number,
        role: role,
        gender: gender,
        user_type: "SubAdmin",
    }

    const create = await admin.create(obj)
    const html = `<!DOCTYPE html>
    <html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
      
            @media screen {
                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 400;
                    src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 700;
                    src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                }
            }
    
            /* CLIENT-SPECIFIC STYLES */
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
    
            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
    
            img {
                -ms-interpolation-mode: bicubic;
            }
    
            /* RESET STYLES */
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
    
            table {
                border-collapse: collapse !important;
            }
    
            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }
    
            /* iOS BLUE LINKS */
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            /* MOBILE STYLES */
            @media screen and (max-width:600px) {
                h1 {
                    font-size: 32px !important;
                    line-height: 32px !important;
                }
            }
    
            /* ANDROID CENTER FIX */
            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>
    </head>
    
    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
    <!-- HIDDEN PREHEADER TEXT -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- LOGO -->
        <tr>
            <td bgcolor="#eba12c" align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#eba12c" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src="https://unzziptruth.com/UnzipLogo.jpeg" width="125" height="120" style="display: block; border: 0px;" />
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                   <!-- <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0; text-align:center">YOUR OPT : ***</p>
                        </td>
                    </tr>-->
                    <tr>
                        <td bgcolor="#ffffff" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 30px 30px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="" ><a href="" target="" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none;">Your password is : ${password}</a></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr> <!-- COPY -->
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">Unzzip Truth is a helping hand in the journey of your life with
                                best levels of honesty, quality and true readings as service.
                                <br>
                                Thank you,<br>
                                UNZZIP TRUTH <br>
                                customer service department,<br>
                                support@unzziptruth.com</p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                <td bgcolor="#eba12c" align="center"
                 style="padding: 30px; border-radius: 4px; color: #fff; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                   <h2 style="font-size: 20px; font-weight: 400; color: #fff; margin: 0;">Need more help?</h2>
                     <p style="margin: 0;"><a href="mailto:account@unzziptruth.com" target="_blank"
                      style="color: #fff;">We’re here to help you out</a></p>
                       </td>
              </tr>
                </table>
            </td>
        </tr>
       
    </table>
    </body>
    </html>`
    sendEmail({
        email: email,
        subject: " Verification Email",
        html
    })
    res.json({
        success: true,
        create
    })
});

exports.updateSubAdmin = async (req, res) => {
    try {
        let { id, role, name, gender } = req.body;

        let obj = {}
        if (role) {
            obj.role = role
        }
        let dd = await admin.findByIdAndUpdate(id, obj, { new: true });

        res.json({
            success: true,
            dd
        })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Server error" })
    }
};

exports.deleteSubAdmin = catchAsyncErrors(async (req, res, next) => {
    let { id } = req.body;
    let profile = await admin.findByIdAndDelete(id);

    res.json({
        success: true,
        profile
    })
});

exports.subAdminList = catchAsyncErrors(async (req, res, next) => {
    let { page, limit, id, fromDate, endDate, sortField, sortOrder, search } = req.body;

    sortField = sortField ? sortField : "isOnline";
    sortOrder = sortOrder == "asc" ? 1 : -1;
    page = page ? (page == 0 ? 1 : parseInt(page)) : 1;
    limit = limit ? parseInt(limit) : 10;
    let offset = (page - 1) * limit;


    let pipeline = [
        {
            $match: {
                user_type: "SubAdmin"
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ]

    if (id) {
        pipeline.push({
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        })
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
    let count = (await admin.aggregate(pipeline)).length
    pipeline.push({ $sort: { [sortField]: sortOrder } });
    pipeline.push({ $skip: offset });
    pipeline.push({ $limit: limit });
    let list = await admin.aggregate(pipeline)

    res.json({ success: true, page, count, list });
});

exports.earningGraph = catchAsyncErrors(async (req, res, next) => {

    let frequency = req.body.frequency
    let pipeline = [];
    if (frequency == 'daily') {
        let date = await before_after_Date(-30)

        pipeline = [
            {
                $match: { createdAt: { $gte: new Date(date) }, 'timeInSeconds': { '$ne': 0 }, 'refundId': { '$eq': null } }
            },
            {
                '$lookup': {
                    'from': 'sessions',
                    'localField': '_id',
                    'foreignField': 'refundId',
                    'as': 'session',
                    'pipeline': [
                        {
                            '$project': {
                                'refund': {
                                    '$sum': {
                                        '$add': [
                                            '$adminEarn', '$astroEarn'
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            }, {
                $addFields:

                {
                    earning: {
                        $sum: {
                            $add: ["$adminEarn", "$astroEarn"],
                        },
                    },
                    refund: {
                        $cond: {
                            if: {
                                $gt: [
                                    {
                                        $size: "$session",
                                    },
                                    0,
                                ],
                            },
                            then: "$session.refund",
                            else: 0,
                        },
                    },
                },
            },
            {
                $unwind: {
                    path: "$refund",
                    preserveNullAndEmptyArrays: false,
                },
            },

            {
                '$group': {
                    '_id': {
                        'date': {
                            '$dayOfYear': '$createdAt'
                        }
                    },
                    'total_user': {
                        '$sum': {
                            $add: ['$earning', '$refund']
                        }
                    },
                    'createdAt': {
                        '$last': '$$ROOT.createdAt'
                    }
                }
            },
            {
                $match: {
                    total_user: { $ne: 0 }
                }
            },
            {
                '$project': {
                    'id': {
                        '$concat': [
                            {
                                '$dateToString': {
                                    'date': '$createdAt',
                                    'format': '%d '
                                }
                            }, {
                                '$switch': {
                                    'branches': [
                                        {
                                            'case': {
                                                '$eq': [
                                                    '01', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'JAN'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '02', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'FEB'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '03', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'MAR'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '04', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'APR'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '05', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'MAY'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '06', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'JUN'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '07', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'JUL'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '08', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'AUG'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '09', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'SEP'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '10', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'OCT'
                                        }, {
                                            'case': {
                                                '$eq': [
                                                    '11', {
                                                        '$dateToString': {
                                                            'date': '$createdAt',
                                                            'format': '%m'
                                                        }
                                                    }
                                                ]
                                            },
                                            'then': 'NOV'
                                        }
                                    ],
                                    'default': 'DEC'
                                }
                            }
                        ]
                    },
                    'total_user': 1,
                    'createdAt': 1,
                    '_id': 0
                }
            }, {
                '$sort': {
                    'createdAt': 1,
                    'id': 1
                }
            }
        ]
    } else if (frequency == 'weekly') {
        pipeline = [
            {
                $match: { 'timeInSeconds': { '$ne': 0 }, 'refundId': { '$eq': null } }
            },
            {
                '$lookup': {
                    'from': 'sessions',
                    'localField': '_id',
                    'foreignField': 'refundId',
                    'as': 'session',
                    'pipeline': [
                        {
                            '$project': {
                                'refund': {
                                    '$sum': {
                                        '$add': [
                                            '$adminEarn', '$astroEarn'
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            }, {
                $addFields:

                {
                    earning: {
                        $sum: {
                            $add: ["$adminEarn", "$astroEarn"],
                        },
                    },
                    refund: {
                        $cond: {
                            if: {
                                $gt: [
                                    {
                                        $size: "$session",
                                    },
                                    0,
                                ],
                            },
                            then: "$session.refund",
                            else: 0,
                        },
                    },
                },
            },
            {
                $unwind: {
                    path: "$refund",
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                '$group': {
                    '_id': {
                        'date': {
                            '$week': '$createdAt'
                        }
                    },
                    'total_user': {
                        '$sum': {
                            $add: ['$earning', '$refund']
                        }
                    },
                    'createdAt': {
                        '$last': '$$ROOT.createdAt'
                    }
                }
            }, {
                $match: {
                    total_user: { $ne: 0 }
                }
            },
            {
                '$project': {
                    'id': '$_id.date',
                    'total_user': 1,
                    'createdAt': 1,
                    '_id': 0
                }
            }, {
                '$sort': {
                    'createdAt': 1,
                    'id': 1
                }
            }
        ]

    } else if (frequency == 'monthly') {
        let date = await before_after_Date(-365)
        pipeline = [
            {
                $match: { createdAt: { $gte: new Date(date) }, 'timeInSeconds': { '$ne': 0 }, 'refundId': { '$eq': null } }
            },
            {
                '$lookup': {
                    'from': 'sessions',
                    'localField': '_id',
                    'foreignField': 'refundId',
                    'as': 'session',
                    'pipeline': [
                        {
                            '$project': {
                                'refund': {
                                    '$sum': {
                                        '$add': [
                                            '$adminEarn', '$astroEarn'
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            }, {
                $addFields:

                {
                    earning: {
                        $sum: {
                            $add: ["$adminEarn", "$astroEarn"],
                        },
                    },
                    refund: {
                        $cond: {
                            if: {
                                $gt: [
                                    {
                                        $size: "$session",
                                    },
                                    0,
                                ],
                            },
                            then: "$session.refund",
                            else: 0,
                        },
                    },
                },
            },
            {
                $unwind: {
                    path: "$refund",
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                '$group': {
                    '_id': {
                        'date': {
                            '$month': '$createdAt'
                        }
                    },
                    'total_user': {
                        '$sum': {
                            $add: ['$earning', '$refund']
                        }
                    },
                    'createdAt': {
                        '$last': '$$ROOT.createdAt'
                    }
                }
            },
            {
                $match: {
                    total_user: { $ne: 0 }
                }
            },
            {
                '$project': {
                    'id': {
                        '$switch': {
                            'branches': [
                                {
                                    'case': {
                                        '$eq': [
                                            1, '$_id.date'
                                        ]
                                    },
                                    'then': 'JAN'
                                }, {
                                    'case': {
                                        '$eq': [
                                            2, '$_id.date'
                                        ]
                                    },
                                    'then': 'FEB'
                                }, {
                                    'case': {
                                        '$eq': [
                                            3, '$_id.date'
                                        ]
                                    },
                                    'then': 'MAR'
                                }, {
                                    'case': {
                                        '$eq': [
                                            4, '$_id.date'
                                        ]
                                    },
                                    'then': 'APR'
                                }, {
                                    'case': {
                                        '$eq': [
                                            5, '$_id.date'
                                        ]
                                    },
                                    'then': 'MAY'
                                }, {
                                    'case': {
                                        '$eq': [
                                            6, '$_id.date'
                                        ]
                                    },
                                    'then': 'JUN'
                                }, {
                                    'case': {
                                        '$eq': [
                                            7, '$_id.date'
                                        ]
                                    },
                                    'then': 'JUL'
                                }, {
                                    'case': {
                                        '$eq': [
                                            8, '$_id.date'
                                        ]
                                    },
                                    'then': 'AUG'
                                }, {
                                    'case': {
                                        '$eq': [
                                            9, '$_id.date'
                                        ]
                                    },
                                    'then': 'SEP'
                                }, {
                                    'case': {
                                        '$eq': [
                                            10, '$_id.date'
                                        ]
                                    },
                                    'then': 'OCT'
                                }, {
                                    'case': {
                                        '$eq': [
                                            11, '$_id.date'
                                        ]
                                    },
                                    'then': 'NOV'
                                }
                            ],
                            'default': 'DEC'
                        }
                    },
                    'total_user': 1,
                    'createdAt': 1,
                    '_id': 0
                }
            }, {
                '$sort': {
                    'createdAt': 1,
                    'id': 1
                }
            }
        ]
    } else if (frequency == 'quarterly') {
        pipeline = [
            {
                '$group': {
                    '_id': {
                        'date': {
                            'year': {
                                '$year': '$createdAt'
                            },
                            'id': {
                                '$ceil': {
                                    '$divide': [
                                        {
                                            '$month': '$createdAt'
                                        }, 3
                                    ]
                                }
                            }
                        }
                    },
                    'total_user': {
                        '$sum': {
                            $add: ['$adminEarn', '$astroEarn']
                        }
                    },
                    'createdAt': {
                        '$last': '$$ROOT.createdAt'
                    }
                }
            }, {
                '$project': {
                    'id': '$_id.date.id',
                    'year': '$_id.date.year',
                    'total_user': 1,
                    'createdAt': 1,
                    '_id': 0
                }
            }, {
                '$sort': {
                    'createdAt': 1,
                    'id': 1
                }
            }
        ]


    } else if (frequency == 'yearly') {
        pipeline = [
            {
                $match: { 'timeInSeconds': { '$ne': 0 }, 'refundId': { '$eq': null } }
            },
            {
                '$lookup': {
                    'from': 'sessions',
                    'localField': '_id',
                    'foreignField': 'refundId',
                    'as': 'session',
                    'pipeline': [
                        {
                            '$project': {
                                'refund': {
                                    '$sum': {
                                        '$add': [
                                            '$adminEarn', '$astroEarn'
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            }, {
                $addFields:

                {
                    earning: {
                        $sum: {
                            $add: ["$adminEarn", "$astroEarn"],
                        },
                    },
                    refund: {
                        $cond: {
                            if: {
                                $gt: [
                                    {
                                        $size: "$session",
                                    },
                                    0,
                                ],
                            },
                            then: "$session.refund",
                            else: 0,
                        },
                    },
                },
            },
            {
                $unwind: {
                    path: "$refund",
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                '$group': {
                    '_id': {
                        'date': {
                            '$year': '$createdAt'
                        }
                    },
                    'total_user': {
                        '$sum': {
                            $add: ['$earning', '$refund']
                        }
                    },
                    'createdAt': {
                        '$last': '$$ROOT.createdAt'
                    }
                }
            },
            {
                $match: {
                    total_user: { $ne: 0 }
                }
            },
            {
                '$project': {
                    'id': '$_id.date',
                    'total_user': 1,
                    'createdAt': 1,
                    '_id': 0
                }
            }, {
                '$sort': {
                    'createdAt': 1,
                    'id': 1
                }
            }
        ]
    } else {
        return res.status(200).send({ success: false, message: "invalid frequency", data: null })
    }
    let response = await sessionModel.aggregate(pipeline);

    let user = await userModel.countDocuments()
    let astro = await astroModel.countDocuments()
    let chat = await sessionModel.countDocuments({ refundId: null })
    let recharge = await RechargeModel.aggregate([
        {
            '$group': {
                '_id': null,
                'total': {
                    '$sum': '$amount'
                }
            }
        }
    ])
    let refund = await sessionModel.aggregate([
        {
            '$match': {
                'refundId': {
                    '$ne': null
                }
            }
        }, {
            '$group': {
                '_id': null,
                'total': {
                    '$sum': '$refundAmount'
                }
            }
        }
    ])

    let earning = await sessionModel.aggregate([
        {
            $match: { 'timeInSeconds': { '$ne': 0 }, 'refundId': { '$eq': null } }
        },
        {
            '$lookup': {
                'from': 'sessions',
                'localField': '_id',
                'foreignField': 'refundId',
                'as': 'session',
                'pipeline': [
                    {
                        '$project': {
                            'refund': {
                                '$sum': {
                                    '$add': [
                                        '$adminEarn', '$astroEarn'
                                    ]
                                }
                            }
                        }
                    }
                ]
            }
        }, {
            $addFields:

            {
                earning: {
                    $sum: {
                        $add: ["$adminEarn", "$astroEarn"],
                    },
                },
                refund: {
                    $cond: {
                        if: {
                            $gt: [
                                {
                                    $size: "$session",
                                },
                                0,
                            ],
                        },
                        then: "$session.refund",
                        else: 0,
                    },
                },
            },
        },
        {
            $unwind: {
                path: "$refund",
                preserveNullAndEmptyArrays: false,
            },
        }, {
            '$group': {
                '_id': 'null',
                'total_user': {
                    '$sum': {
                        $add: ['$earning', '$refund']
                    }
                },

            }
        },


    ])
    res.json({
        success: true,
        response,
        user,
        astro,
        chat,
        recharge: recharge.length > 0 ? recharge[0].total : 0,
        refund: refund.length > 0 ? parseFloat((refund[0].total).toFixed(2)) : 0,
        // earning: parseFloat((earning.balance).toFixed(2)),
        earning: earning.length > 0 ? parseFloat((earning[0].total_user).toFixed(2)) : 0,
    })
});

exports.astroVerify = async (req, res) => {
    try {

        let { astroId, status, reason } = req.body
        if (!astroId) {
            return res.status(200).send({ success: false, message: "AstroId is required!" })
        }

        let check = await astroModel.findById(astroId)
        if (check.status == "verified" && status == "verified") {
            return res.status(200).send({ success: false, message: "Astrologer is already verified!" })
        }

        if (status == "verified") {
            const generateRandomString = async (length) => {
                let result = '';
                const characters = '0123456789';
                const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            };
            let password = await generateRandomString(6)

            encryptPassword = await bcrypt.hash(password, 10);

            const astro = await astroModel.findByIdAndUpdate(astroId, { status: status, password: encryptPassword }, { new: true })
            let html = `<!DOCTYPE html>
            <html>
            <head>
                <title></title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <style type="text/css">
              
                    @media screen {
                        @font-face {
                            font-family: 'Lato';
                            font-style: normal;
                            font-weight: 400;
                            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                        }
            
                        @font-face {
                            font-family: 'Lato';
                            font-style: normal;
                            font-weight: 700;
                            src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                        }
            
                        @font-face {
                            font-family: 'Lato';
                            font-style: italic;
                            font-weight: 400;
                            src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                        }
            
                        @font-face {
                            font-family: 'Lato';
                            font-style: italic;
                            font-weight: 700;
                            src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                        }
                    }
            
                    /* CLIENT-SPECIFIC STYLES */
                    body,
                    table,
                    td,
                    a {
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }
            
                    table,
                    td {
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                    }
            
                    img {
                        -ms-interpolation-mode: bicubic;
                    }
            
                    /* RESET STYLES */
                    img {
                        border: 0;
                        height: auto;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                    }
            
                    table {
                        border-collapse: collapse !important;
                    }
            
                    body {
                        height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                    }
            
                    /* iOS BLUE LINKS */
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                    }
            
                    /* MOBILE STYLES */
                    @media screen and (max-width:600px) {
                        h1 {
                            font-size: 32px !important;
                            line-height: 32px !important;
                        }
                    }
            
                    /* ANDROID CENTER FIX */
                    div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                    }
                </style>
            </head>
            
            <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="#eba12c" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#eba12c" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src="https://unzziptruth.com/UnzipLogo.jpeg" width="400" height="300" style="display: block; border: 0px;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0; text-align:center">Hi ${astro?.name},</p>
                                    <p style="margin: 0; text-align:center">Welcome, you have completed all steps and successfully registered to <a href="https://unzziptruth.com/">unzziptruth.com/</a> - Online Psychics Reading Services.<a href="https://astro.unzziptruth.com/">login</a>  to your dashboard.Your password is <b>${password}</b>.</p>
                                 
    
                                </td>        
                            </tr>
                            <tr>
                          
                            </tr> <!-- COPY -->
                            <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0; text-align:center">
                                <br>
                                        Thank you,<br>
                                        UNZZIP TRUTH <br>
                                        customer service department,<br>
                                        support@unzziptruth.com</p>
                            </td>
                        </tr>
                 
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                        <td bgcolor="#eba12c" align="center"
                         style="padding: 30px; border-radius: 4px; color: #fff; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                           <h2 style="font-size: 20px; font-weight: 400; color: #fff; margin: 0;">Need more help?</h2>
                             <p style="margin: 0;"><a href="mailto:account@unzziptruth.com" target="_blank"
                              style="color: #fff;">We’re here to help you out</a></p>
                               </td>
                      </tr>
                        </table>
                    </td>
                </tr>
               
            </table>
            </body>
            </html>`;

            {
                sendEmail({
                    email: astro?.email,
                    subject: "You have successfully verified!",
                    html: html
                })
            }


            return res.status(200).send({ success: true, message: "Success!" })

        }
        else if (status == "rejected") {

            if (!reason) {
                return res.status(200).send({ success: false, message: "please enter reason!" })

            }

            const astro = await astroModel.findByIdAndUpdate(astroId, { status: status }, { new: true })

            let html = `<!DOCTYPE html>
            <html>
            <head>
                <title></title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <style type="text/css">
              
                    @media screen {
                        @font-face {
                            font-family: 'Lato';
                            font-style: normal;
                            font-weight: 400;
                            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                        }
            
                        @font-face {
                            font-family: 'Lato';
                            font-style: normal;
                            font-weight: 700;
                            src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                        }
            
                        @font-face {
                            font-family: 'Lato';
                            font-style: italic;
                            font-weight: 400;
                            src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                        }
            
                        @font-face {
                            font-family: 'Lato';
                            font-style: italic;
                            font-weight: 700;
                            src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                        }
                    }
            
                    /* CLIENT-SPECIFIC STYLES */
                    body,
                    table,
                    td,
                    a {
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }
            
                    table,
                    td {
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                    }
            
                    img {
                        -ms-interpolation-mode: bicubic;
                    }
            
                    /* RESET STYLES */
                    img {
                        border: 0;
                        height: auto;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                    }
            
                    table {
                        border-collapse: collapse !important;
                    }
            
                    body {
                        height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                    }
            
                    /* iOS BLUE LINKS */
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                    }
            
                    /* MOBILE STYLES */
                    @media screen and (max-width:600px) {
                        h1 {
                            font-size: 32px !important;
                            line-height: 32px !important;
                        }
                    }
            
                    /* ANDROID CENTER FIX */
                    div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                    }
                </style>
            </head>
            
            <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="#eba12c" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#eba12c" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src="https://unzziptruth.com/UnzipLogo.jpeg" width="400" height="300" style="display: block; border: 0px;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0; text-align:center">Hi ${check?.name},</p>
                                    <p style="margin: 0; text-align:center">Sorry! your form has been rejected .${reason}</p>
                                </td>        
                            </tr>
                            <tr>
                          
                            </tr> <!-- COPY -->
                            <tr>
                            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0; text-align:center">
                                <br>
                                        Thank you,<br>
                                        UNZZIP TRUTH <br>
                                        customer service department,<br>
                                        support@unzziptruth.com</p>
                            </td>
                        </tr>
                 
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                        <td bgcolor="#eba12c" align="center"
                         style="padding: 30px; border-radius: 4px; color: #fff; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                           <h2 style="font-size: 20px; font-weight: 400; color: #fff; margin: 0;">Need more help?</h2>
                             <p style="margin: 0;"><a href="mailto:account@unzziptruth.com" target="_blank"
                              style="color: #fff;">We’re here to help you out</a></p>
                               </td>
                      </tr>
                        </table>
                    </td>
                </tr>
               
            </table>
            </body>
            </html>`;

            {
                sendEmail({
                    email: check?.email,
                    subject: "Rejected form!",
                    html: html
                })
            }
            return res.status(200).send({ success: true, message: "Success!" })

        } else {
            return res.status(200).send({ success: false, message: "Something went wrong!" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: "server error" })

    }
}

exports.sendPushNotificationByToken = async (req, res) => {
    try {
        let { user_id, title, msg, module_id, module_type } = req.body
        var serverKey = 'AAAAbNzLTl4:APA91bEcbPDTEwzTLUZSnPYiDoIhYOI4Jnb_v0OvNNg1tttjZpEJWKi9gMz5csQC6bx1nKz8rPpPRl_Klo_TpioQMA9C8OEkFFlZX8F9Ra7UhS4uwrC3k_w6SOgd-a9wKZfgxM2Naiaa';
        var fcm = new FCM(serverKey);

        console.log({ user_id });

        let user_tokens
        if (user_id) {

            user_tokens = await userModel.distinct("token", { _id: { $in: user_id } })
        } else {
            user_tokens = await userModel.distinct("token")

        }

        let data = {
            default_action: module_id,
            default_message: module_type
        }
        const payload = {
            title: title,
            body: msg
        };
        var notification_body = {
            'notification': payload,
            'data': data,
            'registration_ids': user_tokens
        }

        console.log("meassge", notification_body);
        fcm.send(notification_body, function (err, response) {
            if (err) {
                console.log("Something has gone wrong!" + err);

            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
        return true
    } catch (err) {
        console.log(err);
        return false
    }
}


exports.pushNotificationSend = async (req, res) => {
    try {
        let { user_id, title, msg, module_id, module_type } = req.body;

        const jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            ['https://www.googleapis.com/auth/firebase.messaging'],
        );

        let user_tokens;
        if (user_id) {
            user_tokens = await userModel.distinct("firebase_token", { _id: { $in: user_id } });
        } else {
            user_tokens = await userModel.distinct("firebase_token");
        }

        jwtClient.authorize(async (err, tokens) => {
            if (err) {
                console.error('Error authorizing JWT client:', err);
                return res.status(500).json({ status: false, msg: "Authorization failed" });
            }

            if (user_tokens.length > 0) {
                user_tokens.map(async(token)=>{
                    const message = {
                        "message": {
                            "token": token,
                            "notification": {
                                "title": title,
                                "body": msg
                            }
                        }
                    };
                    try {
                        const response = await axios.post(`https://fcm.googleapis.com/v1/projects/${key.project_id}/messages:send`, message, {
                            headers: {
                                'Authorization': `Bearer ${tokens.access_token}`,
                                'Content-Type': 'application/json',
                            },
                        });
        
                        console.log('Successfully sent message:', response.data);
                        return true;
                        // return res.status(200).json({ status: true, msg: "Message sent successfully" });
                    } catch (error) {
                        console.error('Error sending message:', error);
                        return false;
                        // if (error.response && error.response.data) {
                        //     return res.status(500).json({ status: false, msg: "Error sending message", err: error.response.data });
                        // } else {
                        //     return res.status(500).json({ status: false, msg: "Error sending message" });
                        // }
                    }
                })
               
            }
          
         
        });

    } catch (error) {
        console.error('Error in pushNotificationSend:', error);
        // return res.status(500).json({ status: false, msg: "Internal server error" });
        return false;

    }
}