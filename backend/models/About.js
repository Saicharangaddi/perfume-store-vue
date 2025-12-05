const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  hero: {
    year: { type: String, required: true },
    tagline: { type: String, required: true },
  },
  content: {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  stats: [
    {
      value: { type: String, required: true },
      label: { type: String, required: true },
    },
  ],
});

const About = mongoose.model("About", aboutSchema);

module.exports = About;
