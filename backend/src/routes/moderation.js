import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Flagged content queue
const flaggedContent = [];

// AI Content Moderation (mock - integrate Gemini AI in production)
function moderateContent(text, type = 'message') {
  const toxicPatterns = ['hate', 'harassment', 'threat', 'spam', 'scam', 'abuse'];
  const lower = text.toLowerCase();

  const flagged = toxicPatterns.filter(word => lower.includes(word));

  return {
    id: uuidv4(),
    text,
    type,
    status: flagged.length > 0 ? 'flagged' : 'approved',
    flags: flagged,
    confidence: flagged.length > 0 ? 0.92 : 0.05,
    aiModel: 'friendzy-moderation-v1',
    timestamp: new Date().toISOString(),
  };
}

// Moderate a message
router.post('/check', (req, res) => {
  const { text, type } = req.body;
  if (!text) return res.status(400).json({ error: 'Text required' });

  const result = moderateContent(text, type);

  if (result.status === 'flagged') {
    flaggedContent.push(result);
  }

  res.json(result);
});

// Get flagged content (admin)
router.get('/flagged', (req, res) => {
  res.json({ content: flaggedContent, total: flaggedContent.length });
});

// Human review endpoint
router.post('/review/:id', (req, res) => {
  const { action, reviewerNote } = req.body;
  const item = flaggedContent.find(c => c.id === req.params.id);

  if (!item) return res.status(404).json({ error: 'Content not found' });

  item.status = action; // 'approved' or 'removed'
  item.reviewerNote = reviewerNote || '';
  item.reviewedAt = new Date().toISOString();

  res.json({ success: true, content: item });
});

// Profile moderation
router.post('/profile-review', (req, res) => {
  const { userId, profileData } = req.body;

  res.json({
    approved: true,
    flags: [],
    suggestion: null,
    reviewTime: new Date().toISOString(),
  });
});

// Safety check-in (post-meetup)
router.post('/safety-checkin', (req, res) => {
  const { userId, meetupId, status, notes } = req.body;
  console.log(`Safety check-in: User ${userId}, Meetup ${meetupId}, Status: ${status}`);
  res.json({ success: true, message: 'Thank you for checking in. Stay safe!' });
});

// Get crisis hotlines by region
router.get('/hotlines/:region', (req, res) => {
  const hotlines = {
    US: [{ name: 'Suicide & Crisis Lifeline', number: '988' }],
    UK: [{ name: 'Samaritans', number: '116 123' }],
    NG: [{ name: 'Suicide Research & Prevention', number: '0806 210 6493' }],
    IN: [{ name: 'iCall Helpline', number: '9152987821' }],
    BR: [{ name: 'CVV', number: '188' }],
    SG: [{ name: 'Samaritans of Singapore', number: '1767' }],
  };

  const regionHotlines = hotlines[req.params.region] || hotlines.US;
  res.json({ hotlines: regionHotlines });
});

export default router;
