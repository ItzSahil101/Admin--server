const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Feedback = require("../models/Feedback");
    
// ✅ Get all feedback from database
router.get("/f", async (req, res) => {
  try {
    const allFeedbacks = await Feedback.find().sort({ createdAt: -1 }); // latest first
    res.json(allFeedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Failed to fetch feedback" });
  }
});

module.exports = router;
