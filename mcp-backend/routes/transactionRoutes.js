const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getTransactions, addFunds, deductFunds } = require("../controllers/transactionController");

// Get all transactions for user (admin sees all)
router.get("/", auth, getTransactions);

// Admin-only routes to manage wallet balances
router.post("/add", auth, addFunds);     // Add funds to any user
router.post("/deduct", auth, deductFunds); // Deduct funds from any user

module.exports = router;
