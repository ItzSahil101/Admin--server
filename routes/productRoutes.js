const express = require("express");
const router = express.Router();

const CustomProduct = require("../models/customProductModel");
const Product = require("../models/productDataModel");
const mongoose = require("mongoose");
const userModel = require("../models/User.js");

// ===== CUSTOM PRODUCTS ROUTES =====

// CREATE custom product
router.post("/custom", async (req, res) => {
  try {
    const product = new CustomProduct(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all custom products (use model, NOT raw collection)
router.get("/custom", async (req, res) => {
  try {
    const customProducts = await CustomProduct.find();
    res.json(customProducts);
  } catch (error) {
    console.error("Error fetching custom products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE custom product by ID
router.put("/custom/:id", async (req, res) => {
  try {
    const updated = await CustomProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Custom product not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE custom product by ID
router.delete("/custom/:id", async (req, res) => {
  try {
    const deleted = await CustomProduct.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Custom product not found" });
    }
    res.json({ message: "Custom product deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ===== PRODUCT DATA ROUTES =====

// GET all product data
router.get("/data", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//Get One Product Data by id
router.get("/data/:id", async (req, res) => {
  try {
    // console.log("Fetching product with ID:", req.params.id);
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product data not found" });
    }
    // console.log(product);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//Get user by User Id
router.get("/data/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // const user = await userModel.findById(userId);
    const user = "abc";
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // console.log("Fetched user:", user);
    return res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// UPDATE product data by ID
router.put("/data/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Product data not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE product data by ID
router.delete("/data/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Product data not found" });
    }
    res.json({ message: "Product data deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST route for normal products
router.post("/data", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
