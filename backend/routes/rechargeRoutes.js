const express = require("express");
const {
    addRecharge, getRechargeHistory, getAllRechargeHistory, rechargeList
} = require("../controllers/rechargeController.js");

const router = express.Router();

router.route("/recharge").post(addRecharge)

router.route("/recharge/all").get(getAllRechargeHistory)
router.route("/recharge/list").post(rechargeList)

module.exports = router;