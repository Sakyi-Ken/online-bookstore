const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, isAdmin } = req.body;
    // validation
    if (!first_name || !last_name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ success: false, message: "User already exist!"});
    }
    // password hashing
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      isAdmin
    })
    // save user to database
    const savedUser = await user.save();
    const userWithoutPassword = {
      first_name: savedUser.first_name,
      last_name: savedUser.last_name,
      email: savedUser.email,
      userId: savedUser._id,
      isAdmin: savedUser.isAdmin
    }
    // consnt userWithoutPassword = savedUser.toObject();
    // userWithoutPassword.password = undefined;
    // or delete userWithoutPassword.password;
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


exports.login = async (req, res) => {
  try{
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required"});
    }
    // check if user exists
    const existingUser = await User.findOne({ email });
    if(!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // password check 
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res.status(404).json({ success: false, message: "Invalid credentials" }); 
    }
    // token generation
    const accessToken = jwt.sign(
      { 
        userId: existingUser._id, 
        isAdmin: existingUser.isAdmin
      }, 
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );
    // remove password from user object
    const userWithoutPassword = {
      first_name: existingUser.first_name,
      last_name: existingUser.last_name,
      email: existingUser.email,
      userId: existingUser._id,
      isAdmin: existingUser.isAdmin
    }
    // or const { password: _, ...userWithoutPassword } = existingUser._doc;
    // const user = { ...userWithoutPassword };
     // login success

     // set session cookie
     res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      SameSite: 'None', 
      maxAge: 24 * 60 * 60 * 1000 // 1 day
     });

     return res.status(200).json({
      success: true, 
      message: "Login successful", 
      accessToken, 
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error"});
  }
}

exports.logout = async (req, res) => {
  try {
    // clear the session cookie
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None'
    });
    res.status(200).json({ success: true, message: 'User signed out successfully' });
  } catch (error) {
    console.log('Error signing out user:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}