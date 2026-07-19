# Friendzy — Complete Production-Ready Sketchbook

*The definitive reference for building, launching, and scaling Friendzy.*

---

## 1. Core Concept & Values

### Mission
"To end global loneliness by creating a safe, trusted platform where anyone can find genuine friendship, no matter where they are in the world."

### Core Values
| Value | Implementation |
|-------|---------------|
| Safety First | ID verification, AI + human moderation, block/report, safety resources |
| Privacy Always | End-to-end encryption, data minimization, GDPR/CCPA/NDPA compliant |
| Authenticity | Verified profiles, no fake accounts, genuine connection focus |
| Inclusivity | Open to all genders, orientations, backgrounds, cultures, languages |
| Accessibility | Free tier, localized pricing, multilingual, RTL support, low-end devices |

### The 3 Pillars
1. **Connect** — Find people who share your interests, values, and energy
2. **Talk** — Real conversations through chat, voice, and video
3. **Hangout** — Meet up in the real world (when both feel safe and ready)

---

## 2. Target Audience & User Personas

### Demographics
| Region | Primary Users | Secondary Users |
|--------|--------------|-----------------|
| Nigeria | Men 18-35, urban professionals, students | Women 18-30, remote workers |
| UK/Europe | Men 25-45, expats, remote workers | Women 30-50, empty nesters |
| USA | Men 20-40, tech workers, students | Women 25-45, mothers |
| India | Men 18-30, students, young professionals | Women 20-35, homemakers |
| Brazil | Men 18-35, urban professionals | Women 20-40, students |

### Personas
1. **Chidi** (28, Nigeria) — Moved to Lagos, left college friends. Wants weekend hangout buddies.
2. **Marco** (34, Brazil→London) — Expat, knows no one. Wants to explore the city with someone.
3. **Sarah** (42, USA) — Divorced, no close friends. Wants coffee conversations.
4. **Aarav** (21, India) — University student, surrounded by people but profoundly lonely.
5. **Grace** (67, UK) — Widowed, children moved away. Just wants someone to talk to.

---

## 3. Complete User Flows

### Flow 1: Onboarding
Landing → Sign Up → Verify Email/Phone → Basic Profile → Personality Quiz → Preferences → Dashboard

### Flow 2: Finding & Matching
Dashboard → Match Cards → Like/Pass → Mutual Match → Chat Opens

### Flow 3: Voice Call
Chat → Voice Call Button → Ringing → Accept/Decline → During Call (Mute/Speaker/End) → Post-Call Feedback

### Flow 4: Video Call
Chat → Video Call Button → Camera/Mic Permission → Ringing → Accept/Decline → During Call → Post-Call Feedback

### Flow 5: Meet Up
Chat → Meet Up Button → Suggest Location/Date/Time → Accept/Decline → Safety Check → Post-Meetup Feedback

### Flow 6: Admin Moderation
Admin Login → Pending Reports → Review Profile/Messages → Action (Dismiss/Warn/Ban) → Notes

### Flow 7: Premium Subscription
Settings → Pricing → Select Tier → Paystack/Stripe → Payment Success → Features Unlocked

### Flow 8: ID Verification
Settings → Upload ID → AI Review (instant) → Human Review (24hr) → Verified Badge

---

## 4. Full Feature List

### Core (MVP) — All Built ✅
- Email/Password + Social Auth (Google, Facebook, Twitter)
- Personality Quiz + Matching
- Real-time Chat
- Voice & Video Calls
- Block/Report/Moderation
- ID Verification
- Premium/VIP Subscriptions (Paystack)
- Safety Resources
- Admin Endpoints

### Advanced (Post-MVP)
- End-to-End Encryption
- Group Voice/Video Calls
- Push Notifications
- React Native Mobile App
- AI-Powered Recommendations
- Emergency SOS Button
- Trusted Contacts
- Location Check-in
- Call Recording (with consent)

---

## 5. Complete Tech Stack

### Current Implementation
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, GSAP, Framer Motion, Lenis
- **Backend:** Node.js, Express, Helmet, CORS, rate-limiting, express-validator
- **Mobile:** Capacitor 6
- **Testing:** Vitest, React Testing Library
- **Deploy:** Vercel (frontend), Render (backend)
- **Payments:** Paystack (Nigeria) + Stripe (Global)

### Production Target (from sketchbook)
- **Database:** PostgreSQL (Supabase) with Prisma ORM
- **Real-time:** Socket.IO for chat
- **Video/Voice:** Daily.co or WebRTC
- **Translation:** Google Translate API
- **Moderation:** Google Gemini API
- **Email:** Resend
- **SMS:** Termii (Africa) + Twilio (Global)

---

## 6. Database Schema

