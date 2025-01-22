const express = require('express');
const mongoose = require('mongoose');  // Added mongoose import
const { protectUser } = require('../middlewares/authMiddleware');  // Import protectUser middleware
const Cart = require('../models/Cart');
const router = express.Router();

// GET cart for a specific user
router.get('/:email', protectUser, async (req, res) => {
  try {
    const email = req.params.email;
    const cart = await Cart.findOne({ email });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);  // Return the user's cart data
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
});

// POST to add an item to the cart
router.post('/:email', protectUser, async (req, res) => {
  const email = req.params.email;
  const { itemId, quantity } = req.body;

  console.log('Received request to add item:', { email, itemId, quantity });  // Log incoming data

  // Check if itemId and quantity are valid
  if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).json({ message: 'Invalid Item ID' });
  }

  if (quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be greater than 0' });
  }

  try {
    // Check if the item exists in MenuItems
    const menuItem = await MenuItem.findById(itemId);
    if (!menuItem) {
      console.log('MenuItem not found:', itemId);
      return res.status(404).json({ message: 'Menu item not found' });
    }

    let cart = await Cart.findOne({ email });

    if (!cart) {
      console.log('No existing cart found, creating a new one for', email);
      cart = new Cart({ email, items: [{ itemId, quantity }] });
    } else {
      console.log('Cart found, checking items');
      const existingItemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);

      if (existingItemIndex !== -1) {
        console.log('Item exists in cart, updating quantity');
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        console.log('Item not in cart, adding new item');
        cart.items.push({ itemId, quantity });
      }
    }

    await cart.save({ validateBeforeSave: false });
    console.log('Cart updated successfully:', cart);
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding item to cart:', error.message);
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
});

module.exports = router;
