import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const regions = [
  { code: 'US', label: 'US/CA', flag: '\u{1F1FA}\u{1F1F8}' },
  { code: 'EU', label: 'UK/EU', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'NG', label: 'Nigeria', flag: '\u{1F1F3}\u{1F1EC}' },
  { code: 'IN', label: 'India', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'BR', label: 'Brazil', flag: '\u{1F1E7}\u{1F1F7}' },
  { code: 'SEA', label: 'SE Asia', flag: '\u{1F1F8}\u{1F1EC}' },
];

interface RegionToggleProps {
  selected?: string;
  onSelect?: (code: string) => void;
}

export default function RegionToggle({ selected = 'US', onSelect }: RegionToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = regions.find(r => r.code === selected) || regions[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium font-body text-ink border border-pebble hover:bg-pebble/20 transition-all cursor-pointer"
      >
        <Globe size={16} className="text-amber" />
        <span>{current.flag} {current.label}</span>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-50 rounded-xl bg-white border border-pebble p-2 min-w-[180px]">
          {regions.map(region => (
            <button
              key={region.code}
              onClick={() => { onSelect?.(region.code); setIsOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-body transition-all cursor-pointer
                ${selected === region.code
                  ? 'bg-amber/10 text-amber font-semibold'
                  : 'text-ink hover:bg-pebble/20'
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
