const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// @route POST    /api/auth/register
// @description  Register a new user
// @access      Public

router.post('/register', register);

// @route POST    /api/auth/login
// @description   Login a user
// @access        Public

router.post('/login', login);

module.exports = router;