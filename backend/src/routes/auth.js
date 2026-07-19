import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateRegistration, validateLogin, validateQuiz, validateProfileUpdate } from '../middleware/validate.js';

const router = Router();

// In-memory user store (replace with DB in production)
const users = new Map();

// Pre-seed demo users for testing
const demoUsers = [
  { email: 'sofia@example.com', name: 'Sofia R.', location: 'São Paulo, Brazil', interests: ['Cooking', 'Music', 'Hiking'], bio: 'Love trying new recipes!', trustScore: 87, verified: true },
  { email: 'kwame@example.com', name: 'Kwame A.', location: 'Accra, Ghana', interests: ['Tech', 'Photography', 'Jazz'], bio: 'Software developer by day.', trustScore: 91, verified: true },
  { email: 'mei@example.com', name: 'Mei L.', location: 'Singapore', interests: ['Art', 'Yoga', 'Travel'], bio: 'Finding beauty in everyday moments.', trustScore: 72, verified: false },
  { email: 'admin@friendzy.com', name: 'Admin', location: 'Global', interests: [], bio: 'Platform administrator', trustScore: 100, verified: true, premium: true },
];

demoUsers.forEach(demo => {
  const user = {
    id: `demo-${demo.email.split('@')[0]}`,
    ...demo,
    password: 'password123',
    age: 28,
    gender: 'MALE',
    language: 'en',
    region: 'NG',
    premium: demo.premium || false,
    createdAt: new Date().toISOString(),
  };
  users.set(demo.email, user);
});

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
