import { X, Ban } from 'lucide-react';

interface BlockConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export default function BlockConfirmModal({ isOpen, onClose, onConfirm, userName }: BlockConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-brick/10 flex items-center justify-center mx-auto mb-4">
            <Ban size={24} className="text-brick" />
          </div>
          <h3 className="text-lg font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Block {userName}?
          </h3>
          <p className="text-slate text-sm">
            They won't be able to see your profile, send you messages, or find you in search. They won't be notified.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-pebble text-slate text-sm font-medium hover:bg-pebble/10 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 py-3 rounded-xl bg-brick text-white text-sm font-semibold hover:bg-brick/90 transition-colors cursor-pointer"
          >
            Block User
          </button>
        </div>
      </div>
    </div>
  );
}
