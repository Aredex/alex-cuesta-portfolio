/**
 * Shared light/dark theme logic, used by every ThemeToggle instance across
 * the three pages so the behavior never has to be reimplemented per page.
 *
 * NOTE: the very first theme application (before first paint) is handled by
 * a small *inline, non-module* script in BaseLayout.astro's <head>, not by
 * this file — a module script is deferred and would still cause a flash of
 * the wrong theme. That inline script intentionally duplicates the minimal
 * "read storage / read matchMedia / set attribute" logic below. Keep the
 * storage key (`ac-theme`) and the two-state model in sync if either changes.
 */

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'ac-theme';

/** Reads the theme currently applied to <html data-theme="...">. */
export function getCurrentTheme(): Theme {
  const attr = document.documentElement.dataset.theme;
  return attr === 'dark' ? 'dark' : 'light';
}

/** Applies a theme to <html> and persists it to localStorage. */
export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage can throw in private-browsing / storage-restricted
    // contexts; theme still applies for the current page load.
  }
}

/** Flips the active theme and returns the theme that is now active. */
export function toggleTheme(): Theme {
  const next: Theme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

/** The theme the toggle button should offer to switch *to*. */
export function getTargetTheme(current: Theme): Theme {
  return current === 'dark' ? 'light' : 'dark';
}
