import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Camera, MapPin, Calendar, Heart, Settings, Share2, Shield, Plus, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import ConnectionRing from '../components/ConnectionRing';
import SafeSpaceBadge from '../components/SafeSpaceBadge';
import MoodIndicator from '../components/MoodIndicator';
import { FadeUp, HoverScale } from '../lib/animate';

const profileData = {
  name: 'Alex',
  age: 27,
  location: 'San Francisco, CA',
  bio: 'Creative thinker who loves connecting with people over shared interests. I believe every conversation is a chance to learn something new. Passionate about art, technology, and making the world a little less lonely.',
  joinDate: 'March 2025',
  mood: 'good' as const,
  interests: ['Photography', 'Hiking', 'Art', 'Music', 'Cooking', 'Travel', 'Reading', 'Yoga'],
  traits: ['Empathetic', 'Creative', 'Listener', 'Adventurous'],
  lookingFor: ['Deep connections', 'Activity partners', 'Study buddies'],
  stats: { friends: 23, chats: 156, daysActive: 142 },
  badges: [
    { name: 'Early Adopter', color: 'bg-warm-gold/10 text-warm-gold' },
    { name: 'Safe Space Champion', color: 'bg-sage-green/10 text-sage-green' },
    { name: 'Conversation Starter', color: 'bg-muted-slate/10 text-muted-slate' },
    { name: 'Globe Trotter', color: 'bg-deep-navy/10 text-deep-navy' },
  ],
};

