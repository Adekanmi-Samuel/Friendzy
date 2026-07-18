import { Heart, Shield, Globe, MessageCircle, ArrowRight, Users, Star, Compass, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConnectionArcs from '../components/ConnectionArcs';
import { FadeUp } from '../lib/animate';

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

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-ink overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16">
          <FadeUp>
            <div className="flex justify-center mb-8">
              <ConnectionArcs score={92} size={200} animate={true} />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Share a coffee with someone who gets you.
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              You're not alone. Friendzy connects you with genuine people for friendship — not dating.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                to="/onboarding"
                className="px-8 py-4 rounded-2xl bg-amber text-white font-semibold text-lg flex items-center gap-2 hover:bg-amber-light transition-colors"
              >
                Find Your People <ArrowRight size={18} />
              </Link>
              <Link
                to="/dashboard"
                className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-white font-medium text-lg hover:bg-white/20 transition-colors"
              >
                How It Works
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p className="text-sm text-white/40" style={{ fontFamily: 'var(--font-mono)' }}>
              1,247 people having coffee with a new friend right now
            </p>
          </FadeUp>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                How Friendzy Works
              </h2>
              <p className="text-lg text-slate max-w-2xl mx-auto">
                Three simple steps to find friendships that last
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-white border border-pebble text-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber/10 flex items-center justify-center mx-auto mb-5">
                    <item.icon size={22} className="text-amber" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                    {item.title}
                  </h3>
                  <p className="text-slate leading-relaxed">{item.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Why Friendzy */}
      <section className="py-24 bg-linen">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Why People Love Friendzy
              </h2>
              <p className="text-lg text-slate max-w-2xl mx-auto">
                More than an app — a community built on trust and genuine connection
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <FadeUp key={feature.title} delay={i * 0.1}>
                <div className="rounded-2xl p-8 bg-white/60 backdrop-blur-sm border border-pebble h-full">
                  <div className="w-12 h-12 rounded-2xl bg-moss/10 flex items-center justify-center mb-5">
                    <feature.icon size={22} className="text-ink" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-slate leading-relaxed">{feature.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Real Friendships, Real Stories
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">
                Hear from people who found their people on Friendzy
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <FadeUp key={testimonial.name} delay={i * 0.15}>
                <div className="rounded-2xl p-7 bg-ink/85 backdrop-blur-md border border-amber/10 h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="text-amber fill-amber" />
                    ))}
                  </div>
                  <p className="text-white/70 leading-relaxed mb-6 flex-1">"{testimonial.text}"</p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-white/40 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-linen">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="rounded-2xl p-12 md:p-16 bg-white border border-pebble">
              <Users size={48} className="text-amber mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Ready to Find Your People?
              </h2>
              <p className="text-lg text-slate mb-8 max-w-xl mx-auto">
                Join thousands of people who have found meaningful friendships. It takes less than 3 minutes to get started.
              </p>
              <Link
                to="/onboarding"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-ink text-white font-semibold text-lg hover:bg-ink-light transition-colors"
              >
                Get Started Free <ArrowRight size={18} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
