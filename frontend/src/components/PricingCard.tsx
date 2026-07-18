import { Check, Crown, Sparkles } from 'lucide-react';
import { FadeUp, HoverScale } from '../lib/animate';

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
  const isPremium = tier === 'Premium';

  return (
    <FadeUp delay={delay}>
      <div className={`relative rounded-3xl p-7 ${
        popular
          ? 'bg-deep-navy text-white shadow-2xl scale-105 border-2 border-warm-gold/30'
          : 'bg-white border border-warm-beige/40 shadow-lg'
      }`}>
        {popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="px-4 py-1.5 rounded-full bg-warm-gold text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={12} /> Most Popular
            </span>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            {isVip && <Crown size={20} className="text-warm-gold" />}
            {isPremium && <Sparkles size={18} className={popular ? 'text-warm-gold' : 'text-sage-green'} />}
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{tier}</h3>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{price}</span>
            <span className={`text-sm ${popular ? 'text-white/50' : 'text-muted-slate'}`}>/{period}</span>
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          {features.map(feature => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check size={16} className={`mt-0.5 flex-shrink-0 ${popular ? 'text-warm-gold' : 'text-sage-green'}`} />
              <span className={`text-sm ${popular ? 'text-white/80' : 'text-muted-slate'}`}>{feature}</span>
            </li>
          ))}
        </ul>

        <HoverScale scale={1.03}>
          <button
            className={`w-full py-3.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
              popular
                ? 'bg-warm-gold text-white hover:bg-gold-light'
                : 'bg-deep-navy text-white hover:bg-navy-light'
            }`}
          >
            {cta}
          </button>
        </HoverScale>
      </div>
    </FadeUp>
  );
}
