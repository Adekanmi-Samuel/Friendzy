import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { asyncHandler } from '../middleware/errorHandler.js';
import { calculateCompatibility, getRecommendations } from '../lib/matching.js';

const router = Router();

// Mock user profiles for recommendation engine
const mockProfiles = [
  {
    id: '2', name: 'Kwame A.', age: 31, region: 'NG',
    interests: ['Tech', 'Photography', 'Jazz', 'Travel'],
    personality: { openness: 78, conscientiousness: 82, extraversion: 65, agreeableness: 70, neuroticism: 30 },
    seeking: 'FRIENDSHIP',
  },
  {
    id: '3', name: 'Mei L.', age: 26, region: 'SG',
    interests: ['Art', 'Yoga', 'Travel', 'Music'],
    personality: { openness: 85, conscientiousness: 70, extraversion: 55, agreeableness: 80, neuroticism: 25 },
    seeking: 'FRIENDSHIP',
  },
  {
    id: '4', name: 'Erik K.', age: 34, region: 'DE',
    interests: ['Reading', 'Cycling', 'Movies', 'Cooking'],
    personality: { openness: 72, conscientiousness: 88, extraversion: 45, agreeableness: 75, neuroticism: 20 },
    seeking: 'NETWORKING',
  },
  {
    id: '5', name: 'Amara K.', age: 29, region: 'NG',
    interests: ['Cooking', 'Music', 'Hiking', 'Photography'],
    personality: { openness: 80, conscientiousness: 75, extraversion: 82, agreeableness: 85, neuroticism: 18 },
    seeking: 'FRIENDSHIP',
  },
  {
    id: '6', name: 'Priya S.', age: 27, region: 'IN',
    interests: ['Yoga', 'Art', 'Reading', 'Travel'],
    personality: { openness: 88, conscientiousness: 68, extraversion: 60, agreeableness: 78, neuroticism: 22 },
    seeking: 'ANY',
  },
];

// Get matches for a user (uses matching algorithm)
router.get('/:userId', asyncHandler(async (req, res) => {
  const { region, interests, seeking, limit = 10 } = req.query;

  // Build a query user from query params (in production, fetch from database)
  const queryUser = {
    id: req.params.userId,
    age: 28,
    region: region || 'NG',
    interests: interests ? interests.split(',') : ['Music', 'Hiking', 'Cooking'],
    personality: { openness: 75, conscientiousness: 70, extraversion: 68, agreeableness: 80, neuroticism: 25 },
    seeking: seeking || 'FRIENDSHIP',
  };

  // Filter candidates by region if specified
  let candidates = mockProfiles;
  if (region) {
    candidates = candidates.filter(p => p.region === region);
  }

  // Get recommendations using the matching algorithm
  const recommendations = getRecommendations(queryUser, candidates, Math.min(Math.max(parseInt(limit) || 10, 1), 50));

  res.json({
    matches: recommendations.map(r => ({
      id: r.id,
      name: r.name,
      age: r.age,
      region: r.region,
      compatibility: r.compatibility,
      interests: r.interests,
      seeking: r.seeking,
    })),
    total: recommendations.length,
    algorithm: 'friendzy-v1',
  });
}));

// Like a match
router.post('/:userId/like/:matchId', asyncHandler(async (req, res) => {
  // In production: record the like, check for mutual likes, create match if mutual
  const isMatch = Math.random() > 0.5; // Mock 50% match rate
  res.json({ success: true, message: 'Match liked', isMatch });
}));

// Pass on a match
router.post('/:userId/pass/:matchId', asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'Match passed' });
}));

// Get compatibility score between two specific users
router.get('/:userId/compatibility/:otherUserId', asyncHandler(async (req, res) => {
  const { userId, otherUserId } = req.params;

  // In production: fetch both user profiles from database
  const user1 = {
    id: userId, age: 28, region: 'NG',
    interests: ['Music', 'Hiking', 'Cooking'],
    personality: { openness: 75, conscientiousness: 70, extraversion: 68, agreeableness: 80, neuroticism: 25 },
    seeking: 'FRIENDSHIP',
  };

  const user2 = mockProfiles.find(p => p.id === otherUserId) || mockProfiles[0];

  const compatibility = calculateCompatibility(user1, user2);

  res.json({
    userId,
    otherUserId,
    compatibility,
    algorithm: 'friendzy-v1',
  });
}));

export default router;
