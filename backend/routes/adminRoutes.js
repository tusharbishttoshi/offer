const express = require("express");
const {
    addUser,
    login,
    adminAccounts,
    updateAccounts,
    deleteAccount,
    viewRefundRequest,
    refundMoney,
    userList,
    astrologerList,
    dashBoardCount,
    dashBoardUserGraph,
    adminProfile,
    sessionList,
    chatList,
    addSubAdmin,
    updateSubAdmin,
    subAdminList,
    deleteSubAdmin,
    earningGraph,
    astroVerify,
    pushNotificationSend,
} = require("../controllers/adminController");
const { transactionList, transactionLists } = require("../controllers/bankController");
const router = express.Router();

router.route("/adminUser").get(adminAccounts).post(addUser)
router.route("/admin-profile").post(adminProfile)
router.route("/adminUser/update").post(updateAccounts)
router.route("/adminUser/:id").delete(deleteAccount)
router.route("/adminUser/login").post(login);
router.route("/viewRefundRequest").post(viewRefundRequest);
router.route("/refundMoney").post(refundMoney);//
router.route("/view/sessions").post(sessionList);//
router.route("/user/list").post(userList) //
router.route("/astrologer/list").post(astrologerList) //
router.route("/dashboard").post(dashBoardCount) //
router.route("/user/graph").post(earningGraph) //
router.route("/invoice/list").post(transactionList) //
router.route("/chat/list").post(chatList) //
router.route("/transactions/list").post(transactionLists) //

router.route("/add/sub-admin").post(addSubAdmin) //
router.route("/update/sub-admin").put(updateSubAdmin) //
router.route("/sub-admin/list").post(subAdminList) //
router.route("/delete/sub-admin").delete(deleteSubAdmin) //
router.route("/verify/astro").post(astroVerify) //

                                         ///pushNotification
router.route("/send/notification").post(pushNotificationSend) //















module.exports = router;
