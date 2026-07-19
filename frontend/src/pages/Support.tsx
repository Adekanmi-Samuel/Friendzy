import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Mail, Clock, Shield, Send, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FadeUp } from '../lib/animate';

const faqs = [
  {
    question: 'How do I create an account?',
    answer: 'Download Friendzy from the App Store or Google Play, or visit our website. Follow the onboarding flow — you will verify your identity, set up your profile with interests and preferences, and start getting matched with potential friends in your area.',
  },
  {
    question: 'Is Friendzy free to use?',
    answer: 'Yes. Friendzy has a free tier that includes profile creation, friend matching, and messaging. We also offer a Premium plan with advanced features like unlimited matches, priority support, and enhanced profile visibility. Check our Pricing page for details.',
  },
  {
    question: 'How does matching work?',
    answer: 'Friendzy uses your interests, hobbies, location, and personality preferences to suggest compatible friends. The more details you add to your profile, the better your matches will be. You can like or pass on suggestions, and when both people express interest, you can start chatting.',
  },
  {
    question: 'How do I report someone?',
    answer: 'Tap the three-dot menu on any profile or message and select "Report." Choose a reason and add any details. Every report is reviewed within 24 hours. Your report is confidential — the other person will not know who reported them.',
  },
  {
    question: 'Can I delete my account?',
    answer: 'Yes. Go to Settings > Account > Delete Account. Your profile will be immediately hidden, and all your data will be permanently deleted within 90 days. This action cannot be undone.',
  },
  {
    question: 'How do I change my profile information?',
    answer: 'Go to your Profile and tap the edit icon. You can update your photos, bio, interests, and preferences at any time. Changes take effect immediately.',
  },
  {
    question: 'Is my data safe on Friendzy?',
    answer: 'Absolutely. All data is encrypted in transit and at rest. Messages are end-to-end encrypted. We never sell your data to third parties. See our Privacy Policy for full details.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-pebble rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-linen/50 transition-colors cursor-pointer"
      >
        <span className="text-sm font-semibold text-ink pr-4" style={{ fontFamily: 'var(--font-display)' }}>
          {question}
        </span>
        {open ? (
          <ChevronUp size={16} className="text-slate flex-shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-slate flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-slate leading-relaxed bg-white border-t border-pebble/50">
          <p className="pt-4">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Support() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-linen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-ink overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 mb-6">
              <HelpCircle size={14} className="text-amber" />
              <span className="text-sm font-medium text-white/80">Support</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              How can we help?
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions or reach out to our support team. We are here for you.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Response Time Banner */}
      <section className="bg-white border-b border-pebble">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-slate">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-amber" />
            <span>Response time: <strong className="text-ink">24-48 hours</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-amber" />
            <span>
              Email:{' '}
              <a href="mailto:support@friendzy.app" className="text-amber font-semibold hover:underline">
                support@friendzy.app
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-linen">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                Frequently Asked Questions
              </h2>
              <p className="text-slate max-w-xl mx-auto">
                Quick answers to the most common questions
              </p>
            </div>
          </FadeUp>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeUp key={faq.question} delay={i * 0.06}>
                <FAQItem question={faq.question} answer={faq.answer} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                Contact Us
              </h2>
              <p className="text-slate max-w-xl mx-auto">
                Still need help? Send us a message and we will get back to you within 24-48 hours.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            {submitted ? (
              <div className="rounded-2xl p-10 bg-linen border border-pebble text-center">
                <CheckCircle size={40} className="text-moss mx-auto mb-4" />
                <h3 className="text-xl font-bold text-ink mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  Message sent!
                </h3>
                <p className="text-sm text-slate">
                  Thank you for reaching out. We will get back to you within 24-48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl p-8 bg-linen border border-pebble space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5 uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border border-pebble text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1.5 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border border-pebble text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5 uppercase tracking-wider">Subject</label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-pebble text-sm text-ink focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber transition-colors cursor-pointer"
                  >
                    <option value="">Select a topic</option>
                    <option value="account">Account & Login</option>
                    <option value="safety">Safety & Reporting</option>
                    <option value="matching">Matching & Profile</option>
                    <option value="billing">Billing & Premium</option>
                    <option value="technical">Technical Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5 uppercase tracking-wider">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-pebble text-sm text-ink placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber transition-colors resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-amber text-white text-sm font-semibold hover:bg-amber-light transition-colors cursor-pointer"
                >
                  <Send size={14} /> Send Message
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </section>

      {/* Safety Emergency */}
      <section className="py-12 bg-linen">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="rounded-2xl p-6 bg-white border border-pebble">
              <Shield size={20} className="text-brick mx-auto mb-2" />
              <p className="text-sm text-slate">
                If you or someone you know is in danger, visit our{' '}
                <a href="/safety" className="text-brick font-semibold hover:underline">
                  Safety page
                </a>{' '}
                for immediate crisis resources.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
