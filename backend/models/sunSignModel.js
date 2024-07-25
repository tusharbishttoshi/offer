

const mongoose = require("mongoose");
const sunSignSchema = new mongoose.Schema(
  {
    sign: { type: String, trim: true, default: "" },
    startDate: { type: String, trim: true, default: "" },
    endDate: { type: String, trim: true, default: "" },
    polarity: { type: String, trim: true, default: "" },
    element: { type: String, trim: true, default: "" },
    modality: { type: String, trim: true, default: "" },
  }, { timestamps: true })

module.exports = mongoose.model("sun_sign", sunSignSchema);