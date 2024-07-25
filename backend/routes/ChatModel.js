const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true
        },
        astro: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Astro"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },

    }
)
module.exports = mongoose.model("chat", ChatSchema);