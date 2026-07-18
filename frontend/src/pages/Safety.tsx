import { Shield, AlertTriangle, Phone, Heart, Lock, Eye, Users, MessageCircle, Flag, BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SafeSpaceBadge from '../components/SafeSpaceBadge';
import { FadeUp, HoverScale } from '../lib/animate';

const safetyFeatures = [
  {
    icon: Shield,
    title: 'Verified Profiles',
    description: 'Every user goes through identity verification. We check photos, bios, and social signals to ensure you are connecting with real people.',
  },
  {
    icon: Lock,
    title: 'End-to-End Privacy',
    description: 'Your conversations are private. We never sell your data, and you control exactly what information is visible on your profile.',
  },
  {
    icon: Eye,
    title: 'Content Moderation',
    description: 'AI-powered moderation combined with human review ensures conversations stay respectful. Report any concern with one tap.',
  },
  {
    icon: Flag,
    title: 'Easy Reporting',
    description: 'See something concerning? Our reporting system is simple, fast, and taken seriously. Every report is reviewed within 24 hours.',
  },
  {
    icon: Users,
    title: 'Community Guidelines',
    description: 'Clear, enforced rules that keep Friendzy safe. Respect, kindness, and authenticity are non-negotiable here.',
  },
  {
    icon: MessageCircle,
    title: 'Block & Restrict',
    description: 'Full control over who can contact you. Block, restrict, or mute anyone without them knowing. Your boundaries matter.',
  },
];

const crisisResources = [
  { name: 'National Suicide Prevention Lifeline', number: '988', region: 'US/CA', available: '24/7' },
  { name: 'Crisis Text Line', number: 'Text HOME to 741741', region: 'US/CA', available: '24/7' },
  { name: 'Samaritans', number: '116 123', region: 'UK/EU', available: '24/7' },
  { name: 'iCall', number: '9152987821', region: 'India', available: 'Mon-Sat, 8am-10pm' },
  { name: 'Lifeline Nigeria', number: '08008002000', region: 'Nigeria', available: '24/7' },
  { name: 'CVV (Brazil)', number: '188', region: 'Brazil', available: '24/7' },
];

const safetyTips = [
  {
    title: 'Take It Slow',
    description: 'There is no rush. Build trust gradually and share personal information only when you feel comfortable.',
  },
  {
    title: 'Meet in Public',
    description: 'If you decide to meet in person, always choose a public place. Tell a friend or family member about your plans.',
  },
  {
    title: 'Trust Your Instincts',
    description: 'If something feels off, it probably is. Do not hesitate to step away from any conversation or situation.',
  },
  {
    title: 'Protect Your Identity',
    description: 'Do not share your full name, address, workplace, or financial information with people you have just met.',
  },
  {
    title: 'Use In-App Communication',
    description: 'Keep conversations within Friendzy for as long as possible. Our platform has safeguards that protect you.',
  },
  {
    title: 'Report Concerns',
    description: 'Your reports are confidential and taken seriously. Reporting helps keep the entire community safe.',
  },
];

export default function Safety() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-deep-navy overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-20" />
        <div className="absolute top-10 left-10 w-64 h-64 bg-sage-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-warm-gold/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 mb-6">
              <Shield size={14} className="text-sage-green" />
              <SafeSpaceBadge size="sm" />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Your Safety is
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sage-green to-warm-gold">
                Our Priority
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Friendzy is built on a foundation of trust and safety. Every feature is designed to help you connect with confidence.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Built-In Safety Features
              </h2>
              <p className="text-muted-slate max-w-xl mx-auto">
                Multiple layers of protection work together to keep you safe
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyFeatures.map((feature, i) => (
              <FadeUp key={feature.title} delay={i * 0.08}>
                <HoverScale scale={1.02}>
                  <div className="glass-card rounded-3xl p-7 h-full">
                    <div className="w-11 h-11 rounded-2xl bg-sage-green/10 flex items-center justify-center mb-5">
                      <feature.icon size={20} className="text-sage-green" />
                    </div>
                    <h3 className="text-lg font-semibold text-deep-navy mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-slate leading-relaxed">{feature.description}</p>
                  </div>
                </HoverScale>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-20 bg-soft-cream texture-overlay">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeUp>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Stay Safe: Quick Tips
              </h2>
              <p className="text-muted-slate max-w-xl mx-auto">
                Simple steps to protect yourself while making meaningful connections
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyTips.map((tip, i) => (
              <FadeUp key={tip.title} delay={i * 0.08}>
                <div className="bg-white rounded-3xl p-6 border border-warm-beige/30 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-warm-gold/10 text-warm-gold font-bold text-sm flex items-center justify-center" style={{ fontFamily: 'var(--font-heading)' }}>
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-deep-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                      {tip.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-slate leading-relaxed">{tip.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Crisis Resources */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 rounded-full bg-muted-red/10 text-muted-red px-4 py-2 mb-6">
                <AlertTriangle size={14} />
                <span className="text-sm font-semibold">Crisis Resources</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                If You Need Help Now
              </h2>
              <p className="text-muted-slate max-w-xl mx-auto">
                You are not alone. These resources are available 24/7 for anyone in need of immediate support.
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-4">
            {crisisResources.map((resource, i) => (
              <FadeUp key={resource.name} delay={i * 0.05}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-white border border-warm-beige/30 shadow-sm hover:shadow-md transition-shadow gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-muted-red/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-muted-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-deep-navy">{resource.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-slate">
                        <span className="px-2 py-0.5 rounded-full bg-warm-beige/30 text-xs">{resource.region}</span>
                        <span>{resource.available}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={`tel:${resource.number.replace(/[^0-9]/g, '')}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted-red text-white text-sm font-semibold hover:bg-muted-red/90 transition-colors whitespace-nowrap"
                  >
                    <Phone size={14} /> {resource.number}
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-20 bg-deep-navy">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Our Community Promise
              </h2>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="glass-card-dark rounded-3xl p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  {[
                    { icon: Heart, text: 'Every person deserves kindness and respect' },
                    { icon: Shield, text: 'Safety is not optional — it is foundational' },
                    { icon: Users, text: 'Diversity makes our community stronger' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <item.icon size={18} className="text-warm-gold mt-0.5 flex-shrink-0" />
                      <p className="text-white/80 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-5">
                  {[
                    { icon: Lock, text: 'Your privacy is protected, always' },
                    { icon: MessageCircle, text: 'Speak up — your voice matters' },
                    { icon: BookOpen, text: 'We are here to help, not to judge' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <item.icon size={18} className="text-sage-green mt-0.5 flex-shrink-0" />
                      <p className="text-white/80 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <HoverScale scale={1.03}>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                  >
                    <BookOpen size={16} /> Read Full Community Guidelines <ExternalLink size={12} />
                  </a>
                </HoverScale>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
