import { Heart, Users, Shield, Sparkles, ArrowRight, Globe, MessageCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConnectionRing from '../components/ConnectionRing';
import { FadeUp, HoverScale } from '../lib/animate';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Matched Friendships',
    description: 'Our thoughtful algorithm considers personality, interests, values, and communication style to find people who truly click with you.',
  },
  {
    icon: Shield,
    title: 'Safe Spaces Only',
    description: 'Every conversation happens in a moderated, supportive environment. We verify profiles and maintain strict community guidelines.',
  },
  {
    icon: Globe,
    title: 'Global Community',
    description: 'Connect with people across 6 regions and 12 languages. Find friends who share your cultural context or broaden your horizons.',
  },
  {
    icon: MessageCircle,
    title: 'Meaningful Conversations',
    description: 'Go beyond small talk. Our conversation starters and mood check-ins help you build genuine, deep connections.',
  },
];

const testimonials = [
  {
    name: 'Amara',
    location: 'Lagos, Nigeria',
    text: 'I moved to a new city and felt so isolated. Friendzy matched me with people who share my love for art and deep conversations. I found my tribe.',
    compatibility: 92,
  },
  {
    name: 'Priya',
    location: 'Mumbai, India',
    text: "As an introvert, making friends felt impossible. The safe space environment helped me open up at my own pace. Now I have friends I talk to every day.",
    compatibility: 87,
  },
  {
    name: 'Marcus',
    location: 'Toronto, Canada',
    text: 'The compatibility scores are surprisingly accurate. My top matches feel like people I have known for years. This app actually works.',
    compatibility: 95,
  },
];

const stats = [
  { value: '2M+', label: 'Friendships Made' },
  { value: '6', label: 'Global Regions' },
  { value: '12', label: 'Languages' },
  { value: '94%', label: 'Match Satisfaction' },
];

export default function Landing() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-navy">
        <div className="absolute inset-0 texture-overlay opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-deep-navy via-[#2a3f4f] to-[#1e3340] animated-gradient" />

        {/* Animated gradient orbs */}
        <div
          className="absolute top-20 left-10 w-80 h-80 bg-warm-gold/15 rounded-full blur-3xl float"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-sage-green/15 rounded-full blur-3xl float-delay-2"
          style={{ transform: `translateY(${scrollY * -0.03}px)` }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-warm-gold/8 rounded-full blur-3xl float-delay-1"
          style={{ transform: `translateY(${scrollY * 0.04}px)` }}
        />

        {/* Floating decorative shapes */}
        <div className="absolute top-32 left-[15%] w-3 h-3 rounded-full bg-warm-gold/30 float" />
        <div className="absolute top-48 right-[20%] w-2 h-2 rounded-full bg-sage-light/40 float-delay-1" />
        <div className="absolute bottom-40 left-[25%] w-4 h-4 rounded-full bg-white/10 float-delay-2" />
        <div className="absolute top-60 left-[60%] w-2.5 h-2.5 rounded-full bg-warm-gold/20 float-delay-3" />
        <div className="absolute bottom-60 right-[30%] w-3 h-3 rounded-full bg-sage-green/25 float" />
        <div className="absolute top-[45%] left-[8%] w-2 h-2 rounded-full bg-white/15 float-delay-1" />

        <div
          className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 mb-8">
              <Heart size={14} className="text-warm-gold" fill="currentColor" />
              <span className="text-sm text-white/80">Built for genuine connection</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Find Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-warm-gold to-sage-light">
                People
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              You are not <span className="gradient-text font-semibold">alone</span>. Friendzy matches you with people who truly understand you — based on personality, values, and the things that matter most.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <HoverScale scale={1.03}>
                <Link
                  to="/onboarding"
                  className="px-8 py-4 rounded-2xl bg-warm-gold text-white font-semibold text-lg flex items-center gap-2 hover:bg-gold-light transition-colors"
                >
                  Start Your Journey <ArrowRight size={18} />
                </Link>
              </HoverScale>
              <HoverScale scale={1.03}>
                <Link
                  to="/dashboard"
                  className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-white font-medium text-lg hover:bg-white/20 transition-colors"
                >
                  See How It Works
                </Link>
              </HoverScale>
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-3xl md:text-4xl font-bold text-white mb-1 animate-count-up"
                    style={{ fontFamily: 'var(--font-heading)', animationDelay: `${0.6 + i * 0.15}s`, opacity: 0 }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-gentle-pulse">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-white/50 animate-bounce" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-deep-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                How Friendzy Works
              </h2>
              <p className="text-lg text-muted-slate max-w-2xl mx-auto">
                Three simple steps to find friendships that last
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { step: '01', title: 'Tell Us About You', description: 'Share your personality, interests, values, and what you are looking for in a friendship.' },
              { step: '02', title: 'Get Matched', description: 'Our AI analyzes hundreds of compatibility factors to find your best potential friends.' },
              { step: '03', title: 'Start Connecting', description: 'Chat, share experiences, and build meaningful friendships in a safe, supportive space.' },
            ].map((item, i) => (
              <FadeUp key={item.step} delay={i * 0.1}>
                <div className="relative p-8 rounded-3xl bg-white border border-warm-beige/40 shadow-sm card-hover">
                  <span className="text-6xl font-bold text-warm-beige/50 absolute top-4 right-6" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.step}
                  </span>
                  <h3 className="text-xl font-semibold text-deep-navy mb-3 relative" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.title}
                  </h3>
                  <p className="text-muted-slate leading-relaxed relative">{item.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-soft-cream texture-overlay">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-deep-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Why People Love Friendzy
              </h2>
              <p className="text-lg text-muted-slate max-w-2xl mx-auto">
                More than an app — a community built on trust and genuine connection
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <FadeUp key={feature.title} delay={i * 0.1}>
                <HoverScale scale={1.02}>
                  <div className="glass-card rounded-3xl p-8 h-full card-hover glow">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-warm-gold/20 to-sage-green/20 flex items-center justify-center mb-5">
                      <feature.icon size={22} className="text-deep-navy" />
                    </div>
                    <h3 className="text-xl font-semibold text-deep-navy mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                      {feature.title}
                    </h3>
                    <p className="text-muted-slate leading-relaxed">{feature.description}</p>
                  </div>
                </HoverScale>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-deep-navy">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
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
                <div className="glass-card-dark rounded-3xl p-7 h-full flex flex-col card-hover">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="text-warm-gold fill-warm-gold" />
                    ))}
                  </div>
                  <p className="text-white/70 leading-relaxed mb-6 flex-1">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-white/40 text-sm">{testimonial.location}</p>
                    </div>
                    <ConnectionRing score={testimonial.compatibility} size={44} strokeWidth={3} />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="glass-card rounded-3xl p-12 md:p-16 card-hover glow">
              <Users size={48} className="text-warm-gold mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-deep-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Ready to Find Your People?
              </h2>
              <p className="text-lg text-muted-slate mb-8 max-w-xl mx-auto">
                Join millions of people who have found meaningful friendships. It takes less than 3 minutes to get started.
              </p>
              <HoverScale scale={1.03}>
                <Link
                  to="/onboarding"
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-deep-navy text-white font-semibold text-lg hover:bg-navy-light transition-colors"
                >
                  Get Started Free <ArrowRight size={18} />
                </Link>
              </HoverScale>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
