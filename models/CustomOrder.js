const mongoose = require("mongoose");
const customOrderSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model("CustomOrder", customOrderSchema, "customorders");
