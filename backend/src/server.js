import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

import { securityMiddleware } from './middleware/security.js';
import { sanitizeInput } from './middleware/sanitize.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import matchesRoutes from './routes/matches.js';
import chatRoutes from './routes/chat.js';
import paymentsRoutes from './routes/payments.js';
import moderationRoutes from './routes/moderation.js';
import groupsRoutes from './routes/groups.js';
import verificationRoutes from './routes/verification.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Request ID tracking
app.use((req, res, next) => {
  req.id = uuidv4();
  res.setHeader('X-Request-Id', req.id);
  next();
});

// Body parsing with size limits
app.use(express.json({ limit: '1mb' }));

// Security middleware (helmet, cors, rate limiting)
securityMiddleware(app);

// Input sanitization
app.use(sanitizeInput);

// Request logging
app.use(morgan(':method :url :status :res[content-length] - :response-time ms [:date[iso]]'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
    memoryUsage: {
      rss: Math.floor(process.memoryUsage().rss / 1024 / 1024) + 'MB',
      heapUsed: Math.floor(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
    },
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/moderation', moderationRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/api/verification', verificationRoutes);

// Paystack webhook needs raw body for signature verification
app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  // Handle webhook
  res.json({ received: true });
});

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Friendzy API running on http://localhost:${PORT}`);
  console.log(`[${new Date().toISOString()}] Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
function shutdown(signal) {
  console.log(`\n[${new Date().toISOString()}] ${signal} received. Starting graceful shutdown...`);
  server.close(() => {
    console.log(`[${new Date().toISOString()}] HTTP server closed.`);
    process.exit(0);
  });
  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error(`[${new Date().toISOString()}] Forced shutdown after timeout.`);
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

process.on('uncaughtException', (err) => {
  console.error(`[${new Date().toISOString()}] Uncaught Exception:`, err.message);
  console.error(err.stack);
  shutdown('uncaughtException');
});

process.on('unhandledRejection', (reason) => {
  console.error(`[${new Date().toISOString()}] Unhandled Rejection:`, reason);
});

export default app;
