const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

const productsRoute = require("./routes/products");
const aboutRoute = require("./routes/aboutData");
const contactRoute = require("./routes/contactData");
const offersRoute = require("./routes/offers");
const categoriesRoute = require("./routes/categories");
const authRoute = require("./routes/auth");
const cartRoute = require("./routes/cart");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", productsRoute);
app.use("/aboutData", aboutRoute);
app.use("/contactData", contactRoute);
app.use("/offers", offersRoute);
app.use("/categories", categoriesRoute);
app.use("/auth", authRoute);
app.use("/cart", cartRoute);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
