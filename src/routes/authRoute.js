const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

// @route POST    /api/v1/auth/register
// @description  Register a new user
// @access      Public

router.post('/register', register);

module.exports = router;