import { useState, useCallback, memo } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, Heart, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './Toast';

type AuthView = 'login' | 'register' | 'forgot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: AuthView;
}

const AuthModal = memo(function AuthModal({ isOpen, onClose, defaultView = 'login' }: AuthModalProps) {
  const [view, setView] = useState<AuthView>(defaultView);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { login, register, loginWithProvider, resetPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setShowPassword(false);
  }, []);

  const switchView = useCallback((newView: AuthView) => {
    resetForm();
    setView(newView);
  }, [resetForm]);

  if (!isOpen) return null;

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'twitter') => {
    setLoading(true);
    try {
      await loginWithProvider(provider);
      // OAuth redirects — modal closes on redirect
    } catch (err: any) {
      toast(err.message || `${provider} login failed`, 'error');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      if (view === 'login') {
        await login(email, password);
        toast('Welcome back!', 'success');
        onClose();
        resetForm();
        navigate('/dashboard');
      } else if (view === 'register') {
        if (password !== confirmPassword) {
          toast('Passwords do not match', 'error');
          setLoading(false);
          return;
        }
        await register({ name, email, password });
        toast('Check your email to confirm your account!', 'success');
        onClose();
        resetForm();
      } else {
        await resetPassword(email);
        toast('Reset link sent to your email', 'success');
        onClose();
        resetForm();
      }
    } catch (err: any) {
      toast(err.message || 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Desktop: centered */}
      <div className="hidden md:flex items-center justify-center h-full p-4">
        <div
          className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-fade-in-up"
          onClick={e => e.stopPropagation()}
        >
          <AuthContent
            view={view}
            switchView={switchView}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            loading={loading}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            name={name}
            setName={setName}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleSubmit={handleSubmit}
            handleSocialLogin={handleSocialLogin}
            onClose={onClose}
          />
        </div>
      </div>

      {/* Mobile: bottom sheet */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 animate-fade-in-up">
        <div
          className="bg-white rounded-t-3xl max-h-[92vh] overflow-y-auto shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-pebble/40" />
          </div>

          <AuthContent
            view={view}
            switchView={switchView}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            loading={loading}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            name={name}
            setName={setName}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleSubmit={handleSubmit}
            handleSocialLogin={handleSocialLogin}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
});

/* ─── Shared Content ─── */
interface ContentProps {
  view: AuthView;
  switchView: (v: AuthView) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  loading: boolean;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSocialLogin: (provider: 'google' | 'facebook' | 'twitter') => void;
  onClose: () => void;
}

const socialProviders = [
  {
    provider: 'google' as const,
    label: 'Continue with Google',
    color: '#4285F4',
    path: 'M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z',
  },
  {
    provider: 'facebook' as const,
    label: 'Continue with Facebook',
    color: '#1877F2',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    provider: 'twitter' as const,
    label: 'Continue with X',
    color: '#000000',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
];

function AuthContent({
  view, switchView, showPassword, setShowPassword, loading,
  email, setEmail, password, setPassword, name, setName,
  confirmPassword, setConfirmPassword,
  handleSubmit, handleSocialLogin, onClose,
}: ContentProps) {
  return (
    <>
      {/* Header */}
      <div className="relative px-5 pt-6 pb-4 md:px-6 md:pt-8 md:pb-4 text-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-xl hover:bg-pebble/10 text-slate transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber to-moss flex items-center justify-center mx-auto mb-3">
          <Heart size={18} className="text-white" fill="white" />
        </div>
        <h2 className="text-xl font-bold text-ink" style={{ fontFamily: 'var(--font-display)' }}>
          {view === 'login' && 'Welcome back'}
          {view === 'register' && 'Join Friendzy'}
          {view === 'forgot' && 'Reset password'}
        </h2>
        <p className="text-slate text-sm mt-1">
          {view === 'login' && 'Sign in to find your people'}
          {view === 'register' && 'Start finding genuine friendships'}
          {view === 'forgot' && 'Enter your email to receive a reset link'}
        </p>
      </div>

      <div className="px-5 pb-6 md:px-6">
        {/* Social Login */}
        <div className="space-y-2.5 mb-5">
          {socialProviders.map(s => (
            <button
              key={s.provider}
              onClick={() => handleSocialLogin(s.provider)}
              disabled={loading}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-pebble hover:bg-linen/50 transition-colors cursor-pointer disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={s.color}><path d={s.path}/></svg>
              <span className="text-sm font-medium text-ink">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 h-px bg-pebble/30" />
          <span className="text-xs text-slate whitespace-nowrap">or continue with email</span>
          <div className="flex-1 h-px bg-pebble/30" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {view === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate mb-1.5">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/40" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  autoComplete="name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-linen border border-pebble text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber/30 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate mb-1.5">Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/40" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-linen border border-pebble text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber/30 transition-all"
              />
            </div>
          </div>

          {view !== 'forgot' && (
            <div>
              <label className="block text-xs font-medium text-slate mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  autoComplete={view === 'login' ? 'current-password' : 'new-password'}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-linen border border-pebble text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate/40 hover:text-slate transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          )}

          {view === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-linen border border-pebble text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber/30 transition-all"
                />
              </div>
            </div>
          )}

          {view === 'login' && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-pebble text-amber focus:ring-amber/30" />
                <span className="text-xs text-slate">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => switchView('forgot')}
                className="text-xs text-amber font-medium hover:text-amber-light transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-amber text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-amber-light transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                {view === 'login' && 'Sign In'}
                {view === 'register' && 'Create Account'}
                {view === 'forgot' && 'Send Reset Link'}
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        {/* Switch view */}
        <p className="text-center text-sm text-slate mt-5">
          {view === 'login' && (
            <>Don't have an account?{' '}
              <button onClick={() => switchView('register')} className="text-amber font-semibold hover:text-amber-light cursor-pointer">
                Sign up
              </button>
            </>
          )}
          {view === 'register' && (
            <>Already have an account?{' '}
              <button onClick={() => switchView('login')} className="text-amber font-semibold hover:text-amber-light cursor-pointer">
                Sign in
              </button>
            </>
          )}
          {view === 'forgot' && (
            <>Remember your password?{' '}
              <button onClick={() => switchView('login')} className="text-amber font-semibold hover:text-amber-light cursor-pointer">
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </>
  );
}

export default AuthModal;
