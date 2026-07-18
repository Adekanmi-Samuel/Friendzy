const moods = [
  { emoji: '\u{1F60A}', label: 'Great', value: 'great' },
  { emoji: '\u{1F642}', label: 'Good', value: 'good' },
  { emoji: '\u{1F610}', label: 'Okay', value: 'okay' },
  { emoji: '\u{1F614}', label: 'Low', value: 'low' },
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
        <button
          key={mood.value}
          onClick={() => onSelect?.(mood.value)}
          className={`flex items-center gap-1.5 rounded-xl py-2 px-3 text-sm font-medium font-body transition-all cursor-pointer
            ${selected === mood.value
              ? `mood-${mood.value} text-white`
              : 'bg-white border border-pebble text-slate hover:bg-pebble/30'
            }`}
        >
          <span className={compact ? 'text-base' : 'text-lg'}>{mood.emoji}</span>
          {!compact && <span>{mood.label}</span>}
        </button>
      ))}
    </div>
  );
}
