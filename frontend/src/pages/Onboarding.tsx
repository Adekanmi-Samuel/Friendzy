import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Heart, Check } from 'lucide-react';
import { FadeUp } from '../lib/animate';
import MoodIndicator from '../components/MoodIndicator';
import RegionToggle from '../components/RegionToggle';

const steps = ['Welcome', 'Quiz', 'Profile', 'Complete'];

const interestCategories = [
  { category: 'Creative', interests: ['Writing', 'Music', 'Photography', 'Art', 'Design', 'Film'] },
  { category: 'Active', interests: ['Hiking', 'Yoga', 'Running', 'Dancing', 'Swimming', 'Cycling'] },
  { category: 'Social', interests: ['Cooking', 'Travel', 'Volunteering', 'Book Clubs', 'Gaming', 'Podcasts'] },
  { category: 'Mindful', interests: ['Meditation', 'Journaling', 'Philosophy', 'Nature', 'Astronomy', 'Learning'] },
];

const personalityTraits = [
  'Introverted', 'Extroverted', 'Ambivert',
  'Empathetic', 'Analytical', 'Creative',
  'Adventurous', 'Homebody', 'Organized',
  'Spontaneous', 'Listener', 'Storyteller',
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [mood, setMood] = useState<'great' | 'good' | 'okay' | 'low' | undefined>();
  const [region, setRegion] = useState('US');
  const [lookingFor, setLookingFor] = useState<string[]>([]);

  const goNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setSlideDirection('right');
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setSlideDirection('left');
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const toggleTrait = (trait: string) => {
    setSelectedTraits(prev =>
      prev.includes(trait) ? prev.filter(t => t !== trait) : [...prev, trait]
    );
  };

  const toggleLookingFor = (option: string) => {
    setLookingFor(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-linen">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-pebble/50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center">
              <Heart size={16} className="text-amber" fill="currentColor" />
            </div>
            <span className="text-lg font-semibold text-ink" style={{ fontFamily: 'var(--font-display)' }}>Friendzy</span>
          </Link>
          <span className="text-sm text-slate" style={{ fontFamily: 'var(--font-mono)' }}>
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="h-1 bg-pebble/40">
          <div
            className="h-full bg-moss transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-12">
        {/* Step title */}
        <div key={`title-${currentStep}`} className={`mb-10 ${slideDirection === 'right' ? 'slide-in-right' : 'slide-in-left'}`}>
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            {steps[currentStep]}
          </h1>
          <p className="text-slate">
            {currentStep === 0 && "Let's start with the basics — who are you?"}
            {currentStep === 1 && "What do you love? Pick at least 3 things that light you up."}
            {currentStep === 2 && "How would your closest friend describe you?"}
            {currentStep === 3 && "Almost there! What kind of connections are you looking for?"}
          </p>
        </div>

        {/* Step Content */}
        <div className={`min-h-[400px] ${slideDirection === 'right' ? 'slide-in-right' : 'slide-in-left'}`} key={`content-${currentStep}`}>
          {/* Step 0: Welcome / About You */}
          {currentStep === 0 && (
            <FadeUp delay={0.1}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Your Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="What should we call you?"
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-pebble text-ink placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Age</label>
                  <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Your age"
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-pebble text-ink placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Short Bio</label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell us a little about yourself in a sentence or two..." rows={3}
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-pebble text-ink placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber transition-all resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Current Mood</label>
                  <MoodIndicator selected={mood} onSelect={setMood} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Your Region</label>
                  <RegionToggle selected={region} onSelect={setRegion} />
                </div>
              </div>
            </FadeUp>
          )}

          {/* Step 1: Quiz / Interests */}
          {currentStep === 1 && (
            <FadeUp delay={0.1}>
              <div className="space-y-8">
                {interestCategories.map(cat => (
                  <div key={cat.category}>
                    <h3 className="text-sm font-semibold text-slate uppercase tracking-wider mb-3 font-body">{cat.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.interests.map(interest => (
                        <button key={interest} onClick={() => toggleInterest(interest)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                            selectedInterests.includes(interest)
                              ? 'bg-amber text-white'
                              : 'bg-white border border-pebble text-slate hover:border-amber/30'
                          }`}>
                          {selectedInterests.includes(interest) && <span className="mr-1">&#10003;</span>}
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          )}

          {/* Step 2: Profile / Personality */}
          {currentStep === 2 && (
            <FadeUp delay={0.1}>
              <div className="flex flex-wrap gap-3">
                {personalityTraits.map(trait => (
                  <button key={trait} onClick={() => toggleTrait(trait)}
                    className={`px-5 py-3 rounded-2xl text-sm font-medium transition-all cursor-pointer ${
                      selectedTraits.includes(trait)
                        ? 'bg-amber text-white'
                        : 'bg-white border border-pebble text-slate hover:border-amber/30'
                    }`}>
                    {selectedTraits.includes(trait) && <span className="mr-1.5"><Check size={14} className="inline" /></span>}
                    {trait}
                  </button>
                ))}
              </div>
            </FadeUp>
          )}

          {/* Step 3: Complete / Preferences */}
          {currentStep === 3 && (
            <FadeUp delay={0.1}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                    I am looking for...
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { value: 'casual', label: 'Casual friends to chat with', icon: '\u{1F4AC}' },
                      { value: 'deep', label: 'Deep, meaningful connections', icon: '\u{1F91D}' },
                      { value: 'activity', label: 'Activity partners', icon: '\u{1F3C3}' },
                      { value: 'study', label: 'Study or accountability partners', icon: '\u{1F4DA}' },
                      { value: 'mentorship', label: 'Mentorship (give or receive)', icon: '\u{1F331}' },
                      { value: 'local', label: 'Local friends nearby', icon: '\u{1F4CD}' },
                    ].map(option => (
                      <button key={option.value} onClick={() => toggleLookingFor(option.value)}
                        className={`w-full p-4 rounded-2xl text-left transition-all cursor-pointer flex items-center gap-3 ${
                          lookingFor.includes(option.value)
                            ? 'bg-amber/10 border-2 border-amber/30'
                            : 'bg-white border border-pebble hover:border-amber/30'
                        }`}>
                        <span className="text-2xl">{option.icon}</span>
                        <span className={`text-sm font-medium ${lookingFor.includes(option.value) ? 'text-ink' : 'text-slate'}`}>
                          {option.label}
                        </span>
                        {lookingFor.includes(option.value) && <Check size={16} className="ml-auto text-amber" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl p-6 bg-white border border-pebble">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-moss/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check size={12} className="text-moss" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink mb-1">You're all set!</h4>
                      <p className="text-sm text-slate leading-relaxed">
                        Based on your answers, we will find people who share your interests, personality, and values. You can always update your preferences later.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-pebble/50">
          <button onClick={goBack} disabled={currentStep === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              currentStep === 0 ? 'text-slate/30 cursor-not-allowed' : 'text-slate hover:text-ink hover:bg-pebble/20'
            }`}>
            <ArrowLeft size={16} /> Back
          </button>

          {currentStep < steps.length - 1 ? (
            <button onClick={goNext}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber text-white text-sm font-semibold hover:bg-amber-light transition-colors cursor-pointer">
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <Link to="/dashboard"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber text-white text-sm font-semibold hover:bg-amber-light transition-colors">
              Find My People <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
