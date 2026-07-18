import { Router } from 'express';

const router = Router();

// Mock users for demo
const mockUsers = [
  {
    id: '1', name: 'Sofia R.', age: 28, location: 'São Paulo, Brazil',
    compatibility: 89, interests: ['Cooking', 'Music', 'Hiking'],
    bio: 'Love trying new recipes and exploring trails on weekends!',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    online: true, mood: 'good', trustScore: 87,
  },
  {
    id: '2', name: 'Kwame A.', age: 31, location: 'Accra, Ghana',
    compatibility: 82, interests: ['Tech', 'Photography', 'Jazz'],
    bio: 'Software developer by day, jazz enthusiast by night.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    online: true, mood: 'great', trustScore: 91,
  },
  {
    id: '3', name: 'Mei L.', age: 26, location: 'Singapore',
    compatibility: 76, interests: ['Art', 'Yoga', 'Travel'],
    bio: 'Finding beauty in everyday moments. Always planning the next trip.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    online: false, mood: 'okay', trustScore: 78,
  },
  {
    id: '4', name: 'Erik K.', age: 34, location: 'Berlin, Germany',
    compatibility: 71, interests: ['Reading', 'Cycling', 'Movies'],
    bio: "Book club organizer and weekend cyclist. Let's discuss philosophy over coffee!",
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
    online: true, mood: 'good', trustScore: 85,
  },
];

// Get all matches
router.get('/', (req, res) => {
  const { region, interests } = req.query;
  let filtered = [...mockUsers];

  if (region) {
    filtered = filtered.filter(u => u.location.toLowerCase().includes(region.toLowerCase()));
  }

  res.json({ users: filtered, total: filtered.length });
});

// Get single user
router.get('/:id', (req, res) => {
  const user = mockUsers.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user });
});

// Update mood
router.put('/mood', (req, res) => {
  const { mood } = req.body;
  if (!['great', 'good', 'okay', 'low'].includes(mood)) {
    return res.status(400).json({ error: 'Invalid mood' });
  }
  res.json({ success: true, mood });
});

// Get user stats
router.get('/:id/stats', (req, res) => {
  res.json({
    friends: 47,
    meetups: 12,
    rating: 4.9,
    tier: 'Gold',
    messagesThisWeek: 156,
    avgResponseTime: '12 min',
  });
});

export default router;
