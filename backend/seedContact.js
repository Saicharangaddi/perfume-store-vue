const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Contact = require("./models/Contact");

dotenv.config();

const contactData = [
  {
    header: {
      title: "Contact Us",
      subtitle:
        "Have questions about our perfumes? Our fragrance experts are here to help you.",
    },
    contactInfo: {
      phone: {
        number: "+44 (234) 567-8900",
        hours: "Mon-Fri: 9am-6pm",
      },
      email: {
        primary: "contact@perfume.com",
        support: "support@perfume.com",
      },
      address: {
        line1: "123 perfume street",
        line2: "Paris, France 75001",
      },
    },
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
];

const seedContact = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Contact.deleteMany();
    await Contact.insertMany(contactData);
    console.log("✅ Contact data seeded successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  }
};

seedContact();
