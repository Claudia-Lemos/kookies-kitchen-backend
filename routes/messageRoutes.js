const express = require('express');
const router = express.Router();
const { submitMessage, getMessages } = require('../controllers/messageController'); // Import both functions

// POST route for submitting a message (user submits the contact form)
router.post('/', (req, res) => {
  console.log('Request received:', req.body);  // Log the request body here
  submitMessage(req, res);  // Call the controller to handle the message submission
});

// GET route to fetch all messages for the admin
router.get('/admin/messages', getMessages);  // Admin endpoint to fetch messages

module.exports = router;
