const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

//    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    const token = jwt.sign({ id: user.id, role: user.role }, "JWT_SECRET", {
      expiresIn: "1h",
    });

    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
