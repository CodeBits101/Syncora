const express = require('express');
const router = express.Router();
const Item = require('../schema/about'); // Adjust the path as necessary



// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().select('-_id');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;