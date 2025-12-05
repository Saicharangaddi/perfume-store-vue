const mongoose = require("mongoose");
const dotenv = require("dotenv");
const About = require("./models/About");

dotenv.config();

const aboutData = [
  {
    hero: {
      year: "Since 2021",
      tagline: "Creating perfumes with passion",
    },
    content: {
      title: "About Us",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore reiciendis, repudiandae nihil fugiat facilis iusto? Provident inventore voluptatem nostrum natus quisquam quia eveniet obcaecati delectus?",
    },
    stats: [
      { value: "500+", label: "Unique fragrances" },
      { value: "50+", label: "Countries worldwide" },
      { value: "100+", label: "Customer satisfaction" },
      { value: "24/7", label: "Customer support" },
    ],
  },
];

const seedAbout = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await About.deleteMany();
    await About.insertMany(aboutData);

    console.log("✅ About data seeded successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  }
};

seedAbout();
