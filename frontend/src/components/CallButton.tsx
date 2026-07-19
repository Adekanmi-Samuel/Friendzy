import { useState } from 'react';
import { Phone, Video } from 'lucide-react';
import VoiceCall from './VoiceCall';
import VideoCall from './VideoCall';

interface CallButtonProps {
  userName: string;
  userAvatar?: string;
  type: 'voice' | 'video';
  disabled?: boolean;
  disabledReason?: string;
}

export default function CallButton({ userName, userAvatar, type, disabled, disabledReason }: CallButtonProps) {
  const [inCall, setInCall] = useState(false);

  const Icon = type === 'voice' ? Phone : Video;
  const CallComponent = type === 'voice' ? VoiceCall : VideoCall;

  if (disabled) {
    return (
      <div className="group relative">
        <button
          disabled
          className="w-10 h-10 rounded-xl bg-pebble/30 flex items-center justify-center text-slate/30 cursor-not-allowed"
        >
          <Icon size={16} />
        </button>
        {disabledReason && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-ink text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {disabledReason}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setInCall(true)}
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
          type === 'voice'
            ? 'bg-moss/10 text-moss hover:bg-moss/20'
            : 'bg-amber/10 text-amber hover:bg-amber/20'
        }`}
      >
        <Icon size={16} />
      </button>

      {inCall && (
        <CallComponent
          callerName={userName}
          callerAvatar={userAvatar}
          onEnd={() => setInCall(false)}
          onDecline={() => setInCall(false)}
        />
      )}
    </>
  );
}
