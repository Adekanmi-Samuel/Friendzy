import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Crown, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { FadeUp } from '../lib/animate';
import MagneticButton from './MagneticButton';

interface Plan {
  tier: 'Free' | 'Premium' | 'VIP';
  price: string;
  period: string;
  amount: number;
  currency: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

const defaultPlans: Plan[] = [
  {
    tier: 'Free', price: '$0', period: 'forever', amount: 0, currency: 'USD',
    features: ['5 matches per day', 'Basic compatibility scores', 'In-app messaging', '1 voice call/month', 'Community access'],
    cta: 'Start Free',
  },
  {
    tier: 'Premium', price: '₦5,000', period: 'month', amount: 500000, currency: 'NGN', popular: true,
    features: ['Unlimited matches', 'Real-time translation', 'See who liked you', 'Unlimited voice/video calls', 'Priority matching', 'Ad-free'],
    cta: 'Start Premium',
  },
  {
    tier: 'VIP', price: '₦10,000', period: 'month', amount: 1000000, currency: 'NGN',
    features: ['Everything in Premium', 'Dedicated matchmaker', 'Group hangouts', 'Profile boost', 'VIP badge', 'Early access'],
    cta: 'Go VIP',
  },
];

export default function PricingSection({ plans = defaultPlans }: { plans?: Plan[] }) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (plan: Plan) => {
    if (plan.amount === 0) {
      window.location.href = '/onboarding';
      return;
    }

    setLoading(plan.tier);

    try {
      // In production, call your backend:
      // const res = await fetch('/api/payments/initialize', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: 'user@example.com', plan: plan.tier.toLowerCase(), region: 'NG' }),
      // });
      // const data = await res.json();
      // window.location.href = data.authorization_url;

      // Mock for now
      alert(`Checkout for ${plan.tier} — ₦${plan.amount / 100}`);
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 items-start">
      {plans.map((plan, i) => (
        <FadeUp key={plan.tier} delay={i * 0.1}>
          <div className={`relative rounded-2xl p-7 ${
            plan.popular
              ? 'bg-amber/5 text-ink border-2 border-amber'
              : 'bg-white border border-pebble'
          }`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 rounded-full bg-amber text-white text-xs font-bold flex items-center gap-1">
                  <Sparkles size={12} /> Most Popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                {plan.tier === 'VIP' && <Crown size={18} className="text-amber" />}
                {plan.tier === 'Premium' && <Sparkles size={16} className={plan.popular ? 'text-amber' : 'text-moss'} />}
                <h3 className="text-lg font-semibold font-display">{plan.tier}</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold font-display">{plan.price}</span>
                <span className={`text-sm font-body ${plan.popular ? 'text-white/50' : 'text-slate'}`}>/{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check size={16} className={`mt-0.5 flex-shrink-0 ${plan.popular ? 'text-amber' : 'text-moss'}`} />
                  <span className={`text-sm font-body ${plan.popular ? 'text-white/80' : 'text-slate'}`}>{feature}</span>
                </li>
              ))}
            </ul>

            <MagneticButton strength={0.15}>
              <button
                onClick={() => handleCheckout(plan)}
                disabled={loading === plan.tier}
                className="w-full py-3.5 rounded-xl text-sm font-semibold font-body transition-all cursor-pointer bg-amber text-white hover:bg-amber-light"
              >
                {loading === plan.tier ? 'Loading...' : plan.cta}
              </button>
            </MagneticButton>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}
