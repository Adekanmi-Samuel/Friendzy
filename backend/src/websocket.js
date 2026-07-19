import { Server } from 'socket.io';

export function initWebSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`[Socket] User connected: ${socket.id}`);

    // Join a chat room
    socket.on('join-chat', ({ chatId, userId }) => {
      socket.join(`chat-${chatId}`);
      socket.data.userId = userId;
      console.log(`[Socket] User ${userId} joined chat ${chatId}`);
    });

    // Send message
    socket.on('send-message', ({ chatId, message }) => {
      io.to(`chat-${chatId}`).emit('new-message', {
        ...message,
        timestamp: new Date().toISOString(),
      });
    });

    // Typing indicator
    socket.on('typing-start', ({ chatId, userId }) => {
      socket.to(`chat-${chatId}`).emit('user-typing', { userId });
    });

    socket.on('typing-stop', ({ chatId, userId }) => {
      socket.to(`chat-${chatId}`).emit('user-stopped-typing', { userId });
    });

    // Call signaling
    socket.on('call-initiate', ({ chatId, callerId, type }) => {
      socket.to(`chat-${chatId}`).emit('call-incoming', {
        callerId,
        type,
        callId: `call-${Date.now()}`,
      });
    });

    socket.on('call-accept', ({ chatId }) => {
      socket.to(`chat-${chatId}`).emit('call-connected');
    });

    socket.on('call-decline', ({ chatId }) => {
      socket.to(`chat-${chatId}`).emit('call-declined');
    });

    socket.on('call-end', ({ chatId, duration }) => {
      socket.to(`chat-${chatId}`).emit('call-ended', { duration });
    });

    // WebRTC signaling
    socket.on('webrtc-offer', ({ chatId, offer }) => {
      socket.to(`chat-${chatId}`).emit('webrtc-offer', { offer });
    });

    socket.on('webrtc-answer', ({ chatId, answer }) => {
      socket.to(`chat-${chatId}`).emit('webrtc-answer', { answer });
    });

    socket.on('webrtc-ice-candidate', ({ chatId, candidate }) => {
      socket.to(`chat-${chatId}`).emit('webrtc-ice-candidate', { candidate });
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log(`[Socket] User disconnected: ${socket.id}`);
    });
  });

  return io;
}