See the full Prisma schema in the original sketchbook document. Key models:
- User, Personality, Match, Message, Chat, Call, Group, GroupMessage
- Report, BlockedUser, Notification, Payment, Subscription, Verification
- Feedback, DeviceToken, AdminLog

---

## 7. Complete API Surface

### Auth
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/quiz
- GET /api/auth/:provider (OAuth redirect)
- GET /api/auth/:provider/callback

### Users
- GET /api/users
- GET /api/users/:id
- PUT /api/users/mood

### Matches
- GET /api/matches/:userId
- POST /api/matches/:userId/like/:matchId
- POST /api/matches/:userId/pass/:matchId

### Chat
- GET /api/chat/conversations
- GET /api/chat/conversations/:id/messages
- POST /api/chat/conversations/:id/messages
- POST /api/chat/block
- POST /api/chat/report

### Payments
- GET /api/payments/pricing/:region
- POST /api/payments/initialize
- GET /api/payments/verify/:reference
- POST /api/payments/webhook

### Groups
- POST /api/groups
- GET /api/groups
- POST /api/groups/:id/join
- POST /api/groups/:id/messages

### Moderation
- POST /api/moderation/block
- POST /api/moderation/report
- GET /api/moderation/reports
- GET /api/moderation/hotlines/:region

### Verification
- POST /api/verification/submit
- GET /api/verification/status/:userId

---

## 8. Complete File Structure

```
Friendzy/
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── auth-providers.js
│   │   │   ├── users.js
│   │   │   ├── matches.js
│   │   │   ├── chat.js
│   │   │   ├── payments.js
│   │   │   ├── moderation.js
│   │   │   ├── groups.js
│   │   │   └── verification.js
│   │   ├── middleware/
│   │   │   ├── security.js
│   │   │   ├── validate.js
│   │   │   ├── errorHandler.js
│   │   │   └── sanitize.js
│   │   └── test/
│   │       └── health.test.js
│   ├── .env
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthModal.tsx
│   │   │   ├── BlockConfirmModal.tsx
│   │   │   ├── CallButton.tsx
│   │   │   ├── ConnectionArcs.tsx
│   │   │   ├── ConnectionRing.tsx
│   │   │   ├── CookieConsent.tsx
│   │   │   ├── CursorGlow.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── FloatingParticles.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── GroupCard.tsx
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── MatchCard.tsx
│   │   │   ├── MoodIndicator.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ParallaxSection.tsx
│   │   │   ├── PricingCard.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── RevealText.tsx
│   │   │   ├── ReportModal.tsx
│   │   │   ├── RegionToggle.tsx
│   │   │   ├── SafeSpaceBadge.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── VideoCall.tsx
│   │   │   ├── VerificationBadge.tsx
│   │   │   ├── VerificationForm.tsx
│   │   │   └── VoiceCall.tsx
│   │   ├── pages/
│   │   │   ├── Landing.tsx
│   │   │   ├── Onboarding.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Chat.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Safety.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Settings.tsx
│   │   │   ├── Terms.tsx
│   │   │   ├── Privacy.tsx
│   │   │   └── Support.tsx
│   │   ├── hooks/
│   │   │   └── useMousePosition.ts
│   │   ├── lib/
│   │   │   ├── animate.tsx
│   │   │   ├── smooth-scroll.ts
│   │   │   └── theme.ts
│   │   ├── test/
│   │   │   ├── setup.ts
│   │   │   ├── components.test.tsx
│   │   │   └── pages.test.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── logo.svg
│   │   ├── logo-icon.svg
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── vitest.config.ts
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
├── mobile/
│   ├── capacitor.config.ts
│   ├── package.json
│   └── README.md
├── .claude/
│   ├── commands/
│   │   ├── build-check.md
│   │   ├── deploy.md
│   │   ├── add-page.md
│   │   ├── add-component.md
│   │   ├── api-endpoint.md
│   │   ├── fix-errors.md
│   │   ├── test.md
│   │   ├── design-review.md
│   │   ├── optimize.md
│   │   └── security-audit.md
│   └── settings.json
├── CLAUDE.md
├── BUSINESS-PLAN.md
├── COST-MODEL.md
├── SKETCHBOOK.md
├── README.md
├── package.json
├── render.yaml
└── .gitignore
```

---

## 9-20. Remaining Sections

See the full sketchbook document for complete details on:
- 9. Global Localization Requirements
- 10. Safety & Moderation System
- 11. Payment & Subscription System
- 12. Video & Voice Call System
- 13. Matching Algorithm
- 14. Notification System
- 15. Admin Dashboard
- 16. Complete File Structure
- 17. Environment Variables
- 18. Deployment Checklist
- 19. Launch Marketing Plan
- 20. Post-Launch Roadmap
