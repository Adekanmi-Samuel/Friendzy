import { Heart, X, MapPin, MessageCircle } from 'lucide-react';
import ConnectionArcs from './ConnectionArcs';
import SafeSpaceBadge from './SafeSpaceBadge';

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
    <div className="relative w-full max-w-sm mx-auto animate-fade-in-up">
      <div className="rounded-2xl overflow-hidden bg-white border border-pebble">
        {/* Image Section */}
        <div className="relative h-72 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 right-4">
            <SafeSpaceBadge size="sm" />
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white font-display">
                  {name}, {age}
                </h3>
                <p className="flex items-center gap-1 text-sm text-white/70 font-body">
                  <MapPin size={12} /> {location}
                </p>
              </div>
              <ConnectionArcs score={compatibility} size={56} showLabel={false} />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          <p className="text-sm text-slate leading-relaxed mb-4 font-body">{bio}</p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {interests.map(interest => (
              <span
                key={interest}
                className="px-3 py-1 rounded-full text-xs font-medium font-body bg-moss/8 text-moss"
              >
                {interest}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onPass}
              className="w-12 h-12 rounded-full bg-pebble/40 flex items-center justify-center text-slate hover:bg-brick/10 hover:text-brick transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            <button
              onClick={onChat}
              className="flex-1 py-3 rounded-xl bg-amber text-white text-sm font-semibold font-body flex items-center justify-center gap-2 hover:bg-amber-light transition-colors cursor-pointer"
            >
              <MessageCircle size={16} /> Say Hello
            </button>
            <button
              onClick={onLike}
              className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center text-amber hover:bg-amber/20 transition-colors cursor-pointer"
            >
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
