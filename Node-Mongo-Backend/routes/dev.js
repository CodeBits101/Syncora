const express  = require('express');
const router = express.Router();
const AboutDev  = require('../schema/dev');


router.get('/', async (req, res) => {
  try {
    const devs = await AboutDev.find();
    if(devs.length === 0) 
      return res.status(204).json({message: "No developers found"})
    res.status(200).json({data : devs});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports=router ; 