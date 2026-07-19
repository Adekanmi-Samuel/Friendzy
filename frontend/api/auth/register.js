// Vercel serverless function
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  // In-memory store (per serverless instance)
  const user = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name, email,
    location: '', bio: '', interests: [],
    trustScore: 50, verified: false, premium: false,
    region: 'US', mood: null,
    createdAt: new Date().toISOString(),
  };

  const token = `token_${user.id}`;
  res.status(201).json({ user, token });
}
