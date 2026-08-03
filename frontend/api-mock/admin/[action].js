// Combined admin routes: login, dashboard, users, reports, analytics
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action } = req.query;

  if (action === 'login' && req.method === 'POST') {
    const { email, password } = req.body;
    if (email === 'admin@friendzy.com' && password === 'admin123') {
      return res.json({ admin: { id: 'admin-1', email, name: 'Admin', role: 'admin' }, token: 'admin_token_123' });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (action === 'dashboard') {
    return res.json({
      stats: { totalUsers: 1247, activeToday: 342, premiumUsers: 89, reportsPending: 3, revenue: { mrr: 899000 } },
      recentActivity: [
        { type: 'signup', user: 'New user registered', time: '2 min ago' },
        { type: 'match', user: 'New match created', time: '5 min ago' },
      ],
    });
  }

  if (action === 'users') {
    const users = [
      { id: '1', name: 'Sofia R.', email: 'sofia@example.com', region: 'Brazil', verified: true, trustScore: 87 },
      { id: '2', name: 'Kwame A.', email: 'kwame@example.com', region: 'Nigeria', verified: true, trustScore: 91 },
      { id: '3', name: 'Mei L.', email: 'mei@example.com', region: 'Singapore', verified: false, trustScore: 72 },
    ];
    return res.json({ users, total: users.length });
  }

  if (action === 'reports') {
    const reports = [
      { id: '1', reportedUser: 'Suspicious User', reporter: 'Sofia R.', reason: 'fake_profile', status: 'pending', severity: 6 },
      { id: '2', reportedUser: 'Toxic User', reporter: 'Kwame A.', reason: 'harassment', status: 'pending', severity: 8 },
    ];
    return res.json({ reports, total: reports.length });
  }

  if (action === 'analytics') {
    return res.json({
      signups: { today: 12, week: 78, month: 312 },
      matches: { today: 56, week: 389, month: 1456 },
      calls: { today: 23, week: 167, month: 634 },
      revenue: { today: 45000, month: 899000, currency: 'NGN' },
      retention: { day1: 65, day7: 42, day30: 28 },
      topRegions: [{ region: 'Nigeria', users: 456 }, { region: 'UK', users: 234 }, { region: 'USA', users: 189 }],
    });
  }

  res.status(404).json({ error: 'Not found' });
}
