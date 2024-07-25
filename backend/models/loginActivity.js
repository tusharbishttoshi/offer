const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema(
    {
        astro: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Astro"
        },
        type: String,
        endAt:{
            type: Date,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)
module.exports = mongoose.model("login", ChatSchema);