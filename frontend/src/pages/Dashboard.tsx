import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, RefreshCw, TrendingUp, Users, MessageCircle, Heart, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import MatchCard from '../components/MatchCard';
import MoodIndicator from '../components/MoodIndicator';
import { FadeUp } from '../lib/animate';

const mockMatches = [
  {
    name: 'Amara',
    age: 28,
    location: 'Lagos, Nigeria',
    compatibility: 94,
    interests: ['Art', 'Philosophy', 'Travel', 'Cooking'],
    bio: 'Creative soul who loves exploring new cultures and having deep conversations over good food.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
  },
  {
    name: 'Priya',
    age: 25,
    location: 'Mumbai, India',
    compatibility: 87,
    interests: ['Meditation', 'Writing', 'Nature', 'Yoga'],
    bio: 'Introvert who loves quiet mornings, journaling, and deep talks about life.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    name: 'Marcus',
    age: 32,
    location: 'Toronto, Canada',
    compatibility: 82,
    interests: ['Gaming', 'Hiking', 'Music', 'Photography'],
    bio: 'Tech enthusiast and outdoor lover. The best friendships start with shared adventures.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'Yuki',
    age: 23,
    location: 'Tokyo, Japan',
    compatibility: 91,
    interests: ['Anime', 'Learning Languages', 'Cooking', 'Astronomy'],
    bio: 'Curious about everything. I love learning new things and sharing them with people.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
  },
];

const recentActivity = [
  { name: 'Amara', action: 'accepted your friend request', time: '2 minutes ago' },
  { name: 'Marcus', action: 'sent you a message', time: '15 minutes ago' },
  { name: 'Priya', action: 'liked your profile', time: '1 hour ago' },
];

export default function Dashboard() {
  const [mood, setMood] = useState<'great' | 'good' | 'okay' | 'low'>('good');
  const [matches, setMatches] = useState(mockMatches);
  const [showFilters, setShowFilters] = useState(false);
  const [minCompat, setMinCompat] = useState(80);

  const filteredMatches = matches.filter(m => m.compatibility >= minCompat);

  const handleRefresh = () => {
    setMatches(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="min-h-screen bg-linen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        {/* Welcome Header */}
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-ink mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Welcome back
              </h1>
              <p className="text-slate">How are you feeling today?</p>
            </div>
            <MoodIndicator selected={mood} onSelect={setMood} />
          </div>
        </FadeUp>

        {/* Stats Row */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Users, label: 'New Matches', value: 12, color: 'text-amber' },
              { icon: MessageCircle, label: 'Active Chats', value: 5, color: 'text-moss' },
              { icon: Heart, label: 'Friends Made', value: 8, color: 'text-brick' },
              { icon: TrendingUp, label: 'Profile Views', value: 34, color: 'text-slate' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl p-5 bg-white border border-pebble flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-linen flex items-center justify-center">
                  <stat.icon size={18} className={stat.color} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-ink" style={{ fontFamily: 'var(--font-mono)' }}>{stat.value}</p>
                  <p className="text-xs text-slate">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Matches Column */}
          <div className="lg:col-span-2">
            <FadeUp delay={0.2}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                  Your Top Matches
                </h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-pebble text-sm transition-all cursor-pointer ${showFilters ? 'bg-amber/10 text-amber' : 'bg-white text-slate hover:bg-linen'}`}>
                    <Filter size={14} /> Filter
                  </button>
                  <button
                    onClick={handleRefresh}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-pebble text-sm text-slate hover:bg-linen transition-all cursor-pointer"
                  >
                    <RefreshCw size={14} /> Refresh
                  </button>
                </div>
              </div>
            </FadeUp>

            {showFilters && (
              <FadeUp>
                <div className="mb-6 p-4 rounded-2xl bg-white border border-pebble flex items-center gap-4">
                  <span className="text-sm font-medium text-ink">Minimum Compatibility: {minCompat}%</span>
                  <input 
                    type="range" 
                    min="50" max="100" 
                    value={minCompat} 
                    onChange={e => setMinCompat(Number(e.target.value))}
                    className="flex-1 accent-amber"
                  />
                </div>
              </FadeUp>
            )}

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {filteredMatches.length > 0 ? filteredMatches.map((match, i) => (
                <FadeUp key={match.name} delay={0.15 + i * 0.08}>
                  <MatchCard
                    {...match}
                    onLike={() => {}}
                    onPass={() => {}}
                    onChat={() => {}}
                  />
                </FadeUp>
              )) : (
                <div className="col-span-2 text-center py-10 text-slate">
                  No matches found for this criteria. Try lowering the compatibility requirement!
                </div>
              )}
            </div>

            <FadeUp delay={0.6}>
              <div className="mt-8 text-center">
                <Link
                  to="/onboarding"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber/10 text-amber font-medium text-sm hover:bg-amber/20 transition-colors"
                >
                  <Sparkles size={16} /> Update Preferences for Better Matches
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <FadeUp delay={0.3}>
              <div className="rounded-2xl p-6 bg-white border border-pebble">
                <h3 className="text-lg font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber/10 flex items-center justify-center text-amber font-semibold text-sm flex-shrink-0">
                        {activity.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-ink">
                          <span className="font-semibold">{activity.name}</span>{' '}
                          {activity.action}
                        </p>
                        <p className="text-xs text-slate" style={{ fontFamily: 'var(--font-mono)' }}>{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Quick Actions */}
            <FadeUp delay={0.4}>
              <div className="rounded-2xl p-6 bg-white border border-pebble">
                <h3 className="text-lg font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  {[
                    { to: '/chat', label: 'Start a Conversation', icon: MessageCircle },
                    { to: '/profile', label: 'Edit Your Profile', icon: Heart },
                    { to: '/safety', label: 'Safety Resources', icon: Users },
                    { to: '/settings', label: 'Account Settings', icon: RefreshCw },
                  ].map(action => (
                    <Link
                      key={action.to}
                      to={action.to}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate hover:text-ink hover:bg-pebble/20 transition-all"
                    >
                      <action.icon size={16} />
                      {action.label}
                    </Link>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Connection Health */}
            <FadeUp delay={0.5}>
              <div className="rounded-2xl p-6 bg-white border border-pebble text-center">
                <h3 className="text-lg font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  Connection Health
                </h3>
                <p className="text-sm text-slate mb-4">Your social wellness score</p>
                <p className="text-4xl font-bold text-amber" style={{ fontFamily: 'var(--font-mono)' }}>85%</p>
                <p className="text-sm text-slate mt-4">
                  You are doing great! Keep connecting with your matches.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </div>
  );
}
