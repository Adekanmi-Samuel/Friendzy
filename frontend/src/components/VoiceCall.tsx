import { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceCallProps {
  callerName: string;
  callerAvatar?: string;
  isIncoming?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  onEnd?: () => void;
}

export default function VoiceCall({ callerName, callerAvatar, isIncoming, onAccept, onDecline, onEnd }: VoiceCallProps) {
  const [status, setStatus] = useState<'ringing' | 'connecting' | 'active' | 'ended'>(isIncoming ? 'ringing' : 'connecting');
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  useEffect(() => {
    if (status === 'connecting') {
      const timer = setTimeout(() => setStatus('active'), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    if (status !== 'active') return;
    const interval = setInterval(() => setDuration(d => d + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleEnd = () => {
    setStatus('ended');
    setTimeout(() => onEnd?.(), 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink-light/20 to-ink" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Avatar */}
        <div className="relative">
          <div className={`w-28 h-28 rounded-full bg-gradient-to-br from-amber/20 to-moss/20 flex items-center justify-center text-4xl ${
            status === 'active' ? '' : 'animate-pulse'
          }`}>
            {callerAvatar || callerName[0]}
          </div>
          {status === 'active' && (
            <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-moss border-2 border-ink" />
          )}
        </div>

        {/* Name and status */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            {callerName}
          </h2>
          <p className="text-white/50 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
            {status === 'ringing' && 'Incoming call...'}
            {status === 'connecting' && 'Connecting...'}
            {status === 'active' && formatDuration(duration)}
            {status === 'ended' && 'Call ended'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          {status === 'active' && (
            <>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isMuted ? 'bg-white/20 text-white' : 'bg-white/10 text-white/70'
                }`}
              >
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <button
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isSpeakerOn ? 'bg-white/20 text-white' : 'bg-white/10 text-white/70'
                }`}
              >
                {isSpeakerOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            </>
          )}

          {isIncoming && status === 'ringing' ? (
            <>
              <button
                onClick={() => { setStatus('connecting'); onDecline?.(); }}
                className="w-16 h-16 rounded-full bg-brick flex items-center justify-center text-white hover:bg-brick/90 transition-colors cursor-pointer"
              >
                <PhoneOff size={24} />
              </button>
              <button
                onClick={() => { setStatus('connecting'); onAccept?.(); }}
                className="w-16 h-16 rounded-full bg-moss flex items-center justify-center text-white hover:bg-moss/90 transition-colors cursor-pointer"
              >
                <Phone size={24} />
              </button>
            </>
          ) : (
            <button
              onClick={handleEnd}
              className="w-16 h-16 rounded-full bg-brick flex items-center justify-center text-white hover:bg-brick/90 transition-colors cursor-pointer"
            >
              <PhoneOff size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
