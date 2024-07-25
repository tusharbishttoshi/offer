const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
        },
        content: { type: String, trim: true },
        avatar: {
            url: String,
            public_id: String
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "chat"
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)
module.exports = mongoose.model("Message", MessageSchema);