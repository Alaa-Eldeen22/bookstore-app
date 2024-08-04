const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  author: { type: String },
  numberOfPages: { type: Number },
  description: { type: String },
});
