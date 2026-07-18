import { useMousePosition } from '../hooks/useMousePosition';

export default function CursorGlow() {
  const { x, y } = useMousePosition();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(196, 147, 63, 0.04), transparent 40%)`,
      }}
    />
  );
}
