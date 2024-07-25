
const Bank = require("../models/bankModel");
const User = require('../models/userModel.js');
const Recharge = require('../models/RechargeModel.js');
const Offer = require("../models/offerModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { default: mongoose } = require('mongoose');


exports.addRecharge = async (req, res) => {
  const { userID, amount } = req.body
  const findRecharge = await Recharge.find({ user: userID });
  const findOffer = await Offer.aggregate([
    {
      $project: {
        payment: {
          $cond: [
            { $eq: [findRecharge.length, 0] }, "$first_payment",
            {
              $cond: [
                { $eq: [findRecharge.length, 1] }, "$second_payment",
                {
                  $cond: [
                    { $eq: [findRecharge.length, 2] }, "$third_payment",
                    "$fourth_payment"
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  ]);
  const bonus = (amount * findOffer[0].payment) / 100;
  const user = await User.findOne({ _id: userID })
  user.balance = user.balance + Number(amount)
  user.bonus = user.bonus + Number(bonus)
  await Recharge.create({ user: userID, amount, bonus })
  user.save()
  res.status(200).json({ success: true, user })
}

exports.getRechargeHistory = async (req, res) => {
  const { userID } = req.query
  const rechargeHistory = await Recharge.find({ user: userID })
  res.status(200).json({ success: true, rechargeHistory })
}


exports.getRechargeAndBankHistory = async (req, res) => {
  const { userID, } = req.query;
  const { page, limit } = req.body;

  let pipeline = [
    {
      '$match': {
        'astro': new mongoose.Types.ObjectId('65e99745650ddad3b8dded08')
      }
    }, {
      '$lookup': {
        'from': 'banks',
        'localField': 'astro',
        'foreignField': 'astro',
        'as': 'astroaBankTransection'
      }
    }, {
      '$lookup': {
        'from': 'users',
        'localField': 'user',
        'foreignField': '_id',
        'as': 'userDetails'
      }
    }, {
      '$unwind': {
        'path': '$userDetails',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$addFields': {
        'astroPrevBalance': {
          '$trunc': [
            '$astroPrevBalance', 2
          ]
        }
      }
    }, {
      '$sort': {
        'createdAt': -1
      }
    }
  ]
  let getRecharge = await Session.aggregate(pipeline)
  res.status(200).json({ success: true, getRecharge });


  // const pageNumber = parseInt(page) || 1;
  // const pageSize = parseInt(limit) || 10;

  // const totalRecharges = await Recharge.countDocuments({ user: userID });
  // const rechargeHistory = await Recharge.find({ user: userID })
  //     .skip((pageNumber - 1) * pageSize)
  //     .limit(pageSize);
  // res.status(200).json({ success: true, totalCount: totalRecharges, currentPage: pageNumber, rechargeHistory });

}


exports.getAllRechargeHistory = async (req, res) => {
  const rechargeHistory = await Recharge.find().populate("user")

  res.status(200).json({ success: true, rechargeHistory })
}

exports.rechargeList = catchAsyncErrors(async (req, res, next) => {
  let { page, limit, fromDate, toDate, sortField, sortOrder, search, user } = req.body;

  sortField = sortField ? sortField : "createdAt";
  sortOrder = sortOrder == "asc" ? 1 : -1;
  page = page ? (page == 0 ? 1 : parseInt(page)) : 1;
  limit = limit ? parseInt(limit) : 10;
  let offset = (page - 1) * limit;

  let pipeline = [
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
  if (user) {
    pipeline.push({ $match: { user: new mongoose.Types.ObjectId(user) } })
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
          { user_name: { $regex: search, $options: "i" } },

        ],
      },
    });
  }
  let count = (await Recharge.aggregate(pipeline)).length
  pipeline.push({ $sort: { [sortField]: sortOrder } });
  pipeline.push({ $skip: offset });
  pipeline.push({ $limit: limit });
  let list = await Recharge.aggregate(pipeline)

  res.json({ success: true, page, count, list });
});
