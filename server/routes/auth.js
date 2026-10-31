const express = require("express");

const router = express.Router();

let users = [];

// Registration API
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const existingUser = users.find(
    (user) => user.email === email
  );

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password
  };

  users.push(newUser);

  res.status(201).json({
    message: "Registration successful!",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  });
});

// Login API
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check empty fields
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  // Find user
  const user = users.find(
    (user) => user.email === email
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  // Check password
  if (user.password !== password) {
    return res.status(401).json({
      message: "Invalid password"
    });
  }

  res.status(200).json({
    message: "Login successful!",
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});


module.exports = router;