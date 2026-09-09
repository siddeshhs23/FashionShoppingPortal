const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

// =====================================
// User Routes
// =====================================

// Place Order
router.post("/", protect, placeOrder);

// Logged-in User Orders
router.get("/", protect, getOrders);

// Get All Orders
router.get("/admin/all", protect, admin, getAllOrders);

// Single Order
router.get("/:id", protect, getOrderById);

// =====================================
// Admin Routes
// =====================================

// Update Order Status
router.put("/:id", protect, admin, updateOrderStatus);

// Delete Order
router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;