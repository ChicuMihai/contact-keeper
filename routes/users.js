const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const UserController = require("../controllers/userController");

router.get("/", UserController.getUser);

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Include valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  UserController.createUser
);

module.exports = router;
