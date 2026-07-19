# Friendzy — Complete Cost Model & Feature Breakdown

## Payment Solutions (Nigeria-Friendly)

### Primary: Paystack (Recommended)
- **Founded in Nigeria** — built for African businesses
- **Acquired by Stripe** — world-class infrastructure
- **Supports:** Cards, bank transfers, USSD, mobile money
- **Recurring billing:** Yes — subscription management built-in
- **Pricing:** 1.5% + ₦100 per transaction (local), 3.9% + ₦100 (international)
- **Settlement:** Next day for verified accounts
- **Integration:** Simple REST API, SDKs for web/mobile
- **Website:** paystack.com

### Secondary: Flutterwave
- **Pan-African** — supports 30+ African countries
- **Supports:** Cards, bank transfers, mobile money, USSD
- **Recurring billing:** Yes — subscription plans available
- **Pricing:** 1.4% per transaction (local), 3.8% (international)
- **Settlement:** T+1 for verified accounts
- **Website:** flutterwave.com

### Why NOT Stripe Directly
- Stripe Nigeria has limitations on recurring payments
- Settlement can be slower for Nigerian accounts
- Paystack (owned by Stripe) is the better choice for Nigeria
- You can expand to Stripe later for international users

### Payment Flow
```
User subscribes → Paystack checkout → Card/Bank/USSD payment
→ Paystack webhook → Your backend activates Premium
→ Monthly recurring charge via Paystack subscriptions
```

---

## Complete Cost Breakdown Per Feature

### 1. User Verification (ID Check)

**Option A: Manual Review (Free)**
- User uploads ID photo
- Your team reviews manually
- Cost: $0 (your time only)
- Time: 5-10 minutes per review
- Good for: <500 users

**Option B: Automated (Jumia Africa / Youverify)**
- Youverify: ~$0.50 per verification
- Jumia Africa: ~₦500 (~$0.30) per verification
- Good for: 500+ users

**Option C: Selfie + Liveness Check (Onfido / Smile ID)**
- Smile ID (African company): ~$0.50 per check
- Onfido: ~$1-2 per check
- Good for: Premium trust

**Recommendation:** Start with Option A (manual) for free. Move to Option B at 500+ users. Cost per user: **$0 initially, $0.30 at scale.**

### 2. Voice Calls

