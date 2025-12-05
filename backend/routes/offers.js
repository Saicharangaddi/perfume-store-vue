const express = require("express");
const router = express.Router();
const Offer = require("../models/Offer");

router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json([offers]); // Wrap in array to match your original structure
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch offers" });
  }
});

module.exports = router;
