const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize, Sequelize } = require('../models/index');
const { check, validationResult } = require('express-validator');
const UserModel = require('../models/user');
const User = UserModel(sequelize, Sequelize);
const router = express.Router();
const auth = require('../middleware/auth');
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post(
  '/',
  [
    check('email', 'Please  include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
      const isMatch = await bcrypt.compare(password, user.password);
      !isMatch ? res.status(400).json({ msg: 'Invalid credentials' }) : '';

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        'secret',
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.msg);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
