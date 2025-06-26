const mongoose  = require('mongoose');


const aboutDevSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  skills: [{ type: String }],
  experience: { type: Number, default: 0 },
  bio: { type: String },
  github: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  instagaram: { type: String },
  profilePic: { type: String, default: 'https://res.cloudinary.com/dybxdtcnq/image/upload/v1750940392/Syncora_tvbbkx.png' },
  dob : { type: Date },

  createdAt: { type: Date, default: Date.now }
}, {
  collection: 'about-dev'
});


module.exports = mongoose.model('AboutDev', aboutDevSchema);