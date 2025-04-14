const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getTransactions,
  addFunds,
  deductFunds,
} = require("../controllers/transactionController");

// Get all transactions for the current user (admin sees all)
router.get("/", auth, getTransactions);

// Admin: Add funds to a user's wallet
router.post("/add", auth, addFunds);

// Admin: Deduct funds from a user's wallet
router.post("/deduct", auth, deductFunds);

module.exports = router;
