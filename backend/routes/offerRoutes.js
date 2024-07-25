const express = require("express");
const { getOffer, addOffer, deleteOffer, updateOffer } = require("../controllers/offerController");

const router = express.Router();

router.route("/offer").get(getOffer).post(addOffer).put(updateOffer)
router.route("/offer/:id").delete(deleteOffer)

module.exports = router;