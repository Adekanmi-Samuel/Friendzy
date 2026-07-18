type Theme = 'light' | 'dark';

const STORAGE_KEY = 'friendzy-theme';

/**
 * Read stored theme from localStorage, or null if unset.
 */
export function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // localStorage unavailable (SSR / privacy mode)
  }
  return null;
}

/**
 * Resolve the effective theme: stored preference, then system preference, then light.
 */
export function resolveTheme(): Theme {
  const stored = getStoredTheme();
  if (stored) return stored;

  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

/**
 * Apply the theme to the <html> element and persist the choice.
 */
export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore
  }
}

/**
 * Initialize theme on page load. Reads stored / system preference and applies it.
 * Also listens for OS-level changes when no explicit preference is stored.
 */
export function initTheme(): void {
  const theme = resolveTheme();
  setTheme(theme);

  // Listen for OS-level changes only when user hasn't manually chosen
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (getStoredTheme() === null) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mq.addEventListener('change', handler);
  }
}

/**
 * Toggle between light and dark themes.
 */
export function toggleTheme(): void {
  const current = resolveTheme();
  setTheme(current === 'light' ? 'dark' : 'light');
}
