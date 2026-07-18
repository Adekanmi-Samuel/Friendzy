import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Filter, RefreshCw, TrendingUp, Users, MessageCircle, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import MatchCard from '../components/MatchCard';
import ConnectionRing from '../components/ConnectionRing';
import MoodIndicator from '../components/MoodIndicator';
import { FadeUp, HoverScale } from '../lib/animate';

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const mockMatches = [
  {
    name: 'Amara',
    age: 28,
    location: 'Lagos, Nigeria',
    compatibility: 94,
    interests: ['Art', 'Philosophy', 'Travel', 'Cooking'],
    bio: 'Creative soul who loves exploring new cultures and having deep conversations over good food. Always up for a new adventure.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
  },
  {
    name: 'Priya',
    age: 25,
    location: 'Mumbai, India',
    compatibility: 87,
    interests: ['Meditation', 'Writing', 'Nature', 'Yoga'],
    bio: 'Introvert who loves quiet mornings, journaling, and deep talks about life. Looking for friends who value authenticity.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    name: 'Marcus',
    age: 32,
    location: 'Toronto, Canada',
    compatibility: 82,
    interests: ['Gaming', 'Hiking', 'Music', 'Photography'],
    bio: 'Tech enthusiast and outdoor lover. I believe the best friendships start with shared adventures and honest conversations.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'Yuki',
    age: 23,
    location: 'Tokyo, Japan',
    compatibility: 91,
    interests: ['Anime', 'Learning Languages', 'Cooking', 'Astronomy'],
    bio: 'Curious about everything. I love learning new things and sharing them with people who are equally curious.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
  },
];

const recentActivity = [
  { name: 'Amara', action: 'accepted your friend request', time: '2m ago', compatibility: 94 },
  { name: 'Marcus', action: 'sent you a message', time: '15m ago', compatibility: 82 },
  { name: 'Priya', action: 'liked your profile', time: '1h ago', compatibility: 87 },
];

export default function Dashboard() {
  const [mood, setMood] = useState<'great' | 'good' | 'okay' | 'low'>('good');
  const [matches, setMatches] = useState(mockMatches);

  const handleRefresh = () => {
    // Shuffle matches on refresh
    setMatches(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        {/* Welcome Header */}
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-deep-navy mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Welcome back
              </h1>
              <p className="text-muted-slate">How are you feeling today?</p>
            </div>
            <MoodIndicator selected={mood} onSelect={setMood} />
          </div>
        </FadeUp>

        {/* Stats Row */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Users, label: 'New Matches', value: 12, suffix: '', color: 'text-warm-gold', gradient: 'from-warm-gold/20 to-warm-gold/5' },
              { icon: MessageCircle, label: 'Active Chats', value: 5, suffix: '', color: 'text-sage-green', gradient: 'from-sage-green/20 to-sage-green/5' },
              { icon: Heart, label: 'Friends Made', value: 8, suffix: '', color: 'text-muted-red', gradient: 'from-muted-red/20 to-muted-red/5' },
              { icon: TrendingUp, label: 'Profile Views', value: 34, suffix: '', color: 'text-muted-slate', gradient: 'from-muted-slate/20 to-muted-slate/5' },
            ].map((stat) => {
              const { count, ref } = useCountUp(stat.value);
              return (
                <HoverScale key={stat.label} scale={1.02}>
                  <div ref={ref} className={`glass-card rounded-2xl p-5 flex items-center gap-4 bg-gradient-to-br ${stat.gradient} border border-warm-beige/20`}>
                    <div className={`w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center ${stat.color}`}>
                      <stat.icon size={18} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-deep-navy" style={{ fontFamily: 'var(--font-heading)' }}>{count}{stat.suffix}</p>
                      <p className="text-xs text-muted-slate">{stat.label}</p>
                    </div>
                  </div>
                </HoverScale>
              );
            })}
          </div>
        </FadeUp>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Matches Column */}
          <div className="lg:col-span-2">
            <FadeUp delay={0.2}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-deep-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                  Your Top Matches
                </h2>
                <div className="flex items-center gap-2">
                  <HoverScale scale={1.05}>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-warm-beige/50 text-sm text-muted-slate hover:bg-white/90 transition-all cursor-pointer">
                      <Filter size={14} /> Filter
                    </button>
                  </HoverScale>
                  <HoverScale scale={1.05}>
                    <button
                      onClick={handleRefresh}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-warm-beige/50 text-sm text-muted-slate hover:bg-white/90 transition-all cursor-pointer"
                    >
                      <RefreshCw size={14} /> Refresh
                    </button>
                  </HoverScale>
                </div>
              </div>
            </FadeUp>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {matches.map((match, i) => (
                <FadeUp key={match.name} delay={0.15 + i * 0.08}>
                  <MatchCard
                    {...match}
                    onLike={() => {}}
                    onPass={() => {}}
                    onChat={() => {}}
                  />
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.6}>
              <div className="mt-8 text-center">
                <HoverScale scale={1.03}>
                  <Link
                    to="/onboarding"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-warm-gold/10 text-warm-gold font-medium text-sm hover:bg-warm-gold/20 transition-colors"
                  >
                    <Sparkles size={16} /> Update Preferences for Better Matches
                  </Link>
                </HoverScale>
              </div>
            </FadeUp>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <FadeUp delay={0.3}>
              <div className="glass-card rounded-3xl p-6 shimmer-border">
                <h3 className="text-lg font-semibold text-deep-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <ConnectionRing score={activity.compatibility} size={40} strokeWidth={3} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-deep-navy">
                          <span className="font-semibold">{activity.name}</span>{' '}
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-slate">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Quick Actions */}
            <FadeUp delay={0.4}>
              <div className="glass-card rounded-3xl p-6 shimmer-border">
                <h3 className="text-lg font-semibold text-deep-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
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
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-slate hover:text-deep-navy hover:bg-warm-beige/20 transition-all"
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
              <div className="glass-card rounded-3xl p-6 text-center shimmer-border">
                <h3 className="text-lg font-semibold text-deep-navy mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Connection Health
                </h3>
                <p className="text-sm text-muted-slate mb-4">Your social wellness score</p>
                <div className="flex justify-center">
                  <ConnectionRing score={85} size={100} strokeWidth={8} />
                </div>
                <p className="text-sm text-muted-slate mt-4">
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
