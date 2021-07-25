const express = require("express");
const router = express.Router();
const User = require("../models/user");

// VALIDATION
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

router.get("/register", async (req, res) => {
    res.send('user/register path is working')
})

router.post("/register", async (req, res) => {
  //LET'S VALIDATE DATA BEFORE WE REGISTER A USER
  const validation = schema.validate(req.body);
  console.log(validation)

  //   const user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password,
  //   });
  //   try {
  //     const savedUser = await user.save();
  //     res.send(savedUser);
  //   } catch (err) {
  //     res.status(400).send(err);
  //   }
});

router.post("/login", async (req, res) => {
  res.status(200).send("LOGIN");
});

module.exports = router;
