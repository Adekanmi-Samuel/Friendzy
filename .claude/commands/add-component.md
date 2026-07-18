Add a new reusable component to Friendzy. Usage: /add-component "ComponentName" "description of what it does"

Steps:
1. Create the component at frontend/src/components/{ComponentName}.tsx
2. Use TypeScript with proper props interface
3. Use Tailwind CSS with design system colors (ink, amber, moss, slate, pebble, brick)
4. Use font-display (Fraunces) for headings, font-body (Inter) for text, font-mono (JetBrains Mono) for data
5. Add proper accessibility: ARIA labels, keyboard navigation, focus-visible
6. Export as default
7. If it needs animations, use FadeUp, RevealText, or ParallaxSection from existing utilities
8. Add HoverScale replacement: use CSS hover: classes instead of the removed HoverScale component
9. Run build check to verify 0 errors
10. Report what was created with usage example
