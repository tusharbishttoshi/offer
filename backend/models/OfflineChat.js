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
    isReplied: {
        type: Boolean,
        default: false,
    },
    userPaid: {
        type: Number,
        default: 0
    },
    astroEarn: {
        type: Number,
        default: 0
    },
    adminEarn: {
        type: Number,
        default: 0
    },
    messages: [
        {
            sender: String,
            content: { type: String, trim: true },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    session_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sessions"
    },
    date: {
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

})
module.exports = mongoose.model("OfflineChat", categorySchema);
