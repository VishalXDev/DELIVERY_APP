const express = require("express");
const router = express.Router();
const {
  requestPayout,
  getPayouts,
  approvePayout,
  rejectPayout,
} = require("../controllers/payoutController");

// Request a payout
router.post("/request", requestPayout);

// Get payouts for a specific partner
router.get("/:partnerId", getPayouts);

// Approve a payout request (admin only)
router.patch("/approve/:requestId", approvePayout);

// Reject a payout request (admin only)
router.patch("/reject/:requestId", rejectPayout);

module.exports = router;
