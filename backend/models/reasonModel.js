const mongoose = require("mongoose");
const reasonSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        default:null
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: true
    }
})
module.exports = mongoose.model("reason", reasonSchema);