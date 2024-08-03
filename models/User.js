const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  password: { type: String },
  mail: { type: String, unique: true },
});

module.exports = mongoose.model("User", userSchema);
