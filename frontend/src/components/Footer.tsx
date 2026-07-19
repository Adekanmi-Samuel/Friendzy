import { Globe, Mail, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo-icon.svg" alt="" className="w-8 h-8" />
              <span className="text-xl font-semibold text-white font-display">
                Friendzy
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              You're not alone. Find genuine connections with people who understand you — anywhere in the world.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-amber uppercase tracking-wider mb-4 font-body">Platform</h4>
            <ul className="space-y-2.5">
              {['How It Works', 'Safety Promise', 'Pricing', 'Community Guidelines'].map(item => (
                <li key={item}>
                  <Link to="/" className="text-sm text-white/50 hover:text-white transition-colors font-body">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-amber uppercase tracking-wider mb-4 font-body">Support</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/support" className="text-sm text-white/50 hover:text-white transition-colors font-body">Help Center</Link>
              </li>
              <li>
                <Link to="/safety" className="text-sm text-white/50 hover:text-white transition-colors font-body">Safety Resources</Link>
              </li>
              <li>
                <Link to="/safety" className="text-sm text-white/50 hover:text-white transition-colors font-body">Crisis Hotlines</Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-white/50 hover:text-white transition-colors font-body">Report Abuse</Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-amber uppercase tracking-wider mb-4 font-body">Connect</h4>
            <div className="flex gap-3 mb-4">
              {[Globe, Mail, Shield].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                  <Icon size={16} />
                </button>
              ))}
            </div>
            <p className="text-xs text-white/30 font-body">
              Available in 12 languages across 6 regions
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30 font-mono">&copy; 2025 Friendzy. Making the world less lonely, one friendship at a time.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors font-mono">Privacy</Link>
            <Link to="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors font-mono">Terms</Link>
            <Link to="/support" className="text-xs text-white/30 hover:text-white/60 transition-colors font-mono">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
