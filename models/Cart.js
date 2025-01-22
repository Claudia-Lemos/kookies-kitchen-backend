const mongoose = require('mongoose');

// Schema for a single cart item
const cartItemSchema = new mongoose.Schema({
  itemId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MenuItem', 
    required: true,
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  },
});

// Schema for the user's cart
const cartSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  items: [cartItemSchema], // Array of cart items
});

// Model for Cart
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
