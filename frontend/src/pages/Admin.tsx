import { useState } from 'react';
import { Users, Shield, BarChart3, Flag, Search, AlertTriangle, CheckCircle, TrendingUp, DollarSign, MessageCircle, UserCheck, Heart } from 'lucide-react';
import { FadeUp } from '../lib/animate';

type AdminTab = 'overview' | 'users' | 'reports' | 'verifications' | 'analytics';

const mockStats = {
  totalUsers: 1247, activeToday: 342, premiumUsers: 89, matchesToday: 56,
  reportsPending: 3, revenue: 899000, newSignups: 12, callsToday: 23,
};

const mockUsers = [
  { id: '1', name: 'Sofia R.', email: 'sofia@example.com', region: 'Brazil', verified: true, premium: false, trustScore: 87, status: 'active' },
  { id: '2', name: 'Kwame A.', email: 'kwame@example.com', region: 'Nigeria', verified: true, premium: true, trustScore: 91, status: 'active' },
  { id: '3', name: 'Mei L.', email: 'mei@example.com', region: 'Singapore', verified: false, premium: false, trustScore: 72, status: 'active' },
  { id: '4', name: 'Erik K.', email: 'erik@example.com', region: 'Germany', verified: true, premium: true, trustScore: 88, status: 'active' },
  { id: '5', name: 'Amara K.', email: 'amara@example.com', region: 'Nigeria', verified: true, premium: false, trustScore: 94, status: 'active' },
  { id: '6', name: 'Suspicious User', email: 'sus@example.com', region: 'Unknown', verified: false, premium: false, trustScore: 12, status: 'flagged' },
];

const mockReports = [
  { id: '1', reportedUser: 'Suspicious User', reporter: 'Sofia R.', reason: 'fake_profile', description: 'Using someone else photos', status: 'pending', createdAt: '2h ago', severity: 6 },
  { id: '2', reportedUser: 'Toxic User', reporter: 'Kwame A.', reason: 'harassment', description: 'Sending inappropriate messages', status: 'pending', createdAt: '5h ago', severity: 8 },
  { id: '3', reportedUser: 'Spam Bot', reporter: 'Mei L.', reason: 'spam', description: 'Posting external links', status: 'resolved', createdAt: '1d ago', severity: 4 },
];

const mockVerifications = [
  { userId: '3', name: 'Mei L.', idType: 'Passport', submittedAt: '3h ago' },
  { userId: '7', name: 'New User', idType: 'National ID', submittedAt: '1d ago' },
];

const mockAnalytics = {
  signups: { today: 12, week: 78, month: 312 },
  matches: { today: 56, week: 389, month: 1456 },
  calls: { today: 23, week: 167, month: 634 },
  revenue: { today: 45000, week: 315000, month: 899000 },
  retention: { day1: 65, day7: 42, day30: 28 },
  topRegions: [
    { region: 'Nigeria', users: 456, pct: 36 },
    { region: 'UK', users: 234, pct: 19 },
    { region: 'USA', users: 189, pct: 15 },
    { region: 'India', users: 178, pct: 14 },
    { region: 'Brazil', users: 190, pct: 15 },
  ],
};

