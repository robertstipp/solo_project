const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  displayName: String,
  spotifyId: String,
  accessToken: String,
  refreshToken: String,
  userAnalysis: {
    danceability: {type: Number, default: 0},
    tempo: {type: Number, default: 0},
    acousticness: {type: Number, default: 0},
    energy: {type: Number, default: 0},
    speechiness: {type: Number, default: 0},
    valence: {type: Number, default: 0},
    instrumentalness: {type: Number, default: 0},
    liveness: {type: Number, default: 0},
    mode: {type: Number, default: 0},
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User