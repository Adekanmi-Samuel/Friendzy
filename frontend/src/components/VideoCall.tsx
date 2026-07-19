import { useState, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Maximize2, Minimize2 } from 'lucide-react';

interface VideoCallProps {
  callerName: string;
  callerAvatar?: string;
  isIncoming?: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
  onEnd?: () => void;
}

export default function VideoCall({ callerName, callerAvatar, isIncoming, onAccept, onDecline, onEnd }: VideoCallProps) {
  const [status, setStatus] = useState<'ringing' | 'connecting' | 'active' | 'ended'>(isIncoming ? 'ringing' : 'connecting');
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (status === 'connecting') {
      const timer = setTimeout(() => setStatus('active'), 2500);
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
    <div className="fixed inset-0 z-50 bg-black">
      {/* Remote video (full screen) */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink to-ink-light/30 flex items-center justify-center">
        {status === 'active' && isVideoOn ? (
          <div className="w-full h-full bg-gradient-to-br from-ink via-ink-light/10 to-ink" />
        ) : (
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-amber/20 flex items-center justify-center text-5xl mx-auto mb-4">
              {callerAvatar || callerName[0]}
            </div>
            <p className="text-white/60 text-sm">{callerName}</p>
          </div>
        )}
      </div>

      {/* Local video (PiP) */}
      {isVideoOn && status === 'active' && (
        <div className={`absolute z-20 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl ${
          isFullscreen ? 'bottom-20 right-4 w-40 h-56' : 'bottom-24 right-4 w-32 h-44'
        }`}>
          <div className="w-full h-full bg-ink-light/50 flex items-center justify-center">
            <p className="text-white/40 text-xs">You</p>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center text-white text-sm">
            {callerAvatar || callerName[0]}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{callerName}</p>
            <p className="text-white/50 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
              {status === 'ringing' && 'Incoming video call...'}
              {status === 'connecting' && 'Connecting...'}
              {status === 'active' && formatDuration(duration)}
              {status === 'ended' && 'Call ended'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white cursor-pointer"
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-6 flex items-center justify-center gap-4 bg-gradient-to-t from-black/60 to-transparent">
        {status === 'active' && (
          <>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isMuted ? 'bg-white/30 text-white' : 'bg-white/10 text-white/70'
              }`}
            >
              {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                !isVideoOn ? 'bg-white/30 text-white' : 'bg-white/10 text-white/70'
              }`}
            >
              {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
            </button>
          </>
        )}

        {isIncoming && status === 'ringing' ? (
          <>
            <button
              onClick={() => { setStatus('connecting'); onDecline?.(); }}
              className="w-14 h-14 rounded-full bg-brick flex items-center justify-center text-white hover:bg-brick/90 transition-colors cursor-pointer"
            >
              <PhoneOff size={22} />
            </button>
            <button
              onClick={() => { setStatus('connecting'); onAccept?.(); }}
              className="w-14 h-14 rounded-full bg-moss flex items-center justify-center text-white hover:bg-moss/90 transition-colors cursor-pointer"
            >
              <Video size={22} />
            </button>
          </>
        ) : (
          <button
            onClick={handleEnd}
            className="w-14 h-14 rounded-full bg-brick flex items-center justify-center text-white hover:bg-brick/90 transition-colors cursor-pointer"
          >
            <PhoneOff size={22} />
          </button>
        )}
      </div>
    </div>
  );
}
