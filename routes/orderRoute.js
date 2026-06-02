const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/Order");
const CustomOrder = require("../models/CustomOrder");
const User = require("../models/User");

async function getUserMap(userIds) {
  try {
    const validIds = userIds
      .filter((id) => mongoose.Types.ObjectId.isValid(id))
      .map((id) => new mongoose.Types.ObjectId(id));

    const users = await User.find({
      _id: { $in: validIds },
    }).lean();

    const userMap = {};

    users.forEach((user) => {
      userMap[user._id.toString()] = user;
    });

    return userMap;
  } catch (err) {
    console.error("getUserMap error:", err);
    return {};
  }
}

router.get("/normal", async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    console.log("Orders Found:", orders.length);

    const userIds = [
      ...new Set(
        orders
          .filter((o) => o.userId)
          .map((o) => o.userId.toString())
      ),
    ];

    const userMap = await getUserMap(userIds);

    const enrichedOrders = orders.map((order) => {
      const user = userMap[order.userId?.toString()] || {};

      return {
        ...order,
        userNumber: user.number || "N/A",
        userLocation: user.location || order.location || "N/A",
        userName: user.name || "N/A",
      };
    });

    res.status(200).json({
      success: true,
      count: enrichedOrders.length,
      orders: enrichedOrders,
    });
  } catch (err) {
    console.error("Error fetching normal orders:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;