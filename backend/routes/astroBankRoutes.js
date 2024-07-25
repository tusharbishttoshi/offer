const express = require("express");
const {
    addBank,
    bankAccount,
    
} = require("../controllers/bankController.js");
const router = express.Router();

router.route("/invoice").get(bankAccount).post(addBank)

module.exports = router;
