// messagesController.js (or relevant file)

const express = require('express');
const { protectAdmin } = require('../middleware/authMiddleware');
const Message = require('../models/Message'); // Assuming you have a Message model
const router = express.Router();

// Admin route to fetch all messages
router.get('/admin/messages', protectAdmin, async (req, res) => {
  try {
    // Only an authenticated admin can access this route
    const messages = await Message.find(); // Fetch all messages
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
});

module.exports = router;
