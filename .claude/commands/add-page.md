Add a new page to Friendzy. Usage: /add-page "PageName" "description of what the page does"

Steps:
1. Create the page file at frontend/src/pages/{PageName}.tsx
2. Use the design system: Ink, Linen, Amber, Moss, Slate, Pebble colors
3. Import FadeUp from '../lib/animate' for scroll animations
4. Import RevealText, ParallaxSection, FloatingParticles for premium effects
5. Import Navbar from '../components/Navbar' and Footer from '../components/Footer'
6. Add the route to frontend/src/App.tsx (lazy-loaded with React.lazy)
7. Add navigation link to Navbar.tsx if needed
8. Ensure responsive design (mobile-first)
9. Add proper SEO: title, description meta if page-specific
10. Run build check to verify 0 errors
11. Report what was created
