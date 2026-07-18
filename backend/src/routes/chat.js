import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateMessage, validateReport } from '../middleware/validate.js';

const router = Router();

// Mock conversations
const conversations = [
  {
    id: 'conv-1',
    participants: ['me', 'sofia'],
    lastMessage: 'Com certeza! Que tal neste sábado? ☕',
    lastMessageTime: new Date(Date.now() - 120000).toISOString(),
    unread: 1,
  },
  {
    id: 'conv-2',
    participants: ['me', 'amara'],
    lastMessage: 'That café was amazing! 🤩',
    lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
    unread: 0,
  },
  {
    id: 'conv-3',
    participants: ['me', 'james'],
    lastMessage: 'See you Saturday for the hike!',
    lastMessageTime: new Date(Date.now() - 10800000).toISOString(),
    unread: 0,
  },
];

// Mock messages for conversation 1
const messagesByConv = {
  'conv-1': [
    { id: uuidv4(), sender: 'them', text: 'Hey! I saw we both love hiking 🥾', time: '10:30 AM' },
    { id: uuidv4(), sender: 'me', text: 'Yes! I noticed that too. Have you been on any good trails lately?', time: '10:32 AM' },
    { id: uuidv4(), sender: 'them', text: 'Olá! Sim, fui para a Serra da Mantiqueira no mês passado. Foi incrível!', time: '10:34 AM', translation: 'Hello! Yes, I went to Serra da Mantiqueira last month. It was amazing!' },
    { id: uuidv4(), sender: 'me', text: "That sounds incredible! I've always wanted to visit Brazil.", time: '10:36 AM' },
    { id: uuidv4(), sender: 'them', text: 'Você deveria! Posso te mostrar alguns lugares incríveis se você vier para São Paulo. 😊', time: '10:38 AM', translation: 'You should! I can show you some amazing places if you come to São Paulo. 😊' },
    { id: uuidv4(), sender: 'me', text: "That would be so fun! Maybe we could plan a virtual coffee first?", time: '10:40 AM' },
    { id: uuidv4(), sender: 'them', text: 'Com certeza! Que tal neste sábado? ☕', time: '10:41 AM', translation: 'Absolutely! How about this Saturday? ☕' },
  ],
};

// Simple content moderation
function moderateMessage(text) {
  const flaggedWords = ['spam', 'scam', 'hate'];
  const lower = text.toLowerCase();
  const isFlagged = flaggedWords.some(word => lower.includes(word));

  return {
    approved: !isFlagged,
    flagReason: isFlagged ? 'Potentially harmful content detected' : null,
    confidence: isFlagged ? 0.85 : 0.1,
  };
}

// Get conversations list
router.get('/conversations', asyncHandler(async (req, res) => {
  res.json({ conversations });
}));

// Get messages for a conversation
router.get('/conversations/:convId/messages', asyncHandler(async (req, res) => {
  const messages = messagesByConv[req.params.convId] || [];
  res.json({ messages });
}));

// Send a message
router.post('/conversations/:convId/messages', validateMessage, asyncHandler(async (req, res) => {
  const { text } = req.body;

  const newMessage = {
    id: uuidv4(),
    sender: 'me',
    text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  // Auto-moderate
  const moderationResult = moderateMessage(text);

  res.json({ message: newMessage, moderation: moderationResult });
}));

// Create new conversation
router.post('/conversations', asyncHandler(async (req, res) => {
  const { participantId } = req.body;

  if (!participantId) {
    return res.status(400).json({ error: 'Participant ID required' });
  }

  const newConv = {
    id: uuidv4(),
    participants: ['me', participantId],
    lastMessage: '',
    lastMessageTime: new Date().toISOString(),
    unread: 0,
  };
  conversations.unshift(newConv);
  res.json({ conversation: newConv });
}));

// Safety exit
router.post('/safety-exit', asyncHandler(async (req, res) => {
  const { conversationId, reason } = req.body;
  console.log(`[${new Date().toISOString()}] Safety exit triggered for conv ${conversationId}: ${reason || 'No reason given'}`);
  res.json({ success: true, message: 'Safety exit logged. You have been removed from this conversation.' });
}));

// Block user
router.post('/block', asyncHandler(async (req, res) => {
  const { userId, blockedUserId } = req.body;

  if (!userId || !blockedUserId) {
    return res.status(400).json({ error: 'Both userId and blockedUserId required' });
  }

  console.log(`[${new Date().toISOString()}] User ${userId} blocked user ${blockedUserId}`);
  res.json({ success: true, message: 'User blocked' });
}));

// Report user
router.post('/report', validateReport, asyncHandler(async (req, res) => {
  const { userId, reportedUserId, reason, description } = req.body;
  console.log(`[${new Date().toISOString()}] Report filed: ${userId} reported ${reportedUserId} for: ${reason}`);
  res.json({
    success: true,
    message: 'Report submitted. Our team will review it within 24 hours.',
    reportId: uuidv4(),
  });
}));

export default router;
