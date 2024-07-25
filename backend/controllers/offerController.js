const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Offer = require("../models/offerModel");

exports.addOffer = catchAsyncErrors(async (req, res) => {
    const offer = req.body
    const a = await Offer.create({
        ...offer
    })
    res.status(201).json({
        offer: a,
        success: true
    })
});

exports.getOffer = catchAsyncErrors(async (req, res) => {
    const offers = await Offer.find()
    res.status(201).json({
        offers,
        success: true,
        status: true
    })
});

exports.deleteOffer = catchAsyncErrors(async (req, res) => {
    const { id } = req.params
    await Offer.findByIdAndDelete(id)
    const categories = await Offer.find()
    res.status(201).json({
        categories,
        success: true
    })
});

exports.updateOffer = catchAsyncErrors(async (req, res) => {
    const { id, first_payment, second_payment, third_payment, fourth_payment } = req.body;
    await Offer.findByIdAndUpdate(id, {
        first_payment,
        second_payment,
        third_payment,
        fourth_payment
    })
    const offers = await Offer.find()
    res.status(201).json({
        offers,
        success: true
    })
});