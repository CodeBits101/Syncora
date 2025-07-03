const express = require('express');
const router = express.Router();
const Language = require('../schema/language');

// GET /api/languages
router.get('/', async (req, res) => {
  try {
    const languages = await Language.find({});
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;