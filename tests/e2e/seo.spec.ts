import { test, expect } from '@playwright/test';

const PAGES = ['/', '/services', '/work/briefline'];

test.describe('SEO fundamentals', () => {
  for (const path of PAGES) {
    test(`${path} has exactly one h1, an absolute self-referential canonical, and lang="es-ES"`, async ({
      page,
      baseURL,
    }) => {
      await page.goto(path);

      await expect(page.locator('html')).toHaveAttribute('lang', 'es-ES');
      await expect(page.locator('h1')).toHaveCount(1);

      const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonicalHref).toBeTruthy();
      expect(canonicalHref).toMatch(/^https:\/\//);

      // Self-referential: canonical's path matches the page actually loaded
      // (baseURL differs between local/CI runs, so compare pathnames only).
      const canonicalPath = new URL(canonicalHref!).pathname;
      const expectedPath = path === '/' ? '/' : path;
      expect(canonicalPath).toBe(expectedPath);
      void baseURL;
    });

    test(`${path} exposes only syntactically valid JSON-LD`, async ({ page }) => {
      await page.goto(path);

      const scripts = await page.locator('script[type="application/ld+json"]').all();
      expect(scripts.length).toBeGreaterThan(0);

      for (const script of scripts) {
        const raw = await script.textContent();
        expect(() => JSON.parse(raw ?? '')).not.toThrow();
      }
    });
  }

  test('404 page is marked noindex', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response?.status()).toBe(404);
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).toBe('noindex, follow');
  });
});
