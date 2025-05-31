const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const bookSchema = new Schema({
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
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
    default: 1
  },
  reviews: [{
    userId: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    }
  }],
}, {timestamps: true});

module.exports = mongoose.model('Book', bookSchema);

