export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;
  if (email === 'admin@friendzy.com' && password === 'admin123') {
    res.json({ admin: { id: 'admin-1', email, name: 'Admin', role: 'admin' }, token: 'admin_token_123' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}
