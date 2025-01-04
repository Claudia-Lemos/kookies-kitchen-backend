// // // const express = require('express');
// // // const Message = require('../models/Message');
// // // const router = express.Router();

// // // router.post('/', async (req, res) => {
// // //   const { name, email, message } = req.body;
// // //   const newMessage = new Message({ name, email, message });
// // //   await newMessage.save();
// // //   res.status(201).json({ message: 'Message received' });
// // // });

// // // router.get('/', async (req, res) => {
// // //   const messages = await Message.find();
// // //   res.json(messages);
// // // });

// // // module.exports = router;

// // const express = require('express');
// // const { createMessage, getMessages } = require('../controllers/messageController');
// // const { protectUser, protectAdmin } = require('../middlewares/authMiddleware');
// // const router = express.Router();

// // router.post('/', protectUser, createMessage); // Route for users to send messages
// // router.get('/', protectAdmin, getMessages); // Route for admin to view messages

// // module.exports = router;

// // Contact Us Route (User sends message to Admin)
// router.post('/contact', protectUser, async (req, res) => {
//   const { message } = req.body;

//   try {
//     const user = await User.findById(req.user.id);
//     user.messages.push(message);
//     await user.save();

//     res.status(200).json({ message: 'Message sent to admin successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error sending message' });
//   }
// });

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You are not authorized to view this page');
          return;
        }

        // Fetch orders and messages
        const ordersResponse = await axios.get('http://localhost:5000/api/orders/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const messagesResponse = await axios.get('http://localhost:5000/api/orders/messages', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(ordersResponse.data);
        setMessages(messagesResponse.data);
      } catch (err) {
        setError('Failed to fetch orders or messages');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Admin Dashboard</h1>

      <div>
        <h2 className="text-xl font-semibold">Orders:</h2>
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="border-b py-2">
              <p>Order ID: {order._id}</p>
              <p>Status: {order.status}</p>
              <p>Total: ₹{(order.total / 100).toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="border-b py-2">
              <p>{msg}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

module.exports = router;
