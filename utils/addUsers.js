require('dotenv').config()
const mongoose = require('mongoose')

const User = require('../server/models/userModel')


const URI = 'mongodb+srv://just-bobby:Domino17!@cluster0.tkib1.mongodb.net/sonar?'
mongoose.connect(URI)
  .then(() => console.log('DB CONNECT 🌴 '))
  .catch(err => console.log(err));


const createUser =  async (numUsers) => {
  for (let i = 0; i < numUsers; i++) {
    const userAnalysis = {
      danceability : Math.random(),
      tempo : Math.random() * 100 + 100,
      acousticness : Math.random(),
      energy: Math.random(),
      speechiness : Math.random(),
      valence: Math.random(), 
      instrumentalness : Math.random(),
      liveness : Math.random(),
      mode: Math.random()
    }
    
    const newUser =  new User({userAnalysis})
    newUser.spotifyId = newUser._id
    await newUser.save();
  }

  const users = await User.find()
  console.log(users)

}

createUser(1)