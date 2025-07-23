const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,      // title is mandatory
    trim: true
  },
  description: {
    type: String,
    required: true,      // description is mandatory
    trim: true
  }
}, {
  timestamps: true       // adds createdAt and updatedAt fields
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
