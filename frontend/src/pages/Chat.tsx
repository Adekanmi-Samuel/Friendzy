import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, ArrowLeft, Smile, Paperclip, Shield, MoreVertical, Phone, Video, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import ConnectionRing from '../components/ConnectionRing';
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

const starters = [
  'What is the best trip you have ever taken?',
  'If you could learn any skill overnight, what would it be?',
  'What is something that always makes you smile?',
  'What book or show has changed your perspective recently?',
];

export default function Chat() {
  const [selectedContact, setSelectedContact] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [showMood, setShowMood] = useState(false);
  const [showStarters, setShowStarters] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { sender: 'me', text: message, time: 'now' }]);
    setMessage('');
    setShowStarters(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const useStarter = (starter: string) => {
    setMessage(starter);
    setShowStarters(false);
  };

  return (
    <div className="min-h-screen bg-warm-white flex flex-col">
      <Navbar />

      <div className="flex-1 flex pt-20">
        {/* Contacts Sidebar */}
        <div className={`${selectedContact !== -1 ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 lg:w-96 border-r border-warm-beige/30 bg-white/50`}>
          <div className="p-4 border-b border-warm-beige/30">
            <h2 className="text-xl font-semibold text-deep-navy mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Conversations
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search friends..."
                className="w-full px-4 py-2.5 rounded-xl bg-warm-beige/20 text-sm text-deep-navy placeholder:text-muted-slate/50 focus:outline-none focus:ring-2 focus:ring-warm-gold/30"
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
                    ? 'bg-warm-gold/10 border-r-2 border-warm-gold'
                    : 'hover:bg-warm-beige/20'
                }`}
              >
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-warm-gold to-sage-green flex items-center justify-center text-white font-semibold">
                    {contact.name[0]}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    contact.status === 'online' ? 'bg-sage-green' :
                    contact.status === 'away' ? 'bg-warm-gold' : 'bg-muted-slate/30'
                  }`} />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-deep-navy">{contact.name}</span>
                    <span className="text-xs text-muted-slate">{contact.time}</span>
                  </div>
                  <p className="text-sm text-muted-slate truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-warm-gold text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
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
          <div className="flex items-center justify-between px-4 md:px-6 py-3 bg-white/80 backdrop-blur-xl border-b border-warm-beige/30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedContact(-1)}
                className="md:hidden p-2 rounded-xl hover:bg-warm-beige/20 text-deep-navy cursor-pointer"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-warm-gold to-sage-green flex items-center justify-center text-white font-semibold text-sm">
                {contacts[selectedContact]?.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-deep-navy text-sm">{contacts[selectedContact]?.name}</h3>
                  <SafeSpaceBadge size="sm" />
                </div>
                <p className="text-xs text-muted-slate">
                  {contacts[selectedContact]?.status === 'online' ? 'Online now' :
                   contacts[selectedContact]?.status === 'away' ? 'Away' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ConnectionRing score={contacts[selectedContact]?.compatibility || 0} size={36} strokeWidth={2.5} />
              <button className="p-2 rounded-xl hover:bg-warm-beige/20 text-muted-slate transition-colors cursor-pointer">
                <Phone size={16} />
              </button>
              <button className="p-2 rounded-xl hover:bg-warm-beige/20 text-muted-slate transition-colors cursor-pointer">
                <Video size={16} />
              </button>
              <button className="p-2 rounded-xl hover:bg-warm-beige/20 text-muted-slate transition-colors cursor-pointer">
                <Info size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-3">
            {/* Conversation Starters Banner */}
            <FadeUp>
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => setShowStarters(!showStarters)}
                  className="px-4 py-2 rounded-full bg-warm-gold/10 text-warm-gold text-xs font-medium hover:bg-warm-gold/20 transition-colors cursor-pointer"
                >
                  Need a conversation starter?
                </button>
              </div>
            </FadeUp>

            {showStarters && (
              <FadeUp>
                <div className="bg-white rounded-2xl p-4 mb-4 border border-warm-beige/30 shadow-sm">
                  <p className="text-xs font-semibold text-muted-slate mb-3 uppercase tracking-wider">Try saying...</p>
                  <div className="space-y-2">
                    {starters.map((starter, i) => (
                      <button
                        key={i}
                        onClick={() => useStarter(starter)}
                        className="w-full text-left px-3 py-2 rounded-xl text-sm text-deep-navy hover:bg-warm-beige/20 transition-colors cursor-pointer"
                      >
                        {starter}
                      </button>
                    ))}
                  </div>
                </div>
              </FadeUp>
            )}

            {/* Safe Space Reminder */}
            <div className="flex justify-center mb-2">
              <span className="px-3 py-1 rounded-full bg-sage-green/10 text-sage-green text-[10px] font-medium flex items-center gap-1">
                <Shield size={10} /> This is a safe space — be yourself
              </span>
            </div>

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md px-4 py-2.5 ${
                  msg.sender === 'me' ? 'msg-sent' : 'msg-received'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-white/50' : 'text-muted-slate/50'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Mood Check */}
          {showMood && (
            <div className="px-4 md:px-6 py-3 border-t border-warm-beige/20 bg-white/50">
              <p className="text-xs text-muted-slate mb-2">How are you feeling right now?</p>
              <MoodIndicator compact onSelect={() => setShowMood(false)} />
            </div>
          )}

          {/* Message Input */}
          <div className="px-4 md:px-6 py-4 bg-white/80 backdrop-blur-xl border-t border-warm-beige/30">
            <div className="flex items-end gap-2">
              <button
                onClick={() => setShowMood(!showMood)}
                className="p-2.5 rounded-xl hover:bg-warm-beige/20 text-muted-slate transition-colors cursor-pointer"
              >
                <Smile size={18} />
              </button>
              <button className="p-2.5 rounded-xl hover:bg-warm-beige/20 text-muted-slate transition-colors cursor-pointer">
                <Paperclip size={18} />
              </button>
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  rows={1}
                  className="w-full px-4 py-2.5 rounded-2xl bg-warm-beige/20 text-sm text-deep-navy placeholder:text-muted-slate/50 focus:outline-none focus:ring-2 focus:ring-warm-gold/30 resize-none"
                />
              </div>
              <HoverScaleButton scale={1.1}>
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                    message.trim()
                      ? 'bg-deep-navy text-white hover:bg-navy-light'
                      : 'bg-warm-beige/30 text-muted-slate/30 cursor-not-allowed'
                  }`}
                >
                  <Send size={18} />
                </button>
              </HoverScaleButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HoverScaleButton({ children, scale = 1.05 }: { children: React.ReactNode; scale?: number }) {
  return (
    <div
      style={{ transition: 'transform 0.2s ease' }}
      onMouseEnter={e => (e.currentTarget.style.transform = `scale(${scale})`)}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {children}
    </div>
  );
}
