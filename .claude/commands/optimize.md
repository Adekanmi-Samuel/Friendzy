Optimize the Friendzy frontend for performance.

1. Check bundle size: `cd "C:\New folder\Friendzy\frontend" && npm run build 2>&1`
2. Report current bundle sizes (main JS, CSS, total dist)
3. Check for:
   - Unused imports across all files
   - Large dependencies that could be tree-shaken
   - Images that need optimization
   - Fonts that could be subset
   - CSS that could be purged
4. Check that all pages are lazy-loaded (code-split)
5. Verify no layout shifts (CLS)
6. Check that animations use only transform/opacity/filter
7. Report optimization opportunities and apply safe ones
8. Re-run build and compare sizes
