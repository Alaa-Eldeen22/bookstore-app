const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],

  totalAmount: { type: Number, required: true },

  name: { type: String, required: true },
  fullAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  governorate: { type: String, required: true },

  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Cash On Delivery"],
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ["paid", "pending", "failed"],
    default: "pending",
  },

  orderStatus: {
    type: String,
    enum: ["pending", "shipped", "completed", "canceled"],
    default: "pending",
  },

  notes: {
    type: String,
    default: "",
  },
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
