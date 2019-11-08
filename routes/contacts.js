const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const Contact = require("../models/Contact");

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.query()
      .where({ user_id: req.user.id })
      .select("id", "name", "email", "phone", "type");
    res.json(contacts);
  } catch (err) {
    console.error(err.messege);
    res.status(500).send("Server Error");
  }
});

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;
    try {
      const contact = await Contact.query().insert({
        name,
        email,
        phone,
        type,
        user_id: req.user.id
      });
      res.status(200).json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500);
    }
  }
);

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedContact = await Contact.query().patchAndFetchById(id, {
      ...req.body
    });
    res.status(200).json(updatedContact);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    Contact.query()
      .deleteById(id)
      .then(() => Contact.query().then(data => res.status(200).json(data)));
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
});

module.exports = router;
