import { Check, Crown } from 'lucide-react';
import { FadeUp } from '../lib/animate';

interface PricingCardProps {
  tier: 'Free' | 'Premium' | 'VIP';
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  cta: string;
  delay?: number;
}

export default function PricingCard({ tier, price, period, features, popular, cta, delay = 0 }: PricingCardProps) {
  const isVip = tier === 'VIP';

  return (
    <FadeUp delay={delay}>
      <div className={`relative rounded-2xl p-7 ${
        popular
          ? 'bg-amber/5 text-ink border-2 border-amber'
          : 'bg-white border border-pebble'
      }`}>
        {popular && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="px-4 py-1 rounded-full bg-amber text-white text-xs font-bold uppercase tracking-wider font-body">
              Most Popular
            </span>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            {isVip && <Crown size={20} className="text-amber" />}
            <h3 className="text-lg font-semibold font-body">{tier}</h3>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold font-display">{price}</span>
            <span className={`text-sm font-body ${popular ? 'text-white/50' : 'text-slate'}`}>/{period}</span>
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          {features.map(feature => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check size={16} className={`mt-0.5 flex-shrink-0 ${popular ? 'text-amber' : 'text-moss'}`} />
              <span className={`text-sm font-body ${popular ? 'text-white/80' : 'text-slate'}`}>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className="w-full py-3.5 rounded-xl text-sm font-semibold font-body transition-all cursor-pointer bg-amber text-white hover:bg-amber-light"
        >
          {cta}
        </button>
      </div>
    </FadeUp>
  );
}
