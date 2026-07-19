const demoUsers = {
  'sofia@example.com': { id: 'demo-sofia', name: 'Sofia R.', email: 'sofia@example.com', location: 'São Paulo, Brazil', interests: ['Cooking', 'Music', 'Hiking'], bio: 'Love trying new recipes!', trustScore: 87, verified: true, password: 'password123' },
  'kwame@example.com': { id: 'demo-kwame', name: 'Kwame A.', email: 'kwame@example.com', location: 'Accra, Ghana', interests: ['Tech', 'Photography', 'Jazz'], bio: 'Software developer by day.', trustScore: 91, verified: true, password: 'password123' },
  'admin@friendzy.com': { id: 'demo-admin', name: 'Admin', email: 'admin@friendzy.com', location: 'Global', interests: [], bio: 'Platform admin', trustScore: 100, verified: true, premium: true, password: 'password123' },
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const user = demoUsers[email];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const { password: _, ...safeUser } = user;
  const token = `token_${user.id}`;
  res.json({ user: safeUser, token });
}
