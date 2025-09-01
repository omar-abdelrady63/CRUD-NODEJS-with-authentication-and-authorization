require('dotenv').config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const limiter = require("./utilities/rate-limit.js");
const AppError = require("./utilities/AppError");
const errorHandler = require("./middlewares/errorHandler");

const userRoutes = require("./routes/user.routes");
const postRouter = require("./routes/posts.routes.js");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(limiter);

app.use("/users", userRoutes);
app.use("/posts", postRouter);
app.use("/auth", authRoutes);

app.use("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

module.exports = app;
