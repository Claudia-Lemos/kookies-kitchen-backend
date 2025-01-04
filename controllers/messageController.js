const Message = require('../models/Message');

const createMessage = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;

  try {
    const message = new Message({ userId, content });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('userId');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

module.exports = { createMessage, getMessages };
