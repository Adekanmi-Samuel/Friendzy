import { Globe } from 'lucide-react';
import { useState } from 'react';

const regions = [
  { code: 'US', label: 'US/CA', flag: '🇺🇸' },
  { code: 'EU', label: 'UK/EU', flag: '🇬🇧' },
  { code: 'NG', label: 'Nigeria', flag: '🇳🇬' },
  { code: 'IN', label: 'India', flag: '🇮🇳' },
  { code: 'BR', label: 'Brazil', flag: '🇧🇷' },
  { code: 'SEA', label: 'SE Asia', flag: '🇸🇬' },
];

interface RegionToggleProps {
  selected?: string;
  onSelect?: (code: string) => void;
}

export default function RegionToggle({ selected = 'US', onSelect }: RegionToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const current = regions.find(r => r.code === selected) || regions[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-deep-navy border border-warm-beige/50 hover:bg-white/90 transition-all cursor-pointer"
      >
        <Globe size={16} className="text-warm-gold" />
        <span>{current.flag} {current.label}</span>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-50 rounded-2xl bg-white shadow-xl border border-warm-beige/30 p-2 min-w-[180px]">
          {regions.map(region => (
            <button
              key={region.code}
              onClick={() => { onSelect?.(region.code); setIsOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all cursor-pointer
                ${selected === region.code
                  ? 'bg-warm-gold/10 text-warm-gold font-semibold'
                  : 'text-deep-navy hover:bg-warm-beige/30'
                }`}
            >
              <span className="text-lg">{region.flag}</span>
              <span>{region.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
