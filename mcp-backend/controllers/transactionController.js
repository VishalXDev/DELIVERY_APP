const Transaction = require("../models/Transaction");
const User = require("../models/User");

exports.getTransactions = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { userId: req.user.id };
    const transactions = await Transaction.find(filter).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addFunds = async (req, res) => {
  const { userId, amount, purpose } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.wallet += amount;
    await user.save();

    const transaction = await Transaction.create({
      userId,
      type: "credit",
      amount,
      purpose: purpose || "Wallet top-up"
    });

    res.status(201).json({ message: "Funds added", transaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deductFunds = async (req, res) => {
  const { userId, amount, purpose } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user || user.wallet < amount) return res.status(400).json({ message: "Insufficient balance" });

    user.wallet -= amount;
    await user.save();

    const transaction = await Transaction.create({
      userId,
      type: "debit",
      amount,
      purpose: purpose || "Deduction"
    });

    res.status(201).json({ message: "Funds deducted", transaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
