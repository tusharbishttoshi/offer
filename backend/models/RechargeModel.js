const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    amount: Number,
    reason: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model("Recharge", categorySchema);
