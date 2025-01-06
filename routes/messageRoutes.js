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
