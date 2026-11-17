
const dns = require("dns");

// Use router DNS
dns.setServers(["192.168.0.1"]);

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.log("MongoDB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
