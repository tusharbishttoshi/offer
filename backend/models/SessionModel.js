const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    astro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Astro"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    refundId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    id: Number,
    isOnline: {
        type: Boolean,
        default: true
    },
    astroPrevBalance: Number,
    review: {
        rating: Number,
        comment: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    amount_type_astro: {
        type: String,
        default: ""
    },
    amount_type_user: {
        type: String,
        default: ""
    },
    reason: String,
    adminReason: String,

    userReason: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reason',
        default: null
    },
    refundAmount: {
        type: Number,
        default:0
    },
    time:{
        type :Number,
    },
    userPaid: {
        type:Number ,
        default:0
    },
    astroEarn: {
        type:Number ,
        default:0
    },
    adminEarn:  {
        type:Number ,
        default:0
    },
    userPaidPrise: Number,
    astroEarnPrise: Number,
    timeInSeconds: {
        type:Number ,
        default:0
    },
    transactionID: { type: String, default: "" },
    refundStatus: { type: String, enum: ["pending", "refund_completed", "completed", "rejected"] }

}, { timestamps: true })
module.exports = mongoose.model("Session", categorySchema);
