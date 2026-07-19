import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Bell, Shield, Globe, Palette, LogOut, ChevronRight, Eye, EyeOff, Lock, Smartphone, Mail, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import RegionToggle from '../components/RegionToggle';
import { FadeUp } from '../lib/animate';

type Section = 'account' | 'notifications' | 'privacy' | 'language' | 'appearance';

const sections: { id: Section; label: string; icon: typeof User; description: string }[] = [
  { id: 'account', label: 'Account', icon: User, description: 'Manage your personal information' },
  { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Control how we reach you' },
  { id: 'privacy', label: 'Privacy & Safety', icon: Shield, description: 'Protect your information' },
  { id: 'language', label: 'Language & Region', icon: Globe, description: 'Localization preferences' },
  { id: 'appearance', label: 'Appearance', icon: Palette, description: 'Customize your experience' },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState<Section>('account');
  const [showPassword, setShowPassword] = useState(false);

  // Account settings
  const [displayName, setDisplayName] = useState('Alex');
  const [email, setEmail] = useState('alex@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');

  // Notification settings
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [matchNotifs, setMatchNotifs] = useState(true);
  const [messageNotifs, setMessageNotifs] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Privacy settings
  const [showOnline, setShowOnline] = useState(true);
  const [showReadReceipts, setShowReadReceipts] = useState(true);
  const [allowSearchEngine, setAllowSearchEngine] = useState(false);
  const [shareActivity, setShareActivity] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);

  // Appearance
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${enabled ? 'bg-moss' : 'bg-pebble'}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-5.5 left-0.5' : 'left-0.5'}`} />
    </button>
  );

  return (
    <div className="min-h-screen bg-linen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        {/* Header */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-8">
            <Link to="/profile" className="p-2 rounded-xl hover:bg-pebble/30 text-slate transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                Settings
              </h1>
              <p className="text-slate text-sm">Manage your account and preferences</p>
            </div>
          </div>
        </FadeUp>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <FadeUp delay={0.1}>
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-2 space-y-1">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all cursor-pointer ${
                      activeSection === section.id
                        ? 'bg-amber/10 text-amber'
                        : 'text-slate hover:bg-pebble/20 hover:text-ink'
                    }`}
                  >
                    <section.icon size={18} />
                    <div>
                      <p className="text-sm font-medium">{section.label}</p>
                    </div>
                  </button>
                ))}

                <div className="pt-2 mt-2 border-t border-pebble/30">
                  <Link
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-brick hover:bg-brick/5 transition-all"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Sign Out</span>
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeSection === 'account' && (
              <FadeUp key="account">
                <div className="space-y-6">
                  <div className="glass-card rounded-3xl p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                      Personal Information
                    </h2>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">Display Name</label>
                        <input
                          type="text"
                          value={displayName}
                          onChange={e => setDisplayName(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-pebble/20 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-amber/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">Email Address</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="flex-1 px-4 py-3 rounded-2xl bg-pebble/20 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-amber/30"
                          />
                          <span className="px-2.5 py-1 rounded-full bg-moss/10 text-moss text-xs font-medium">Verified</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-pebble/20 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-amber/30"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-3xl p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                      Change Password
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">Current Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter current password"
                            className="w-full px-4 py-3 pr-12 rounded-2xl bg-pebble/20 text-sm text-ink placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-amber/30"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate hover:text-ink cursor-pointer"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">New Password</label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="w-full px-4 py-3 rounded-2xl bg-pebble/20 text-sm text-ink placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-amber/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full px-4 py-3 rounded-2xl bg-pebble/20 text-sm text-ink placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-amber/30"
                        />
                      </div>
                        <button className="px-5 py-2.5 rounded-xl bg-amber text-white text-sm font-medium hover:bg-amber-light transition-colors cursor-pointer">
                          Update Password
                        </button>
                    </div>
                  </div>

                  <div className="glass-card rounded-3xl p-6 md:p-8 border border-brick/20">
                    <h2 className="text-xl font-semibold text-brick mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      Danger Zone
                    </h2>
                    <p className="text-sm text-slate mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                      <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brick/10 text-brick text-sm font-medium hover:bg-brick/20 transition-colors cursor-pointer">
                        <Trash2 size={14} /> Delete Account
                      </button>
                  </div>
                </div>
              </FadeUp>
            )}

            {activeSection === 'notifications' && (
              <FadeUp key="notifications">
                <div className="glass-card rounded-3xl p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                    Notification Preferences
                  </h2>
                  <div className="space-y-5">
                    {[
                      { label: 'Push Notifications', description: 'Receive alerts on your device', value: pushNotifs, onChange: setPushNotifs, icon: Smartphone },
                      { label: 'Email Notifications', description: 'Get updates via email', value: emailNotifs, onChange: setEmailNotifs, icon: Mail },
                      { label: 'New Match Alerts', description: 'Be notified when you get a new match', value: matchNotifs, onChange: setMatchNotifs, icon: Bell },
                      { label: 'Message Notifications', description: 'Alert when you receive a new message', value: messageNotifs, onChange: setMessageNotifs, icon: Bell },
                      { label: 'Weekly Digest', description: 'Summary of your activity and new matches', value: weeklyDigest, onChange: setWeeklyDigest, icon: Bell },
                      { label: 'Marketing Emails', description: 'Product updates and tips', value: marketingEmails, onChange: setMarketingEmails, icon: Mail },
                    ].map(item => (
                      <div key={item.label} className="flex items-center justify-between py-3 border-b border-pebble/20 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-pebble/30 flex items-center justify-center">
                            <item.icon size={16} className="text-slate" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-ink">{item.label}</p>
                            <p className="text-xs text-slate">{item.description}</p>
                          </div>
                        </div>
                        <ToggleSwitch enabled={item.value} onChange={item.onChange} />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            )}

            {activeSection === 'privacy' && (
              <FadeUp key="privacy">
                <div className="space-y-6">
                  <div className="glass-card rounded-3xl p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                      Privacy Controls
                    </h2>
                    <div className="space-y-5">
                      {[
                        { label: 'Show Online Status', description: 'Let others see when you are online', value: showOnline, onChange: setShowOnline },
                        { label: 'Read Receipts', description: 'Show when you have read a message', value: showReadReceipts, onChange: setShowReadReceipts },
                        { label: 'Search Engine Visibility', description: 'Allow your profile to appear in search results', value: allowSearchEngine, onChange: setAllowSearchEngine },
                        { label: 'Activity Sharing', description: 'Share your activity status with friends', value: shareActivity, onChange: setShareActivity },
                      ].map(item => (
                        <div key={item.label} className="flex items-center justify-between py-3 border-b border-pebble/20 last:border-0">
                          <div>
                            <p className="text-sm font-medium text-ink">{item.label}</p>
                            <p className="text-xs text-slate">{item.description}</p>
                          </div>
                          <ToggleSwitch enabled={item.value} onChange={item.onChange} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card rounded-3xl p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                      Security
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-pebble/20">
                        <div className="flex items-center gap-3">
                          <Lock size={16} className="text-moss" />
                          <div>
                            <p className="text-sm font-medium text-ink">Two-Factor Authentication</p>
                            <p className="text-xs text-slate">Add an extra layer of security to your account</p>
                          </div>
                        </div>
                        <ToggleSwitch enabled={twoFactor} onChange={setTwoFactor} />
                      </div>
                      <Link to="/safety" className="flex items-center justify-between py-3 hover:bg-pebble/10 rounded-xl transition-colors">
                        <div className="flex items-center gap-3">
                          <Shield size={16} className="text-moss" />
                          <div>
                            <p className="text-sm font-medium text-ink">Safety Center</p>
                            <p className="text-xs text-slate">Review safety features and resources</p>
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-slate" />
                      </Link>
                    </div>
                  </div>

                  <div className="glass-card rounded-3xl p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                      Blocked Users
                    </h2>
                    <p className="text-sm text-slate mb-4">You have not blocked anyone yet.</p>
                    <Link to="/safety" className="text-sm text-amber hover:text-amber-light transition-colors">
                      Learn about safety features
                    </Link>
                  </div>
                </div>
              </FadeUp>
            )}

            {activeSection === 'language' && (
              <FadeUp key="language">
                <div className="space-y-6">
                  <div className="glass-card rounded-3xl p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                      Language & Region
                    </h2>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-ink mb-3">Your Region</label>
                        <RegionToggle />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-3">Preferred Language</label>
                        <select className="w-full px-4 py-3 rounded-2xl bg-pebble/20 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-amber/30 cursor-pointer">
                          <option>English</option>
                          <option>Español</option>
                          <option>Français</option>
                          <option>Português</option>
                          <option>हिन्दी</option>
                          <option>한국어</option>
                          <option>日本語</option>
                          <option>中文</option>
                          <option>العربية</option>
                          <option>Deutsch</option>
                          <option>Italiano</option>
                          <option>Tiếng Việt</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink mb-3">Time Zone</label>
                        <select className="w-full px-4 py-3 rounded-2xl bg-pebble/20 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-amber/30 cursor-pointer">
                          <option>UTC-8 (Pacific Time)</option>
                          <option>UTC-5 (Eastern Time)</option>
                          <option>UTC+0 (GMT)</option>
                          <option>UTC+1 (CET)</option>
                          <option>UTC+5:30 (IST)</option>
                          <option>UTC+8 (SGT/CST)</option>
                          <option>UTC+9 (JST)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-3xl p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-ink mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                      Supported Languages
                    </h2>
                    <p className="text-sm text-slate mb-4">
                      Friendzy is currently available in 12 languages. We are constantly working to add more.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['English', 'Español', 'Français', 'Português', 'हिन्दी', '한국어', '日本語', '中文', 'العربية', 'Deutsch', 'Italiano', 'Tiếng Việt'].map(lang => (
                        <span key={lang} className="px-3 py-1.5 rounded-full bg-moss/10 text-moss text-xs font-medium">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            )}

            {activeSection === 'appearance' && (
              <FadeUp key="appearance">
                <div className="glass-card rounded-3xl p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-ink mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                    Appearance
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-ink mb-3">Theme</label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['light', 'dark', 'auto'] as const).map(t => (
                            <button
                              onClick={() => setTheme(t)}
                              className={`p-4 rounded-2xl text-center transition-all cursor-pointer ${
                                theme === t
                                  ? 'bg-amber/10 text-amber shadow-lg'
                                  : 'bg-pebble/20 text-slate hover:bg-pebble/30'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-xl mx-auto mb-2 ${
                                t === 'light' ? 'bg-white' : t === 'dark' ? 'bg-ink border border-white/20' : 'bg-gradient-to-br from-white to-ink'
                              }`} />
                              <span className="text-sm font-medium capitalize">{t}</span>
                            </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink mb-3">Font Size</label>
                      <div className="grid grid-cols-3 gap-3">
                        {(['small', 'medium', 'large'] as const).map(size => (
                            <button
                              onClick={() => setFontSize(size)}
                              className={`p-4 rounded-2xl text-center transition-all cursor-pointer ${
                                fontSize === size
                                  ? 'bg-amber/10 text-amber shadow-lg'
                                  : 'bg-pebble/20 text-slate hover:bg-pebble/30'
                              }`}
                            >
                              <span className={`font-medium ${
                                size === 'small' ? 'text-xs' : size === 'large' ? 'text-lg' : 'text-sm'
                              }`}>Aa</span>
                              <p className="text-xs mt-1 capitalize">{size}</p>
                            </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-ink mb-3">Color Accent</label>
                      <div className="flex gap-3">
                        {[
                          { color: '#D4A373', name: 'Gold' },
                          { color: '#6B8C7A', name: 'Sage' },
                          { color: '#4A6A7A', name: 'Slate' },
                          { color: '#C85A4C', name: 'Red' },
                          { color: '#2C3E4E', name: 'Navy' },
                        ].map(accent => (
                            <button
                              className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-offset-2 ring-transparent hover:ring-amber/30 transition-all"
                              style={{ background: accent.color }}
                              title={accent.name}
                            />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            )}

            {/* Save Button */}
            <FadeUp delay={0.2}>
              <div className="mt-6 flex justify-end">
                  <button className="px-6 py-3 rounded-2xl bg-amber text-white text-sm font-semibold hover:bg-amber-light transition-colors cursor-pointer">
                    Save Changes
                  </button>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </div>
  );
}
