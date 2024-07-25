const express = require("express");
const {
  getSession, addSession, userSession, Session, getaSessionWithPagination, userSessions
} = require("../controllers/sessionController");

const router = express.Router();


router.route("/session/list").post(getaSessionWithPagination)
router.route("/session").get(getSession).post(addSession)

router.route("/session/user").post(userSession)

router.route("/sessions/user").post(userSessions)

router.route("/session/all").get(Session)

module.exports = router;
