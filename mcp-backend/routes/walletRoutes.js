const express = require("express");
const router = express.Router();
const {
  getWallet,
  addMoney,
  getTransactions,
} = require("../controllers/walletController");

// Get wallet details by user ID
router.get("/:userId", getWallet);

// Add money to wallet (for admin)
router.post("/add", addMoney);

// Get transactions for a user
router.get("/transactions/:userId", getTransactions);

module.exports = router;
