const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Blog = require("../models/blogModel");
const cloudinary = require("cloudinary");
exports.Blog = catchAsyncErrors(async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findOne({ _id: id }).populate("category")
    res.status(200).json({ blog, success: true, status: true })
})
exports.addBlog = catchAsyncErrors(async (req, res) => {
    const { title, description, user, banner, heading, paragraph, metaTitle, metaDescription, tags, keywords, category } = req.body
    let a = await cloudinary.v2.uploader.upload(banner, { folder: "avatar", })
    const b = await Blog.create({
        title, description, user, category, metaTitle, metaDescription, tags, keywords, banner: {
            public_id: a.public_id,
            url: a.secure_url
        }, body: [{
            heading,
            paragraph
        }]
    })
    res.status(200).json({
        blog: b,
        success: true,
        status: true
    })
});
exports.myBlog = catchAsyncErrors(async (req, res) => {
    const { id } = req.params
    const blogs = await Blog.find({ user: id })
    res.status(200).json({
        blogs,
        success: true
    })
})
exports.getBlog = catchAsyncErrors(async (req, res) => {
    const blogs = await Blog.find()
    res.status(200).json({
        blogs,
        success: true,
        status: true
    })
})
exports.deleteBlog = catchAsyncErrors(async (req, res) => {
    const { id } = req.params
    await Blog.findByIdAndDelete(id)
    const blogs = await Blog.find()
    res.status(200).json({
        blogs,
        success: true,
        status: true
    })
})
exports.updateBlog = catchAsyncErrors(async (req, res) => {
    const { id, title, description, user, banner, category, metaTitle, metaDescription, tags, keywords } = req.body

    let obj = {}
    if (title) obj.title = title
    if (description) obj.description = description
    if (user) obj.user = user
    if (metaTitle) obj.metaTitle = metaTitle
    if (metaDescription) obj.metaDescription = metaDescription
    if (tags) obj.tags = tags
    if (keywords) obj.keywords = keywords
    if (banner) {

        let a = await cloudinary.v2.uploader.upload(banner, { folder: "avatar", })
        let image = {
            public_id: a.public_id,
            url: a.secure_url
        }
        obj.banner = image

    }

    if (category) obj.category = category

    let update = await Blog.findByIdAndUpdate(id, obj, { new: true })
    res.status(200).json({
        update,
        success: true,
        status: true
    })
})