const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product");

dotenv.config();

const products = [
  {
    id: 1,
    title: "Amber Bloom",
    price: 129.99,
    rating: { rate: 4.6, count: 210 },
    discount: 15,
    image: "/images/product 8.png",
  },
  {
    id: 2,
    title: "Citrus Whisper",
    price: 89.99,
    rating: { rate: 4.3, count: 180 },
    discount: 10,
    image: "/images/product 7.png",
  },
  {
    id: 3,
    title: "Midnight Oud",
    price: 149.99,
    rating: { rate: 4.8, count: 320 },
    discount: 20,
    image: "images/product 6.png",
  },
  {
    id: 4,
    title: "Floral Muse",
    price: 99.99,
    rating: { rate: 4.5, count: 250 },
    discount: 12,
    image: "images/product 5.png",
  },
  {
    id: 5,
    title: "Ocean Drift",
    price: 109.99,
    rating: { rate: 4.4, count: 190 },
    discount: 18,
    image: "images/product 4.png",
  },
  {
    id: 6,
    title: "Spice Trail",
    price: 119.99,
    rating: { rate: 4.7, count: 270 },
    discount: 25,
    image: "images/product 3.png",
  },
  {
    id: 7,
    title: "Vanilla Sky",
    price: 79.99,
    rating: { rate: 4.2, count: 160 },
    discount: 8,
    image: "images/product 2.png",
  },
  {
    id: 8,
    title: "Earth Essence",
    price: 139.99,
    rating: { rate: 4.6, count: 300 },
    discount: 20,
    image: "images/product 1.png",
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("✅ Products seeded successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  }
};

seedProducts();
