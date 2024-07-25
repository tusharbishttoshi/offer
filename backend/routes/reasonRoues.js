const express = require("express");
const {
    addReason,updateReason,reasonList,reason,ReasonDropDown,deleteReason
} = require("../controllers/reasonController.js");

const router = express.Router();

router.post("/create",addReason)
router.put("/update",updateReason)
router.post("/list",reasonList)
router.post("/dropdown",ReasonDropDown)
router.delete("/delete",deleteReason)

module.exports = router;