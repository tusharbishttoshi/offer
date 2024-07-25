const ErrorHandler = require("../utils/errorhander.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Role = require('../models/RoleModel.js');
const adminModel = require("../models/adminModel.js");
exports.addRole = async (req, res) => {
    const r = await Role.create(req.body)
    const roles = await Role.findOne({ _id: r._id }).populate("userId", "email")
    res.status(201).json({
        role: roles,
        success: true
    })
}
exports.getRole = async (req, res) => {
    const roles = await Role.find().populate("userId", "email")
    res.json({
        roles,
        success: true
    })
}
exports.deleteRole = async (req, res) => {
    const { id } = req.params
    await Role.findByIdAndDelete({ _id: id })
    const roles = await Role.find().populate("userId", "email")
    res.status(201).json({
        roles,
        success: true,
    })
}
exports.updateRole = async (req, res) => {
    const { Id, permissions, name } = req.body
    let u = {}
    if (permissions.length > 0) u.permissions = permissions;
    if (name) u.role = name;
    await Role.findByIdAndUpdate({ _id: Id }, { ...u }).then(async (e) => {
        e = await adminModel.populate(e, {
            path: "userId",
            select: "email"
        })
        res.status(201).json({
            role: e,
            success: true,
        })
    })

}