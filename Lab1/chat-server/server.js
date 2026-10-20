const { randomUUID } = require('crypto');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const SYSTEM_USER = 'SYSTEM';
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Server là nơi duy nhất tạo id và thời gian để tránh trùng/lệch giữa các client
const createMessage = (user, text) => ({
  id: randomUUID(),
  user,
  text,
  time: new Date().toISOString(),
});

io.on('connection', socket => {
  console.log(`User ${socket.id} connected`);

  socket.on('join_room', name => {
    io.emit(
      'message_received',
      createMessage(SYSTEM_USER, `${name} has joined the chat`),
    );
  });

  socket.on('send_message', ({ text, user } = {}) => {
    if (typeof text !== 'string' || !text.trim() || !user) return;
    io.emit('message_received', createMessage(user, text.trim()));
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
