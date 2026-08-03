// Combined auth routes: register, login, me
const demoUsers = {
  'sofia@example.com': { id: 'demo-sofia', name: 'Sofia R.', email: 'sofia@example.com', location: 'São Paulo, Brazil', interests: ['Cooking', 'Music', 'Hiking'], bio: 'Love trying new recipes!', trustScore: 87, verified: true, password: 'password123' },
  'kwame@example.com': { id: 'demo-kwame', name: 'Kwame A.', email: 'kwame@example.com', location: 'Accra, Ghana', interests: ['Tech', 'Photography', 'Jazz'], bio: 'Software developer by day.', trustScore: 91, verified: true, password: 'password123' },
  'admin@friendzy.com': { id: 'demo-admin', name: 'Admin', email: 'admin@friendzy.com', location: 'Global', interests: [], bio: 'Platform admin', trustScore: 100, verified: true, premium: true, password: 'password123' },
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action } = req.query;

  if (action === 'register' && req.method === 'POST') {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Name, email, and password are required' });
    const user = { id: `user_${Date.now()}`, name, email, location: '', bio: '', interests: [], trustScore: 50, verified: false, premium: false, region: 'US', mood: null, createdAt: new Date().toISOString() };
    return res.status(201).json({ user, token: `token_${user.id}` });
  }

  if (action === 'login' && req.method === 'POST') {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const user = demoUsers[email];
    if (!user || user.password !== password) return res.status(401).json({ error: 'Invalid email or password' });
    const { password: _, ...safeUser } = user;
    return res.json({ user: safeUser, token: `token_${user.id}` });
  }

  if (action === 'me') {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Not authenticated' });
    return res.json({ user: { id: 'user', name: 'User', email: 'user@example.com', trustScore: 50, verified: false, premium: false } });
  }

  res.status(404).json({ error: 'Not found' });
}
