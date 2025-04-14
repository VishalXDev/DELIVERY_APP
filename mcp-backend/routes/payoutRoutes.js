const express = require("express");
const router = express.Router();
const { requestPayout, getPayouts, approvePayout, rejectPayout } = require("../controllers/payoutController");

router.post("/request", requestPayout);
router.get("/:partnerId", getPayouts);
router.patch("/approve/:requestId", approvePayout);
router.patch("/reject/:requestId", rejectPayout);

module.exports = router;
