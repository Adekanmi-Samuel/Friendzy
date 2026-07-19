import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { asyncHandler } from '../middleware/errorHandler.js';
import { body, validationResult } from 'express-validator';

const router = Router();

// In-memory stores (replace with database in production)
const blockedUsers = new Map(); // userId -> Set of blocked userIds
const reports = [];
const suspendedAccounts = new Map();

// Block a user
router.post('/block', [
  body('userId').notEmpty().withMessage('User ID required'),
  body('blockedUserId').notEmpty().withMessage('Blocked user ID required'),
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }

  const { userId, blockedUserId } = req.body;

  if (userId === blockedUserId) {
    return res.status(400).json({ error: 'Cannot block yourself' });
  }

  if (!blockedUsers.has(userId)) {
    blockedUsers.set(userId, new Set());
  }
  blockedUsers.get(userId).add(blockedUserId);

  console.log(`[${new Date().toISOString()}] User ${userId} blocked ${blockedUserId}`);

  res.json({ success: true, message: 'User blocked' });
}));

// Unblock a user
router.post('/unblock', [
  body('userId').notEmpty(),
  body('unblockedUserId').notEmpty(),
], asyncHandler(async (req, res) => {
  const { userId, unblockedUserId } = req.body;

  if (blockedUsers.has(userId)) {
    blockedUsers.get(userId).delete(unblockedUserId);
  }

  console.log(`[${new Date().toISOString()}] User ${userId} unblocked ${unblockedUserId}`);

  res.json({ success: true, message: 'User unblocked' });
}));

// Get blocked users
router.get('/blocked/:userId', asyncHandler(async (req, res) => {
  const blocked = blockedUsers.get(req.params.userId) || new Set();
  res.json({ blockedUsers: Array.from(blocked) });
}));

// Report a user
router.post('/report', [
  body('reporterId').notEmpty().withMessage('Reporter ID required'),
  body('reportedUserId').notEmpty().withMessage('Reported user ID required'),
  body('reason').isIn(['harassment', 'fake_profile', 'inappropriate', 'spam', 'other']).withMessage('Valid reason required'),
  body('description').optional().isLength({ max: 1000 }).withMessage('Description too long'),
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }

  const { reporterId, reportedUserId, reason, description } = req.body;

  if (reporterId === reportedUserId) {
    return res.status(400).json({ error: 'Cannot report yourself' });
  }

  // Check for duplicate reports
  const existingReport = reports.find(
    r => r.reporterId === reporterId && r.reportedUserId === reportedUserId && r.status === 'pending'
  );
  if (existingReport) {
    return res.status(409).json({ error: 'You have already reported this user' });
  }

  const report = {
    id: uuidv4(),
    reporterId,
    reportedUserId,
    reason,
    description: description || '',
    status: 'pending', // pending, reviewing, resolved, dismissed
    severity: null, // AI-assigned severity score
    reviewedBy: null,
    reviewNote: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  reports.push(report);

  // Simulate AI moderation (in production, call Gemini API)
  const severity = simulateAIModeration(reason, description);
  report.severity = severity;

  // Auto-suspend for high severity
  if (severity >= 8) {
    suspendedAccounts.set(reportedUserId, {
      reason: 'Auto-suspended: ' + reason,
      severity,
      suspendedAt: new Date().toISOString(),
      appealable: true,
    });
    report.status = 'auto-suspended';
    console.log(`[${new Date().toISOString()}] AUTO-SUSPENDED user ${reportedUserId} (severity: ${severity})`);
  } else if (severity >= 5) {
    report.status = 'pending-review';
    console.log(`[${new Date().toISOString()}] Report queued for review: ${report.id} (severity: ${severity})`);
  } else {
    report.status = 'dismissed';
    report.reviewNote = 'AI determined severity below threshold';
    console.log(`[${new Date().toISOString()}] Report dismissed: ${report.id} (severity: ${severity})`);
  }

  res.json({
    success: true,
    reportId: report.id,
    status: report.status,
    message: report.status === 'auto-suspended'
      ? 'This user has been automatically suspended pending review.'
      : 'Report submitted. Our team will review it within 24 hours.',
  });
}));

// Get reports (admin)
router.get('/reports', asyncHandler(async (req, res) => {
  const { status } = req.query;
  let filtered = reports;
  if (status) {
    filtered = reports.filter(r => r.status === status);
  }
  res.json({ reports: filtered, total: filtered.length });
}));

