const express = require("express");
const {
    createChat, fetchChat, sendMessage, allMessages, AdminFetchChat
} = require("../controllers/chatController.js");

const router = express.Router();

router.route("/chat").get(fetchChat).post(createChat)
router.route("/message/:chatId").post(allMessages)
router.route("/message").post(sendMessage)
router.route("/AdminFetchChat").post(AdminFetchChat)

module.exports = router;