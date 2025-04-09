const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
  },
  image: {
    type: String
  },
  category: {
    type: String
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {timestamps: true});

module.exports = mongoose.model('Book', bookSchema);

