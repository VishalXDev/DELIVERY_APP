const PayoutRequest = require("../models/PayoutRequest");
const Wallet = require("../models/Wallet");

exports.requestPayout = async (req, res) => {
  try {
    const { partnerId, amount } = req.body;

    // Check if partner has sufficient balance
    const wallet = await Wallet.findOne({ userId: partnerId });
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Create a payout request
    const payoutRequest = new PayoutRequest({ partnerId, amount });
    await payoutRequest.save();

    res.status(201).json({ message: "Payout requested", payoutRequest });
  } catch (err) {
    res.status(500).json({ message: "Error processing payout request", error: err });
  }
};

exports.getPayouts = async (req, res) => {
  try {
    const payouts = await PayoutRequest.find({ partnerId: req.params.partnerId });
    res.status(200).json(payouts);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving payout requests", error: err });
  }
};

exports.approvePayout = async (req, res) => {
  try {
    const payoutRequest = await PayoutRequest.findById(req.params.requestId);
    if (!payoutRequest) return res.status(404).json({ message: "Payout request not found" });

    payoutRequest.status = "approved";
    await payoutRequest.save();

    // Deduct amount from partner's wallet balance
    const wallet = await Wallet.findOne({ userId: payoutRequest.partnerId });
    if (wallet.balance < payoutRequest.amount) return res.status(400).json({ message: "Insufficient balance" });

    wallet.balance -= payoutRequest.amount;
    await wallet.save();

    res.status(200).json({ message: "Payout approved", payoutRequest });
  } catch (err) {
    res.status(500).json({ message: "Error approving payout", error: err });
  }
};

exports.rejectPayout = async (req, res) => {
  try {
    const payoutRequest = await PayoutRequest.findById(req.params.requestId);
    if (!payoutRequest) return res.status(404).json({ message: "Payout request not found" });

    payoutRequest.status = "rejected";
    await payoutRequest.save();

    res.status(200).json({ message: "Payout rejected", payoutRequest });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting payout", error: err });
  }
};
