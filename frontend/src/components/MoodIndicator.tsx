import { HoverScale } from '../lib/animate';

const moods = [
  { emoji: '😊', label: 'Great', value: 'great' },
  { emoji: '🙂', label: 'Good', value: 'good' },
  { emoji: '😐', label: 'Okay', value: 'okay' },
  { emoji: '😔', label: 'Low', value: 'low' },
] as const;

type MoodValue = typeof moods[number]['value'];

interface MoodIndicatorProps {
  selected?: MoodValue;
  onSelect?: (mood: MoodValue) => void;
  compact?: boolean;
}

export default function MoodIndicator({ selected, onSelect, compact = false }: MoodIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      {moods.map((mood) => (
        <HoverScale key={mood.value} scale={1.1}>
          <button
            onClick={() => onSelect?.(mood.value)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all cursor-pointer
              ${selected === mood.value
                ? `mood-${mood.value} text-white shadow-md`
                : 'bg-white/60 text-muted-slate hover:bg-white/80'
              }`}
          >
            <span className={compact ? 'text-base' : 'text-lg'}>{mood.emoji}</span>
            {!compact && <span>{mood.label}</span>}
          </button>
        </HoverScale>
      ))}
    </div>
  );
}
