const Contact = require("../models/Contact");
const validationResult = require("express-validator");

const getUserContact = async (req, res) => {
  try {
    const contacts = await Contact.query()
      .where({ user_id: req.user.id })
      .select("id", "name", "email", "phone", "type");
    res.json(contacts);
  } catch (err) {
    console.error(err.messege);
    res.status(500).send("Server Error");
  }
};

const createContact = async (req, res) => {
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
};

const updateContact = async (req, res) => {
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
};

const deleteContact = async (req, res) => {
  const id = req.params.id;
  try {
    Contact.query()
      .deleteById(id)
      .then(() => Contact.query().then(data => res.status(200).json(data)));
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

module.exports = {
  getUserContact,
  createContact,
  updateContact,
  deleteContact
};
