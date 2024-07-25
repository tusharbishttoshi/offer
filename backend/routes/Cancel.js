const express = require("express");
const { getCancle, addCancle, astro, cancelReqeust, cancelReqeustList } = require("../controllers/cancleController.js");

const router = express.Router();

router.route("/cancel").get(getCancle).post(cancelReqeust)
router.route("/cancel/:id").get(astro)
router.route("/cancel/request").post(cancelReqeustList)





module.exports = router;