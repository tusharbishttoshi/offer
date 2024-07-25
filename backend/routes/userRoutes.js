const express = require("express");
const {
  registerUser,
  tokenLogin,
  login,
  forgotPassword,
  resetPassword,
  Search,
  ApplyForAstro,
  AcceptAstroRequest,
  GetAstrologerRequest,
  RejectAstroRequest,
  GetAstrologers,
  GetAstrologer,
  Update,
  allUserGet,
  taro, verifyUser, weekly, monthly, yearly, refundRequest, viewRefundStatus, GetUserProfile,
  calculateSunSign,
  changePassword,
  sunSign,
  updateSunsign
} = require("../controllers/userController");
const { astroRating } = require("../controllers/sessionController");

const router = express.Router();

router.route("/register").post(registerUser);  // name , email , number , password
router.route("/login").post(login);
router.route("/GetProfile/:id").get(GetUserProfile)
router.route("/verify").post(verifyUser);
router.route("/week").post(weekly);
router.route("/month").post(monthly);
router.route("/year").post(yearly);

router.route("/ApplyForAstro").post(ApplyForAstro);
router.route("/tokenLogin").post(tokenLogin);
router.route("/taro").post(taro);


router.route("/forgotPassword").post(forgotPassword)
router.route("/resetPassword").post(resetPassword)
router.route("/changePassword").post(changePassword)


router.route("/AcceptAstroRequest").post(AcceptAstroRequest)
router.route("/RejectAstroRequest").post(RejectAstroRequest)
router.route("/GetAstrologerRequest").get(GetAstrologerRequest)
router.route("/GetAstrologers").get(GetAstrologers)
router.route("/GetAstrologer/:id").get(GetAstrologer)
router.route("/feedback").post(astroRating)


router.route("/Search").post(Search)
router.route("/update").post(Update)


// admin get all users
router.route("/allUserGet").get(allUserGet)

router.route("/refundRequest").post(refundRequest)
router.route("/viewRefundStatus").get(viewRefundStatus)

router.route("/calculateSunSign").post(calculateSunSign)

router.route("/sun-sign").post(sunSign)

router.route("/update/image").post(updateSunsign)



// router.route("/ApplyForWorker").post(ApplyForWorker);
// router.route("/GetVendors").post(GetVendors);
// router.route("/Approved").post(Approved); 1
// router.route("/search").post(search);



// router.route("/offerCancel").post(offerCancel);
// router.route("/offerSuccess").post(offerSuccess);


// curl --location 'localhost:8000/api/v1/sun-sign' \
// --header 'Content-Type: application/json' \
// --data '{
// "startDate":"2024-03-21",
// "endDate":"2024-04-15"
// }'


module.exports = router;