// Review a report (admin)
router.post('/reports/:reportId/review', [
  body('reviewerId').notEmpty(),
  body('action').isIn(['dismiss', 'warn', 'suspend', 'ban']),
  body('note').optional().isLength({ max: 500 }),
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }

  const { reportId } = req.params;
  const { reviewerId, action, note } = req.body;

  const report = reports.find(r => r.id === reportId);
  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }

  report.status = action === 'dismiss' ? 'dismissed' : 'resolved';
  report.reviewedBy = reviewerId;
  report.reviewNote = note || '';
  report.updatedAt = new Date().toISOString();

  // Take action on reported user
  if (action === 'suspend') {
    suspendedAccounts.set(report.reportedUserId, {
      reason: note || 'Suspended after review',
      severity: report.severity,
      suspendedAt: new Date().toISOString(),
      appealable: true,
    });
  } else if (action === 'ban') {
    suspendedAccounts.set(report.reportedUserId, {
      reason: note || 'Banned after review',
      severity: 10,
      suspendedAt: new Date().toISOString(),
      appealable: false,
      banned: true,
    });
  } else if (action === 'warn') {
    // In production, send warning notification
    console.log(`Warning sent to user ${report.reportedUserId}`);
  }

  console.log(`[${new Date().toISOString()}] Report ${reportId} reviewed: ${action} by ${reviewerId}`);

  res.json({ success: true, report });
}));

// Check if user is suspended
router.get('/status/:userId', asyncHandler(async (req, res) => {
  const suspension = suspendedAccounts.get(req.params.userId);

  if (!suspension) {
    return res.json({ suspended: false });
  }

  res.json({
    suspended: true,
    reason: suspension.reason,
    appealable: suspension.appealable,
    suspendedAt: suspension.suspendedAt,
  });
}));

// Appeal suspension
router.post('/appeal', [
  body('userId').notEmpty(),
  body('reason').isLength({ min: 10, max: 1000 }).withMessage('Appeal reason must be 10-1000 characters'),
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }

  const { userId, reason } = req.body;
  const suspension = suspendedAccounts.get(userId);

  if (!suspension) {
    return res.status(404).json({ error: 'No active suspension found' });
  }

  if (!suspension.appealable) {
    return res.status(403).json({ error: 'This suspension cannot be appealed' });
  }

  // In production, queue for human review
  console.log(`[${new Date().toISOString()}] Appeal submitted for user ${userId}`);

  res.json({
    success: true,
    message: 'Your appeal has been submitted. Our team will review it within 48 hours.'
  });
}));

// Safety check-in (post-meetup)
router.post('/safety-checkin', [
  body('userId').notEmpty(),
  body('meetupId').notEmpty(),
  body('status').isIn(['safe', 'concern', 'emergency']),
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }

  const { userId, meetupId, status, notes } = req.body;

  console.log(`[${new Date().toISOString()}] Safety check-in: User ${userId}, Meetup ${meetupId}, Status: ${status}`);

  if (status === 'emergency') {
    // In production: trigger emergency protocol, notify contacts
    console.log(`EMERGENCY: User ${userId} reported emergency for meetup ${meetupId}`);
  }

  res.json({ success: true, message: 'Thank you for checking in. Stay safe!' });
}));

// Get crisis hotlines
router.get('/hotlines/:region', asyncHandler(async (req, res) => {
  const hotlines = {
    NG: [{ name: 'SUPEV (Suicide Research & Prevention)', number: '0806 210 6493', available: '24/7' }],
    US: [{ name: '988 Suicide & Crisis Lifeline', number: '988', available: '24/7' }],
    UK: [{ name: 'Samaritans', number: '116 123', available: '24/7' }],
    IN: [{ name: 'iCall Helpline', number: '9152987821', available: '8am-10pm' }],
    BR: [{ name: 'CVV (Centro de Valorizacao da Vida)', number: '188', available: '24/7' }],
    SG: [{ name: 'Samaritans of Singapore', number: '1767', available: '24/7' }],
  };

  const regionHotlines = hotlines[req.params.region] || hotlines.NG;
  res.json({ hotlines: regionHotlines });
}));

// Helper: Simulate AI moderation
function simulateAIModeration(reason, description) {
  const text = `${reason} ${description || ''}`.toLowerCase();

  const severeKeywords = ['threat', 'violence', 'kill', 'attack', 'sexual'];
  const moderateKeywords = ['harass', 'bully', 'hate', 'scam', 'fake'];
  const mildKeywords = ['spam', 'annoying', 'rude'];

  let severity = 3; // default low severity

  if (severeKeywords.some(k => text.includes(k))) severity = 9;
  else if (moderateKeywords.some(k => text.includes(k))) severity = 6;
  else if (mildKeywords.some(k => text.includes(k))) severity = 4;

  // Add randomness for realism
  severity += Math.floor(Math.random() * 2) - 1;

  return Math.max(1, Math.min(10, severity));
}

export default router;
