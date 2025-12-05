const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("./models/Category");

dotenv.config();

const categories = [
  {
    image: "/images/product 8.png",
    title: "Men's Collection",
    description: "Bold & masculine scents",
    alt: "Men's Collection",
  },
  {
    image: "/images/product 9.png",
    title: "Women's Collection",
    description: "Elegant & feminine fragrances",
    alt: "Women's Collection",
  },
  {
    image: "/images/product 10.png",
    title: "Unisex Collection",
    description: "Versatile scents for everyone",
    alt: "Unisex Collection",
  },
  {
    image: "/images/product 11.png",
    title: "Luxury Line",
    description: "Premium perfumes for special occasions",
    alt: "Luxury Line",
  },
  {
    image: "/images/product 12.png",
    title: "Fresh Picks",
    description: "Light and refreshing daily wear",
    alt: "Fresh Picks",
  },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Category.deleteMany();
    await Category.insertMany(categories);
    console.log("✅ Categories seeded successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  }
};

seedCategories();
