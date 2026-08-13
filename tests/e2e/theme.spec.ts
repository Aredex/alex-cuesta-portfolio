import { test, expect } from '@playwright/test';

test.describe('Theme toggle and persistence', () => {
  test('toggling theme updates data-theme, localStorage, and button state', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const toggle = page.locator('#theme-toggle');

    await expect(html).toHaveAttribute('data-theme', 'light');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await expect(toggle).toHaveText('OSCURO');

    await toggle.click();

    await expect(html).toHaveAttribute('data-theme', 'dark');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(toggle).toHaveText('CLARO');
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('ac-theme')))
      .toBe('dark');
  });

  test('theme persists across navigation and reload without flashing', async ({ page }) => {
    await page.goto('/');
    await page.locator('#theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.goto('/services');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.goto('/work/briefline');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // The anti-flash script must set data-theme synchronously, before the
    // first paint — so it must already be correct at DOMContentLoaded, not
    // just eventually. Re-navigating and checking immediately is the closest
    // Playwright gets to observing "no flash" deterministically.
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('respects prefers-color-scheme when no stored preference exists', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });
});
