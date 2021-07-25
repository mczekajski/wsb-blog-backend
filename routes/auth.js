const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { registerValidation, loginValidation } = require("../validation");

router.get("/register", async (req, res) => {
  res.send("user/register path is working");
});

router.post("/register", async (req, res) => {
  // Validate user data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user is already in the database
  const emailExists = await User.findOne({email: req.body.email});
  if (emailExists) return res.status(400).send('Email already exists');

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  res.status(200).send("LOGIN");
});

module.exports = router;
