const socketIo = require('socket.io');

let io;

const initWebSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

const sendInAppNotification = (message) => {
  if (io) {
    io.emit('notification', message);
  }
};

module.exports = { initWebSocket, sendInAppNotification };
