const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validationResult = require("express-validator");

const getUser = async (req, res) => {
  let users = await User.query()
    .eager("contacts")
    .select("id", "name", "email");
  res.json(users);
};

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;

  try {
    let user = await User.query().findOne({ name });
    if (user) {
      res.status(400).json({ msg: "User already exists" });
    }

    user = await User.query().insert({
      name,
      email,
      password
    });

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      "secret",
      {
        expiresIn: 62000
      },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

module.exports = { getUser, createUser };
