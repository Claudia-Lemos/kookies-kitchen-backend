const cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'cancelled') {
      return res.status(400).json({ message: 'Order is already cancelled' });
    }

    order.status = 'cancelled';
    order.cancelled = true; 
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling order' });
  }
};

module.exports = { updateOrderStatus, cancelOrder }; 
