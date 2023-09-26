const app = require('./app.js');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const http = require('http');
const axios = require('axios')
const User = require('./models/userModel.js')

// DB setup
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB CONNECT 🌴 '))
  .catch(err => console.log(err));

// HTTP and WebSocket server setup
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const fetchCurrentlyPlaying = async (accessToken) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const imgUrl = response.data.item.album.images[2].url
    const artistName = response.data.item.album.artists.map((artist)=>artist.name)
    const trackName = response.data.item.name
    return {imgUrl, artistName, trackName}
  } catch (error) {
    console.log(error)
    console.log(`Error`)
    return null
  }
}

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');
  let intervalId;

  ws.on('message', async (message) => {
    console.log(`Received: ${message}`);
    const user = await User.findOne({spotifyId: message})
    if (user) {
      const response = await fetchCurrentlyPlaying(user.accessToken)
      if (response) {
        ws.send(JSON.stringify(response))
      }
      
      intervalId = setInterval(async () => {
        const response = await fetchCurrentlyPlaying(user.accessToken)
        if (response) {
          ws.send(JSON.stringify(response))
        }
      }, 30000)
    } else {
      ws.send(JSON.stringify({imgUrl:null, artistName: null, trackName: null}))
    }

  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');

    if (intervalId) {
      clearInterval(intervalId)
    }
  });
});











// Start listening
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
