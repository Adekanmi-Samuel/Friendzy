const hotlines = {
  NG: [{ name: 'SUPEV', number: '0806 210 6493', available: '24/7' }],
  US: [{ name: '988 Suicide & Crisis Lifeline', number: '988', available: '24/7' }],
  UK: [{ name: 'Samaritans', number: '116 123', available: '24/7' }],
  IN: [{ name: 'iCall Helpline', number: '9152987821', available: '8am-10pm' }],
  BR: [{ name: 'CVV', number: '188', available: '24/7' }],
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { region } = req.query;
  res.json({ hotlines: hotlines[region] || hotlines.NG });
}
