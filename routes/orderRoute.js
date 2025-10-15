const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const CustomOrder = require("../models/CustomOrder");
const User = require("../models/User");

// Utility: get user info map
async function getUserMap(userIds) {
  const users = await User.find({ _id: { $in: userIds } }).lean();
  const userMap = {};
  users.forEach((user) => {
    userMap[String(user._id)] = user;
  });
  return userMap;
}

// GET normal orders enriched with user info
router.get("/normal", async (req, res) => {
  try {
    const orders = await Order.find().lean();
    const userIds = [...new Set(orders.map((o) => String(o.userId)))];
    const userMap = await getUserMap(userIds);

    const enrichedOrders = orders.map((order) => ({
      ...order,
      userNumber: userMap[order.userId]?.number || "N/A",
      userLocation: userMap[order.userId]?.location || "N/A",
    }));

    res.json({ orders: enrichedOrders });
  } catch (err) {
    console.error("Error fetching normal orders:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST delete normal order
router.post("/normal/delete/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.json({ msg: "Normal order deleted successfully" });
  } catch (err) {
    console.error("Error deleting normal order:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// GET custom orders enriched with user info
router.get("/custom", async (req, res) => {
  try {
    const customOrders = await CustomOrder.find().lean();
    const userIds = [...new Set(customOrders.map((o) => String(o.userId)))];
    const userMap = await getUserMap(userIds);

    const enrichedCustomOrders = customOrders.map((order) => ({
      ...order,
      userNumber: userMap[order.userId]?.number || "N/A",
      userLocation: userMap[order.userId]?.location || "N/A",
    }));

    res.json({ customOrders: enrichedCustomOrders });
  } catch (err) {
    console.error("Error fetching custom orders:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT update status for normal orders
router.put("/normal/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order || !order.products || order.products.length === 0) {
      return res.status(400).json({ msg: "Invalid Order" });
    }
    order.products[0].status = status;
    await order.save();
    res.json({ msg: "Order status updated" });
  } catch (err) {
    console.error("Error updating normal order status:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT update status for custom orders
router.put("/custom/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const order = await CustomOrder.findById(req.params.id);
    if (!order) {
      return res.status(400).json({ msg: "Invalid Custom Order" });
    }
    order.status = status;
    await order.save();
    res.json({ msg: "Custom Order status updated" });
  } catch (err) {
    console.error("Error updating custom order status:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
