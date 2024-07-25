const express = require("express");
const {
    addOfflineChat, userGetAllOffChat, userOffChat, astroGetAllOffChat, astroOffChat,
    finishChat
} = require("../controllers/offlineChatController.js");

const router = express.Router();


router.route("/offlineChat").post(addOfflineChat)
router.route("/userGetAllOffChat/:id").get(userGetAllOffChat)
router.route("/astroGetAllOffChat/:id").get(astroGetAllOffChat)
router.route("/userOffChat").post(userOffChat)
router.route("/astroOffChat").post(astroOffChat)
router.route("/finishChat").post(finishChat)

// router.route("/offlineChat/all").get(getAllOfflineChatHistory)
module.exports = router;