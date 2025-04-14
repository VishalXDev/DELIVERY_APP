const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const filter = req.user.role === "partner" 
      ? { assignedTo: req.user.id } 
      : {};
    const orders = await Order.find(filter).populate("assignedTo", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.assignOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { partnerId } = req.body;
    const order = await Order.findByIdAndUpdate(id, { assignedTo: partnerId, status: "assigned" }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// In controllers/orderController.js (after updating status)
req.app.get("io").emit("orderStatusChanged", {
    orderId: order._id,
    newStatus: order.status,
  });
  exports.updateOrderStatusController = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const order = await Order.findById(id);
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      order.status = status;
      await order.save();
  
      res.status(200).json({ message: "Status updated", order });
    } catch (err) {
      res.status(500).json({ error: "Failed to update status" });
    }
  };
  