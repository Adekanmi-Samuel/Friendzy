# Friendzy - Find Your People

A global friendship platform connecting people for genuine connections, conversation, and real-world hangouts — not dating.

## Architecture

```
Friendzy/
├── frontend/          # React + TypeScript + Vite + Tailwind CSS v4
│   ├── src/
│   │   ├── pages/     # Landing, Onboarding, Dashboard, Chat, Profile, Safety, Pricing, Settings
│   │   ├── components/# Navbar, Footer, MatchCard, ConnectionRing, MoodIndicator, etc.
│   │   └── lib/       # Animation utilities
│   └── public/        # Logo, favicon
├── backend/           # Node.js + Express REST API
│   └── src/
│       ├── server.js  # Express app with middleware
│       └── routes/    # auth, users, matches, chat, payments, moderation
└── README.md
```

## Features

- **Personality Matching** — Big Five trait-based compatibility scoring
- **Real-Time Chat** — With auto-translation in 12 languages
- **Safety First** — AI + human moderation, verified profiles, one-tap exit
- **Global Regions** — US, UK/EU, Nigeria, India, Brazil, SE Asia
- **Mood Check-ins** — Daily mood tracking for wellbeing
- **Localized Pricing** — Stripe + Paystack, region-specific pricing
- **Mobile Responsive** — Fully responsive design for all devices

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Install all dependencies
cd frontend && npm install
cd ../backend && npm install

# Run frontend (port 5173)
cd frontend && npm run dev

# Run backend (port 3001)
cd backend && npm run dev
```

### API Endpoints

| Route | Method | Description |
|-------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/auth/register` | POST | Register new user |
| `/api/auth/login` | POST | Login |
| `/api/auth/quiz` | POST | Save quiz results |
| `/api/users` | GET | Get all users/matches |
| `/api/users/mood` | PUT | Update mood |
| `/api/matches/:userId` | GET | Get matches for user |
| `/api/matches/:userId/like/:matchId` | POST | Like a match |
| `/api/chat/conversations` | GET | Get conversations |
| `/api/chat/conversations/:id/messages` | GET | Get messages |
| `/api/chat/conversations/:id/messages` | POST | Send message |
| `/api/chat/report` | POST | Report user |
| `/api/chat/block` | POST | Block user |
| `/api/chat/safety-exit` | POST | Emergency exit |
| `/api/payments/plans` | GET | Get pricing plans |
| `/api/payments/checkout` | POST | Create checkout |
| `/api/moderation/check` | POST | Content moderation |
| `/api/moderation/hotlines/:region` | GET | Crisis hotlines |

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS v4, React Router 7, Lucide Icons
- **Backend**: Node.js, Express 4, Helmet, CORS, Morgan
- **Design**: Custom warm color palette, Playfair Display + Inter fonts, glass morphism cards

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend && npm run build
# Deploy the dist/ folder
```

### Backend (Render/Fly.io)
```bash
cd backend && npm start
```

## License

MIT
