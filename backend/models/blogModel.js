const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    banner: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    metaTitle: {
        type: String,
        default: ""
    },
    metaDescription: {
        type: String,
        default: ""
    },
     tags: {
        type: String,
        default: ""
    },
     keywords: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model("Blog", blogSchema);
