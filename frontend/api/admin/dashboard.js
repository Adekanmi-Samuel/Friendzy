export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  res.json({
    stats: { totalUsers: 1247, activeToday: 342, premiumUsers: 89, reportsPending: 3, revenue: { mrr: 899000 } },
    recentActivity: [
      { type: 'signup', user: 'New user registered', time: '2 min ago' },
      { type: 'match', user: 'New match created', time: '5 min ago' },
    ],
  });
}
