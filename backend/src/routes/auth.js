import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateRegistration, validateLogin, validateQuiz, validateProfileUpdate } from '../middleware/validate.js';

const router = Router();

// In-memory user store (replace with DB in production)
const users = new Map();

// Register
router.post('/register', validateRegistration, asyncHandler(async (req, res) => {
  const { name, email, password, location, bio } = req.body;

  console.log(`[${new Date().toISOString()}] Registration attempt: ${email}`);

  if (users.has(email)) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const user = {
    id: uuidv4(),
    name,
    email,
    location: location || '',
    bio: bio || '',
    interests: [],
    personality: null,
    trustScore: 50,
    verified: false,
    premium: false,
    region: 'US',
    mood: null,
    createdAt: new Date().toISOString(),
  };

  users.set(email, user);
  console.log(`[${new Date().toISOString()}] User registered: ${user.id}`);

  const { password: _, ...safeUser } = user;
  res.status(201).json({ user: safeUser, token: `token_${user.id}` });
}));

// Login
router.post('/login', validateLogin, asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(`[${new Date().toISOString()}] Login attempt: ${email}`);

  const user = users.get(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const { password: _, ...safeUser } = user;
  console.log(`[${new Date().toISOString()}] Login successful: ${user.id}`);
  res.json({ user: safeUser, token: `token_${user.id}` });
}));

// Update profile
router.put('/profile', validateProfileUpdate, asyncHandler(async (req, res) => {
  const { email, name, bio, location, interests } = req.body;

  if (!users.has(email)) {
    return res.status(404).json({ error: 'User not found' });
  }

  const user = users.get(email);
  if (name) user.name = name;
  if (bio !== undefined) user.bio = bio;
  if (location) user.location = location;
  if (interests) user.interests = interests;

  const { password: _, ...safeUser } = user;
  res.json({ user: safeUser });
}));

// Save quiz results
router.post('/quiz', validateQuiz, asyncHandler(async (req, res) => {
  const { email, answers, personalityProfile } = req.body;

  if (!email || !users.has(email)) {
    return res.status(404).json({ error: 'User not found' });
  }

  const user = users.get(email);
  user.personality = personalityProfile || {
    openness: Math.floor(Math.random() * 40 + 60),
    conscientiousness: Math.floor(Math.random() * 40 + 40),
    extraversion: Math.floor(Math.random() * 40 + 30),
    agreeableness: Math.floor(Math.random() * 40 + 50),
    neuroticism: Math.floor(Math.random() * 40 + 20),
  };

  console.log(`[${new Date().toISOString()}] Quiz submitted for user: ${email}`);
  res.json({ success: true, personality: user.personality });
}));

export default router;
