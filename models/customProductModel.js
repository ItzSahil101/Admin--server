const mongoose = require("mongoose");

const customProductSchema = new mongoose.Schema({
  id: Number,
  name: String,
  desc: String,
  price: Number,
  category: String,
  stock: Number,
  discount: String,
  url: String,
});

// Use the exact collection name from your DB (case-sensitive)
module.exports = mongoose.model("CustomProduct", customProductSchema, "customProduct");
