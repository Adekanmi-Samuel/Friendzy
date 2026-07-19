import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const url = import.meta.env.DEV ? 'http://localhost:3001' : '';
    socket = io(url, {
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });
  }
  return socket;
}

export function connectSocket(userId: string) {
  const s = getSocket();
  s.connect();
  s.on('connect', () => {
    console.log('Connected to server');
  });
  return s;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
