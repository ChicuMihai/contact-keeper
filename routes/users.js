const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize, Sequelize } = require('../models/index');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const UserModel = require('../models/user');
const User = UserModel(sequelize, Sequelize);

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Include valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ where: { name } });
      if (user) {
        res.status(400).json({ msg: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);

      user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, salt)
      });
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
      console.error(err.message);
      res.status(500);
    }
  }
);

module.exports = router;
