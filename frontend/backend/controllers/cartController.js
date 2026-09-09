const Cart = require("../models/Cart");

// ===============================
// Get Cart Items
// ===============================
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Add To Cart
// ===============================
const addToCart = async (req, res) => {
  try {
    const { product, title, price, quantity = 1, image = "" } = req.body;
    const cartItem = await Cart.findOneAndUpdate(
      { user: req.user._id, product },
      {
        $set: { title, price, image },
        $inc: { quantity },
        $setOnInsert: { user: req.user._id },
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json({
      success: true,
      message: "Product Added To Cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Remove Cart Item
// ===============================
const removeFromCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: "Item Removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Clear Cart
// ===============================
const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: "Cart Cleared",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};