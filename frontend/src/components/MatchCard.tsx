import { Heart, X, MapPin, MessageCircle } from 'lucide-react';
import ConnectionRing from './ConnectionRing';
import SafeSpaceBadge from './SafeSpaceBadge';
import { HoverScale } from '../lib/animate';

interface MatchCardProps {
  name: string;
  age: number;
  location: string;
  compatibility: number;
  interests: string[];
  bio: string;
  image: string;
  onLike?: () => void;
  onPass?: () => void;
  onChat?: () => void;
}

export default function MatchCard({
  name, age, location, compatibility, interests, bio, image, onLike, onPass, onChat,
}: MatchCardProps) {
  return (
    <div className="relative w-full max-w-sm mx-auto animate-fade-in-up card-hover">
      <div className="rounded-3xl overflow-hidden bg-white shadow-xl border border-warm-beige/30 shimmer-border">
        <div className="relative h-72 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-transparent to-transparent" />
          <div className="absolute top-4 right-4">
            <SafeSpaceBadge size="sm" />
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {name}, {age}
                </h3>
                <p className="flex items-center gap-1 text-sm text-white/70">
                  <MapPin size={12} /> {location}
                </p>
              </div>
              <div className="glow rounded-full">
                <ConnectionRing score={compatibility} size={56} strokeWidth={4} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm text-muted-slate leading-relaxed mb-4">{bio}</p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {interests.map(interest => (
              <span
                key={interest}
                className="px-3 py-1 rounded-full text-xs font-medium bg-sage-green/10 text-sage-green"
              >
                {interest}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <HoverScale scale={1.1}>
              <button
                onClick={onPass}
                className="w-12 h-12 rounded-full bg-warm-beige/40 flex items-center justify-center text-muted-slate hover:bg-muted-red/10 hover:text-muted-red transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </HoverScale>
            <HoverScale scale={1.03}>
              <button
                onClick={onChat}
                className="flex-1 py-3 rounded-2xl bg-deep-navy text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-navy-light transition-colors cursor-pointer"
              >
                <MessageCircle size={16} /> Say Hello
              </button>
            </HoverScale>
            <HoverScale scale={1.1}>
              <button
                onClick={onLike}
                className="w-12 h-12 rounded-full bg-warm-gold/10 flex items-center justify-center text-warm-gold hover:bg-warm-gold/20 transition-colors cursor-pointer"
              >
                <Heart size={20} />
              </button>
            </HoverScale>
          </div>
        </div>
      </div>
    </div>
  );
}
