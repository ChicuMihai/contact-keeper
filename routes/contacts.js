const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');

router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.query().find({ user_id: res.user.id });
    res.json(contacts);
  } catch (err) {
    console.error(err.messege);
    res.status(500).send('Server Error');
    ``;
  }
});

router.post('/', (req, res) => {
  res.send('Add contact');
});

router.put('/:id', (req, res) => {
  res.send('Update contact');
});

router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
