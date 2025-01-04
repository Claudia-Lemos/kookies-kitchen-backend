const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ name: String, quantity: Number, price: Number }],
  total: Number,
  status: { type: String, enum: ['pending', 'accepted', 'rejected', 'cancelled'], default: 'pending' },
  cancelled: { type: Boolean, default: false } // New field to track cancellation
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
