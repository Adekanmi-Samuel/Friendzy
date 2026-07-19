import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { asyncHandler } from '../middleware/errorHandler.js';
import { body, validationResult } from 'express-validator';

const router = Router();

// In-memory store
const verifications = new Map();

// Submit verification request
router.post('/submit', [
  body('userId').notEmpty().withMessage('User ID required'),
  body('idType').isIn(['national_id', 'passport', 'drivers_license']).withMessage('Valid ID type required'),
  body('fullName').trim().isLength({ min: 2, max: 100 }).withMessage('Full name required'),
  body('dateOfBirth').isISO8601().withMessage('Valid date of birth required'),
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }

  const { userId, idType, fullName, dateOfBirth } = req.body;

  // Check if already pending
  const existing = verifications.get(userId);
  if (existing && existing.status === 'pending') {
    return res.status(409).json({ error: 'Verification already in progress' });
  }

  const verification = {
    id: uuidv4(),
    userId,
    idType,
    fullName,
    dateOfBirth,
    status: 'pending', // pending, reviewing, approved, rejected
    documents: [], // In production: store file URLs
    reviewedBy: null,
    reviewNote: null,
    submittedAt: new Date().toISOString(),
    reviewedAt: null,
  };

  verifications.set(userId, verification);

  console.log(`[${new Date().toISOString()}] Verification submitted: ${userId} (${idType})`);

  res.status(201).json({
    success: true,
    verificationId: verification.id,
    status: 'pending',
    message: 'Verification submitted. Our team will review within 24 hours.',
  });
}));

// Get verification status
router.get('/status/:userId', asyncHandler(async (req, res) => {
  const verification = verifications.get(req.params.userId);

  if (!verification) {
    return res.json({ verified: false, status: 'not_submitted' });
  }

  res.json({
    verified: verification.status === 'approved',
    status: verification.status,
    submittedAt: verification.submittedAt,
    reviewedAt: verification.reviewedAt,
    rejectionReason: verification.status === 'rejected' ? verification.reviewNote : null,
  });
}));

// Admin: Get all pending verifications
router.get('/pending', asyncHandler(async (req, res) => {
  const pending = Array.from(verifications.values()).filter(v => v.status === 'pending');
  res.json({ verifications: pending, total: pending.length });
}));

// Admin: Review verification
router.post('/:userId/review', [
  body('reviewerId').notEmpty(),
  body('action').isIn(['approve', 'reject']),
  body('note').optional().isLength({ max: 500 }),
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }

  const { userId } = req.params;
  const { reviewerId, action, note } = req.body;

  const verification = verifications.get(userId);
  if (!verification) {
    return res.status(404).json({ error: 'Verification not found' });
  }

  verification.status = action === 'approve' ? 'approved' : 'rejected';
  verification.reviewedBy = reviewerId;
  verification.reviewNote = note || '';
  verification.reviewedAt = new Date().toISOString();

  console.log(`[${new Date().toISOString()}] Verification ${action}d for ${userId} by ${reviewerId}`);

  res.json({ success: true, verification });
}));

// Admin: Get verification stats
router.get('/stats', asyncHandler(async (req, res) => {
  const all = Array.from(verifications.values());
  res.json({
    total: all.length,
    pending: all.filter(v => v.status === 'pending').length,
    approved: all.filter(v => v.status === 'approved').length,
    rejected: all.filter(v => v.status === 'rejected').length,
  });
}));

export default router;
