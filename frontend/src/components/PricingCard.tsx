import { Check, Crown, Zap } from 'lucide-react';
import { FadeUp } from '../lib/animate';

interface PricingCardProps {
  tier: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  cta: string;
  delay?: number;
  highlight?: boolean;
}

export default function PricingCard({ tier, price, period, features, popular, cta, delay = 0, highlight }: PricingCardProps) {
  return (
    <FadeUp delay={delay}>
      <div className={`relative rounded-2xl p-7 transition-all duration-300 ${
        popular
          ? 'bg-ink text-white border-2 border-amber shadow-xl shadow-amber/10 scale-[1.02]'
          : highlight
            ? 'bg-white border-2 border-amber/40 shadow-lg'
            : 'bg-white border border-pebble hover:border-pebble/80'
      }`}>
        {popular && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="px-4 py-1 rounded-full bg-amber text-white text-xs font-bold uppercase tracking-wider font-body flex items-center gap-1.5">
              <Zap size={12} fill="white" /> Most Popular
            </span>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            {tier === 'VIP' && <Crown size={20} className="text-amber" />}
            <h3 className={`text-lg font-semibold font-body ${popular ? 'text-white' : 'text-ink'}`}>{tier}</h3>
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-bold font-display ${popular ? 'text-white' : 'text-ink'}`}>{price}</span>
            <span className={`text-sm font-body ${popular ? 'text-white/60' : 'text-slate'}`}>/{period}</span>
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          {features.map(feature => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check size={16} className={`mt-0.5 flex-shrink-0 ${popular ? 'text-amber' : 'text-moss'}`} />
              <span className={`text-sm font-body ${popular ? 'text-white/90' : 'text-slate'}`}>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className={`w-full py-3.5 rounded-xl text-sm font-semibold font-body transition-all cursor-pointer ${
            popular
              ? 'bg-amber text-white hover:bg-amber-light'
              : 'bg-ink text-white hover:bg-ink-light'
          }`}
        >
          {cta}
        </button>
      </div>
    </FadeUp>
  );
}
