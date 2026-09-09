const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =====================================
// Protect Routes
// =====================================
const protect = async (req, res, next) => {
  try {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User Not Found",
        });
      }

      next();

    } else {

      return res.status(401).json({
        success: false,
        message: "Not Authorized, Token Missing",
      });

    }

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  }
};

// =====================================
// Admin Only
// =====================================
const admin = (req, res, next) => {

  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Admin Access Only",
    });
  }

};

module.exports = {
  protect,
  admin,
};