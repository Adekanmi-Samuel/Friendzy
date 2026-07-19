import { Heart, MessageCircle, Users, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  type: 'matches' | 'messages' | 'groups' | 'search' | 'generic';
  title?: string;
  description?: string;
  action?: { label: string; href: string };
}

const defaults = {
  matches: { icon: Heart, title: 'No matches yet', description: 'Complete your profile to get better matches. The more you share, the more we find your people.' },
  messages: { icon: MessageCircle, title: 'No conversations yet', description: 'When you match with someone, your conversations will show up here.' },
  groups: { icon: Users, title: 'No groups yet', description: 'Join or create a group to meet people with shared interests.' },
  search: { icon: Search, title: 'No results found', description: 'Try adjusting your search or filters to find what you are looking for.' },
  generic: { icon: Heart, title: 'Nothing here yet', description: 'This space is waiting for something special.' },
};

export default function EmptyState({ type, title, description, action }: EmptyStateProps) {
  const config = defaults[type];
  const Icon = config.icon;

  return (
    <div className="text-center py-16 px-6">
      <div className="w-16 h-16 rounded-2xl bg-amber/10 flex items-center justify-center mx-auto mb-5">
        <Icon size={28} className="text-amber" />
      </div>
      <h3 className="text-lg font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-display)' }}>
        {title || config.title}
      </h3>
      <p className="text-sm text-slate max-w-md mx-auto mb-6">
        {description || config.description}
      </p>
      {action && (
        <Link
          to={action.href}
          className="inline-flex px-6 py-2.5 rounded-xl bg-amber text-white text-sm font-semibold hover:bg-amber-light transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
