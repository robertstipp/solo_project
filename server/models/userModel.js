const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  displayName: String,
  spotifyId: String,
  accessToken: String,
  refreshToken: String,
  // Add other fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User