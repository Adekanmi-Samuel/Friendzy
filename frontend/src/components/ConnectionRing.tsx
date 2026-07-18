import ConnectionArcs from './ConnectionArcs';

interface ConnectionRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  animate?: boolean;
}

/**
 * Thin wrapper that renders ConnectionArcs for normal sizes,
 * and falls back to monospace score text for very small sizes (<60px).
 */
export default function ConnectionRing({
  score,
  size = 120,
  showLabel = true,
}: ConnectionRingProps) {
  /* For very small sizes the arcs would be illegible -- just show the number */
  if (size < 60) {
    return (
      <div
        className="inline-flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span
          className="font-bold leading-none"
          style={{
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            fontSize: `${Math.max(10, size * 0.24)}px`,
            color: '#243442',
          }}
        >
          {score}%
        </span>
      </div>
    );
  }

  return (
    <ConnectionArcs
      score={score}
      size={size}
      showLabel={showLabel}
    />
  );
}
