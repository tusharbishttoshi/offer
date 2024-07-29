const Session = require('../models/SessionModel.js');
const User = require('../models/userModel.js');
const Astro = require('../models/astroModel.js');
const OfflineChat = require('../models/OfflineChat.js');
const adminModel = require('../models/adminModel.js');
const bankModel = require('../models/bankModel.js');
const mongoose = require("mongoose");
const userModel = require('../models/userModel.js');


const generateRandomString = (length) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

let totalChargeAmounts = {};
exports.addSession = async (req, res) => {
    try {
        const { astroId, userId, time, price, bonusBalance, value, rating, comment, offline, offChatId } = req.body
        if (offline) {
            try {
                const off = await OfflineChat.findOne({ _id: offChatId })
                off.isReplied = true
                await off.save()
                const xh = await Session.find({ userPaid: { $lte: 0 } })
                const transactionID = await Session.find({ $or: [{ userPaid: { $ne: 0 } }, { refundId: { $ne: null } }] })
                const d = new Date(off.createdAt)
                const c = new Date()
                const differenceInMilliseconds = c - d;
                const u = await Astro.findOne({ _id: astroId })
                const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
                u.balance = u.balance + off.astroEarn
                await u.save()

                // let admin = await adminModel.findOne()
                // admin.balance = admin.balance + off.adminEarn
                // await admin.save()
                //           
                // let amount_type_astro = "credit"
                // let amount_type_user = "debit"

                // let bank_count = await bankModel.find()
                // let transactionId = transactionID.length + bank_count.length
                let updateSession = await Session.findByIdAndUpdate(off.session_id, { timeInSeconds: differenceInSeconds, userPaid: -(off.userPaid), astroEarn: off.astroEarn, adminEarn: off.adminEarn, astroPrevBalance: u.balance }, { new: true })
                // const a = await Session.create({ astroPrevBalance: u.balance, id: xh.length + 1000000, isOnline: false, astro: astroId, reason: value ? value : "N/A", user: userId, amount_type_astro: amount_type_astro, amount_type_user: amount_type_user, adminEarn: 4.5, userPaid: -7, astroEarn: 2.5, timeInSeconds: differenceInSeconds, transactionID: transactionId + 100000000000 })
                const chat = await OfflineChat.find({ astro: astroId, isReplied: false }).populate("user").populate("astro")
                res.status(200).json({ success: true, offChat: chat })
            } catch (error) {
                console.log(error.message)
            }
        } else {

            if (!astroId) {
                return res.status(200).send({ success: false, message: "astroId is required!" })
            }
            if (!userId) {
                return res.status(200).send({ success: false, message: "userId is required!" })
            }
            if (!time) {
                return res.status(200).send({ success: false, message: "time is required!" })
            }
            if (!price) {
                return res.status(200).send({ success: false, message: "price is required!" })
            }
            if (time <= 0) {
                return
            }
            console.log({ value });

            // const now = new Date();
            // let beforeOneMinute = now.setMinutes(now.getMinutes() - 1)
            // let check = await Session.findOne({ astro: astroId, user: userId, createdAt: { $gt: beforeOneMinute } })
            // if (check) {
            //     return res.status(200).json({ success: true })
            // }
            const getAstro = (t, bb) => {
                const x = (bb / 2.51) * 60
                const v = t - x
                let a = 0
                const getAmount = (t, p) => {
                    const m = ("0" + Math.floor((t / 60) % 60)).slice(-2)
                    const s = ("0" + Math.floor((t) % 60)).slice(-2)
                    let a = 0;
                    a = m * p
                    if (s > 0) {
                        a = a + p
                    }
                    return a
                }
                if (v <= 0) {
                    // a = getAmount(t, 0.33)
                    a = getAmount(t, 0.77)
                }
                else if (v > 0) {
                    if (x >= 60) {
                        // let b = getAmount(x, 0.33)
                        let b = getAmount(x, 0.77)
                        let c = getAmount(v, 0.77)
                        a = b + c
                    }
                    else {
                        a = getAmount(t, 0.77)
                    }
                }
                return a
            }

            const minutes = ("0" + Math.floor((time / 60) % 60)).slice(-2)
            const second = ("0" + Math.floor((time) % 60)).slice(-2)
            let user = await User.findOne({ _id: userId })
            const getAmount = (m, s, p) => {
                let a = 0;
                a = m * p
                if (s > 0) {
                    // let sPrize = (0.0418333333333333 * s).toFixed(2)
                    // a = a + parseFloat(sPrize)
                    a = a + p
                }
                // console.log(a)
                return a
            }
            const xh = await Session.find({ userPaid: { $lte: 0 } })
            const transactionID = await Session.find({ $or: [{ userPaid: { $ne: 0 } }, { refundId: { $ne: null } }] })

            const userChargeAmount = getAmount(minutes, second, parseFloat(price))

            // console.log({ userChargeAmount });
            const astro = await Astro.findOne({ _id: astroId })
            let astroChargeAmount = getAstro(time, user?.bonus)
            let reviews
            if (rating != 0 && rating != "" && rating != "NaN" && rating != NaN && rating != undefined) {
                reviews = {}
                reviews.rating = Number(rating)
                reviews.comment = comment
                reviews.user = userId

                astro.reviews.push(reviews)

            }
            // console.log({ reviews });

            // if (reviews != undefined || reviews != null) {
            //     console.log({ reviews });
            // }

            let key = `${userId}_${astroId}`;
            if (!totalChargeAmounts[key]) {
                totalChargeAmounts[key] = 0;
            }
            totalChargeAmounts[key] += userChargeAmount;

            console.log({totalChargeAmounts});
            if (totalChargeAmounts[key] > 7.53) {
                astro.balance = parseFloat(astro.balance + astroChargeAmount)
                astro.consultation = astro.consultation + 1
                astro.save()
            }

            if (user.bonus > 0) {
                if (user.bonus > 0 && (userChargeAmount <= user.bonus)) {
                    minBonus = parseFloat(user.bonus - userChargeAmount)
                    user.bonus = minBonus >= 0 ? parseFloat(minBonus) : 0
                } else if (user.bonus > 0 && (userChargeAmount > user.bonus)) {
                    minusBonus = parseFloat(userChargeAmount - user.bonus)
                    user.bonus = 0
                   let minusBalance = parseFloat(user.balance - minusBonus)
                    user.balance = minusBalance >= 0 ? parseFloat(minusBalance) : 0
                } else {
                  let minusBalance = parseFloat(user.balance - userChargeAmount)
                    user.balance = minusBalance >= 0 ? parseFloat(minusBalance) : 0
                }
                user.save()
                let admin = await adminModel.findOne()
                admin.balance = admin.balance + parseFloat(userChargeAmount - astroChargeAmount)
                let admin_balace = (userChargeAmount - astroChargeAmount)
                await admin.save()
                let amount_type_astro = "credit"
                let amount_type_user = "debit"
                // let transactionID = "10" + generateRandomString(10);
                let bank_count = await bankModel.find()
                let transactionId = transactionID.length + bank_count.length

                const a = await Session.create({ astroPrevBalance: astro.balance, id: xh.length + 1000000, review: reviews, astro: astroId, reason: value ? value : "N/A", amount_type_astro: amount_type_astro, amount_type_user: amount_type_user, adminEarn: admin_balace, user: userId, userPaid: -userChargeAmount, astroEarn: totalChargeAmounts[key] > 7.53 ? astroChargeAmount.toFixed(2) : 0.77, userPaidPrise: price, astroEarnPrise: astro.earnPrise, timeInSeconds: time, transactionID: transactionId + 100000000000 })
            } else if (user.balance > 0) {
                if (user.balance > 0 && (userChargeAmount <= user.balance)) {
                   let minusBalance = parseFloat(user.balance - userChargeAmount)
                    user.balance = minusBalance >= 0 ? parseFloat(minusBalance) : 0
                } else if (user.balance > 0 && (userChargeAmount > user.balance)) {
                    user.balance = 0
                } else {
                   let minusBalance = parseFloat(user.balance - userChargeAmount)
                    user.balance = minusBalance >= 0 ? parseFloat(minusBalance) : 0
                }
                user.save()
                let admin = await adminModel.findOne()
                admin.balance = admin.balance + parseFloat(userChargeAmount - astroChargeAmount)
                let admin_balace = (userChargeAmount - astroChargeAmount)
                await admin.save()
                let amount_type_astro = "credit"
                let amount_type_user = "debit"
                // let transactionID = "10" + generateRandomString(10);
                let bank_count = await bankModel.find()
                let transactionId = transactionID.length + bank_count.length

                const a = await Session.create({ astroPrevBalance: astro.balance, id: xh.length + 1000000, review: reviews, astro: astroId, reason: value ? value : "N/A", amount_type_astro: amount_type_astro, amount_type_user: amount_type_user, adminEarn: admin_balace, user: userId, userPaid: -userChargeAmount, astroEarn: totalChargeAmounts[key] > 7.53 ? astroChargeAmount.toFixed(2) : 0.77, userPaidPrise: price, astroEarnPrise: astro.earnPrise, timeInSeconds: time, transactionID: transactionId + 100000000000 })
            }
            return res.status(200).json({ success: true })
        }

    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false, message: "server error" })

    }
}

