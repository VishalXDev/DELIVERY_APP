const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

// Make io available in controllers (optional, depending on usage)
app.set("io", io);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const locationRoutes = require("./routes/locationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/location", locationRoutes);

// WebSocket Events (Single io connection handler)
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  // Handle location update from partners
  socket.on("locationUpdate", ({ partnerId, lat, lng }) => {
    console.log("Location update from:", partnerId, lat, lng);

    // Broadcast the location to all MCP admins or a specific room
    io.emit("partnerLocation", { partnerId, lat, lng });
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// MongoDB + Start Server (without deprecated options)
mongoose
  .connect(process.env.MONGO_URI)  // Removed the deprecated options
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
