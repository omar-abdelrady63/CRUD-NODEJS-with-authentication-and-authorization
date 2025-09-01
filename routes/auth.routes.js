const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const {
  signupSchema,
  loginSchema,
} = require("../utilities/validation/auth.validation");
const { signup, login } = require("../controllers/auth.controller");

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

module.exports = router;
