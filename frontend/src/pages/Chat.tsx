import { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, Smile, Shield, Phone, Video, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import SafeSpaceBadge from '../components/SafeSpaceBadge';
import MoodIndicator from '../components/MoodIndicator';
import { FadeUp } from '../lib/animate';

const contacts = [
  { name: 'Amara', status: 'online', lastMessage: 'That sounds amazing!', time: '2m', compatibility: 94, unread: 2 },
  { name: 'Marcus', status: 'online', lastMessage: 'Have you tried that new cafe?', time: '15m', compatibility: 82, unread: 0 },
  { name: 'Priya', status: 'away', lastMessage: 'I will send you the article', time: '1h', compatibility: 87, unread: 1 },
  { name: 'Yuki', status: 'offline', lastMessage: 'Great chatting with you!', time: '3h', compatibility: 91, unread: 0 },
  { name: 'Chen', status: 'online', lastMessage: 'Let us plan something!', time: '5h', compatibility: 78, unread: 0 },
];

const mockMessages = [
  { sender: 'them', text: 'Hey! I noticed we both love hiking and photography. Have you done any good trails recently?', time: '10:30 AM' },
  { sender: 'me', text: 'Yes! I went to this beautiful nature reserve last weekend. The sunrise views were incredible.', time: '10:32 AM' },
  { sender: 'them', text: 'That sounds amazing! I have been wanting to explore more trails around here. Would love to hear more about it.', time: '10:33 AM' },
  { sender: 'me', text: 'Absolutely! We should totally plan a hike together sometime. I know a few great spots.', time: '10:35 AM' },
  { sender: 'them', text: 'That would be wonderful! It is so nice to meet someone who shares similar interests. What other outdoor activities do you enjoy?', time: '10:36 AM' },
  { sender: 'me', text: 'I am also really into stargazing and camping. There is something magical about being out in nature under the stars.', time: '10:38 AM' },
  { sender: 'them', text: 'Oh I love that! I actually have a small telescope. We should do a camping trip sometime — stargazing, campfire conversations, the whole experience!', time: '10:39 AM' },
];

export default function Chat() {
  const [selectedContact, setSelectedContact] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [showMood, setShowMood] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { sender: 'me', text: message, time: 'now' }]);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-linen flex flex-col">
      <Navbar />

      <div className="flex-1 flex pt-20">
        {/* Contacts Sidebar */}
        <div className={`${selectedContact !== -1 ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 lg:w-96 border-r border-pebble bg-white/50`}>
          <div className="p-4 border-b border-pebble">
            <h2 className="text-xl font-semibold text-ink mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Conversations
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search friends..."
                className="w-full px-4 py-2.5 rounded-xl bg-linen text-sm text-ink placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-amber/30 border border-pebble"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact, i) => (
              <button
                key={contact.name}
                onClick={() => setSelectedContact(i)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 transition-all cursor-pointer ${
                  selectedContact === i
                    ? 'bg-amber/5 border-l-3 border-amber'
                    : 'hover:bg-pebble/20 border-l-3 border-transparent'
                }`}
              >
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-amber/10 flex items-center justify-center text-amber font-semibold">
                    {contact.name[0]}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    contact.status === 'online' ? 'bg-moss' :
                    contact.status === 'away' ? 'bg-amber' : 'bg-pebble'
                  }`} />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-ink">{contact.name}</span>
                    <span className="text-xs text-slate" style={{ fontFamily: 'var(--font-mono)' }}>{contact.time}</span>
                  </div>
                  <p className="text-sm text-slate truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-amber text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {contact.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${selectedContact === -1 ? 'hidden' : 'flex'} flex-col flex-1`}>
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-white border-b border-pebble">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedContact(-1)}
                className="md:hidden p-2 rounded-xl hover:bg-pebble/20 text-ink cursor-pointer"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="w-10 h-10 rounded-full bg-amber/10 flex items-center justify-center text-amber font-semibold text-sm">
                {contacts[selectedContact]?.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-ink text-sm">{contacts[selectedContact]?.name}</h3>
                  <SafeSpaceBadge size="sm" />
                </div>
                <p className="text-xs text-slate">
                  {contacts[selectedContact]?.status === 'online' ? 'Online now' :
                   contacts[selectedContact]?.status === 'away' ? 'Away' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-ink mr-2" style={{ fontFamily: 'var(--font-mono)' }}>
                {contacts[selectedContact]?.compatibility}%
              </span>
              <button className="p-2 rounded-xl hover:bg-pebble/20 text-slate transition-colors cursor-pointer">
                <Phone size={16} />
              </button>
              <button className="p-2 rounded-xl hover:bg-pebble/20 text-slate transition-colors cursor-pointer">
                <Video size={16} />
              </button>
              <button className="p-2 rounded-xl hover:bg-pebble/20 text-slate transition-colors cursor-pointer">
                <Info size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-3">
            {/* Safe Space Reminder */}
            <div className="flex justify-center mb-2">
              <span className="px-3 py-1 rounded-full bg-moss/10 text-moss text-[10px] font-medium flex items-center gap-1">
                <Shield size={10} /> This is a safe space — be yourself
              </span>
            </div>

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md px-4 py-2.5 ${
                  msg.sender === 'me' ? 'msg-sent' : 'msg-received'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-white/50' : 'text-slate/50'}`}
                     style={{ fontFamily: 'var(--font-mono)' }}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Mood Check */}
          {showMood && (
            <div className="px-4 md:px-6 py-3 border-t border-pebble bg-white/50">
              <p className="text-xs text-slate mb-2">How are you feeling right now?</p>
              <MoodIndicator compact onSelect={() => setShowMood(false)} />
            </div>
          )}

          {/* Message Input */}
          <div className="px-4 md:px-6 py-4 bg-white border-t border-pebble">
            <div className="flex items-end gap-2">
              <button
                onClick={() => setShowMood(!showMood)}
                className="p-2.5 rounded-xl hover:bg-pebble/20 text-slate transition-colors cursor-pointer"
              >
                <Smile size={18} />
              </button>
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  rows={1}
                  className="w-full px-4 py-2.5 rounded-2xl bg-linen text-sm text-ink placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-amber/30 resize-none border border-pebble"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                  message.trim()
                    ? 'bg-amber text-white hover:bg-amber-light'
                    : 'bg-pebble/30 text-slate/30 cursor-not-allowed'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
