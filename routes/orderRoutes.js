// orderRoutes.js
const express = require('express');
const Order = require('../models/Order');
const { protectUser, protectAdmin } = require('../middlewares/authMiddleware');
const User = require('../models/User');
const router = express.Router();

// Route to create an order (protected by user authentication)
router.post('/create', protectUser, async (req, res) => {
  const { items, total } = req.body;
  
  try {
    const order = new Order({
      userId: req.user.id,
      items,
      total,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Cancel an order (only by the user who created it)
router.patch('/cancel/:id', protectUser, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to cancel this order' });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error cancelling order' });
  }
});

// Route for admin to view messages (Contact Us)
router.get('/messages', protectAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    const messages = users.map(user => user.messages).flat();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

module.exports = router;
