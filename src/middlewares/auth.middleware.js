const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.VerifyToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken
    if (!accessToken) {
      return res.status(401).json({ success: false, message: 'Access denied. Please log in' });
    }
    // verify token
    jwt.verify(accessToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: 'Access denied. Please log in again.' });
      }
      req.user = decoded;

      next();
    });
  } catch (error) {
    console.error('Invalid or expired token:', error);
    res.status(500).json({ success: true, message: 'Internal Server Error' });
  }
}

exports.verifyAdmin = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized. Please log in'})
    }
    if (!isAdmin) {
      return res.status(403).json({ success: false, message: 'Forbidden: Access denied!' });
    }
    next();
  } catch (error) {
    console.error('Error verifying admin:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}