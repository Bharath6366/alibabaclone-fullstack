const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== "admin@gmail.com" ||
      password !== "admin123"
    ) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        email,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Admin login successful",
      token,
      admin: {
        email,
        role: "admin",
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;