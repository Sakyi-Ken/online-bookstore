const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const orderSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  bookId: {
    type: ObjectId,
    ref: 'Book',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  deliveryDate: {
    type: Date
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);