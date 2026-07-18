import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import CursorGlow from './components/CursorGlow';
import ScrollProgress from './components/ScrollProgress';
import { initSmoothScroll, destroySmoothScroll } from './lib/smooth-scroll';

/* ─── Lazy-loaded pages ─── */
const Landing = lazy(() => import('./pages/Landing'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Chat = lazy(() => import('./pages/Chat'));
const Profile = lazy(() => import('./pages/Profile'));
const Safety = lazy(() => import('./pages/Safety'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Settings = lazy(() => import('./pages/Settings'));

/* ─── Loading Spinner ─── */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-linen)' }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-pebble border-t-amber rounded-full animate-spin" />
        <p className="text-xs text-slate tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>
          Loading...
        </p>
      </div>
    </div>
  );
}

/* ─── 404 Page ─── */
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-linen)' }}>
      <div className="text-center space-y-4 animate-fade-in-up">
        <p
          className="text-7xl font-bold text-ink/10"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          404
        </p>
        <h1
          className="text-2xl font-semibold text-ink"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Page not found
        </h1>
        <p className="text-slate text-sm">
          The page you are looking for does not exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block mt-2 px-5 py-2.5 rounded-lg bg-ink text-white text-sm font-medium hover:bg-ink-light transition-colors"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  return (
    <ErrorBoundary>
      <CursorGlow />
      <ScrollProgress />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
