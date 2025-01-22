const Order = require('../models/Order');

// Function to place an order
const placeOrder = async (req, res) => {
  const { items, totalAmount, userEmail } = req.body;

  try {
    const order = new Order({
      items,
      totalAmount,
      userEmail,
      status: 'pending', // Initial status
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder); // Return the created order as a response
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
};

module.exports = { placeOrder };
