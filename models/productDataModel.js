const mongoose = require("mongoose");

// Empty schema with strict: false to accept all fields
const productSchema = new mongoose.Schema({}, { strict: false });

// Use the exact collection name you have in DB - note typo? "productDaata" or "productData"?
module.exports = mongoose.model("Product", productSchema, "productDaata");
