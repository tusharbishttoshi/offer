const mongoose = require("mongoose");
const offerSchema = new mongoose.Schema({
    first_payment: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    second_payment: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    third_payment: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    fourth_payment: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model("Offer", offerSchema);
