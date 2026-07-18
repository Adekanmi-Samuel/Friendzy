import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0, normalX: 0, normalY: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalX: e.clientX / window.innerWidth,
        normalY: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return position;
}
