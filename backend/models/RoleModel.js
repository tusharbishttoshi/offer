const mongoose = require("mongoose");
const RoleSchema = new mongoose.Schema({
    role: String,
    permissions: [
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
})
module.exports = mongoose.model("Role", RoleSchema);