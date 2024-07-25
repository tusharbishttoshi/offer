const express = require("express");
const { getCategory, addCategory, deleteCategory, updateCategory } = require("../controllers/categoryController");

const router = express.Router();

router.route("/category").get(getCategory).post(addCategory).put(updateCategory)
router.route("/category/:id").delete(deleteCategory)




module.exports = router;