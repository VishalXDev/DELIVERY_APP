const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createOrder, getOrders, updateOrderStatus, assignOrder } = require("../controllers/orderController");

// Create a new order
router.post("/", auth, createOrder);

// Get all orders
router.get("/", auth, getOrders);

// Update order status
router.patch("/:id/status", auth, updateOrderStatus);

// Assign an order to a partner
router.patch("/:id/assign", auth, assignOrder);

module.exports = router;
