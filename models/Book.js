const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  author: { type: String },
  noOfPages: { type: Number },
  description: { type: String },
});
