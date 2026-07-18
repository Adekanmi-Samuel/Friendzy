# Friendzy Project Rules

## Tech Stack
- Frontend: React 19, TypeScript, Vite, Tailwind CSS v4, GSAP, Framer Motion, Lenis
- Backend: Node.js, Express, Helmet, CORS, rate-limiting, express-validator
- Mobile: Capacitor 6
- Testing: Vitest, React Testing Library
- Deploy: Vercel (frontend), Render (backend)

## Design System
Colors: Ink #243442, Linen #E8E5DF, Amber #C4933F, Moss #6B8C7A, Slate #5A7585, Pebble #D5CFC6, Brick #B84C3C
Fonts: Fraunces (display/headings ONLY), Inter (body), JetBrains Mono (timestamps/stats)

## Architecture Rules
- All pages lazy-loaded with React.lazy for code splitting
- ErrorBoundary wraps entire app
- Smooth scroll via Lenis + GSAP ScrollTrigger
- All animations respect prefers-reduced-motion
- GPU-accelerated only: transform, opacity, filter (never animate width/height/margin)
- Backend: asyncHandler on all routes, validation on inputs, rate limiting active
- No console errors in production
- Semantic HTML with ARIA labels

## Code Style
- TypeScript strict mode
- Tailwind utilities preferred over inline styles (except font-family vars and animation states)
- Component files: PascalCase
- Utility/hook files: camelCase
- CSS: use @theme variables, never hardcoded hex in components
- Comments only for non-obvious logic

## When Building New Features
1. Check existing components for reuse
2. Use design system colors (ink, amber, moss, slate, pebble, brick)
3. Wrap in FadeUp or RevealText for scroll animations
4. Add MagneticButton for CTAs
5. Test responsive at 375px, 768px, 1024px, 1440px
6. Ensure keyboard navigable
7. Build passes with 0 errors before committing

## Deployment
Frontend: cd frontend && vercel --yes --prod
Backend: Push to GitHub, Render auto-deploys from render.yaml
Always commit before deploying
