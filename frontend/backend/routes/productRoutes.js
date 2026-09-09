const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// =============================
// Public Routes
// =============================

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProduct);

// =============================
// Admin Only Routes
// =============================

// Add Product
router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  addProduct
);

// Update Product
router.put(
  "/:id",
  protect,
  admin,
  upload.single("image"),
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

module.exports = router;