const recentFriends = [
  { name: 'Amara', compatibility: 94, status: 'Connected' },
  { name: 'Marcus', compatibility: 82, status: 'Connected' },
  { name: 'Priya', compatibility: 87, status: 'Connected' },
  { name: 'Yuki', compatibility: 91, status: 'New' },
  { name: 'Chen', compatibility: 78, status: 'Connected' },
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(profileData.bio);
  const [mood, setMood] = useState<'great' | 'good' | 'okay' | 'low'>(profileData.mood);
  const [newInterest, setNewInterest] = useState('');
  const [interests, setInterests] = useState(profileData.interests);

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests(prev => [...prev, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(prev => prev.filter(i => i !== interest));
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        {/* Profile Header */}
        <FadeUp>
          <div className="relative rounded-3xl overflow-hidden mb-8">
            {/* Cover */}
            <div className="h-48 md:h-64 bg-gradient-to-br from-deep-navy via-muted-slate to-sage-green relative">
              <div className="absolute inset-0 texture-overlay opacity-30" />
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors cursor-pointer">
                <Camera size={18} />
              </button>
            </div>

            {/* Profile Info */}
            <div className="bg-white px-6 md:px-8 pb-8 relative">
              <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12 md:-mt-16">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-warm-gold to-sage-green border-4 border-white flex items-center justify-center text-white text-3xl md:text-4xl font-bold shadow-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                    {profileData.name[0]}
                  </div>
                  <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-deep-navy text-white flex items-center justify-center hover:bg-navy-light transition-colors cursor-pointer">
                    <Camera size={14} />
                  </button>
                </div>

                <div className="flex-1 md:pb-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-deep-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                      {profileData.name}, {profileData.age}
                    </h1>
                    <SafeSpaceBadge size="md" />
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-slate">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {profileData.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> Joined {profileData.joinDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:pb-1">
                  <HoverScale scale={1.05}>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-deep-navy text-white text-sm font-medium hover:bg-navy-light transition-colors cursor-pointer"
                    >
                      <Edit3 size={14} /> {isEditing ? 'Save' : 'Edit Profile'}
                    </button>
                  </HoverScale>
                  <HoverScale scale={1.05}>
                    <button className="p-2 rounded-xl bg-white border border-warm-beige/50 text-muted-slate hover:text-deep-navy transition-colors cursor-pointer">
                      <Share2 size={16} />
                    </button>
                  </HoverScale>
                  <HoverScale scale={1.05}>
                    <Link to="/settings" className="p-2 rounded-xl bg-white border border-warm-beige/50 text-muted-slate hover:text-deep-navy transition-colors">
                      <Settings size={16} />
                    </Link>
                  </HoverScale>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio */}
            <FadeUp delay={0.1}>
              <div className="glass-card rounded-3xl p-6">
                <h2 className="text-lg font-semibold text-deep-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  About Me
                </h2>
                {isEditing ? (
                  <textarea
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl bg-warm-beige/20 text-sm text-deep-navy placeholder:text-muted-slate/50 focus:outline-none focus:ring-2 focus:ring-warm-gold/30 resize-none"
                  />
                ) : (
                  <p className="text-muted-slate leading-relaxed">{bio}</p>
                )}
              </div>
            </FadeUp>

            {/* Mood */}
            <FadeUp delay={0.15}>
              <div className="glass-card rounded-3xl p-6">
                <h2 className="text-lg font-semibold text-deep-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  Current Mood
                </h2>
                <MoodIndicator selected={mood} onSelect={setMood} />
              </div>
            </FadeUp>

            {/* Interests */}
            <FadeUp delay={0.2}>
              <div className="glass-card rounded-3xl p-6">
                <h2 className="text-lg font-semibold text-deep-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  Interests
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {interests.map(interest => (
                    <span key={interest} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sage-green/10 text-sage-green text-sm font-medium">
                      {interest}
                      {isEditing && (
                        <button onClick={() => removeInterest(interest)} className="hover:text-muted-red cursor-pointer">
                          <X size={12} />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newInterest}
                      onChange={e => setNewInterest(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addInterest()}
                      placeholder="Add an interest..."
                      className="flex-1 px-4 py-2 rounded-xl bg-warm-beige/20 text-sm text-deep-navy placeholder:text-muted-slate/50 focus:outline-none focus:ring-2 focus:ring-warm-gold/30"
                    />
                    <button onClick={addInterest} className="p-2 rounded-xl bg-sage-green text-white hover:bg-sage-light transition-colors cursor-pointer">
                      <Plus size={16} />
                    </button>
                  </div>
                )}
              </div>
            </FadeUp>

            {/* Recent Friends */}
            <FadeUp delay={0.25}>
              <div className="glass-card rounded-3xl p-6">
                <h2 className="text-lg font-semibold text-deep-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  My Friends
                </h2>
                <div className="space-y-3">
                  {recentFriends.map(friend => (
                    <div key={friend.name} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-warm-beige/20 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-warm-gold to-sage-green flex items-center justify-center text-white font-semibold text-sm">
                        {friend.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-deep-navy text-sm">{friend.name}</p>
                        <p className="text-xs text-muted-slate">{friend.status}</p>
                      </div>
                      <ConnectionRing score={friend.compatibility} size={36} strokeWidth={2.5} />
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Stats */}
            <FadeUp delay={0.1}>
              <div className="glass-card rounded-3xl p-6">
                <h2 className="text-lg font-semibold text-deep-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  Your Journey
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: profileData.stats.friends, label: 'Friends' },
                    { value: profileData.stats.chats, label: 'Messages' },
                    { value: profileData.stats.daysActive, label: 'Days' },
                  ].map(stat => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-bold text-deep-navy" style={{ fontFamily: 'var(--font-heading)' }}>{stat.value}</p>
                      <p className="text-xs text-muted-slate">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Traits */}
            <FadeUp delay={0.15}>
              <div className="glass-card rounded-3xl p-6">
                <h2 className="text-lg font-semibold text-deep-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  Personality Traits
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profileData.traits.map(trait => (
                    <span key={trait} className="px-3 py-1.5 rounded-full bg-deep-navy/10 text-deep-navy text-sm font-medium">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Looking For */}
            <FadeUp delay={0.2}>
              <div className="glass-card rounded-3xl p-6">
                <h2 className="text-lg font-semibold text-deep-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  Looking For
                </h2>
                <div className="space-y-2">
                  {profileData.lookingFor.map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <Heart size={14} className="text-warm-gold" />
                      <span className="text-sm text-muted-slate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Badges */}
            <FadeUp delay={0.25}>
              <div className="glass-card rounded-3xl p-6">
                <h2 className="text-lg font-semibold text-deep-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  Badges
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {profileData.badges.map(badge => (
                    <div key={badge.name} className={`px-3 py-2 rounded-xl text-xs font-medium text-center ${badge.color}`}>
                      {badge.name}
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Safety */}
            <FadeUp delay={0.3}>
              <div className="glass-card rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={16} className="text-sage-green" />
                  <h2 className="text-lg font-semibold text-deep-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                    Safety Status
                  </h2>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-slate">Profile Verified</span>
                    <span className="text-xs font-medium text-sage-green bg-sage-green/10 px-2 py-0.5 rounded-full">Verified</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-slate">2FA Enabled</span>
                    <span className="text-xs font-medium text-sage-green bg-sage-green/10 px-2 py-0.5 rounded-full">Active</span>
                  </div>
                </div>
                <Link to="/safety" className="block mt-4 text-sm text-warm-gold hover:text-gold-light transition-colors">
                  View Safety Settings
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </div>
  );
}
