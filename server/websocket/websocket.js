const WebSocket = require('ws')

module.exports = function setupWebSocket(server) {
  const wss = new WebSocket.server({server})

  wss.on('connection', function connection(ws) {
    console.log('hello from websocket')
  })
}