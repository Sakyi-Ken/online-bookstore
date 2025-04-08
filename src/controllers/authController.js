const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    // validation
    if (!first_name || !last_name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ message: "User already exist!"});
    }
    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword
    })
    // save user to database
    const savedUser = await user.save();
    return res.status(201).json({
      message: "User registered successfully",
      savedUser
    })
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}