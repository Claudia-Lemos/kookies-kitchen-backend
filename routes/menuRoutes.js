// menuRoutes.js
const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// Log request to make sure it's being reached
router.get('/', async (req, res) => {
  console.log("GET /api/menu route hit");
  try {
    const menuItems = await MenuItem.find({});
    if (menuItems.length === 0) {
      return res.status(404).json({ message: 'No Menu Items available' });
    }
    res.json(menuItems);  // Send the list of menu items to the client
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
});

module.exports = router;
