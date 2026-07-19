const users = [
  { id: '1', name: 'Sofia R.', email: 'sofia@example.com', region: 'Brazil', verified: true, trustScore: 87 },
  { id: '2', name: 'Kwame A.', email: 'kwame@example.com', region: 'Nigeria', verified: true, trustScore: 91 },
  { id: '3', name: 'Mei L.', email: 'mei@example.com', region: 'Singapore', verified: false, trustScore: 72 },
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { search } = req.query;
  let filtered = users;
  if (search) filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  res.json({ users: filtered, total: filtered.length });
}
