import { useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({ children, className = '', strength = 0.3 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
  };

  const handleEnter = () => {
    if (!ref.current) return;
    ref.current.style.transition = 'none';
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
      style={{ transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)' }}
    >
      {children}
    </div>
  );
}
