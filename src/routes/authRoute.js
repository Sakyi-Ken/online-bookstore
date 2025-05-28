const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');

// @route POST    /api/auth/register
// @description  Register a new user
// @access      Public

router.post('/auth/register', register);

// @route POST    /api/auth/login
// @description   Login a user
// @access        Public

router.post('/auth/login', login);

router.post('/auth/logout', logout);

module.exports = router;