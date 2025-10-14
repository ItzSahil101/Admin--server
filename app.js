const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cors( { origin: "https://admin-client-sand.vercel.app", credentials: true } ));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Your existing routes
app.use("/api/orders", require("./routes/orderRoute"));

// <== ADD this line to fix product routes:
app.use("/api/products", require("./routes/productRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`DB connected and server running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
