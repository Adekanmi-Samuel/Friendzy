import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();

// In-memory stores (replace with database in production)
const adminUsers = new Map();
const adminLogs = [];

// Simple admin auth middleware
const requireAdmin = (req, res, next) => {
  const adminId = req.headers['x-admin-id'];
  if (!adminId) {
    return res.status(401).json({ error: 'Admin authentication required' });
  }
  req.adminId = adminId;
  next();
};

// Admin login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // In production: validate against admin database
  if (email === 'admin@friendzy.com' && password === 'admin123') {
    const admin = { id: uuidv4(), email, name: 'Admin', role: 'admin' };
    res.json({ admin, token: `admin_${admin.id}` });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}));

// Dashboard stats
router.get('/dashboard', requireAdmin, asyncHandler(async (req, res) => {
  // In production: query database for real stats
  res.json({
    stats: {
      totalUsers: 1247,
      activeToday: 342,
      premiumUsers: 89,
      vipUsers: 12,
      matchesToday: 56,
      reportsPending: 3,
      revenue: {
        mrr: 899000, // kobo
        total: 2697000,
        currency: 'NGN',
      },
      verificationPending: 5,
    },
    recentActivity: [
      { type: 'signup', user: 'New user registered', time: '2 min ago' },
      { type: 'match', user: 'New match created', time: '5 min ago' },
      { type: 'report', user: 'Report submitted', time: '12 min ago' },
      { type: 'payment', user: 'Premium subscription activated', time: '15 min ago' },
      { type: 'verification', user: 'ID verification approved', time: '20 min ago' },
    ],
  });
}));

// Get all users
router.get('/users', requireAdmin, asyncHandler(async (req, res) => {
  const { search, status, region, limit = 20 } = req.query;

  // Mock users for demo
  const users = [
    { id: '1', name: 'Sofia R.', email: 'sofia@example.com', region: 'BR', verified: true, premium: false, trustScore: 87, lastActive: '2 min ago' },
    { id: '2', name: 'Kwame A.', email: 'kwame@example.com', region: 'NG', verified: true, premium: true, trustScore: 91, lastActive: '5 min ago' },
    { id: '3', name: 'Mei L.', email: 'mei@example.com', region: 'SG', verified: false, premium: false, trustScore: 72, lastActive: '1 hour ago' },
    { id: '4', name: 'Erik K.', email: 'erik@example.com', region: 'EU', verified: true, premium: true, trustScore: 88, lastActive: '3 min ago' },
    { id: '5', name: 'Amara K.', email: 'amara@example.com', region: 'NG', verified: true, premium: false, trustScore: 94, lastActive: '1 min ago' },
  ];

  let filtered = users;
  if (search) filtered = filtered.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  if (region) filtered = filtered.filter(u => u.region === region);

  res.json({ users: filtered, total: filtered.length });
}));

// Block user
router.post('/users/:userId/block', requireAdmin, asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { reason, duration } = req.body;

  adminLogs.push({
    action: 'block_user',
    targetId: userId,
    adminId: req.adminId,
    details: { reason, duration },
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true, message: `User ${userId} blocked` });
}));

// Verify user
router.post('/users/:userId/verify', requireAdmin, asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  adminLogs.push({
    action: 'verify_user',
    targetId: userId,
    adminId: req.adminId,
    details: { status },
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true, verified: status === 'approved' });
}));

// Get reports
router.get('/reports', requireAdmin, asyncHandler(async (req, res) => {
  const { status } = req.query;

  const reports = [
    { id: '1', reportedUser: 'Suspicious User', reporter: 'Sofia R.', reason: 'fake_profile', status: 'pending', createdAt: '2 hours ago', severity: 6 },
    { id: '2', reportedUser: 'Toxic User', reporter: 'Kwame A.', reason: 'harassment', status: 'pending', createdAt: '5 hours ago', severity: 8 },
    { id: '3', reportedUser: 'Spam Bot', reporter: 'Mei L.', reason: 'spam', status: 'resolved', createdAt: '1 day ago', severity: 4 },
  ];

  let filtered = reports;
  if (status) filtered = filtered.filter(r => r.status === status);

  res.json({ reports: filtered, total: filtered.length });
}));

// Review report
router.post('/reports/:reportId/review', requireAdmin, asyncHandler(async (req, res) => {
  const { reportId } = req.params;
  const { action, adminNotes } = req.body;

  adminLogs.push({
    action: 'review_report',
    targetId: reportId,
    adminId: req.adminId,
    details: { action, adminNotes },
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true, reportId, action });
}));

// Get verifications
router.get('/verifications', requireAdmin, asyncHandler(async (req, res) => {
  const verifications = [
    { userId: '3', name: 'Mei L.', idType: 'passport', submittedAt: '3 hours ago', status: 'pending' },
    { userId: '6', name: 'New User', idType: 'national_id', submittedAt: '1 day ago', status: 'pending' },
  ];
  res.json({ verifications, total: verifications.length });
}));

// Get analytics
router.get('/analytics', requireAdmin, asyncHandler(async (req, res) => {
  res.json({
    signups: { today: 12, week: 78, month: 312 },
    matches: { today: 56, week: 389, month: 1456 },
    calls: { today: 23, week: 167, month: 634 },
    revenue: { today: 45000, week: 315000, month: 899000, currency: 'NGN' },
    retention: { day1: 65, day7: 42, day30: 28 },
    topRegions: [
      { region: 'Nigeria', users: 456, percentage: 36 },
      { region: 'UK', users: 234, percentage: 19 },
      { region: 'USA', users: 189, percentage: 15 },
      { region: 'India', users: 178, percentage: 14 },
      { region: 'Brazil', users: 190, percentage: 15 },
    ],
  });
}));

export default router;
