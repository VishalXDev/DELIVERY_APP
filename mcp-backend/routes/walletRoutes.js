const express = require("express");
const router = express.Router();
const { getWallet, addMoney, getTransactions } = require("../controllers/walletController");

router.get("/:userId", getWallet);
router.post("/add", addMoney);
router.get("/transactions/:userId", getTransactions);

module.exports = router;
