import { test, expect } from '@playwright/test';

const PAGES = ['/', '/services', '/work/briefline'];
const EXPECTED_CANONICALS = [
  // @astrojs/sitemap follows `trailingSlash: 'never'` and serializes the
  // origin without a terminal slash. Browsers resolve both forms identically.
  'https://alexcuesta.dev',
  'https://alexcuesta.dev/services',
  'https://alexcuesta.dev/work/briefline',
];

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

    test(`${path} ships complete social metadata without unresolved placeholders`, async ({ page }) => {
      await page.goto(path);

      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:url"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        'https://alexcuesta.dev/og-image.png'
      );
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        'content',
        'summary_large_image'
      );

      expect(await page.content()).not.toContain('TODO_');
    });
  }

  test('home h1 describes Alex, his role and Sevilla', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toContainText('Alex Cuesta');
    await expect(page.locator('h1')).toContainText('Desarrollador full-stack freelance en Sevilla');
  });

  test('Briefline breadcrumbs contain only crawlable page URLs', async ({ page }) => {
    await page.goto('/work/briefline');

    const breadcrumbs = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
      scripts
        .map((script) => JSON.parse(script.textContent ?? ''))
        .find((entry) => entry['@type'] === 'BreadcrumbList')
    );
    const items = breadcrumbs.itemListElement.map((item: { item: string }) => item.item);

    expect(items).toEqual([
      'https://alexcuesta.dev/',
      'https://alexcuesta.dev/work/briefline',
    ]);
    expect(items.every((item: string) => !item.includes('#'))).toBe(true);
  });

  test('sitemap contains exactly the canonical public URLs and robots advertises it', async ({
    request,
  }) => {
    const sitemapResponse = await request.get('/sitemap-0.xml');
    expect(sitemapResponse.ok()).toBe(true);
    const sitemap = await sitemapResponse.text();
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(urls).toEqual(EXPECTED_CANONICALS);

    const robotsResponse = await request.get('/robots.txt');
    expect(robotsResponse.ok()).toBe(true);
    await expect(robotsResponse.text()).resolves.toContain(
      'Sitemap: https://alexcuesta.dev/sitemap-index.xml'
    );
  });

  test('404 page is marked noindex', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response?.status()).toBe(404);
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).toBe('noindex, follow');
  });
});