exports.getaSessionWithPagination = async (req, res) => {
    let { id, a, } = req.query
    let { page, limit } = req.body
    page = page ? (page == 0 ? 1 : parseInt(page)) : 1;
    limit = limit ? parseInt(limit) : 10;

    let query;
    if (a) {
        query = { astro: id };
    } else {
        query = { user: id };
    }
    const totalSessions = await Session.countDocuments(query);
    const totalPages = Math.ceil(totalSessions / limit);

    const sessions = await Session.find(query).sort({ createdAt: -1 })
        .populate("user", " _id name")
        .populate("astro", "_id name")
        .skip((page - 1) * limit)
        .limit(limit);


    if (sessions.length > 0) {
        let allData = await Promise.all(sessions.map(async (item) => {
            item.userPaid = item.userPaid.toFixed(2)
            return item;
        }));
    }


    res.status(200).json({ success: true, totalCount: totalSessions, currentPage: page, sessions });

}

exports.getSession = async (req, res) => {
    const { id, a, b } = req.query
    if (a) {
        const sessions = await Session.find({ astro: id }).populate("user").populate("astro")
        res.status(200).json({ success: true, sessions })
    } else if (b) {

    }
    else {
        const sessions = await Session.find({ user: id }).populate("astro").populate("user")
        res.status(200).json({ success: true, sessions })
    }
}

