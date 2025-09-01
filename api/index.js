const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = require("../app");
const User = require("../models/User");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    const user = await User.findOne({ email: process.env.FIRST_ADMIN_EMAIL });
    if (!user) {
      const hashedPassword = await bcrypt.hash(process.env.FIRST_ADMIN_PASSWORD, 10);
      await User.create({
        name: process.env.FIRST_ADMIN_NAME,
        email: process.env.FIRST_ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
      });
    }
    console.log("MongoDB connected (Vercel)");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = app;
