import { Lock, Eye, Share2, Cookie, Shield, UserCheck, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FadeUp } from '../lib/animate';

const sections = [
  {
    icon: Eye,
    title: 'What We Collect',
    content: `We only collect information that helps Friendzy work for you:\n\n• Account information: Name, email address, age, and profile photos you upload\n• Profile data: Your bio, interests, hobbies, and preferences you choose to share\n• Location data: Approximate location (city-level) to match you with nearby friends\n• Usage data: How you interact with the app — pages visited, features used, session duration\n• Device information: Device type, operating system, and browser for technical optimization\n• Messages: Conversations you have with other users (encrypted, not read by us)\n\nWe never collect: precise GPS coordinates, financial information (beyond billing for Premium), or biometric data.`,
  },
  {
    icon: UserCheck,
    title: 'How We Use Your Data',
    content: `Your data is used exclusively to improve your Friendzy experience:\n\n• Matching: We use your interests, preferences, and location to suggest compatible friends\n• Safety: Automated moderation detects and prevents harmful content and behavior\n• Communication: We send you notifications about matches, messages, and platform updates\n• Improvement: Aggregated, anonymized usage data helps us build better features\n• Support: Your account information helps us respond to your support requests\n\nWe do not use your data for advertising, and we never sell your personal information to third parties.`,
  },
  {
    icon: Share2,
    title: 'Data Sharing',
    content: `We share your data in very limited circumstances:\n\n• With other users: Only the information you choose to display on your public profile\n• Service providers: Trusted partners who help us operate the platform (hosting, analytics), bound by strict data processing agreements\n• Legal requirements: When required by law, court order, or to protect the safety of our users\n• Business transfers: In the event of a merger or acquisition (you will be notified)\n\nWe will never sell your personal data to advertisers, data brokers, or any third party.`,
  },
  {
    icon: Cookie,
    title: 'Cookies',
    content: `Friendzy uses cookies to make the platform work:\n\n• Essential cookies: Required for login, security, and core functionality. These cannot be disabled.\n• Preference cookies: Remember your settings like language and notification preferences\n• Analytics cookies: Help us understand how the platform is used (anonymized)\n\nYou can manage optional cookies through our cookie consent banner or your browser settings. Disabling essential cookies may prevent the platform from working properly.`,
  },
  {
    icon: Shield,
    title: 'Data Security',
    content: `We take data security seriously:\n\n• All data is encrypted in transit (TLS 1.3) and at rest (AES-256)\n• Messages between users are end-to-end encrypted\n• We conduct regular security audits and penetration testing\n• Access to user data is strictly limited to authorized personnel\n• We maintain SOC 2 Type II compliance\n• We have an incident response plan in place for any security events\n\nIn the unlikely event of a data breach, we will notify affected users within 72 hours.`,
  },
  {
    icon: UserCheck,
    title: 'Your Rights',
    content: `Depending on your location, you have the following rights:\n\nUnder GDPR (EU/UK):\n• Access: Request a copy of all data we hold about you\n• Rectification: Correct any inaccurate personal data\n• Erasure: Request deletion of your data ("right to be forgotten")\n• Portability: Receive your data in a machine-readable format\n• Restriction: Limit how we process your data\n• Objection: Object to specific data processing activities\n\nUnder CCPA (California, US):\n• Right to know what personal information is collected\n• Right to delete personal information\n• Right to opt out of the sale of personal information (we do not sell data)\n• Right to non-discrimination for exercising your rights\n\nTo exercise any of these rights, email us at privacy@friendzy.app. We will respond within 30 days.`,
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-linen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-ink overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 mb-6">
              <Lock size={14} className="text-moss" />
              <span className="text-sm font-medium text-white/80">Privacy Policy</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Privacy Policy
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Your data belongs to you. Here is exactly how we handle it.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="text-xs text-white/40 mt-6" style={{ fontFamily: 'var(--font-mono)' }}>
              Last updated: July 2025
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-8">
            {sections.map((section, i) => (
              <FadeUp key={section.title} delay={i * 0.08}>
                <div className="rounded-2xl p-8 bg-white border border-pebble">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-moss/10 flex items-center justify-center flex-shrink-0">
                      <section.icon size={18} className="text-moss" />
                    </div>
                    <h2 className="text-xl font-bold text-ink" style={{ fontFamily: 'var(--font-display)' }}>
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-sm text-slate leading-relaxed whitespace-pre-line pl-[52px]">
                    {section.content}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-linen">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="rounded-2xl p-8 bg-white border border-pebble">
              <Mail size={24} className="text-moss mx-auto mb-3" />
              <h3 className="text-lg font-bold text-ink mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Privacy Questions?
              </h3>
              <p className="text-sm text-slate mb-4">
                Contact our Data Protection Officer at{' '}
                <a href="mailto:privacy@friendzy.app" className="text-amber font-semibold hover:underline">
                  privacy@friendzy.app
                </a>
              </p>
              <p className="text-xs text-slate/60">
                We are committed to resolving any privacy concerns within 30 days.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
