const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "partner"], default: "partner" },
  wallet: { type: Number, default: 0 },
  commission: { type: Number, default: 0 }, // For partners
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
