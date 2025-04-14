const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createOrder, getOrders, updateOrderStatus, assignOrder } = require("../controllers/orderController");
router.patch("/status/:id", updateOrderStatusController);

router.post("/", auth, createOrder);
router.get("/", auth, getOrders);
router.patch("/:id/status", auth, updateOrderStatus);
router.patch("/:id/assign", auth, assignOrder);

module.exports = router;
