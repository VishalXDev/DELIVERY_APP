const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createPaymentOrder } = require("../controllers/paymentController");

// Endpoint to create a payment order (authenticated users only)
router.post("/create", auth, createPaymentOrder);

module.exports = router;
