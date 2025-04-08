const express = require('express');
const router = express.Router();

// @route POST    /api/v1/auth/register
// @description  Register a new user
// @access      Public

router.post('/register', (req, res) => {
  res.send('Register endpoint hit');
})

module.exports = router;