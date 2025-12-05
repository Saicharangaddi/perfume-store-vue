const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.get("/", async (req, res) => {
  try {
    const contact = await Contact.find();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contact data" });
  }
});

module.exports = router;
