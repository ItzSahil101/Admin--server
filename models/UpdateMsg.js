const mongoose = require("mongoose");

const customProductSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model("updatemsg", customProductSchema, "updatemsg");
