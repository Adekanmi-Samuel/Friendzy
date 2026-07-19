import { Shield, ShieldCheck, Clock, XCircle } from 'lucide-react';

interface VerificationBadgeProps {
  status: 'not_submitted' | 'pending' | 'approved' | 'rejected';
  size?: 'sm' | 'md' | 'lg';
}

export default function VerificationBadge({ status, size = 'sm' }: VerificationBadgeProps) {
  const config = {
    not_submitted: { icon: Shield, label: 'Unverified', color: 'text-slate', bg: 'bg-pebble/20' },
    pending: { icon: Clock, label: 'Pending', color: 'text-amber', bg: 'bg-amber/10' },
    approved: { icon: ShieldCheck, label: 'Verified', color: 'text-moss', bg: 'bg-moss/10' },
    rejected: { icon: XCircle, label: 'Rejected', color: 'text-brick', bg: 'bg-brick/10' },
  };

  const { icon: Icon, label, color, bg } = config[status];
  const sizes = { sm: 'text-[10px] px-2 py-0.5 gap-1', md: 'text-xs px-2.5 py-1 gap-1.5', lg: 'text-sm px-3 py-1.5 gap-2' };
  const iconSizes = { sm: 10, md: 13, lg: 16 };

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${bg} ${color} ${sizes[size]}`}>
      <Icon size={iconSizes[size]} />
      {label}
    </span>
  );
}
