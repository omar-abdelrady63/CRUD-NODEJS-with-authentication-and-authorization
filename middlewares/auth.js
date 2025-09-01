const jwt = require("jsonwebtoken");
const util = require("util");
const User = require("../models/User");
const AppError = require("../utilities/AppError");

const jwtVerify = util.promisify(jwt.verify);

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new AppError("no token provided", 401);
  }
  const jwtSecret = process.env.JWT_SECRET;

  const payload = await jwtVerify(token, jwtSecret);

  const user = await User.findById(payload.sub);
  if (!user) {
    throw new AppError("user not found or has been deleted", 401);
  }
  req.user = user;
  next();
};

module.exports = auth;
