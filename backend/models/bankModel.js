const mongoose = require("mongoose");
// const CategorySchema = new mongoose.Schema({

//     astro: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Astro"
//     },
//     balance: Number,

//     amount: Number,

//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },

// })
// module.exports = mongoose.model("bank", CategorySchema);

const CategorySchema = new mongoose.Schema({
    astro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Astro"
    },
    
    balance: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
    transactionID: { type: String, default: "" },

}, { timestamps: true });

module.exports = mongoose.model("bank", CategorySchema);

