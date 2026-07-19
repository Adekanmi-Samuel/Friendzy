import { useEffect, useRef, useState } from 'react';

interface ConnectionArcsProps {
  score: number;
  size?: number;
  showLabel?: boolean;
  animate?: boolean;
}

/**
 * Two overlapping arcs representing two people connecting.
 * NOT a donut chart -- two semi-elliptical arcs that drift toward each other
 * based on the compatibility score.
 *
 * Score drives overlap:
 *   90%+ : arcs nearly fully interlock, large overlap, gentle breathing
 *   60-89%: arcs overlap ~60%, visible gap at ends
 *   40-59%: arcs touch but barely overlap
 *   <40%  : arcs separated
 */
export default function ConnectionArcs({
  score,
  size = 120,
  showLabel = true,
  animate = true,
}: ConnectionArcsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  /* ---------- IntersectionObserver for scroll-triggered animation ---------- */
  useEffect(() => {
    if (!animate) {
      setInView(true);
      return;
    }
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  /* ---------- Derived geometry ---------- */
  const viewBox = 200;
  const cx = viewBox / 2;
  const cy = viewBox / 2;
  const arcRadius = 72;
  const strokeW = Math.max(6, Math.min(10, size / 12));

  /* Overlap factor: how far the two arc centres are shifted toward each other.
     0 = fully separated, 1 = overlapping a lot. */
  const overlapFactor = score >= 90 ? 0.95
    : score >= 60 ? 0.15 + ((score - 60) / 30) * 0.8   // 0.15 .. 0.95
    : score >= 40 ? 0.08
    : 0;

  /* Arc sweep: how much of the circle each arc covers (degrees). */
  const baseSweep = 210; // each arc covers 210 degrees
  const sweep = baseSweep;

  /* Centre offset: how far each arc centre shifts inward (the "drift"). */
  const maxDrift = arcRadius * 0.55;
  const drift = overlapFactor * maxDrift;

  /* Amber glow intensity */
  const glowOpacity = score >= 90 ? 0.7
    : score >= 60 ? 0.2 + ((score - 60) / 30) * 0.5
    : score >= 40 ? 0.1
    : 0;

  /* ---------- SVG arc helpers ---------- */
  function describeArc(
    cxF: number,
    cyF: number,
    r: number,
    startAngleDeg: number,
    endAngleDeg: number,
  ) {
    const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
    const sx = cxF + r * Math.cos(rad(startAngleDeg));
    const sy = cyF + r * Math.sin(rad(startAngleDeg));
    const ex = cxF + r * Math.cos(rad(endAngleDeg));
    const ey = cyF + r * Math.sin(rad(endAngleDeg));
    const largeArc = endAngleDeg - startAngleDeg > 180 ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`;
  }

  /* Arc A starts from the left, Arc B from the right.
     The drift shifts their centres toward each other. */
  const arcAStart = -(sweep / 2);
  const arcAEnd = sweep / 2;
  const arcBStart = 180 - sweep / 2;
  const arcBEnd = 180 + sweep / 2;

  const pathA = describeArc(cx - drift, cy, arcRadius, arcAStart, arcAEnd);
  const pathB = describeArc(cx + drift, cy, arcRadius, arcBStart, arcBEnd);

  /* ---------- Person silhouettes at arc midpoints ---------- */
  const midAAngle = (arcAStart + arcAEnd) / 2;
  const midBAngle = (arcBStart + arcBEnd) / 2;

  const silhouetteRadius = Math.max(3, size / 30);
  const headR = silhouetteRadius * 0.55;
  const shoulderW = silhouetteRadius * 0.85;
  const shoulderH = silhouetteRadius * 0.35;

  function silhouettePos(angleDeg: number, centreX: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: centreX + arcRadius * Math.cos(rad),
      y: cy + arcRadius * Math.sin(rad),
    };
  }

  const posA = silhouettePos(midAAngle, cx - drift);
  const posB = silhouettePos(midBAngle, cx + drift);

  /* ---------- Animation CSS ---------- */
  const driftTransition = 'all 2s cubic-bezier(0.34, 1.56, 0.64, 1)';
  const breathingStyle = inView && animate
    ? { animation: 'ca-breathe 4s ease-in-out infinite' }
    : {};

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${viewBox} ${viewBox}`}
        width={size}
        height={size}
        style={{ overflow: 'visible' }}
        role="img"
        aria-label={`Connection score: ${score}%`}
      >
        {/* ---------- Definitions ---------- */}
        <defs>
          <filter id="ca-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feBlend in="blur" in2="SourceGraphic" mode="screen" />
          </filter>
        </defs>

        {/* ---------- Amber glow layer ---------- */}
        <g
          filter="url(#ca-glow)"
          opacity={inView ? glowOpacity : 0}
          style={{
            transition: 'opacity 2s ease-out 1s',
            ...breathingStyle,
          }}
        >
          {/* Glow is rendered as two semi-transparent arcs overlapping */}
          <path
            d={pathA}
            fill="none"
            stroke="var(--color-amber, #C4933F)"
            strokeWidth={strokeW * 2.5}
            strokeLinecap="round"
            opacity={0.35}
          />
          <path
            d={pathB}
            fill="none"
            stroke="var(--color-amber, #C4933F)"
            strokeWidth={strokeW * 2.5}
            strokeLinecap="round"
            opacity={0.35}
          />
        </g>

        {/* ---------- Arc A (Ink navy) ---------- */}
        <path
          d={pathA}
          fill="none"
          stroke="var(--color-ink, #243442)"
          strokeWidth={strokeW}
          strokeLinecap="round"
          style={{
            transform: inView ? 'none' : `translateX(${-maxDrift * 2}px)`,
            opacity: inView ? 1 : 0,
            transition: driftTransition,
            transitionDelay: '0s',
            ...breathingStyle,
          }}
        />

        {/* ---------- Arc B (Moss green) ---------- */}
        <path
          d={pathB}
          fill="none"
          stroke="var(--color-moss, #6B8C7A)"
          strokeWidth={strokeW}
          strokeLinecap="round"
          style={{
            transform: inView ? 'none' : `translateX(${maxDrift * 2}px)`,
            opacity: inView ? 1 : 0,
            transition: driftTransition,
            transitionDelay: '0.15s',
            ...breathingStyle,
          }}
        />

        {/* ---------- Person silhouette A ---------- */}
        <g
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.8s ease-out 1.5s',
            ...breathingStyle,
          }}
        >
          <circle cx={posA.x} cy={posA.y - headR - 1} r={headR} fill="var(--color-ink, #243442)" opacity={0.85} />
          <path
            d={`M ${posA.x - shoulderW} ${posA.y + 1} Q ${posA.x} ${posA.y + shoulderH * 2.2} ${posA.x + shoulderW} ${posA.y + 1}`}
            fill="none"
            stroke="var(--color-ink, #243442)"
            strokeWidth={headR * 0.7}
            strokeLinecap="round"
            opacity={0.7}
          />
        </g>

        {/* ---------- Person silhouette B ---------- */}
        <g
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.8s ease-out 1.7s',
            ...breathingStyle,
          }}
        >
          <circle cx={posB.x} cy={posB.y - headR - 1} r={headR} fill="var(--color-moss, #6B8C7A)" opacity={0.85} />
          <path
            d={`M ${posB.x - shoulderW} ${posB.y + 1} Q ${posB.x} ${posB.y + shoulderH * 2.2} ${posB.x + shoulderW} ${posB.y + 1}`}
            fill="none"
            stroke="var(--color-moss, #6B8C7A)"
            strokeWidth={headR * 0.7}
            strokeLinecap="round"
            opacity={0.7}
          />
        </g>
      </svg>

      {/* ---------- Label ---------- */}
      {showLabel && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.6s ease-out 1.8s',
          }}
        >
          <span
            className="font-bold leading-none"
            style={{
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
              fontSize: `${Math.max(12, size * 0.18)}px`,
              color: 'var(--color-ink, #243442)',
            }}
          >
            {score}%
          </span>
          {size >= 60 && (
            <span
              className="uppercase tracking-wider font-medium leading-none mt-0.5"
              style={{
                fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                fontSize: `${Math.max(8, size * 0.08)}px`,
                color: 'var(--color-moss, #6B8C7A)',
              }}
            >
              Match
            </span>
          )}
        </div>
      )}

      {/* ---------- Keyframe injected once ---------- */}
      <style>{`
        @keyframes ca-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.015); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes ca-breathe { from, to { transform: scale(1); } }
        }
      `}</style>
    </div>
  );
}
