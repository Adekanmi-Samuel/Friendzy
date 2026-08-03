const matches = [
  { id: '1', name: 'Sofia R.', age: 28, location: 'São Paulo, Brazil', compatibility: 89, interests: ['Cooking', 'Music', 'Hiking'], bio: 'Love trying new recipes!' },
  { id: '2', name: 'Kwame A.', age: 31, location: 'Accra, Ghana', compatibility: 82, interests: ['Tech', 'Photography', 'Jazz'], bio: 'Software developer by day.' },
  { id: '3', name: 'Mei L.', age: 26, location: 'Singapore', compatibility: 76, interests: ['Art', 'Yoga', 'Travel'], bio: 'Finding beauty in everyday moments.' },
  { id: '4', name: 'Erik K.', age: 34, location: 'Berlin, Germany', compatibility: 71, interests: ['Reading', 'Cycling', 'Movies'], bio: 'Book club organizer.' },
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  res.json({ matches, total: matches.length });
}