exports.Session = async (req, res) => {
    const sessions = await Session.find().populate("user").populate("astro")
    res.status(200).json({ success: true, sessions })
}

exports.userSession = async (req, res) => {
    const { astro, user } = req.body

    const sessions = await Session.find({
        $and: [
            { user: user },
            { astro: astro }
        ]
    }).populate("user").populate("astro")
    res.status(200).json({ success: true, sessions })
}

exports.userSessions = async (req, res) => {
    const { astro, user } = req.body

    let pipeline = [
        {
            '$match': {
                '_id': new mongoose.Types.ObjectId(user)
            }
        }, {
            '$lookup': {
                'from': 'sessions',
                'localField': '_id',
                'foreignField': 'user',
                'as': 'session',
                'pipeline': [
                    {
                        '$match': {
                            'astro': new mongoose.Types.ObjectId(astro)
                        }
                    },
                    {
                        $sort: {
                            createdAt: -1
                        }
                    }
                ]
            }
        }
    ]

    let sessions = await userModel.aggregate(pipeline)

    sessions = sessions.length > 0 ? sessions[0] : {}

    res.status(200).json({ success: true, sessions })
}

exports.astroTransaction = async (req, res) => {
    let astro = req.params.id

    console.log({ astro });
    let sessions = await Session.find({ astro: astro }).populate('user astro', "name")
    let bank = await bankModel.find({ astro: astro })


    if (bank.length > 0) {
        sessions = sessions.concat(bank)
        sessions.sort(function (a, b) { return b.createdAt - a.createdAt });
    }

    res.status(200).json({ success: true, sessions })
}

