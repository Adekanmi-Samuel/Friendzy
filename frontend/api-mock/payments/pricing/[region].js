const pricing = {
  NG: { region: 'NG', premium: 500000, vip: 1000000, currency: 'NGN' },
  US: { region: 'US', premium: 999, vip: 2999, currency: 'USD' },
  UK: { region: 'UK', premium: 799, vip: 1599, currency: 'GBP' },
  IN: { region: 'IN', premium: 599, vip: 1299, currency: 'USD' },
  BR: { region: 'BR', premium: 799, vip: 1599, currency: 'USD' },
  EU: { region: 'EU', premium: 899, vip: 1799, currency: 'EUR' },
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { region } = req.query;
  const data = pricing[region] || pricing.NG;
  res.json(data);
}
