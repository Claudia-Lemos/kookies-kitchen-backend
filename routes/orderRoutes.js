const express = require('express');
const { protectUser } = require('../middlewares/authMiddleware');  // Correct import path
const Order = require('../models/Order');  // Ensure Order model path is correct
const router = express.Router();

// Route to create a new order
router.post('/', protectUser, async (req, res) => {
  console.log('User from token:', req.user); // Debug log for user info (remove in production)

  const { items, totalPrice } = req.body;
  
  // Validate incoming request body
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No items in the order' });
  }

  try {
    // Create a new order object
    const order = new Order({
      userId: req.user._id, // Store the user ID from JWT
      items,  // Order items
      total: totalPrice, // Order total price
    });

    // Save the order to the database
    await order.save();
    
    // Respond with the created order
    res.status(201).json(order);
  } catch (error) {
    console.error('Error placing order:', error);
    // Provide error message with the error details
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
});

module.exports = router;
