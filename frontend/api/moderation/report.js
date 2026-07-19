export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { reporterId, reportedUserId, reason, description } = req.body;
  res.json({
    success: true,
    reportId: `report_${Date.now()}`,
    status: 'submitted',
    message: 'Report submitted. Our team will review within 24 hours.',
  });
}
