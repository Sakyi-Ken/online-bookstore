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
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
      /*
      Example of a more robust regex (RFC 5322 Official Standard)
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
      */
    }
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
  }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
// Compare this snippet from online-bookstore/src/models/userModel.js:
