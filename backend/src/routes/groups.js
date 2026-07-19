import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { asyncHandler } from '../middleware/errorHandler.js';
import { body, validationResult } from 'express-validator';

const router = Router();

// In-memory store
const groups = new Map();
const groupMessages = new Map();

// Create a group
router.post('/', [
  body('name').trim().isLength({ min: 2, max: 50 }),
  body('interests').isArray({ min: 1 }),
  body('maxMembers').optional().isInt({ min: 3, max: 8 }),
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }

  const { name, interests, maxMembers = 5, creatorId } = req.body;

  const group = {
    id: uuidv4(),
    name,
    interests,
    maxMembers,
    members: [creatorId],
    createdBy: creatorId,
    status: 'open', // open, full, active, completed
    activity: null,
    createdAt: new Date().toISOString(),
  };

  groups.set(group.id, group);
  groupMessages.set(group.id, []);

  console.log(`[${new Date().toISOString()}] Group created: ${group.id} by ${creatorId}`);
  res.status(201).json({ group });
}));

// Get all groups
router.get('/', asyncHandler(async (req, res) => {
  const { interest, status = 'open' } = req.query;
  let allGroups = Array.from(groups.values());

  if (status !== 'all') {
    allGroups = allGroups.filter(g => g.status === status);
  }

  if (interest) {
    allGroups = allGroups.filter(g => g.interests.includes(interest));
  }

  res.json({ groups: allGroups, total: allGroups.length });
}));

// Get group by ID
router.get('/:groupId', asyncHandler(async (req, res) => {
  const group = groups.get(req.params.groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });
  res.json({ group });
}));

// Join a group
router.post('/:groupId/join', [
  body('userId').notEmpty(),
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }

  const { groupId } = req.params;
  const { userId } = req.body;

  const group = groups.get(groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });

  if (group.status === 'full') {
    return res.status(400).json({ error: 'Group is full' });
  }

  if (group.members.includes(userId)) {
    return res.status(409).json({ error: 'Already a member' });
  }

  group.members.push(userId);

  if (group.members.length >= group.maxMembers) {
    group.status = 'active';
    group.activity = suggestActivity(group.interests);
  }

  console.log(`[${new Date().toISOString()}] User ${userId} joined group ${groupId}`);
  res.json({ group });
}));

// Leave a group
router.post('/:groupId/leave', [
  body('userId').notEmpty(),
], asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body;

  const group = groups.get(groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });

  group.members = group.members.filter(m => m !== userId);

  if (group.members.length === 0) {
    groups.delete(groupId);
    groupMessages.delete(groupId);
  } else if (group.status === 'full' && group.members.length < group.maxMembers) {
    group.status = 'open';
  }

  console.log(`[${new Date().toISOString()}] User ${userId} left group ${groupId}`);
  res.json({ success: true });
}));

// Get group messages
router.get('/:groupId/messages', asyncHandler(async (req, res) => {
  const messages = groupMessages.get(req.params.groupId) || [];
  res.json({ messages });
}));

// Send group message
router.post('/:groupId/messages', [
  body('text').trim().isLength({ min: 1, max: 2000 }),
  body('senderId').notEmpty(),
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }

  const { groupId } = req.params;
  const { text, senderId } = req.body;

  if (!groupMessages.has(groupId)) {
    groupMessages.set(groupId, []);
  }

  const message = {
    id: uuidv4(),
    senderId,
    text,
    timestamp: new Date().toISOString(),
  };

  groupMessages.get(groupId).push(message);
  res.status(201).json({ message });
}));

// Suggest activities based on interests
function suggestActivity(interests) {
  const activityMap = {
    'Cooking': { title: 'Cooking Session', emoji: '🍳', description: 'Cook a recipe together over video call' },
    'Music': { title: 'Music Share', emoji: '🎵', description: 'Share your favorite playlists and discover new music' },
    'Hiking': { title: 'Hiking Buddy', emoji: '🥾', description: 'Plan a group hike in your area' },
    'Reading': { title: 'Book Club', emoji: '📚', description: 'Read the same book and discuss weekly' },
    'Art': { title: 'Art Session', emoji: '🎨', description: 'Create art together over video call' },
    'Gaming': { title: 'Game Night', emoji: '🎮', description: 'Play online games together' },
    'Travel': { title: 'Travel Planning', emoji: '✈️', description: 'Plan a group trip or share travel stories' },
    'Yoga': { title: 'Yoga Together', emoji: '🧘', description: 'Do yoga together over video call' },
    'Photography': { title: 'Photo Walk', emoji: '📸', description: 'Go on a group photography walk' },
    'Movies': { title: 'Movie Night', emoji: '🎬', description: 'Watch a movie together and discuss' },
    'Tech': { title: 'Tech Talk', emoji: '💻', description: 'Discuss the latest tech and build projects' },
    'Sports': { title: 'Sports Watch', emoji: '⚽', description: 'Watch a game together or play sports' },
  };

  for (const interest of interests) {
    if (activityMap[interest]) return activityMap[interest];
  }

  return { title: 'Group Hangout', emoji: '☕', description: 'Get to know each other' };
}

// Get suggested activities for group
router.get('/:groupId/activities', asyncHandler(async (req, res) => {
  const group = groups.get(req.params.groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });

  const activities = group.interests.map(i => suggestActivity([i])).filter(Boolean);
  res.json({ activities });
}));

export default router;
