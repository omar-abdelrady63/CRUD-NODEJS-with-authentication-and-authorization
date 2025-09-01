require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = require("./app");
const User = require("./models/User");

const port = process.env.PORT || 8000;

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
    console.log("MongoDB connected");

    app.listen(port, () => {
      console.log(` Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
