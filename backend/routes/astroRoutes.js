const express = require("express");
const { getAstro, addAstro, upload,BusyAstro, GetAstrologerLog, deleteAstro, updateAstroPass, updateAstro, GetAstrologer, Search, myAstro, Astro, getAstroRequest, TokenAstro, loginAstro, StartAstro, StopAstro, sendAstro, newGetAstrologerLog, findWorkID, updateReviews, otpSentAstro, verifyOtp, sunSign } = require("../controllers/astroController");
const { getSessionEarnAndInvoiceHistory, getSessionEarnAndInvoiceHistoryNew } = require("../controllers/sessionController");

const router = express.Router();

router.route("/astro").get(getAstro).post(sendAstro)
router.route("/astro/add").post(addAstro)
router.route("/astro/upload").post(upload)
router.route("/astro/update").post(updateAstro)
router.route("/astro/updatePass").post(updateAstroPass)
router.route("/astro/delete").post(deleteAstro)

router.route("/astro/request").get(getAstroRequest)
router.route("/astro/GetAstrologer/:id").get(GetAstrologer)
router.route("/astro/log/:id").get(GetAstrologerLog)
router.route("/astro/log").post(newGetAstrologerLog)
router.route("/astro/otp").post(otpSentAstro)
router.route("/astro/verify/otp").post(verifyOtp)





router.route("/astro/login").post(loginAstro)
router.route("/astro/:token").get(TokenAstro)

// router.route("/myAstro/:id").get(myAstro)
router.route("/astros/:id").get(Astro)
router.route("/astro/start/:id").get(StartAstro)
router.route("/astro/stop").post(StopAstro)
router.route("/astro/busy").post(BusyAstro)
router.route("/astro/search").post(Search)
router.route("/astro/workId").post(findWorkID)

router.route("/astro/transaction/:id").post(getSessionEarnAndInvoiceHistory)
router.route("/astro/transactions").post(getSessionEarnAndInvoiceHistoryNew)


module.exports = router;