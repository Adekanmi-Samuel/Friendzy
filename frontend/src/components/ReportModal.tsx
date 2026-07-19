import { useState } from 'react';
import { X, Flag, AlertTriangle } from 'lucide-react';

const reasons = [
  { value: 'harassment', label: 'Harassment or bullying' },
  { value: 'fake_profile', label: 'Fake profile or impersonation' },
  { value: 'inappropriate', label: 'Inappropriate content' },
  { value: 'spam', label: 'Spam or scam' },
  { value: 'other', label: 'Other concern' },
];

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportedUserId: string;
  reportedUserName: string;
}

export default function ReportModal({ isOpen, onClose, reportedUserId, reportedUserName }: ReportModalProps) {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!reason) return;

    // In production: call API
    // await fetch('/api/moderation/report', { method: 'POST', body: JSON.stringify({...}) });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setReason('');
      setDescription('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-fade-in-up" onClick={e => e.stopPropagation()}>
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-moss/10 flex items-center justify-center mx-auto mb-4">
              <Flag size={28} className="text-moss" />
            </div>
            <h3 className="text-xl font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-display)' }}>Report Submitted</h3>
            <p className="text-slate text-sm">Our team will review this within 24 hours. Thank you for helping keep Friendzy safe.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                Report {reportedUserName}
              </h3>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-pebble/30 transition-colors cursor-pointer">
                <X size={18} className="text-slate" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {reasons.map(r => (
                <button
                  key={r.value}
                  onClick={() => setReason(r.value)}
                  className={`w-full text-left p-3 rounded-xl border text-sm transition-all cursor-pointer ${
                    reason === r.value
                      ? 'border-amber bg-amber/5 text-ink'
                      : 'border-pebble text-slate hover:border-amber/30'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Add details (optional)..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-linen border border-pebble text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-amber/30 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-pebble text-slate text-sm font-medium hover:bg-pebble/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!reason}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  reason
                    ? 'bg-brick text-white hover:bg-brick/90'
                    : 'bg-pebble/30 text-slate/50 cursor-not-allowed'
                }`}
              >
                Submit Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
