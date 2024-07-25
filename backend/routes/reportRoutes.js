const express = require("express");
const {
   reportUser, getReport, ban
} = require("../controllers/reportController");

const router = express.Router();

router.route("/reportUser").post(reportUser);
router.route("/getReport").get(getReport);
router.route("/ban").post(ban);

module.exports = router;