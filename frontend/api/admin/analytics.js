export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  res.json({
    signups: { today: 12, week: 78, month: 312 },
    matches: { today: 56, week: 389, month: 1456 },
    calls: { today: 23, week: 167, month: 634 },
    revenue: { today: 45000, month: 899000, currency: 'NGN' },
    retention: { day1: 65, day7: 42, day30: 28 },
    topRegions: [{ region: 'Nigeria', users: 456 }, { region: 'UK', users: 234 }, { region: 'USA', users: 189 }],
  });
}
