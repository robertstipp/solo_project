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
    console.log(response)
    return response.data.item.name;
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
        ws.send(response)
      }
      
      intervalId = setInterval(async () => {
        const response = await fetchCurrentlyPlaying(user.accessToken)
        if (response) {
          ws.send(response)
        }
      }, 30000)
    } else {
      ws.send('...waiting')
    }

  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');

    if (intervalId) {
      clearInterval(intervalId)
    }
  });
});

// server.on('upgrade', (request, socket, head) => {
//   const url = new URL(request.url, 'http://localhost:3000'); // Replace 'localhost' with your server address
//   const userId = url.searchParams.get('userId');
//   console.log('User ID:', userId);

//   wss.handleUpgrade(request, socket, head, (ws) => {
//     wss.emit('connection', ws, request);
//   });
// });









// Start listening
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
