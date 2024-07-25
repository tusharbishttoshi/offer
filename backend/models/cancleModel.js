const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema(
    {

        astro: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Astro"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        time :{
            type:Number
        },
        reason: String,
        createdAt: {
            type: Date,
            default: Date.now,
        }

    }
)
module.exports = mongoose.model("cancel", ChatSchema);