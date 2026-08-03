import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

// In prod, prefer VITE_SOCKET_URL; otherwise derive from VITE_API_URL (strip trailing '/api').
// Falls back to '' (same-origin) when neither is set.
function getSocketUrl(): string {
  if (import.meta.env.DEV) return 'http://localhost:3001';
  const direct = import.meta.env.VITE_SOCKET_URL?.trim();
  if (direct) return direct;
  const api = import.meta.env.VITE_API_URL?.trim();
  return api ? api.replace(/\/api$/i, '').replace(/\/+$/, '') : '';
}

export function getSocket(): Socket {
  if (!socket) {
    const url = import.meta.env.DEV
      ? 'http://localhost:3001'
      : getSocketUrl();
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
