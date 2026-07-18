import { AnimatedRing } from '../lib/animate';

interface ConnectionRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  animate?: boolean;
  showLabel?: boolean;
}

export default function ConnectionRing({
  score,
  size = 120,
  strokeWidth = 8,
  showLabel = true,
}: ConnectionRingProps) {
  const getColor = (s: number) => {
    if (s >= 80) return '#6B8C7A';
    if (s >= 60) return '#D4A373';
    if (s >= 40) return '#4A6A7A';
    return '#C85A4C';
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <AnimatedRing score={score} size={size} strokeWidth={strokeWidth} />
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-2xl font-bold"
            style={{ color: getColor(score), fontFamily: 'var(--font-heading)' }}
          >
            {score}%
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-slate font-medium">
            Match
          </span>
        </div>
      )}
    </div>
  );
}