**Option A: WebRTC (Free)**
- Peer-to-peer audio via browser
- Cost: $0 (uses user's data connection)
- Quality: Good on WiFi, variable on mobile data
- Limitation: Both users must be online simultaneously

**Option B: Twilio Voice**
- Pricing: $0.013/min (US), $0.05/min (Nigeria)
- Free trial: $15 credit
- Good for: Reliable calls across regions

**Option C: Agora (Recommended)**
- Free tier: 10,000 minutes/month
- Pay-as-you-go: $0.99/1,000 minutes (SD video)
- Audio: $0.99/1,000 minutes
- Good for: High quality, low cost

**Recommendation:** Start with WebRTC ($0). Use Agora when you need reliability. Cost per user per month: **$0-0.50 depending on usage.**

### 3. Video Calls

**Option A: WebRTC (Free)**
- Peer-to-peer video via browser
- Cost: $0
- Quality: 720p on good connection
- Both users must be online

**Option B: Agora (Recommended)**
- Free tier: 10,000 minutes/month
- HD video: $3.99/1,000 minutes
- For 1,000 users doing 1 video call/month (30 min each):
  - 30,000 minutes needed
  - 10,000 free + 20,000 paid
  - Cost: 20 × $3.99 = **$79.80/month**
  - BUT only Premium/VIP users get video calls
  - So maybe 100 users × 30 min = 3,000 minutes
  - All covered by free tier = **$0**

**Option C: Daily.co**
- Free tier: 2,000 minutes/month
- Pay-as-you-go: $0.004/min per participant
- Good for: Simple integration

**Recommendation:** Agora free tier covers early users. Limit video to Premium+ to control costs. Cost per user per month: **$0 initially, $0.40 at scale.**

### 4. Translation

**Option A: Google Translate API**
- Free tier: 500,000 characters/month
- Pay-as-you-go: $20/1M characters
- Average message: 100 characters
- 1,000 users × 50 messages/day × 30 days = 1.5M characters
- Cost: 500K free + 1M paid = **$20/month**

**Option B: DeepL API**
- Free tier: 500,000 characters/month
- Pay-as-you-go: $25/1M characters
- Higher quality than Google
- Good for: Premium feature

**Option C: LibreTranslate (Self-hosted, Free)**
- Open source, no API costs
- Requires server: ~$5/month (VPS)
- Quality: Good for common languages
- Good for: Budget-conscious

**Recommendation:** Start with Google free tier. Only translate for Premium users. Cost per user per month: **$0-0.20.**

### 5. AI Moderation

**Option A: Google Gemini**
- Free tier: 60 requests/minute
- Pay-as-you-go: $0.00025/1K input tokens
- Average message: ~100 tokens
- 1,000 users × 50 messages/day = 50K messages/day
- Cost: ~$0.15/day = **$4.50/month**

**Option B: OpenAI Moderation API**
- Free endpoint available
- Cost: $0 (moderation endpoint is free)
- Good for: Basic toxicity detection

**Option C: Perspective API (Google)**
- Free for non-commercial use
- Good for: Toxicity scoring

**Recommendation:** Use OpenAI free moderation + Gemini for deeper analysis. Cost per user per month: **$0.01-0.05.**

### 6. Email Notifications

**Option A: Resend**
- Free tier: 100 emails/day (3,000/month)
- Pay-as-you-go: $1/1,000 emails
- Good for: Transactional emails

**Option B: Brevo (formerly Sendinblue)**
- Free tier: 300 emails/day (9,000/month)
- Good for: Marketing + transactional

**Option C: Mailgun**
- Free tier: 1,000 emails/month
- Pay-as-you-go: $1/1,000 emails

**Recommendation:** Brevo free tier for early users. Cost per user per month: **$0.**

### 7. Database

**Option A: Supabase (Recommended)**
- Free tier: 500MB database, 50K monthly active users
- Good for: PostgreSQL, real-time, auth
- Cost: **$0** for first 50K users

**Option B: PlanetScale**
- Free tier: 5GB storage, 1 billion reads/month
- Good for: MySQL, branching

**Option C: Neon**
- Free tier: 512MB storage
- Good for: PostgreSQL, serverless

**Recommendation:** Supabase. Cost per user per month: **$0.**

### 8. Hosting

**Frontend: Vercel**
- Free tier: 100GB bandwidth/month
- Good for: React/Vite apps
- Cost: **$0**

**Backend: Render**
- Free tier: 750 hours/month (enough for one service)
- Good for: Node.js/Express
- Cost: **$0** (spins down after inactivity on free tier)
- Upgrade: $7/month for always-on

**Recommendation:** Vercel + Render free tiers. Cost per user per month: **$0.**

---

## Group Matching Feature — Detailed Explanation

### What It Is
Instead of 1-on-1 matching, Friendzy groups 3-5 people with shared interests for group activities:
- Coffee meetups
- Hiking groups
- Book clubs
- Cooking sessions
- Study groups

### How It Works
1. User selects "Group Activities" in preferences
2. Algorithm finds 3-5 people with:
   - Compatible interests (70%+ overlap)
   - Similar location (same city or region)
   - Compatible schedules (available at same times)
   - Similar group size preference
3. Group chat is created automatically
4. Suggested activities based on shared interests
5. Safety features: group moderation, emergency exit, check-ins

### Implementation (Low Cost)
- **Matching:** Rule-based (no AI needed) — filter by interests + location
- **Group chat:** Use existing chat infrastructure (no new cost)
- **Suggestion engine:** Simple template-based (no ML needed)
- **Cost:** $0 additional — uses existing infrastructure

### Revenue Impact
- Group matching = VIP-only feature ($29.99/mo)
- Groups create network effects (more people = more fun)
- Group events = higher retention (harder to leave a group)
- Groups = viral growth (friends invite friends)

---

## Blocking & Account Review — Complete System

### Blocking System
**How it works:**
1. User taps "Block" on any profile or in chat
2. Blocked user:
   - Cannot see blocker's profile
   - Cannot send messages
   - Cannot see blocker in search results
   - Existing conversation is hidden
3. Block is instant and irreversible (user can unblock in settings)
4. Blocked user is NOT notified (prevents retaliation)

**Implementation:**
- Store blocked relationships in database
- Filter blocked users from all queries
- Real-time WebSocket notification to remove blocked user from view
- **Cost:** $0 — database operation only

### Report System
**How it works:**
1. User taps "Report" → selects reason:
   - Harassment
   - Fake profile
   - Inappropriate content
   - Spam/scam
   - Other
2. Report includes:
   - Reporter ID
   - Reported user ID
   - Reason category
   - Optional description
   - Timestamp
   - Conversation context (last 10 messages)
3. Report is queued for review

**Review Process:**
1. **AI Auto-Review (Instant):**
   - Google Gemini analyzes reported content
   - Scores severity (1-10)
   - If severity > 8: auto-suspend account
   - If severity 5-8: queue for human review
   - If severity < 5: dismiss report, warn reporter if false

2. **Human Review (24hr SLA):**
   - Dashboard shows pending reports
   - Reviewer sees: profile, conversation, report details
   - Actions: dismiss, warn, suspend, ban
   - Notes logged for appeal process

3. **Appeal Process:**
   - Suspended user can appeal
   - Different reviewer handles appeal
   - Decision within 48 hours

**Implementation Cost:**
- AI moderation: ~$5/month (Gemini API)
- Human reviewer: $0 initially (you), hire at 10K+ users
- **Cost per user per month: $0.01**

---

## Complete Cost Model: 1,000 Users

### Monthly Costs

| Service | Cost | Notes |
|---------|------|-------|
| **Hosting (Vercel)** | $0 | Free tier |
| **Hosting (Render)** | $7 | Always-on backend |
| **Database (Supabase)** | $0 | Free tier (500MB) |
| **Domain** | $1 | $12/year ÷ 12 |
| **SMS Verification (Termii)** | $30 | 1,000 users × ₦40/SMS |
| **Video Calls (Agora)** | $0 | Free tier covers usage |
| **Voice Calls (WebRTC)** | $0 | Peer-to-peer |
| **Translation (Google)** | $20 | Premium users only |
| **AI Moderation (Gemini)** | $5 | Content screening |
| **Email (Brevo)** | $0 | Free tier |
| **Paystack fees** | $45 | 1.5% on ₦150K revenue |
| **SSL/Security** | $0 | Included in hosting |
| **Error Tracking (Sentry)** | $0 | Free tier |
| **Analytics (PostHog)** | $0 | Free tier |
| **TOTAL** | **$108/month** | |

### Revenue at 1,000 Users

| Tier | Users | Revenue |
|------|-------|---------|
| Free | 900 | $0 |
| Premium (₦5,000/mo) | 90 (9%) | ₦450,000 (~$290) |
| VIP (₦10,000/mo) | 10 (1%) | ₦100,000 (~$64) |
| **TOTAL** | | **₦550,000 (~$354)** |

### Profit: $354 - $108 = **$246/month**

### At 5,000 Users

| Cost | Amount |
|------|--------|
| Hosting | $25 |
| Database | $0 |
| SMS | $150 |
| Translation | $100 |
| Moderation | $25 |
| Paystack fees | $225 |
| **TOTAL** | **$525** |

| Revenue | Amount |
|---------|--------|
| Premium (450 × ₦5,000) | ₦2,250,000 (~$1,450) |
| VIP (50 × ₦10,000) | ₦500,000 (~$320) |
| **TOTAL** | **~$1,770** |

**Profit: $1,770 - $525 = $1,245/month**

---

## Revenue Must ALWAYS Exceed Costs

### The Rule: Never Spend Before You Earn

| Phase | Users | Max Monthly Cost | Revenue Needed |
|-------|-------|------------------|----------------|
| Launch | 0-500 | $50 | $0 (build for free) |
| Early | 500-1,000 | $150 | $200+ |
| Growth | 1,000-5,000 | $500 | $1,000+ |
| Scale | 5,000-25,000 | $2,000 | $5,000+ |

### Cost Control Levers
1. **Gate features behind Premium** — only pay for translation/video if users pay you
2. **Use free tiers aggressively** — Supabase, Vercel, Agora all have generous free tiers
3. **Limit free tier usage** — 5 matches/day, 1 call/month keeps costs at $0
4. **Automate moderation** — AI handles 90%, human only for complex cases
5. **Regional pricing** — charge more in US/EU, less in Nigeria/India
6. **No paid ads until profitable** — organic growth first

### Break-Even Point
- Monthly costs: ~$108
- Premium price: ₦5,000 (~$3.20 after Paystack fees)
- Break-even: **34 Premium subscribers** ($108 ÷ $3.20)

---

## Summary: Every Feature's Cost

| Feature | Free Tier Cost | Premium Cost | Your Cost/User/Month |
|---------|---------------|--------------|---------------------|
| Matching | $0 | $0 | $0 |
| Text Chat | $0 | $0 | $0 |
| Voice Call | $0 (WebRTC) | $0 (WebRTC) | $0 |
| Video Call | $0 (WebRTC) | $0-0.40 (Agora) | $0-0.40 |
| Translation | $0 | $0.20 (Google) | $0-0.20 |
| Verification | $0 (manual) | $0.30 (automated) | $0-0.30 |
| Moderation | $0.01 (AI) | $0.01 (AI) | $0.01 |
| Group Matching | $0 | $0 | $0 |
| Blocking | $0 | $0 | $0 |
| Email | $0 | $0 | $0 |
| Database | $0 | $0 | $0 |
| Hosting | $0 | $0 | $0 |
| **TOTAL** | | | **$0-0.91** |

**Your maximum cost per user per month: $0.91**
**Your minimum revenue per paid user: $3.20 (₦5,000 minus Paystack fees)**

**Profit margin: 72-100%** depending on feature usage.
