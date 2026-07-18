import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';
import SafeSpaceBadge from './SafeSpaceBadge';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/safety', label: 'Safety' },
    { to: '/pricing', label: 'Pricing' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between mt-3">
          <div className={`flex items-center gap-3 rounded-full px-5 py-2.5 ${
            isHome ? 'bg-white/10 backdrop-blur-md border border-white/10' : 'bg-white/70 backdrop-blur-xl border border-warm-beige/30'
          }`}>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-warm-gold to-sage-green flex items-center justify-center">
                <Heart size={16} className="text-white" fill="white" />
              </div>
              <span className={`text-lg font-semibold ${isHome ? 'text-white' : 'text-deep-navy'}`} style={{ fontFamily: 'var(--font-heading)' }}>
                Friendzy
              </span>
            </Link>
            <SafeSpaceBadge size="sm" />
          </div>

          <div className={`hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 ${
            isHome ? 'bg-white/10 backdrop-blur-md border border-white/10' : 'bg-white/70 backdrop-blur-xl border border-warm-beige/30'
          }`}>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  location.pathname === link.to
                    ? isHome ? 'bg-white/20 text-white' : 'bg-warm-gold/10 text-warm-gold'
                    : isHome ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-muted-slate hover:text-deep-navy hover:bg-warm-beige/20'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/onboarding"
              className={`ml-2 px-5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                isHome
                  ? 'bg-white text-deep-navy hover:bg-white/90'
                  : 'bg-deep-navy text-white hover:bg-navy-light'
              }`}
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden rounded-full p-2.5 ${
              isHome ? 'bg-white/10 text-white' : 'bg-white/70 text-deep-navy'
            }`}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mx-4 mt-2 rounded-2xl bg-white/95 backdrop-blur-xl shadow-xl border border-warm-beige/30 p-4 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-deep-navy hover:bg-warm-beige/30"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/onboarding"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold bg-deep-navy text-white text-center mt-2"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
