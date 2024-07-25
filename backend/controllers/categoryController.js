const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Category = require("../models/categoryModel");
exports.addCategory = catchAsyncErrors(async (req, res) => {
    const { category } = req.body
    const a = await Category.create({
        category
    })
    res.status(201).json({
        category: a,
        success: true
    })
});
exports.getCategory = catchAsyncErrors(async (req, res) => {
    const categories = await Category.find()
    res.status(201).json({
        categories,
        success: true,
        status:true
    })
})
exports.deleteCategory = catchAsyncErrors(async (req, res) => {
    const { id } = req.params
    await Category.findByIdAndDelete(id)
    const categories = await Category.find()
    res.status(201).json({
        categories,
        success: true
    })
})
exports.updateCategory = catchAsyncErrors(async (req, res) => {
    const { id, category } = req.body
    await Category.findByIdAndUpdate(id, { category: category })
    const categories = await Category.find()
    res.status(201).json({
        categories,
        success: true
    })
})