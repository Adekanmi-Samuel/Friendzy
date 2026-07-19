import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import CursorGlow from './components/CursorGlow';
import ScrollProgress from './components/ScrollProgress';
import { ToastProvider } from './components/Toast';
import CookieConsent from './components/CookieConsent';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

/* ─── Lazy-loaded pages ─── */
const Landing = lazy(() => import('./pages/Landing'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Chat = lazy(() => import('./pages/Chat'));
const Profile = lazy(() => import('./pages/Profile'));
const Safety = lazy(() => import('./pages/Safety'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Settings = lazy(() => import('./pages/Settings'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Support = lazy(() => import('./pages/Support'));
const Admin = lazy(() => import('./pages/Admin'));

/* ─── Minimal Suspense Fallback ─── */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linen">
      <div className="w-8 h-8 border-2 border-pebble border-t-amber rounded-full animate-spin" />
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
          className="inline-block mt-2 px-5 py-2.5 rounded-lg bg-amber text-white text-sm font-medium hover:bg-amber-light transition-colors"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <CursorGlow />
        <ScrollProgress />
        <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/support" element={<Support />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieConsent />
          </Suspense>
        </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
