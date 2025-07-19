const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Pastikan folder `public` ada!

io.on('connection', (socket) => {
  console.log('User connected');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
