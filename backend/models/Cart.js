const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
