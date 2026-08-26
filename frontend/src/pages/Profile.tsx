import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Camera, MapPin, Calendar, Heart, Shield, Plus, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import ConnectionArcs from '../components/ConnectionArcs';
import SafeSpaceBadge from '../components/SafeSpaceBadge';
import MoodIndicator from '../components/MoodIndicator';
import { FadeUp } from '../lib/animate';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || '');
  const [mood, setMood] = useState<'great' | 'good' | 'okay' | 'low'>('good');
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [newInterest, setNewInterest] = useState('');

  const displayName = user?.name || 'Friend';
  const joinDate = user?.joinDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const toggleEdit = async () => {
    if (isEditing) {
      try {
        await updateProfile({ bio, interests });
      } catch (err) {
        console.error('Failed to update profile:', err);
      }
    }
    setIsEditing(!isEditing);
  };

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
    <div className="min-h-screen bg-linen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        {/* Profile Header */}
        <FadeUp>
          <div className="relative rounded-3xl overflow-hidden mb-8">
            <div className="h-48 md:h-64 bg-gradient-to-br from-ink via-slate to-moss relative">
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors cursor-pointer">
                <Camera size={18} />
              </button>
            </div>

            <div className="bg-white px-6 md:px-8 pb-8 relative border border-pebble border-t-0 rounded-b-3xl">
              <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12 md:-mt-16">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-amber/10 flex items-center justify-center text-amber text-3xl md:text-4xl font-bold border-4 border-white" style={{ fontFamily: 'var(--font-display)' }}>
                    {displayName[0]}
                  </div>
                  <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-amber text-white flex items-center justify-center hover:bg-amber-light transition-colors cursor-pointer">
                    <Camera size={14} />
                  </button>
                </div>

                <div className="flex-1 md:pb-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                      {displayName}
                    </h1>
                    <SafeSpaceBadge size="md" />
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {user?.location || 'Earth'}</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> Joined {joinDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:pb-1">
                  <button onClick={toggleEdit}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber text-white text-sm font-medium hover:bg-amber-light transition-colors cursor-pointer">
                    <Edit3 size={14} /> {isEditing ? 'Save' : 'Edit Profile'}
                  </button>
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
              <div className="rounded-3xl p-6 bg-white border border-pebble">
                <h2 className="text-lg font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>About Me</h2>
                {isEditing ? (
                  <textarea value={bio} onChange={e => setBio(e.target.value)} rows={4}
                    className="w-full px-4 py-3 rounded-2xl bg-linen text-sm text-ink placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-amber/30 resize-none" />
                ) : (
                  <p className="text-slate leading-relaxed">{bio || 'Tell people about yourself...'}</p>
                )}
              </div>
            </FadeUp>

            {/* Mood */}
            <FadeUp delay={0.15}>
              <div className="rounded-3xl p-6 bg-white border border-pebble">
                <h2 className="text-lg font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>Current Mood</h2>
                <MoodIndicator selected={mood} onSelect={setMood} />
              </div>
            </FadeUp>

            {/* Interests */}
            <FadeUp delay={0.2}>
              <div className="rounded-3xl p-6 bg-white border border-pebble">
                <h2 className="text-lg font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>Interests</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {interests.map(interest => (
                    <span key={interest} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-moss/10 text-moss text-sm font-medium">
                      {interest}
                      {isEditing && (
                        <button onClick={() => removeInterest(interest)} className="hover:text-brick cursor-pointer">
                          <X size={12} />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex items-center gap-2">
                    <input type="text" value={newInterest} onChange={e => setNewInterest(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addInterest()} placeholder="Add an interest..."
                      className="flex-1 px-4 py-2 rounded-xl bg-linen text-sm text-ink placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-amber/30" />
                    <button onClick={addInterest} className="p-2 rounded-xl bg-moss text-white hover:bg-moss-light transition-colors cursor-pointer">
                      <Plus size={16} />
                    </button>
                  </div>
                )}
              </div>
            </FadeUp>

            {/* Recent Friends */}
            <FadeUp delay={0.25}>
              <div className="rounded-3xl p-6 bg-white border border-pebble">
                <h2 className="text-lg font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>My Friends</h2>
                <div className="space-y-3">
                  {[
                    { name: 'Amara', compatibility: 94, status: 'Connected' },
                    { name: 'Marcus', compatibility: 82, status: 'Connected' },
                    { name: 'Priya', compatibility: 87, status: 'Connected' },
                  ].map(friend => (
                    <div key={friend.name} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-pebble/20 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-amber/10 flex items-center justify-center text-amber font-semibold text-sm">
                        {friend.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-ink text-sm">{friend.name}</p>
                        <p className="text-xs text-slate">{friend.status}</p>
                      </div>
                      <ConnectionArcs score={friend.compatibility} size={36} />
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
              <div className="rounded-3xl p-6 bg-white border border-pebble">
                <h2 className="text-lg font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>Your Journey</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 3, label: 'Friends' },
                    { value: 24, label: 'Messages' },
                    { value: 1, label: 'Days' },
                  ].map(stat => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-bold text-ink" style={{ fontFamily: 'var(--font-mono)' }}>{stat.value}</p>
                      <p className="text-xs text-slate">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Looking For */}
            <FadeUp delay={0.2}>
              <div className="rounded-3xl p-6 bg-white border border-pebble">
                <h2 className="text-lg font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>Looking For</h2>
                <div className="space-y-2">
                  {(user?.lookingFor || ['Deep connections', 'Activity partners']).map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <Heart size={14} className="text-amber" />
                      <span className="text-sm text-slate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Safety */}
            <FadeUp delay={0.3}>
              <div className="rounded-3xl p-6 bg-white border border-pebble">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={16} className="text-moss" />
                  <h2 className="text-lg font-semibold text-ink" style={{ fontFamily: 'var(--font-display)' }}>Safety Status</h2>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate">Email Verified</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      user?.email ? 'text-moss bg-moss/10' : 'text-brick bg-brick/10'
                    }`}>
                      {user?.email ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>
                <Link to="/safety" className="block mt-4 text-sm text-amber hover:text-amber-light transition-colors">
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