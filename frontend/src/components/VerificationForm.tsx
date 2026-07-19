import { useState } from 'react';
import { Upload, Shield, ArrowRight, Check, ShieldCheck, Clock } from 'lucide-react';

const idTypes = [
  { value: 'national_id', label: 'National ID', icon: '🪪' },
  { value: 'passport', label: 'Passport', icon: '📕' },
  { value: 'drivers_license', label: "Driver's License", icon: '🚗' },
];

interface VerificationFormProps {
  onSubmit?: (data: { idType: string; fullName: string; dateOfBirth: string }) => void;
  currentStatus?: 'not_submitted' | 'pending' | 'approved' | 'rejected';
}

export default function VerificationForm({ onSubmit, currentStatus = 'not_submitted' }: VerificationFormProps) {
  const [step, setStep] = useState<'select' | 'details' | 'upload' | 'success'>(currentStatus === 'not_submitted' ? 'select' : 'success');
  const [idType, setIdType] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = () => {
    onSubmit?.({ idType, fullName, dateOfBirth: dob });
    setStep('success');
  };

  if (currentStatus === 'pending') {
    return (
      <div className="rounded-2xl bg-amber/5 border border-amber/20 p-6 text-center">
        <Clock size={28} className="text-amber mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Verification Pending
        </h3>
        <p className="text-sm text-slate">
          Your verification is being reviewed. This usually takes 24 hours.
        </p>
      </div>
    );
  }

  if (currentStatus === 'approved') {
    return (
      <div className="rounded-2xl bg-moss/5 border border-moss/20 p-6 text-center">
        <ShieldCheck size={28} className="text-moss mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Verified ✓
        </h3>
        <p className="text-sm text-slate">
          Your identity has been verified. You now have a verified badge on your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-pebble p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center">
          <Shield size={18} className="text-amber" />
        </div>
        <div>
          <h3 className="font-semibold text-ink" style={{ fontFamily: 'var(--font-display)' }}>Verify Your Identity</h3>
          <p className="text-xs text-slate">Get a verified badge and build trust</p>
        </div>
      </div>

      {step === 'select' && (
        <div className="space-y-3 mb-6">
          <p className="text-sm font-medium text-ink">Select ID type</p>
          {idTypes.map(type => (
            <button
              key={type.value}
              onClick={() => { setIdType(type.value); setStep('details'); }}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                idType === type.value
                  ? 'border-amber bg-amber/5'
                  : 'border-pebble hover:border-amber/30'
              }`}
            >
              <span className="text-2xl">{type.icon}</span>
              <span className="text-sm font-medium text-ink">{type.label}</span>
            </button>
          ))}
        </div>
      )}

      {step === 'details' && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Full Name (as on ID)</label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-linen border border-pebble text-sm text-ink focus:outline-none focus:ring-2 focus:ring-amber/30"
              placeholder="Enter your full legal name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-linen border border-pebble text-sm text-ink focus:outline-none focus:ring-2 focus:ring-amber/30"
            />
          </div>
          <button
            onClick={() => setStep('upload')}
            disabled={!fullName || !dob}
            className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              fullName && dob
                ? 'bg-ink text-white hover:bg-ink-light'
                : 'bg-pebble/30 text-slate/50 cursor-not-allowed'
            }`}
          >
            Continue <ArrowRight size={16} />
          </button>
        </div>
      )}

      {step === 'upload' && (
        <div className="space-y-4 mb-6">
          <div className="border-2 border-dashed border-pebble rounded-2xl p-8 text-center">
            <Upload size={32} className="text-slate mx-auto mb-3" />
            <p className="text-sm font-medium text-ink mb-1">Upload your ID</p>
            <p className="text-xs text-slate">JPG, PNG or PDF. Max 5MB.</p>
            <button className="mt-4 px-6 py-2.5 rounded-xl bg-ink text-white text-sm font-medium hover:bg-ink-light transition-colors cursor-pointer">
              Choose File
            </button>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl bg-amber text-white text-sm font-semibold hover:bg-amber-light transition-colors cursor-pointer"
          >
            Submit for Review
          </button>
        </div>
      )}

      {step === 'success' && (
        <div className="text-center py-6">
          <div className="w-14 h-14 rounded-full bg-amber/10 flex items-center justify-center mx-auto mb-4">
            <Check size={24} className="text-amber" />
          </div>
          <h3 className="text-lg font-semibold text-ink mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Submitted!
          </h3>
          <p className="text-sm text-slate">
            Your verification has been submitted. We'll review it within 24 hours.
          </p>
        </div>
      )}

      <p className="text-[10px] text-slate/50 text-center">
        Your ID is encrypted and only used for verification. We never share it.
      </p>
    </div>
  );
}
