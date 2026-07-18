import { Shield } from 'lucide-react';

export default function SafeSpaceBadge({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };
  const iconSizes = { sm: 10, md: 13, lg: 16 };

  return (
    <span
      className={`inline-flex items-center rounded-full bg-moss/10 text-moss font-semibold font-body ${sizes[size]}`}
    >
      <Shield size={iconSizes[size]} />
      Safe Space
    </span>
  );
}
