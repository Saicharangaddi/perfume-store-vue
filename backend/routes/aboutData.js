const express = require("express");
const router = express.Router();
const About = require("../models/About");

router.get("/", async (req, res) => {
  try {
    const aboutItems = await About.find();
    res.json(aboutItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch about data" });
  }
});

module.exports = router;