exports.getSessionEarnAndInvoiceHistory = async (req, res) => {
    let astro = req.params.id

    let pipeline = [
        {
            '$match': {
                'astro': new mongoose.Types.ObjectId(astro)
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'user'
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
        },
        {
            '$sort': {
                'createdAt': -1
            }
        }
    ]

    let astroSessionEarn = await Session.aggregate(pipeline)
    let astorBankInvoice = await bankModel.find({ astro: astro }).sort({ createdAt: -1 });

    if (astorBankInvoice.length > 0) {
        astorBankInvoice = astorBankInvoice.map(invoice => {
            invoice.balance = parseFloat(invoice.balance.toFixed(2));
            return invoice;

        });
        astroSessionEarn = [...astroSessionEarn, ...astorBankInvoice];
        astroSessionEarn.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.status(200).json({ success: true, astroSessionEarn });




}

exports.getSessionEarnAndInvoiceHistoryNew = async (req, res) => {
    // let astro = req.params.id

    let { id, page, limit, fromDate, toDate, search } = req.body

    search = search ? search : "";
    page = page ? (page == 0 ? 1 : parseInt(page)) : 1;
    limit = limit ? parseInt(limit) : 10;
    let pipeline = [
        {
            '$match': {
                'astro': new mongoose.Types.ObjectId(id)
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'user'
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
        },
        {
            '$sort': {
                'createdAt': -1
            }
        },
        {
            $addFields: {
                name: "$user.name"
            }
        },
        {
            $match: {
                transactionID: { $ne: "" }
            }
        }
    ]
    let astroSessionEarn = await Session.aggregate(pipeline)
    let astorBankInvoice = await bankModel.aggregate([
        {
            '$match': {
                'astro': new mongoose.Types.ObjectId(id)
            }
        }
    ])

    if (astorBankInvoice.length > 0) {
        astorBankInvoice = astorBankInvoice.map(invoice => {
            invoice.balance = parseFloat(invoice.balance.toFixed(2));
            invoice.user = { name: "System" }
            return invoice;
        });
        astroSessionEarn = [...astroSessionEarn, ...astorBankInvoice];
        astroSessionEarn.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }


    function paginateAndSearchByDate(array, page, limit, fromDate, toDate, search) {
        let filteredArray = array;
        if (search) {
            filteredArray = array.filter(item =>
                item?.user?.name.toLowerCase().includes(search.toLowerCase())
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
    let count = paginatedData.length
    res.status(200).json({ success: true, page, count, paginatedData });
}

exports.astroRating = async (req, res) => {
    try {

        let { astroId, userId, rating, comment } = req.body
        if (!astroId) {
            return res.status(200).send({ status: false, message: "AstroId is required!" })
        }
        if (!userId) {
            return res.status(200).send({ status: false, message: "userId is required!" })
        }
        const astro = await Astro.findOne({ _id: astroId })
        let reviews
        if (rating != 0 || rating != "") {
            reviews = {}
            reviews.rating = Number(rating)
            reviews.comment = comment
            reviews.user = userId
        }
        if (reviews != undefined || reviews != null) {
            console.log({ reviews });
            astro.reviews.push(reviews)
            astro.save()
        }
        return res.status(200).send({ status: true, message: "Success!" })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: "server error" })

    }
}


exports.offChatSessions = async (data) => {
    try {
        let { astroId, userId, myId } = data
        const xh = await Session.find({ userPaid: { $lte: 0 } })
        const transactionID = await Session.find({ $or: [{ userPaid: { $ne: 0 } }, { refundId: { $ne: null } }] })
        // const d = new Date(off.createdAt)
        // const c = new Date()
        // const differenceInMilliseconds = c - d;
        const u = await Astro.findOne({ _id: astroId })

        // // const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
        // const differenceInSeconds = 0
        // u.balance = u.balance + 2.5
        // await u.save()
        // 
        // let admin = await adminModel.findOne()
        // admin.balance = admin.balance + (7 - 2.5)
        // await admin.save()
        //           
        let amount_type_astro = "credit"
        let amount_type_user = "debit"

        let bank_count = await bankModel.find()
        let transactionId = transactionID.length + bank_count.length
        let a = await Session.create({ astroPrevBalance: u.balance, id: xh.length + 1000000, isOnline: false, astro: astroId, reason: "N/A", user: userId ? userId : myId, amount_type_astro: amount_type_astro, amount_type_user: amount_type_user, adminEarn: 4.5, userPaid: -7, astroEarn: 2.5, timeInSeconds: 0, transactionID: transactionId + 100000000000 })
        return a;

    } catch (error) {
        console.log(error);
        return false;
    }
}