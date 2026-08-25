import { useState } from 'react';
import { Heart, Shield, Globe, MessageCircle, ArrowRight, Users, Star, Compass, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import ConnectionArcs from '../components/ConnectionArcs';
import { FadeUp } from '../lib/animate';
import ParallaxSection from '../components/ParallaxSection';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';

const howItWorks = [
  { icon: Compass, title: 'Discover', description: 'Answer a few questions about who you are and what you value in friendship. No awkward quizzes — just real talk.' },
  { icon: Handshake, title: 'Connect', description: 'Our matching considers personality, interests, and communication style — not just surface-level tags.' },
  { icon: MessageCircle, title: 'Meet', description: 'Start a conversation, share a coffee, or plan an activity. Friendships happen when the space feels right.' },
];

const features = [
  { icon: Shield, title: 'Safety First', description: 'Verified profiles, moderated spaces, and one-tap reporting. You are always in control.' },
  { icon: Globe, title: 'Translation Built In', description: 'Connect across 12 languages without the awkward Google Translate screenshots.' },
  { icon: Heart, title: 'Mood Check-ins', description: 'Share how you are actually feeling. It helps your matches understand where you are at.' },
  { icon: Users, title: 'Real Meetups', description: 'From coffee to camping, Friendzy helps you move from screen to real life safely.' },
];

const testimonials = [
  { name: 'Amara', location: 'Lagos, Nigeria', text: 'I moved to a new city and felt so isolated. Friendzy matched me with someone who shares my love for art and deep conversations. We now meet for coffee every week.' },
  { name: 'Priya', location: 'Mumbai, India', text: 'As an introvert, making friends felt impossible. The safe space environment helped me open up at my own pace. Now I have friends I talk to every day.' },
  { name: 'Marcus', location: 'Toronto, Canada', text: 'The compatibility scores are surprisingly accurate. My top matches feel like people I have known for years. This actually works.' },
];

function ParallaxHero({ onOpenAuth }: { onOpenAuth: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-linen overflow-hidden">
      {/* Static background layers */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-amber/8 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-moss/6 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(var(--color-pebble) 1px, transparent 1px), linear-gradient(90deg, var(--color-pebble) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-2 h-2 rounded-full bg-amber/30" />
        <div className="absolute top-48 right-24 w-1.5 h-1.5 rounded-full bg-moss/30" />
        <div className="absolute bottom-40 left-1/3 w-1 h-1 rounded-full bg-ink/10" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-amber/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Connection Arcs */}
        <div className="flex justify-center mb-10">
          <ConnectionArcs score={92} size={220} animate={true} />
        </div>

        <RevealText>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-ink leading-[1.05] mb-6"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            Share a coffee<br />
            with someone who<br />
            <span className="text-amber">gets you.</span>
          </h1>
        </RevealText>

        <p className="text-lg md:text-xl text-slate max-w-2xl mx-auto mb-10 leading-relaxed">
          You're not alone. Friendzy connects you with genuine people for friendship — not dating.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <MagneticButton strength={0.2}>
            <button
              onClick={onOpenAuth}
              className="group px-8 py-4 rounded-xl bg-amber text-white font-semibold text-lg flex items-center gap-2 hover:bg-amber-light transition-all duration-300 cursor-pointer"
            >
              Find Your People
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <Link
              to="/dashboard"
              className="px-8 py-4 rounded-xl bg-white backdrop-blur-sm border border-pebble text-slate font-medium text-lg hover:bg-pebble/20 hover:text-ink transition-all duration-300"
            >
              How It Works
            </Link>
          </MagneticButton>
        </div>

        <p className="text-sm text-slate/60" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}>
          1,247 people having coffee with a new friend right now
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-5 h-8 rounded-full border border-ink/20 flex items-start justify-center p-1.5">
          <div
            className="w-1 h-2 rounded-full bg-ink/40"
            style={{ animation: 'gentle-pulse 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />

      <ParallaxHero onOpenAuth={() => setShowAuth(true)} />

      {/* How It Works */}
      <section className="py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <RevealText>
            <div className="text-center mb-20">
              <p className="text-sm font-medium text-amber uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
                How it works
              </p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-5"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
              >
                From stranger to friend,<br />naturally.
              </h2>
              <p className="text-lg text-slate max-w-xl mx-auto">
                Three steps. No swiping. No pressure.
              </p>
            </div>
          </RevealText>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, i) => (
              <ParallaxSection key={item.title} speed={0.05 + i * 0.02}>
                <FadeUp delay={i * 0.1}>
                  <div className="p-8 rounded-2xl bg-white border border-pebble hover:border-amber/30 transition-colors duration-500">
                    <div className="w-14 h-14 rounded-2xl bg-amber/10 flex items-center justify-center mb-6">
                      <item.icon size={24} className="text-amber" />
                    </div>
                    <p className="text-xs font-medium text-amber mb-2 uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                      Step {i + 1}
                    </p>
                    <h3
                      className="text-xl font-semibold text-ink mb-3"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-slate leading-relaxed">{item.description}</p>
                  </div>
                </FadeUp>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Friendzy - parallax background shift */}
      <section className="py-28 bg-linen relative overflow-hidden">
        {/* Subtle parallax accent */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber/3 to-transparent pointer-events-none"
          style={{ transform: 'translateY(-20px)' }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <RevealText>
            <div className="text-center mb-20">
              <p className="text-sm font-medium text-moss uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
                Why Friendzy
              </p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-5"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
              >
                Built for real<br />connection.
              </h2>
              <p className="text-lg text-slate max-w-xl mx-auto">
                Every feature designed to help you find friendships that last.
              </p>
            </div>
          </RevealText>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <ParallaxSection key={feature.title} speed={0.03 + i * 0.01}>
                <FadeUp delay={i * 0.08}>
                  <div className="rounded-2xl p-8 bg-white/60 backdrop-blur-sm border border-pebble hover:border-moss/30 transition-colors duration-500 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-moss/10 flex items-center justify-center mb-5">
                      <feature.icon size={22} className="text-moss" />
                    </div>
                    <h3
                      className="text-xl font-semibold text-ink mb-3"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-slate leading-relaxed">{feature.description}</p>
                  </div>
                </FadeUp>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - soft accent section */}
      <section className="py-28 bg-white relative overflow-hidden">
        {/* Parallax decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-20 left-10 w-40 h-40 rounded-full border border-amber/10"
            style={{ transform: 'translateY(-30px)' }}
          />
          <div
            className="absolute bottom-20 right-10 w-60 h-60 rounded-full border border-moss/10"
            style={{ transform: 'translateY(20px)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <RevealText>
            <div className="text-center mb-20">
              <p className="text-sm font-medium text-amber uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
                Real stories
              </p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-5"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
              >
                Friendships that<br /><span className="text-amber">matter.</span>
              </h2>
              <p className="text-lg text-slate max-w-xl mx-auto">
                Hear from people who found their people.
              </p>
            </div>
          </RevealText>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <ParallaxSection key={testimonial.name} speed={0.04 + i * 0.02}>
                <FadeUp delay={i * 0.1}>
                  <div className="rounded-2xl p-7 bg-linen/60 backdrop-blur-sm border border-pebble hover:border-amber/30 transition-colors duration-500 h-full flex flex-col">
                    <div className="flex items-center gap-0.5 mb-5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} className="text-amber fill-amber" />
                      ))}
                    </div>
                    <p className="text-slate leading-relaxed mb-6 flex-1 text-[15px]">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber/10 flex items-center justify-center text-amber text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <p className="text-ink font-medium text-sm">{testimonial.name}</p>
                        <p className="text-slate/60 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-linen relative">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ParallaxSection speed={0.05}>
            <RevealText>
              <div className="rounded-2xl p-12 md:p-16 bg-white border border-pebble">
                <Users size={48} className="text-amber mx-auto mb-6" />
                <h2
                  className="text-4xl md:text-5xl font-bold text-ink mb-4"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
                >
                  Ready to find your<br />people?
                </h2>
                <p className="text-lg text-slate mb-8 max-w-xl mx-auto">
                  Join thousands who have found meaningful friendships. It takes less than 3 minutes.
                </p>
                <MagneticButton strength={0.15}>
                  <Link
                    to="/onboarding"
                    className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-amber text-white font-semibold text-lg hover:bg-amber-light transition-colors duration-300"
                  >
                    Get Started Free <ArrowRight size={18} />
                  </Link>
                </MagneticButton>
              </div>
            </RevealText>
          </ParallaxSection>
        </div>
      </section>

      <Footer />

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
}
