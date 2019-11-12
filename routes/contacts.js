const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const ContactController = require("../controllers/contactController");

router.get("/", auth, ContactController.getUserContact);

router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty(),
      check("email", "Insert a valid email").isEmail()
    ]
  ],
  ContactController.createContact
);

router.patch("/:id", auth, ContactController.updateContact);

router.delete("/:id", auth, ContactController.deleteContact);

module.exports = router;
