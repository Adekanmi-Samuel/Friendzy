import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem('friendzy_logged_in') === 'true');
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('friendzy_logged_in');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('storage'));
    window.location.href = '/';
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/safety', label: 'Safety' },
    { to: '/pricing', label: 'Pricing' },
  ];

  const navBg = isHome && !scrolled
    ? 'bg-transparent'
    : isHome && scrolled
      ? 'bg-linen/90 backdrop-blur-xl border-b border-pebble/50'
      : 'bg-white/90 backdrop-blur-xl border-b border-pebble/50';

  const textColor = isHome && !scrolled
    ? 'text-ink'
    : isHome && scrolled
      ? 'text-ink'
      : 'text-ink';

  const linkColor = isHome && !scrolled
    ? 'text-slate hover:text-ink hover:bg-pebble/20'
    : isHome && scrolled
      ? 'text-slate hover:text-ink hover:bg-pebble/20'
      : 'text-slate hover:text-ink hover:bg-pebble/20';

  const linkActiveColor = isHome && !scrolled
    ? 'bg-amber/10 text-amber'
    : isHome && scrolled
      ? 'bg-amber/10 text-amber'
      : 'bg-amber/10 text-amber';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className={`transition-all duration-300 ${navBg}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo-icon.svg" alt="" className="w-8 h-8" />
              <span className={`text-lg font-semibold font-display ${textColor}`}>
                Friendzy
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-xl text-sm font-medium font-body transition-all ${
                    location.pathname === link.to
                      ? linkActiveColor
                      : linkColor
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <LanguageSelector compact />
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => setShowAuth(true)}
                    className="ml-3 px-5 py-2 rounded-xl text-sm font-semibold font-body transition-all cursor-pointer text-slate hover:text-ink hover:bg-pebble/20"
                  >
                    Sign In
                  </button>
                  <Link
                    to="/onboarding"
                    className="ml-3 px-5 py-2 rounded-xl text-sm font-semibold font-body transition-all cursor-pointer bg-amber text-white hover:bg-amber-light"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="ml-3 px-5 py-2 rounded-xl text-sm font-semibold font-body transition-all cursor-pointer text-slate hover:text-ink hover:bg-pebble/20"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="ml-3 px-5 py-2 rounded-xl text-sm font-semibold font-body transition-all cursor-pointer bg-pebble text-ink hover:bg-slate/20"
                  >
                    Log Out
                  </button>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden rounded-xl p-2.5 transition-colors text-ink hover:bg-pebble/20"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mx-4 mt-2 rounded-xl bg-white border border-pebble p-4 space-y-1">
          <div className="px-4 py-2">
            <LanguageSelector />
          </div>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium font-body transition-colors ${
                location.pathname === link.to
                  ? 'bg-amber/10 text-amber'
                  : 'text-ink hover:bg-pebble/20'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => { setIsOpen(false); setShowAuth(true); }}
                className="block w-full px-4 py-2.5 rounded-xl text-sm font-semibold font-body text-ink hover:bg-pebble/20 text-center mt-2 cursor-pointer"
              >
                Sign In
              </button>
              <Link
                to="/onboarding"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-semibold font-body bg-amber text-white text-center mt-2"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium font-body text-ink hover:bg-pebble/20 mt-2"
              >
                Profile
              </Link>
              <button
                onClick={() => { setIsOpen(false); handleLogout(); }}
                className="block w-full px-4 py-2.5 rounded-xl text-sm font-semibold font-body bg-pebble text-ink text-center mt-2 cursor-pointer"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      )}

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </nav>
  );
}
