const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Offer = require("./models/Offer");

dotenv.config();

const offers = [
  {
    id: 1,
    title: "Hot Summer Sale",
    description: "Up to 30% off on our summer perfume collection",
    discount: "30%",
    endDate: "2025-09-28",
    code: "SUMMER30",
    bgColor: "bg-amber-200",
    textColor: "text-amber-700",
  },
  {
    id: 2,
    title: "Free Perfume Offer",
    description: "Buy 2 perfumes and get 1 free",
    discount: "Gift",
    endDate: "2025-09-27",
    code: "FREEPERFUME",
    bgColor: "bg-purple-200",
    textColor: "text-purple-700",
  },
  {
    id: 3,
    title: "New Launch Discount",
    description: "Flat 10% off on our latest arrivals",
    discount: "10%",
    endDate: "2025-09-28",
    code: "NEW10",
    bgColor: "bg-pink-200",
    textColor: "text-pink-700",
  },
];

const seedOffers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Offer.deleteMany();
    await Offer.insertMany(offers);
    console.log("✅ Offers seeded successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  }
};

seedOffers();
