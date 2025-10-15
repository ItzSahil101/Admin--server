const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Feedback = require("../models/Feedback");
const UpdateMsg = require("../models/UpdateMsg");

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

// ✅ Delete feedback by ID
router.delete("/f/:id", async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Failed to delete feedback" });
  }
});

// ✅ GET ALL USERS
// ============================
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


// ============================
// ✅ DELETE USER BY ID
// ============================
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

// ✅ POST NEW UPDATE MESSAGE
// ============================
router.post("/update", async (req, res) => {
  try {
    const { msg } = req.body;

    if (!msg || msg.trim() === "") {
      return res.status(400).json({ message: "Message is required" });
    }

    const newUpdate = new UpdateMsg({ msg });
    await newUpdate.save();

    res.status(201).json({ message: "Update message added successfully", newUpdate });
  } catch (error) {
    console.error("Error adding update message:", error);
    res.status(500).json({ message: "Failed to add update message" });
  }
});

// ============================
// ✅ GET ALL UPDATE MESSAGES
// ============================
router.get("/update", async (req, res) => {
  try {
    const updates = await UpdateMsg.find().sort({ createdAt: -1 }); // latest first
    res.json(updates);
  } catch (error) {
    console.error("Error fetching update messages:", error);
    res.status(500).json({ message: "Failed to fetch update messages" });
  }
});

// ✅ DELETE UPDATE MESSAGE BY ID
router.delete("/update/:id", async (req, res) => {
  try {
    const deletedUpdate = await UpdateMsg.findByIdAndDelete(req.params.id);
    if (!deletedUpdate) {
      return res.status(404).json({ message: "Update message not found" });
    }
    res.json({ message: "Update message deleted successfully" });
  } catch (error) {
    console.error("Error deleting update message:", error);
    res.status(500).json({ message: "Failed to delete update message" });
  }
});


module.exports = router;
