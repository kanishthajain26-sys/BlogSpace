const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
console.log("Auth Routes:", typeof authRoutes);
console.log("Blog Routes:", typeof blogRoutes);

const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// Test API
app.get("/", (req, res) => {
  res.send("BlogSpace backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});