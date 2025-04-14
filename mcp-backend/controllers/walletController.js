const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");

exports.getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    res.status(200).json(wallet);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving wallet", error: err });
  }
};

exports.addMoney = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    wallet.balance += amount;
    await wallet.save();

    // Log the transaction
    const transaction = new Transaction({
      userId,
      amount,
      type: "credit",
      description,
    });
    await transaction.save();

    res.status(200).json({ message: "Money added to wallet", wallet });
  } catch (err) {
    res.status(500).json({ message: "Error adding money", error: err });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving transactions", error: err });
  }
};
