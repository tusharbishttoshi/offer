const express = require("express");
const { getBlog, addBlog, deleteBlog, updateBlog, myBlog, Blog } = require("../controllers/blogController");

const router = express.Router();

router.route("/blog").get(getBlog).post(addBlog).put(updateBlog)
router.route("/blog/:id").delete(deleteBlog)
router.route("/myBlog/:id").get(myBlog)
router.route("/blog/:id").get(Blog)

module.exports = router;