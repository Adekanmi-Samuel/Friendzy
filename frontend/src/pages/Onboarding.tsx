import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Heart, Check, Sparkles } from 'lucide-react';
import { FadeUp, HoverScale } from '../lib/animate';
import MoodIndicator from '../components/MoodIndicator';
import RegionToggle from '../components/RegionToggle';

const steps = [
  'About You',
  'Interests',
  'Personality',
  'Preferences',
];

const interestCategories = [
  {
    category: 'Creative',
    interests: ['Writing', 'Music', 'Photography', 'Art', 'Design', 'Film'],
  },
  {
    category: 'Active',
    interests: ['Hiking', 'Yoga', 'Running', 'Dancing', 'Swimming', 'Cycling'],
  },
  {
    category: 'Social',
    interests: ['Cooking', 'Travel', 'Volunteering', 'Book Clubs', 'Gaming', 'Podcasts'],
  },
  {
    category: 'Mindful',
    interests: ['Meditation', 'Journaling', 'Philosophy', 'Nature', 'Astronomy', 'Learning'],
  },
];

const personalityTraits = [
  'Introverted', 'Extroverted', 'Ambivert',
  'Empathetic', 'Analytical', 'Creative',
  'Adventurous', 'Homebody', 'Organized',
  'Spontaneous', 'Listener', 'Storyteller',
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [mood, setMood] = useState<'great' | 'good' | 'okay' | 'low' | undefined>();
  const [region, setRegion] = useState('US');
  const [lookingFor, setLookingFor] = useState<string[]>([]);

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
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-warm-beige/30">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-warm-gold to-sage-green flex items-center justify-center">
              <Heart size={16} className="text-white" fill="white" />
            </div>
            <span className="text-lg font-semibold text-deep-navy" style={{ fontFamily: 'var(--font-heading)' }}>Friendzy</span>
          </Link>
          <span className="text-sm text-muted-slate">Step {currentStep + 1} of {steps.length}</span>
        </div>
        <div className="h-1 bg-warm-beige/30">
          <div
            className="h-full bg-gradient-to-r from-warm-gold to-sage-green transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-12">
        {/* Step title */}
        <FadeUp key={currentStep}>
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-deep-navy mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              {steps[currentStep]}
            </h1>
            <p className="text-muted-slate">
              {currentStep === 0 && "Let's start with the basics — who are you?"}
              {currentStep === 1 && "What do you love? Pick at least 3 things that light you up."}
              {currentStep === 2 && "How would your closest friend describe you?"}
              {currentStep === 3 && "Almost there! What kind of connections are you looking for?"}
            </p>
          </div>
        </FadeUp>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {currentStep === 0 && (
            <FadeUp delay={0.1}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-deep-navy mb-2">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="What should we call you?"
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-warm-beige/50 text-deep-navy placeholder:text-muted-slate/50 focus:outline-none focus:ring-2 focus:ring-warm-gold/30 focus:border-warm-gold transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-navy mb-2">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    placeholder="Your age"
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-warm-beige/50 text-deep-navy placeholder:text-muted-slate/50 focus:outline-none focus:ring-2 focus:ring-warm-gold/30 focus:border-warm-gold transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-navy mb-2">Short Bio</label>
                  <textarea
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Tell us a little about yourself in a sentence or two..."
                    rows={3}
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-warm-beige/50 text-deep-navy placeholder:text-muted-slate/50 focus:outline-none focus:ring-2 focus:ring-warm-gold/30 focus:border-warm-gold transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-navy mb-2">Current Mood</label>
                  <MoodIndicator selected={mood} onSelect={setMood} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-deep-navy mb-2">Your Region</label>
                  <RegionToggle selected={region} onSelect={setRegion} />
                </div>
              </div>
            </FadeUp>
          )}

          {currentStep === 1 && (
            <FadeUp delay={0.1}>
              <div className="space-y-8">
                {interestCategories.map(cat => (
                  <div key={cat.category}>
                    <h3 className="text-sm font-semibold text-muted-slate uppercase tracking-wider mb-3">{cat.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.interests.map(interest => (
                        <HoverScale key={interest} scale={1.05}>
                          <button
                            onClick={() => toggleInterest(interest)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                              selectedInterests.includes(interest)
                                ? 'bg-sage-green text-white shadow-md'
                                : 'bg-white border border-warm-beige/50 text-muted-slate hover:border-sage-green/50'
                            }`}
                          >
                            {selectedInterests.includes(interest) && <span className="mr-1">&#10003;</span>}
                            {interest}
                          </button>
                        </HoverScale>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          )}

          {currentStep === 2 && (
            <FadeUp delay={0.1}>
              <div className="flex flex-wrap gap-3">
                {personalityTraits.map(trait => (
                  <HoverScale key={trait} scale={1.05}>
                    <button
                      onClick={() => toggleTrait(trait)}
                      className={`px-5 py-3 rounded-2xl text-sm font-medium transition-all cursor-pointer ${
                        selectedTraits.includes(trait)
                          ? 'bg-deep-navy text-white shadow-md'
                          : 'bg-white border border-warm-beige/50 text-muted-slate hover:border-deep-navy/30'
                      }`}
                    >
                      {selectedTraits.includes(trait) && <span className="mr-1.5"><Check size={14} className="inline" /></span>}
                      {trait}
                    </button>
                  </HoverScale>
                ))}
              </div>
            </FadeUp>
          )}

          {currentStep === 3 && (
            <FadeUp delay={0.1}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-deep-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    I am looking for...
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { value: 'casual', label: 'Casual friends to chat with', icon: '💬' },
                      { value: 'deep', label: 'Deep, meaningful connections', icon: '🤝' },
                      { value: 'activity', label: 'Activity partners', icon: '🏃' },
                      { value: 'study', label: 'Study or accountability partners', icon: '📚' },
                      { value: 'mentorship', label: 'Mentorship (give or receive)', icon: '🌱' },
                      { value: 'local', label: 'Local friends nearby', icon: '📍' },
                    ].map(option => (
                      <HoverScale key={option.value} scale={1.02}>
                        <button
                          onClick={() => toggleLookingFor(option.value)}
                          className={`w-full p-4 rounded-2xl text-left transition-all cursor-pointer flex items-center gap-3 ${
                            lookingFor.includes(option.value)
                              ? 'bg-warm-gold/10 border-2 border-warm-gold/30 shadow-sm'
                              : 'bg-white border border-warm-beige/50 hover:border-warm-beige'
                          }`}
                        >
                          <span className="text-2xl">{option.icon}</span>
                          <span className={`text-sm font-medium ${lookingFor.includes(option.value) ? 'text-deep-navy' : 'text-muted-slate'}`}>
                            {option.label}
                          </span>
                          {lookingFor.includes(option.value) && (
                            <Check size={16} className="ml-auto text-warm-gold" />
                          )}
                        </button>
                      </HoverScale>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-3xl p-6">
                  <div className="flex items-start gap-3">
                    <Sparkles size={20} className="text-warm-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-deep-navy mb-1">You are all set!</h4>
                      <p className="text-sm text-muted-slate leading-relaxed">
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
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-warm-beige/30">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              currentStep === 0
                ? 'text-muted-slate/30 cursor-not-allowed'
                : 'text-muted-slate hover:text-deep-navy hover:bg-warm-beige/20'
            }`}
          >
            <ArrowLeft size={16} /> Back
          </button>

          {currentStep < steps.length - 1 ? (
            <HoverScale scale={1.03}>
              <button
                onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-deep-navy text-white text-sm font-semibold hover:bg-navy-light transition-colors cursor-pointer"
              >
                Continue <ArrowRight size={16} />
              </button>
            </HoverScale>
          ) : (
            <HoverScale scale={1.03}>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-warm-gold text-white text-sm font-semibold hover:bg-gold-light transition-colors"
              >
                Find My People <Sparkles size={16} />
              </Link>
            </HoverScale>
          )}
        </div>
      </div>
    </div>
  );
}
