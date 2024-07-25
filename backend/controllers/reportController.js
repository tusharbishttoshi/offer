const ErrorHander = require("../utils/errorhander.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Report = require('../models/reportModel.js');
const User = require('../models/userModel.js');
const cron = require('node-cron');
exports.reportUser = async (req, res) => {
    const { id, name, report } = req.body
    await Report.create({ userId: id, name, message: report })
    const Reports = await Report.find()
    res.status(201).json({
        Reports,
        success: true,
    })
}
exports.getReport = async (req, res) => {
    const Reports = await Report.find()
    res.json({
        Reports,
        success: true
    })
}
exports.ban = async (req, res) => {
    const { id } = req.body
    const user = await User.find()
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const banDate = new Date();
    banDate.setDate(banDate.getDate() + 30);
    user.isBanned = true;
    user.banDate = banDate;
    await user.save();
    cron.schedule(`* * 30 * * *`, async () => {
        user.isBanned = false;
        user.banDate = undefined;
        await user.save();
    }, {
        scheduled: true,
        timezone: 'Your-Timezone' // Set your desired timezone here
    });
    return res.status(200).json({ message: 'User banned successfully' });
}