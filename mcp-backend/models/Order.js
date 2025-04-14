const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  pickupAddress: String,
  dropAddress: String,
  status: { 
    type: String, 
    enum: ["pending", "assigned", "picked", "delivered", "cancelled"], 
    default: "pending" 
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  amount: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
