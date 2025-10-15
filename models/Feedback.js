const mongoose = require("mongoose");

// Empty schema with strict: false so it accepts any fields from DB
const feedbackSchema = new mongoose.Schema({}, { strict: false });

// ⚠️ Third parameter must be the exact collection name in MongoDB
module.exports = mongoose.model("Feedback", feedbackSchema, "feedbacks");
