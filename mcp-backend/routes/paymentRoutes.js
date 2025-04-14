const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createPaymentOrder } = require("../controllers/paymentController");

router.post("/create", auth, createPaymentOrder);

module.exports = router;
