const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json([categories]); // Wrap in array to match your original structure
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

module.exports = router;
