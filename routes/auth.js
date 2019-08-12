const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../constant.js");

//Validation
const { registerValidation, loginValidation } = require("../validation.js");

//REGISTER USER
router.post("/register", async (req, res) => {
  //Validate DATA before submission
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //Check if user is already in DB
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).json({ message: "User Already Exist!" });
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create new User
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await newUser.save();
    res.send({ user: savedUser._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

//LOGIN USER
router.post("/login", async (req, res) => {
  //Validate DATA before submission
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  //Check if user is already in DB
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "User Is Not Registered!" });
  }
  //Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid Password" });
  }

  //Create and assign jwt token
  const token = jwt.sign({ _id: user._id }, tokenSecret);
  res.header("auth_token", token).send(token);
});

module.exports = router;
