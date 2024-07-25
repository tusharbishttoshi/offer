const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema({
    name: String,
    message: String,
    userId: String,
})
module.exports = mongoose.model("report", reportSchema);