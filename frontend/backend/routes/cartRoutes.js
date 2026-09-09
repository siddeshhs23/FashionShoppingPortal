const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", protect, getCart);

router.post("/", protect, addToCart);

router.delete("/:id", protect, removeFromCart);

router.delete("/", protect, clearCart);

module.exports = router;