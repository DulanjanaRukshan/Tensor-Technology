const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
    enum: ['smartphones', 'audio', 'wearables', 'tablets', 'accessories'],
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specs: {
    storage: String,
    ram: String,
    camera: String,
    battery: String,
  },
  badges: [{
    type: String,
  }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
