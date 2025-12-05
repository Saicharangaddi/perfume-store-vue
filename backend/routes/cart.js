const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");

// GET /cart → fetch user's cart
router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    res.json(cart || { items: [] });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

// POST /cart → save/update user's cart
router.post("/", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const { items } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      cart.items = items;
    } else {
      cart = new Cart({ user: userId, items });
    }

    await cart.save();
    res.json({ message: "Cart saved successfully" });
  } catch (error) {
    console.error("Error saving cart:", error);
    res.status(500).json({ message: "Failed to save cart" });
  }
});

module.exports = router;
