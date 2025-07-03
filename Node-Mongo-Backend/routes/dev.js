const express  = require('express');
const router = express.Router();
const Dev  = require('../schema/dev');


router.get('/:lang', async (req, res) => {
  const {lang} = req.params || 'en'; // default to English

  try {
    const devs = await Dev.find();

    const translatedDevs = devs.map(dev => ({
      name: dev.name[lang] || dev.name.en,
      role: dev.role[lang] || dev.role.en,
      bio: dev.bio[lang] || dev.bio.en,
      skills: dev.skills,
      experience: dev.experience,
      github: dev.github,
      linkedin: dev.linkedin,
      instagaram: dev.instagaram,
      dob: dev.dob,
      profilePic: dev.profilePic
    }));

    res.status(200).json({
      status: true,
      data: translatedDevs
    });
  } catch (error) {
    console.error('❌ Error fetching developers:', error);
    res.status(500).json({
      status: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

module.exports=router ; 