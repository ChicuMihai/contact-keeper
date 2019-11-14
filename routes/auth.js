const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const AuthController = require("../controllers/authController");

router.get("/", auth, AuthController.getAuthUser);

router.post(
  "/",
  [
    check("email", "Please  include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  AuthController.authUser
);

module.exports = router;
