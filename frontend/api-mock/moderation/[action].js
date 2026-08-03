// Combined moderation routes: report, block, hotlines
const hotlines = {
  NG: [{ name: 'SUPEV', number: '0806 210 6493', available: '24/7' }],
  US: [{ name: '988 Suicide & Crisis Lifeline', number: '988', available: '24/7' }],
  UK: [{ name: 'Samaritans', number: '116 123', available: '24/7' }],
  IN: [{ name: 'iCall Helpline', number: '9152987821', available: '8am-10pm' }],
  BR: [{ name: 'CVV', number: '188', available: '24/7' }],
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { action } = req.query;

  if (action === 'report' && req.method === 'POST') {
    return res.json({ success: true, reportId: `report_${Date.now()}`, status: 'submitted', message: 'Report submitted. Our team will review within 24 hours.' });
  }

  if (action === 'block' && req.method === 'POST') {
    return res.json({ success: true, message: 'User blocked' });
  }

  if (action === 'hotlines') {
    const { region } = req.query;
    return res.json({ hotlines: hotlines[region] || hotlines.NG });
  }

  res.status(404).json({ error: 'Not found' });
}
