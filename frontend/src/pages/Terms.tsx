import { FileText, Scale, Shield, AlertTriangle, Trash2, MessageCircle, Mail } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FadeUp } from '../lib/animate';

const sections = [
  {
    icon: FileText,
    title: 'What Friendzy Is',
    content: `Friendzy is a platform designed to help you build genuine friendships. We are not a dating app. The platform is built around shared interests, location, and authentic human connection. When you join Friendzy, you join a community of people looking for real friendships — nothing more, nothing less.`,
  },
  {
    icon: Scale,
    title: 'Your Responsibilities',
    content: `By using Friendzy, you agree to:\n\n• Be at least 18 years old\n• Provide accurate information during onboarding\n• Treat every member with respect and kindness\n• Keep your account credentials secure\n• Notify us immediately if you suspect unauthorized access\n• Use the platform only for its intended purpose — finding friendships\n• Follow our Community Guidelines at all times`,
  },
  {
    icon: AlertTriangle,
    title: 'Prohibited Behavior',
    content: `The following are strictly prohibited on Friendzy:\n\n• Harassment, bullying, or intimidation of any kind\n• Sending unsolicited sexual or romantic messages\n• Impersonating another person or creating fake profiles\n• Sharing content that is hateful, violent, or promotes self-harm\n• Spamming, soliciting, or advertising to other users\n• Attempting to access other users' accounts or private data\n• Using automated tools, bots, or scrapers\n• Any activity that violates applicable laws\n\nViolations may result in immediate account suspension or permanent ban without prior warning.`,
  },
  {
    icon: Shield,
    title: 'Content Ownership',
    content: `You retain full ownership of any content you create and share on Friendzy — messages, photos, profile information, and posts.\n\nBy posting content on Friendzy, you grant us a limited license to display, distribute, and promote your content within the platform. This license ends when you delete your content or your account.\n\nWe do not claim ownership over your intellectual property. You are free to use your content elsewhere.`,
  },
  {
    icon: Trash2,
    title: 'Account Termination',
    content: `You may delete your account at any time through Settings. When you do:\n\n• Your profile is immediately hidden from other users\n• Your messages remain visible to recipients for 30 days\n• All your data is permanently deleted within 90 days\n• You cannot recover your account after deletion\n\nWe reserve the right to suspend or terminate accounts that violate our Community Guidelines or these Terms. In such cases, we may notify you before taking action, but serious violations may result in immediate termination.`,
  },
  {
    icon: MessageCircle,
    title: 'Limitation of Liability',
    content: `Friendzy is provided "as is" without warranties of any kind. We work hard to keep the platform safe and reliable, but we cannot guarantee:\n\n• The platform will always be available without interruption\n• All user profiles are accurate or genuine\n• Friendships formed on the platform will meet your expectations\n• The platform will be free from bugs or errors at all times\n\nTo the fullest extent permitted by law, Friendzy shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.`,
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-linen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-ink overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 mb-6">
              <FileText size={14} className="text-amber" />
              <span className="text-sm font-medium text-white/80">Terms of Service</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Terms of Service
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              The ground rules for being part of the Friendzy community. Short, clear, and human-readable.
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
                    <div className="w-10 h-10 rounded-2xl bg-amber/10 flex items-center justify-center flex-shrink-0">
                      <section.icon size={18} className="text-amber" />
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
              <Mail size={24} className="text-amber mx-auto mb-3" />
              <h3 className="text-lg font-bold text-ink mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Questions about these terms?
              </h3>
              <p className="text-sm text-slate mb-4">
                Contact us at{' '}
                <a href="mailto:support@friendzy.app" className="text-amber font-semibold hover:underline">
                  support@friendzy.app
                </a>
              </p>
              <p className="text-xs text-slate/60">
                We will respond within 24-48 hours during business days.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
