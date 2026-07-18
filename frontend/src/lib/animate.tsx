import { type ReactNode, useEffect, useRef, useState } from 'react';

export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

export function FadeUp({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, isInView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export function HoverScale({ children, className = '', scale = 1.05 }: { children: ReactNode; className?: string; scale?: number }) {
  return (
    <div
      className={className}
      style={{ transition: 'transform 0.2s ease', cursor: 'pointer' }}
      onMouseEnter={e => (e.currentTarget.style.transform = `scale(${scale})`)}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseDown={e => (e.currentTarget.style.transform = `scale(${scale * 0.95})`)}
      onMouseUp={e => (e.currentTarget.style.transform = `scale(${scale})`)}
    >
      {children}
    </div>
  );
}

export function AnimatedRing({ score, size, strokeWidth }: { score: number; size: number; strokeWidth: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const center = size / 2;

  const getColor = (s: number) => {
    if (s >= 80) return '#6B8C7A';
    if (s >= 60) return '#D4A373';
    if (s >= 40) return '#4A6A7A';
    return '#C85A4C';
  };

  return (
    <svg ref={ref} width={size} height={size} className="-rotate-90">
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#E8E2D6" strokeWidth={strokeWidth} />
      <circle
        cx={center} cy={center} r={radius} fill="none"
        stroke={getColor(score)} strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={isInView ? offset : circumference}
        style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
      />
    </svg>
  );
}
