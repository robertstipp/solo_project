require('dotenv').config()
const mongoose = require('mongoose')
const axios = require('axios')

const User = require('../server/models/userModel')


const URI = 'mongodb+srv://just-bobby:Domino17!@cluster0.tkib1.mongodb.net/sonar?'

const ACCESS_TOKEN = 'BQDfn_FWsbELG7vFsUi87PwUc0t0f5um5Ctr55FPE1VczZ-vhHa73lfx8eHSk-YZ1MatRq7ZTJ7UWnlmlMJ1bsF85UajSUoT72ix8paY68_fvXOQYL6_6bUwYkb9EBOWsvKKZTcxNkGslPSoSLgvK9ifA5HzJKBNu-8wG0MQdXEt-IIed-B40w4Bis3L52ZtB1fnLQM1Sq2pbO7S-tT5recjqbI' 
mongoose.connect(URI)
  .then(() => console.log('DB CONNECT 🌴 '))
  .catch(err => console.log(err));


const accessToken = ACCESS_TOKEN;
const getTracks = (offset) => {
  return axios.get(`https://api.spotify.com/v1/me/tracks?offset=${offset}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}

const getAudioFeatures = async (ids) => {
  return axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}

const createUser =  async () => {
  // for (let i = 0; i < numUsers; i++) {
  //   const userAnalysis = {
  //     danceability : Math.random(),
  //     tempo : Math.random() * 150 + 150,
  //     acousticness : Math.random(),
  //     energy: Math.random(),
  //     speechiness : Math.random(),
  //     valence: Math.random(), 
  //     instrumentalness : Math.random(),
  //     liveness : Math.random(),
  //     mode: Math.random()
  //   }
    
  //   // const newUser =  new User({userAnalysis})
  //   // newUser.spotifyId = newUser._id
  //   // await newUser.save();

    
  // }
  for (let offset = 20; offset <= 200; offset += 1) {
    const responseTracks = await getTracks(offset)
    const idString = responseTracks.data.items.map((item)=>item.track.id).join(",")
    const responseFeatures = await getAudioFeatures(idString)
    const tracksArrFeatures = responseFeatures.data.audio_features;
    let count = tracksArrFeatures.length;
    const userAnalysis = {
      danceability : 0,
      tempo : 0,
      acousticness : 0,
      energy: 0,
      speechiness : 0,
      valence: 0, 
      instrumentalness : 0,
      liveness : 0,
      mode: 0
    }
    for (const track of tracksArrFeatures) {
      for(const [key,value] of Object.entries(track))
      if (userAnalysis[key] !== undefined) userAnalysis[key] += value
    }

    for (const [key, value] of Object.entries(userAnalysis)) userAnalysis[key] /= count
    const newUser =  new User({userAnalysis})
    newUser.spotifyId = newUser._id
    await newUser.save();
  }
  
  
  
  
  

}

const createRandomUser =  async (numUsers) => {
  for (let i = 0; i < numUsers; i++) {
    const userAnalysis = {
      danceability : Math.random(),
      tempo : Math.random() * 150 + 150,
      acousticness : Math.random(),
      energy: Math.random(),
      speechiness : Math.random(),
      valence: Math.random(), 
      instrumentalness : Math.random(),
      liveness : Math.random(),
      mode: Math.random()
    }
    // const newUser =  new User({userAnalysis})
    // newUser.spotifyId = newUser._id
    // await newUser.save(); 
  }
}

createUser()
// createRandomUser()

// 20 - 40