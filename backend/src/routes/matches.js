import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Compatibility algorithm (simplified Big Five matching)
function calculateCompatibility(userA, userB) {
  if (!userA.personality || !userB.personality) {
    return Math.floor(Math.random() * 30 + 60);
  }

  const traits = ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'];
  let totalDiff = 0;

  traits.forEach(trait => {
    const diff = Math.abs((userA.personality[trait] || 50) - (userB.personality[trait] || 50));
    totalDiff += diff;
  });

  const avgDiff = totalDiff / traits.length;
  return Math.max(20, Math.min(99, Math.round(100 - avgDiff * 0.8)));
}

// Get matches for a user
router.get('/:userId', (req, res) => {
  const { region, limit = 10 } = req.query;

  // Return mock matches with calculated compatibility
  const matches = [
    { id: uuidv4(), name: 'Sofia R.', age: 28, location: 'São Paulo, Brazil', compatibility: 89, interests: ['Cooking', 'Music', 'Hiking'] },
    { id: uuidv4(), name: 'Kwame A.', age: 31, location: 'Accra, Ghana', compatibility: 82, interests: ['Tech', 'Photography', 'Jazz'] },
    { id: uuidv4(), name: 'Mei L.', age: 26, location: 'Singapore', compatibility: 76, interests: ['Art', 'Yoga', 'Travel'] },
    { id: uuidv4(), name: 'Erik K.', age: 34, location: 'Berlin, Germany', compatibility: 71, interests: ['Reading', 'Cycling', 'Movies'] },
  ];

  res.json({ matches: matches.slice(0, parseInt(limit)), total: matches.length });
});

// Like a match
router.post('/:userId/like/:matchId', (req, res) => {
  res.json({ success: true, message: 'Match liked', isMatch: Math.random() > 0.5 });
});

// Pass on a match
router.post('/:userId/pass/:matchId', (req, res) => {
  res.json({ success: true, message: 'Match passed' });
});

export default router;
