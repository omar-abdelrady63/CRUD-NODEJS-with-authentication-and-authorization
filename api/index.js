const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");
const bcrypt = require("bcrypt");

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

dbConnect().then(async () => {
  console.log("MongoDB connected (Vercel)");

  const user = await User.findOne({ email: process.env.FIRST_ADMIN_EMAIL });
  if (!user) {
    const hashedPassword = await bcrypt.hash(process.env.FIRST_ADMIN_PASSWORD, 10);
    await User.create({
      name: process.env.FIRST_ADMIN_NAME,
      email: process.env.FIRST_ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });
    console.log("Admin user created");
  }
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

module.exports = app;
