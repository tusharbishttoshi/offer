const express = require("express");
const {
    sendMessage, fetchMessage
} = require("../controllers/messageController.js");

const router = express.Router();

router.route("/").get(fetchMessage);
router.route("/sendMessage").post(sendMessage);

module.exports = router;