import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

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
      ? 'bg-ink border-b border-pebble/50'
      : 'bg-white/90 backdrop-blur-xl border-b border-pebble/50';

  const textColor = isHome && !scrolled
    ? 'text-white'
    : isHome && scrolled
      ? 'text-white'
      : 'text-ink';

  const linkColor = isHome && !scrolled
    ? 'text-white/70 hover:text-white hover:bg-white/10'
    : isHome && scrolled
      ? 'text-white/70 hover:text-white hover:bg-white/10'
      : 'text-slate hover:text-ink hover:bg-pebble/20';

  const linkActiveColor = isHome && !scrolled
    ? 'bg-white/20 text-white'
    : isHome && scrolled
      ? 'bg-white/20 text-white'
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
              <Link
                to="/onboarding"
                className={`ml-3 px-5 py-2 rounded-xl text-sm font-semibold font-body transition-all cursor-pointer ${
                  isHome && !scrolled
                    ? 'bg-amber text-white hover:bg-amber-light'
                    : isHome && scrolled
                      ? 'bg-amber text-white hover:bg-amber-light'
                      : 'bg-ink text-white hover:bg-ink-light'
                }`}
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden rounded-xl p-2.5 transition-colors ${
                isHome && !scrolled
                  ? 'text-white hover:bg-white/10'
                  : isHome && scrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-ink hover:bg-pebble/20'
              }`}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mx-4 mt-2 rounded-xl bg-white border border-pebble p-4 space-y-1">
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
          <Link
            to="/onboarding"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold font-body bg-ink text-white text-center mt-2"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
