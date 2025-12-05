const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: String, required: true },
  endDate: { type: String, required: true },
  code: { type: String, required: true },
  bgColor: { type: String, required: true },
  textColor: { type: String, required: true },
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
