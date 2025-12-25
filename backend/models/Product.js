const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  modelUrl: String,
  posterUrl: String,
  description: String
});

module.exports = mongoose.model("Product", productSchema);
