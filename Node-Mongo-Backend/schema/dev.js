const mongoose  = require('mongoose');

const devSchema = new mongoose.Schema({
  name: {
    en: String,
    hi: String,
    de: String,
    fr: String,
    mr: String,
  },
  role: {
    en: String,
    hi: String,
    de: String,
    fr: String,
    mr: String,
  },
  bio: {
    en: String,
    hi: String,
    de: String,
    fr: String,
    mr: String,
  },
  skills: [String],
  experience: Number,
  github: String,
  linkedin: String,
  instagaram: String,
  dob: String,
  profilePic: String,
});

module.exports = mongoose.model('Dev', devSchema);