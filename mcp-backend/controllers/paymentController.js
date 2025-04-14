const razorpay = require("../utils/razorpay");

exports.createPaymentOrder = async (req, res) => {
  const { amount, currency = "INR" } = req.body;
  const options = {
    amount: amount * 100,
    currency,
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
