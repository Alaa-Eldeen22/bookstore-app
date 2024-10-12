const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  authors: { type: String },
  numberOfPages: { type: Number },
  description: { type: String },
  price: { type: Number },
  quantity: {type: Number},
  image: {
    type: String,
    default:
      "https://dpi.wi.gov/sites/default/files/imce/acp/images/2020_04_07_acp_academic-icon.png",
  },
});

module.exports = mongoose.model("Book", bookSchema);