const tabs: { id: AdminTab; label: string; icon: typeof Users }[] = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'reports', label: 'Reports', icon: Flag },
  { id: 'verifications', label: 'Verifications', icon: Shield },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [reportFilter, setReportFilter] = useState('all');

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReports = reportFilter === 'all' ? mockReports : mockReports.filter(r => r.status === reportFilter);

  return (
    <div className="min-h-screen bg-linen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12">
        {/* Header */}
        <FadeUp>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-ink" style={{ fontFamily: 'var(--font-display)' }}>Admin Dashboard</h1>
              <p className="text-sm text-slate mt-1">Friendzy administration panel</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-full bg-moss/10 text-moss text-xs font-semibold flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-moss animate-pulse" /> Live
              </span>
              <div className="w-9 h-9 rounded-full bg-ink flex items-center justify-center text-white text-sm font-semibold">A</div>
            </div>
          </div>
        </FadeUp>

        {/* Tabs */}
        <FadeUp delay={0.05}>
          <div className="flex gap-1 mb-8 bg-white rounded-2xl p-1.5 border border-pebble/30 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id ? 'bg-ink text-white' : 'text-slate hover:bg-pebble/10'
                }`}>
                <tab.icon size={16} />{tab.label}
                {tab.id === 'reports' && <span className="w-5 h-5 rounded-full bg-brick text-white text-[10px] font-bold flex items-center justify-center">{mockStats.reportsPending}</span>}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Users', value: mockStats.totalUsers.toLocaleString(), icon: Users, color: 'text-amber', bg: 'bg-amber/10' },
                { label: 'Active Today', value: mockStats.activeToday.toLocaleString(), icon: UserCheck, color: 'text-moss', bg: 'bg-moss/10' },
                { label: 'Matches Today', value: String(mockStats.matchesToday), icon: Heart, color: 'text-amber', bg: 'bg-amber/10' },
                { label: 'Reports Pending', value: String(mockStats.reportsPending), icon: Flag, color: 'text-brick', bg: 'bg-brick/10' },
              ].map((s, i) => (
                <FadeUp key={s.label} delay={i * 0.05}>
                  <div className="glass-card rounded-2xl p-5">
                    <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}><s.icon size={18} className={s.color} /></div>
                    <p className="text-2xl font-bold text-ink" style={{ fontFamily: 'var(--font-mono)' }}>{s.value}</p>
                    <p className="text-xs text-slate mt-1">{s.label}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FadeUp delay={0.2}>
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3"><DollarSign size={16} className="text-amber" /><h3 className="text-sm font-semibold text-ink">Revenue</h3></div>
                  <p className="text-3xl font-bold text-ink" style={{ fontFamily: 'var(--font-mono)' }}>₦{(mockStats.revenue / 100).toLocaleString()}</p>
                  <p className="text-xs text-slate mt-1">Monthly recurring revenue</p>
                </div>
              </FadeUp>
              <FadeUp delay={0.25}>
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3"><MessageCircle size={16} className="text-moss" /><h3 className="text-sm font-semibold text-ink">Calls Today</h3></div>
                  <p className="text-3xl font-bold text-ink" style={{ fontFamily: 'var(--font-mono)' }}>{mockStats.callsToday}</p>
                  <p className="text-xs text-slate mt-1">Voice + Video calls</p>
                </div>
              </FadeUp>
            </div>
            <FadeUp delay={0.3}>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-ink mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { text: 'New user registered from Lagos', time: '2m', color: 'bg-moss' },
                    { text: 'New match: Sofia R. ↔ Kwame A.', time: '5m', color: 'bg-amber' },
                    { text: 'Report submitted for review', time: '12m', color: 'bg-brick' },
                    { text: 'Premium subscription activated', time: '15m', color: 'bg-amber' },
                    { text: 'ID verification approved', time: '20m', color: 'bg-moss' },
                  ].map((a, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-pebble/10 transition-colors">
                      <div className={`w-2 h-2 rounded-full ${a.color}`} />
                      <p className="text-sm text-ink flex-1">{a.text}</p>
                      <span className="text-xs text-slate" style={{ fontFamily: 'var(--font-mono)' }}>{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/40" />
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search users..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-pebble/30 text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-amber/30" />
              </div>
            </div>
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead><tr className="border-b border-pebble/20">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate uppercase tracking-wider">User</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate uppercase tracking-wider">Region</th>
                    <th className="text-center px-5 py-3 text-xs font-semibold text-slate uppercase tracking-wider">Trust</th>
                    <th className="text-center px-5 py-3 text-xs font-semibold text-slate uppercase tracking-wider">Status</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate uppercase tracking-wider">Actions</th>
                  </tr></thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="border-b border-pebble/10 hover:bg-pebble/5 transition-colors">
                        <td className="px-5 py-3"><p className="text-sm font-medium text-ink">{user.name}</p><p className="text-xs text-slate">{user.email}</p></td>
                        <td className="px-5 py-3 text-sm text-slate">{user.region}</td>
                        <td className="px-5 py-3 text-center"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${user.trustScore >= 80 ? 'bg-moss/10 text-moss' : user.trustScore >= 50 ? 'bg-amber/10 text-amber' : 'bg-brick/10 text-brick'}`} style={{ fontFamily: 'var(--font-mono)' }}>{user.trustScore}</span></td>
                        <td className="px-5 py-3 text-center"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${user.status === 'active' ? 'bg-moss/10 text-moss' : 'bg-brick/10 text-brick'}`}>{user.status === 'active' ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}{user.status}</span></td>
                        <td className="px-5 py-3 text-right"><div className="flex items-center justify-end gap-1">
                          <button className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate hover:bg-pebble/20 transition-colors cursor-pointer">View</button>
                          {!user.verified && <button className="px-2.5 py-1 rounded-lg text-xs font-medium text-moss hover:bg-moss/10 transition-colors cursor-pointer">Verify</button>}
                          <button className="px-2.5 py-1 rounded-lg text-xs font-medium text-brick hover:bg-brick/10 transition-colors cursor-pointer">Block</button>
                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {['all', 'pending', 'resolved'].map(f => (
                <button key={f} onClick={() => setReportFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${reportFilter === f ? 'bg-ink text-white' : 'bg-white text-slate border border-pebble/30 hover:bg-pebble/10'}`}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}{f === 'pending' && ` (${mockReports.filter(r => r.status === 'pending').length})`}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {filteredReports.map(report => (
                <FadeUp key={report.id}>
                  <div className="glass-card rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${report.severity >= 8 ? 'bg-brick/10' : report.severity >= 5 ? 'bg-amber/10' : 'bg-pebble/20'}`}>
                          {report.severity >= 8 ? <AlertTriangle size={18} className="text-brick" /> : <Flag size={18} className={report.severity >= 5 ? 'text-amber' : 'text-slate'} />}
                        </div>
                        <div><p className="text-sm font-semibold text-ink">{report.reportedUser}</p><p className="text-xs text-slate">by {report.reporter} · {report.createdAt}</p></div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${report.status === 'pending' ? 'bg-amber/10 text-amber' : 'bg-moss/10 text-moss'}`}>{report.status}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-linen mb-3">
                      <p className="text-xs text-slate uppercase tracking-wider mb-1">Reason: {report.reason.replace('_', ' ')}</p>
                      <p className="text-sm text-ink">{report.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate mr-auto">Severity: {report.severity}/10</span>
                      {report.status === 'pending' && (<>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate bg-white border border-pebble/30 hover:bg-pebble/10 transition-colors cursor-pointer">Dismiss</button>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-amber bg-amber/10 hover:bg-amber/20 transition-colors cursor-pointer">Warn</button>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-brick bg-brick/10 hover:bg-brick/20 transition-colors cursor-pointer">Ban</button>
                      </>)}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        )}

        {/* Verifications */}
        {activeTab === 'verifications' && (
          <div className="space-y-3">
            {mockVerifications.map((v, i) => (
              <FadeUp key={v.userId} delay={i * 0.05}>
                <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center text-amber font-semibold text-lg" style={{ fontFamily: 'var(--font-display)' }}>{v.name[0]}</div>
                    <div><p className="text-sm font-semibold text-ink">{v.name}</p><p className="text-xs text-slate">{v.idType} · {v.submittedAt}</p></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-moss bg-moss/10 hover:bg-moss/20 transition-colors cursor-pointer">Approve</button>
                    <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-brick bg-brick/10 hover:bg-brick/20 transition-colors cursor-pointer">Reject</button>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Signups (Month)', value: mockAnalytics.signups.month.toLocaleString(), color: 'text-moss' },
                { label: 'Matches (Month)', value: mockAnalytics.matches.month.toLocaleString(), color: 'text-amber' },
                { label: 'Calls (Month)', value: mockAnalytics.calls.month.toLocaleString(), color: 'text-ink' },
                { label: 'Revenue (Month)', value: `₦${(mockAnalytics.revenue.month / 100).toLocaleString()}`, color: 'text-amber' },
              ].map((m, i) => (
                <FadeUp key={m.label} delay={i * 0.05}>
                  <div className="glass-card rounded-2xl p-5 text-center">
                    <p className={`text-2xl font-bold ${m.color}`} style={{ fontFamily: 'var(--font-mono)' }}>{m.value}</p>
                    <p className="text-xs text-slate mt-1">{m.label}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <FadeUp delay={0.2}>
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-ink mb-4">User Retention</h3>
                  <div className="space-y-3">
                    {[{ label: 'Day 1', value: mockAnalytics.retention.day1 }, { label: 'Day 7', value: mockAnalytics.retention.day7 }, { label: 'Day 30', value: mockAnalytics.retention.day30 }].map(r => (
                      <div key={r.label}>
                        <div className="flex items-center justify-between mb-1"><span className="text-xs text-slate">{r.label}</span><span className="text-xs font-semibold text-ink" style={{ fontFamily: 'var(--font-mono)' }}>{r.value}%</span></div>
                        <div className="w-full h-2 bg-pebble/20 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-amber to-moss rounded-full" style={{ width: `${r.value}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
              <FadeUp delay={0.3}>
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-ink mb-4">Top Regions</h3>
                  <div className="space-y-3">
                    {mockAnalytics.topRegions.map(r => (
                      <div key={r.region} className="flex items-center gap-3">
                        <span className="text-sm text-ink font-medium w-20">{r.region}</span>
                        <div className="flex-1 h-2 bg-pebble/20 rounded-full overflow-hidden"><div className="h-full bg-amber rounded-full" style={{ width: `${r.pct}%` }} /></div>
                        <span className="text-xs text-slate w-12 text-right" style={{ fontFamily: 'var(--font-mono)' }}>{r.users}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
