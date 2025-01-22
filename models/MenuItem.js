const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },  // Use ObjectId
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: String, required: false }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
