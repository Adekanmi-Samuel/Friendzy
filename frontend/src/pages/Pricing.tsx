import { Link } from 'react-router-dom';
import { HelpCircle, ArrowRight, Sparkles, Heart, Shield, Zap, Users, Star, Check, X as XIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCard from '../components/PricingCard';
import { FadeUp } from '../lib/animate';

const faqs = [
  {
    q: 'Can I try Premium before committing?',
    a: 'Yes! Premium comes with a 7-day free trial. No credit card required to start. Cancel anytime during the trial.',
  },
  {
    q: 'What happens to my friendships if I downgrade?',
    a: 'Nothing! All your friendships and conversations remain intact. You will just lose access to premium features like unlimited matching and advanced filters.',
  },
  {
    q: 'Is there a student discount?',
    a: 'Yes! We offer 50% off Premium for verified students. Just verify your student email during signup.',
  },
  {
    q: 'Can I switch plans anytime?',
    a: 'Absolutely. Upgrade or downgrade at any time. When upgrading, you get immediate access. When downgrading, the change takes effect at the end of your billing cycle.',
  },
  {
    q: 'Do you offer team or group plans?',
    a: 'Yes! We have special plans for friend groups, clubs, and communities. Contact our team for custom pricing.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit/debit cards, bank transfers, and mobile payments. All transactions are securely processed.',
  },
];

/* Decoy pricing: Free is restrictive, VIP is overpriced, Premium is the obvious choice */

const freeFeatures = [
  { text: '3 daily matches', included: true },
  { text: 'Basic compatibility scores', included: true },
  { text: 'In-app messaging', included: true },
  { text: 'Advanced filters', included: false },
  { text: 'See who liked you', included: false },
  { text: 'Unlimited matches', included: false },
  { text: 'Priority support', included: false },
  { text: 'Virtual meetups', included: false },
];

const premiumFeatures = [
  { text: 'Unlimited daily matches', included: true, highlight: true },
  { text: 'Advanced compatibility analysis', included: true, highlight: true },
  { text: 'See who liked your profile', included: true, highlight: true },
  { text: 'Advanced search & filters', included: true },
  { text: 'Priority customer support', included: true },
  { text: 'Monthly virtual meetup events', included: true },
  { text: 'Ad-free experience', included: true },
  { text: 'Profile boost (2x/month)', included: true },
];

const vipFeatures = [
  { text: 'Everything in Premium', included: true },
  { text: 'Dedicated friendship concierge', included: true },
  { text: 'Weekly exclusive meetups', included: true },
  { text: '1-on-1 friendship coaching', included: true },
  { text: 'Custom profile themes', included: true },
  { text: 'Early access to new features', included: true },
  { text: 'VIP community badge', included: true },
  { text: 'Priority in all matching', included: true },
  { text: 'Dedicated account manager', included: true },
];

const comparisons = [
  { feature: 'Daily Matches', free: '3', premium: 'Unlimited', vip: 'Unlimited' },
  { feature: 'Advanced Filters', free: false, premium: true, vip: true },
  { feature: 'Compatibility Deep Dive', free: false, premium: true, vip: true },
  { feature: 'Priority Support', free: false, premium: true, vip: true },
  { feature: 'See Who Liked You', free: false, premium: true, vip: true },
  { feature: 'Ad-Free Experience', free: false, premium: true, vip: true },
  { feature: 'Profile Boost', free: false, premium: '2x/month', vip: 'Unlimited' },
  { feature: 'Virtual Meetup Events', free: false, premium: 'Monthly', vip: 'Weekly' },
  { feature: 'Friendship Concierge', free: false, premium: false, vip: true },
  { feature: '1-on-1 Coaching', free: false, premium: false, vip: true },
  { feature: 'Custom Themes', free: false, premium: false, vip: true },
  { feature: 'VIP Badge', free: false, premium: false, vip: true },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-linen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber/10 text-amber px-4 py-2 mb-6">
              <Sparkles size={14} />
              <span className="text-sm font-semibold">Simple, transparent pricing</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Invest in Your
              <span className="block text-amber">Friendships</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-slate max-w-2xl mx-auto leading-relaxed">
              Find genuine connections without breaking the bank. Start free and upgrade when you are ready for more.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* FREE — intentionally restrictive to push users toward Premium */}
            <PricingCard
              tier="Free"
              price="$0"
              period="forever"
              features={[
                '3 daily matches',
                'Basic compatibility scores',
                'In-app messaging',
                'Community guidelines access',
                'Basic profile customization',
              ]}
              cta="Start Free"
              delay={0}
            />

            {/* PREMIUM — the obvious best value, highlighted */}
            <PricingCard
              tier="Premium"
              price="$12.99"
              period="month"
              features={[
                'Unlimited daily matches',
                'Advanced compatibility analysis',
                'See who liked your profile',
                'Advanced search & filters',
                'Priority customer support',
                'Monthly virtual meetups',
                'Ad-free experience',
                'Profile boost (2x/month)',
              ]}
              popular
              cta="Start 7-Day Free Trial"
              delay={0.1}
            />

            {/* VIP — good but clearly overpriced to make Premium the obvious choice */}
            <PricingCard
              tier="VIP"
              price="$39.99"
              period="month"
              features={[
                'Everything in Premium',
                'Dedicated friendship concierge',
                'Weekly exclusive meetups',
                '1-on-1 friendship coaching',
                'Custom profile themes',
                'Early access to new features',
                'VIP community badge',
                'Priority in all matching',
              ]}
              cta="Join VIP Waitlist"
              delay={0.2}
            />
          </div>

          {/* Price anchor callout */}
          <FadeUp delay={0.3}>
            <p className="text-center text-sm text-slate/60 mt-8" style={{ fontFamily: 'var(--font-mono)' }}>
              That's less than a coffee per week for unlimited friendships. Cancel anytime.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                Compare Plans
              </h2>
              <p className="text-slate">See exactly what you get with each plan</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="bg-linen/50 rounded-3xl border border-pebble/30 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-pebble/30">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate">Feature</th>
                      <th className="text-center px-6 py-4 text-sm font-semibold text-slate">Free</th>
                      <th className="text-center px-6 py-4 text-sm font-semibold text-amber bg-amber/10">Premium</th>
                      <th className="text-center px-6 py-4 text-sm font-semibold text-ink">VIP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((row, i) => (
                      <tr key={row.feature} className={`${i < comparisons.length - 1 ? 'border-b border-pebble/20' : ''} ${i % 2 === 0 ? 'bg-white/50' : ''}`}>
                        <td className="px-6 py-3.5 text-sm text-ink font-medium">{row.feature}</td>
                        <td className="text-center px-6 py-3.5">
                          {typeof row.free === 'boolean' ? (
                            row.free ? <Check size={16} className="text-moss mx-auto" /> : <XIcon size={14} className="text-brick/40 mx-auto" />
                          ) : (
                            <span className="text-sm text-slate">{row.free}</span>
                          )}
                        </td>
                        <td className="text-center px-6 py-3.5 bg-amber/5">
                          {typeof row.premium === 'boolean' ? (
                            row.premium ? <Check size={16} className="text-amber mx-auto" /> : <span className="text-slate/30">--</span>
                          ) : (
                            <span className="text-sm text-amber font-medium">{row.premium}</span>
                          )}
                        </td>
                        <td className="text-center px-6 py-3.5">
                          {typeof row.vip === 'boolean' ? (
                            row.vip ? <Check size={16} className="text-ink mx-auto" /> : <span className="text-slate/30">--</span>
                          ) : (
                            <span className="text-sm text-ink font-medium">{row.vip}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-linen">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Shield, label: 'Secure Payments' },
                { icon: Zap, label: 'Instant Activation' },
                { icon: Users, label: '2M+ Happy Users' },
                { icon: Star, label: '4.9 App Rating' },
              ].map(badge => (
                <div key={badge.label} className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber/10 flex items-center justify-center mx-auto mb-3">
                    <badge.icon size={20} className="text-amber" />
                  </div>
                  <p className="text-sm font-medium text-slate">{badge.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                Frequently Asked Questions
              </h2>
              <p className="text-slate">Everything you need to know about our plans</p>
            </div>
          </FadeUp>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="bg-linen/60 rounded-2xl border border-pebble/30 p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle size={18} className="text-amber mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-ink mb-2">{faq.q}</h3>
                      <p className="text-sm text-slate leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linen">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="bg-white rounded-3xl p-10 md:p-14 border border-pebble/30 shadow-lg">
              <Heart size={36} className="text-amber mx-auto mb-5" />
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                Start Building Friendships Today
              </h2>
              <p className="text-slate mb-8 max-w-lg mx-auto">
                Join millions of people who have found genuine connections. Start free, upgrade when you are ready.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/onboarding"
                  className="px-8 py-3.5 rounded-2xl bg-amber text-white font-semibold flex items-center gap-2 hover:bg-amber-light transition-colors"
                >
                  Get Started Free <ArrowRight size={16} />
                </Link>
                <Link
                  to="/safety"
                  className="px-8 py-3.5 rounded-2xl bg-linen border border-pebble/50 text-ink font-medium flex items-center gap-2 hover:bg-pebble/20 transition-colors"
                >
                  <Shield size={16} /> Learn About Safety
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
