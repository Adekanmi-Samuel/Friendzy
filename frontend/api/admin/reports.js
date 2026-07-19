const reports = [
  { id: '1', reportedUser: 'Suspicious User', reporter: 'Sofia R.', reason: 'fake_profile', status: 'pending', severity: 6 },
  { id: '2', reportedUser: 'Toxic User', reporter: 'Kwame A.', reason: 'harassment', status: 'pending', severity: 8 },
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  res.json({ reports, total: reports.length });
}
