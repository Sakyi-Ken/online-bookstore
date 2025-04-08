const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name : {
    type: String,
    required: true,
  },
  last_name : {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
// Compare this snippet from online-bookstore/src/models/userModel.js:
