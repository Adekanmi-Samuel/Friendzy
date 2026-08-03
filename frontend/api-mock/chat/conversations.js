const conversations = [
  { id: 'conv-1', participants: ['me', 'sofia'], lastMessage: 'Com certeza! Que tal neste sábado? ☕', lastMessageTime: new Date().toISOString(), unread: 1 },
  { id: 'conv-2', participants: ['me', 'amara'], lastMessage: 'That café was amazing! 🤩', lastMessageTime: new Date(Date.now() - 3600000).toISOString(), unread: 0 },
  { id: 'conv-3', participants: ['me', 'james'], lastMessage: 'See you Saturday for the hike!', lastMessageTime: new Date(Date.now() - 10800000).toISOString(), unread: 0 },
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  res.json({ conversations });
}
