const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  rating: {
    rate: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  discount: { type: Number, required: true },
  image: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
