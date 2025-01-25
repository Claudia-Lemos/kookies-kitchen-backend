const mongoose = require('mongoose');
const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");

// Add item to cart
const addItemToCart = async (req, res) => {
  const { itemId, quantity } = req.body;
  const email = req.params.email;  // Get the email from the params

  console.log('Received itemId:', itemId);
  console.log('Received quantity:', quantity);
  console.log('User email:', email);

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).json({ message: 'Invalid Item ID' });
  }

  try {
    // Check if the item exists in the MenuItems collection
    console.log('MenuItem:', MenuItem);
    const menuItem = await MenuItem.findById(itemId);
    console.log('Found Menu Item:', menuItem);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Check if the cart exists for the user
    let cart = await Cart.findOne({ email });

    if (!cart) {
      cart = new Cart({
        email,
        items: [{ itemId, quantity }],
      });
    } else {
      const existingItemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);

      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity += quantity;  // Update quantity if item already in cart
      } else {
        cart.items.push({ itemId, quantity });  // Add new item to cart
      }
    }

    // Save the cart, skipping schema validation
    await cart.save({ validateBeforeSave: false });

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding item to cart:', error);  // Log the full error object
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
};

module.exports = { addItemToCart };
