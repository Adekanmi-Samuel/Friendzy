const users = [
  { id: '1', name: 'Sofia R.', age: 28, location: 'São Paulo, Brazil', compatibility: 89, interests: ['Cooking', 'Music', 'Hiking'], bio: 'Love trying new recipes!', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400', online: true },
  { id: '2', name: 'Kwame A.', age: 31, location: 'Accra, Ghana', compatibility: 82, interests: ['Tech', 'Photography', 'Jazz'], bio: 'Software developer by day.', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', online: true },
  { id: '3', name: 'Mei L.', age: 26, location: 'Singapore', compatibility: 76, interests: ['Art', 'Yoga', 'Travel'], bio: 'Finding beauty in everyday moments.', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400', online: false },
  { id: '4', name: 'Erik K.', age: 34, location: 'Berlin, Germany', compatibility: 71, interests: ['Reading', 'Cycling', 'Movies'], bio: 'Book club organizer and weekend cyclist.', image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400', online: true },
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  res.json({ users, total: users.length });
}
