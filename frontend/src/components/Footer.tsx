import { Heart, Globe, Shield, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-deep-navy text-white/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-warm-gold to-sage-green flex items-center justify-center">
                <Heart size={16} className="text-white" fill="white" />
              </div>
              <span className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Friendzy
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              You're not alone. Find genuine connections with people who understand you — anywhere in the world.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-warm-gold uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {['How It Works', 'Safety Promise', 'Pricing', 'Community Guidelines'].map(item => (
                <li key={item}>
                  <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-warm-gold uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2.5">
              {['Help Center', 'Safety Resources', 'Crisis Hotlines', 'Report Abuse'].map(item => (
                <li key={item}>
                  <Link to="/safety" className="text-sm text-white/50 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-warm-gold uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              {[Globe, Mail, Shield].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                  <Icon size={16} />
                </button>
              ))}
            </div>
            <p className="text-xs text-white/30">
              Available in 12 languages across 6 regions
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">© 2025 Friendzy. Making the world less lonely, one friendship at a time.</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <span key={item} className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
