import { Users } from 'lucide-react';
import { FadeUp } from '../lib/animate';
import MagneticButton from './MagneticButton';

interface Group {
  id: string;
  name: string;
  interests: string[];
  maxMembers: number;
  members: string[];
  status: 'open' | 'full' | 'active' | 'completed';
  activity?: { title: string; emoji: string; description: string };
}

interface GroupCardProps {
  group: Group;
  onJoin?: (groupId: string) => void;
  onLeave?: (groupId: string) => void;
  isMember?: boolean;
}

export default function GroupCard({ group, onJoin, onLeave, isMember }: GroupCardProps) {
  const spotsLeft = group.maxMembers - group.members.length;
  const progress = (group.members.length / group.maxMembers) * 100;

  return (
    <FadeUp>
      <div className="rounded-2xl bg-white border border-pebble p-6 hover:border-amber/30 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-ink" style={{ fontFamily: 'var(--font-display)' }}>
              {group.name}
            </h3>
            <p className="text-xs text-slate mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
              {group.status === 'active' ? 'Active' : `${spotsLeft} spots left`}
            </p>
          </div>
          {group.activity && (
            <span className="text-2xl">{group.activity.emoji}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {group.interests.map(interest => (
            <span key={interest} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-moss/8 text-moss">
              {interest}
            </span>
          ))}
        </div>

        {group.activity && (
          <div className="p-3 rounded-xl bg-linen mb-4">
            <p className="text-sm font-medium text-ink">{group.activity.title}</p>
            <p className="text-xs text-slate">{group.activity.description}</p>
          </div>
        )}

        {/* Progress bar */}
        <div className="mb-4">
          <div className="w-full h-1.5 bg-pebble/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber to-moss rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] text-slate" style={{ fontFamily: 'var(--font-mono)' }}>
              {group.members.length}/{group.maxMembers} members
            </span>
            <div className="flex -space-x-1.5">
              {group.members.slice(0, 4).map((_, i) => (
                <div key={i} className="w-5 h-5 rounded-full bg-amber/20 border border-white" />
              ))}
            </div>
          </div>
        </div>

        <MagneticButton strength={0.1}>
          {isMember ? (
            <button
              onClick={() => onLeave?.(group.id)}
              className="w-full py-2.5 rounded-xl border border-pebble text-slate text-sm font-medium hover:bg-pebble/10 transition-colors cursor-pointer"
            >
              Leave Group
            </button>
          ) : (
            <button
              onClick={() => onJoin?.(group.id)}
              disabled={group.status === 'full'}
              className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-amber text-white hover:bg-amber-light"
            >
              <Users size={14} />
              {group.status === 'full' ? 'Group Full' : 'Join Group'}
            </button>
          )}
        </MagneticButton>
      </div>
    </FadeUp>
  );
}
