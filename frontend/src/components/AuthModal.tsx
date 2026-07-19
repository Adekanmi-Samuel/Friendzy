import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, Heart } from 'lucide-react';
import { FadeUp } from '../lib/animate';

type AuthView = 'login' | 'register' | 'forgot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: AuthView;
}

export default function AuthModal({ isOpen, onClose, defaultView = 'login' }: AuthModalProps) {
  const [view, setView] = useState<AuthView>(defaultView);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isOpen) return null;

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    // In production: redirect to OAuth provider
    // window.location.href = `/api/auth/${provider}`;
    console.log(`Login with ${provider}`);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In production: call API
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('friendzy_logged_in', 'true');
      onClose();
      window.dispatchEvent(new Event('storage'));
      window.location.href = '/dashboard';
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden animate-fade-in-up" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="relative px-6 pt-8 pb-4 text-center bg-gradient-to-b from-ink to-ink-light/20">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors cursor-pointer">
            <X size={18} />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber to-moss flex items-center justify-center mx-auto mb-4">
            <Heart size={20} className="text-white" fill="white" />
          </div>
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
            {view === 'login' && 'Welcome back'}
            {view === 'register' && 'Join Friendzy'}
            {view === 'forgot' && 'Reset password'}
          </h2>
          <p className="text-white/50 text-sm mt-1">
            {view === 'login' && 'Sign in to find your people'}
            {view === 'register' && 'Start finding genuine friendships'}
            {view === 'forgot' && 'Enter your email to reset'}
          </p>
        </div>

        <div className="px-6 py-6">
          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-pebble hover:bg-linen transition-colors cursor-pointer disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              <span className="text-sm font-medium text-ink">Continue with Google</span>
            </button>

            <button
              onClick={() => handleSocialLogin('facebook')}
              disabled={loading}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-pebble hover:bg-linen transition-colors cursor-pointer disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span className="text-sm font-medium text-ink">Continue with Facebook</span>
            </button>

            <button
              onClick={() => handleSocialLogin('twitter')}
              disabled={loading}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-pebble hover:bg-linen transition-colors cursor-pointer disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DA1F2"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              <span className="text-sm font-medium text-ink">Continue with X (Twitter)</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-pebble/30" />
            <span className="text-xs text-slate">or continue with email</span>
            <div className="flex-1 h-px bg-pebble/30" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {view === 'register' && (
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/40" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-linen border border-pebble text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-amber/30"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/40" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-linen border border-pebble text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-amber/30"
                />
              </div>
            </div>

            {view !== 'forgot' && (
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-linen border border-pebble text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-amber/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate/40 hover:text-slate cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {view === 'register' && (
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-linen border border-pebble text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-amber/30"
                  />
                </div>
              </div>
            )}

            {view === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-pebble text-amber focus:ring-amber/30" />
                  <span className="text-sm text-slate">Remember me</span>
                </label>
                <button type="button" onClick={() => setView('forgot')} className="text-sm text-amber hover:text-amber-light transition-colors cursor-pointer">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-amber-light transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {view === 'login' && 'Sign In'}
                  {view === 'register' && 'Create Account'}
                  {view === 'forgot' && 'Send Reset Link'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Switch view */}
          <p className="text-center text-sm text-slate mt-6">
            {view === 'login' && (
              <>Don't have an account? <button onClick={() => setView('register')} className="text-amber font-medium hover:text-amber-light cursor-pointer">Sign up</button></>
            )}
            {view === 'register' && (
              <>Already have an account? <button onClick={() => setView('login')} className="text-amber font-medium hover:text-amber-light cursor-pointer">Sign in</button></>
            )}
            {view === 'forgot' && (
              <>Remember your password? <button onClick={() => setView('login')} className="text-amber font-medium hover:text-amber-light cursor-pointer">Sign in</button></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
