const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  header: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
  },
  contactInfo: {
    phone: {
      number: { type: String, required: true },
      hours: { type: String, required: true },
    },
    email: {
      primary: { type: String, required: true },
      support: { type: String, required: true },
    },
    address: {
      line1: { type: String, required: true },
      line2: { type: String, required: true },
    },
  },
  social: {
    instagram: { type: String, required: true },
    facebook: { type: String, required: true },
    twitter: { type: String, required: true },
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
