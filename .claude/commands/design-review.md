Do a design review of the Friendzy website. Usage: /design-review [optional: specific page name]

Check for:
1. Color consistency - are all colors from the design system (ink, amber, moss, slate, pebble, brick)?
2. Typography - is Fraunces only used for headings? Inter for body? JetBrains Mono for data?
3. Spacing - consistent padding/margins across sections?
4. Responsive - does it look good at 375px, 768px, 1024px, 1440px?
5. Accessibility - focus-visible on all interactive elements? ARIA labels? Skip-link?
6. Animations - do all respect prefers-reduced-motion? Are they GPU-accelerated?
7. Dark mode - do all colors have dark mode variants?
8. Loading states - are there loading spinners for async operations?
9. Empty states - are there friendly messages when no data?
10. Error states - are errors handled gracefully?

Report findings as a checklist with pass/fail for each item.
