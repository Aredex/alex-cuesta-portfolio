import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }], ['list']],
  use: {
    // A non-default port: 4321 is Astro's default and is often already
    // occupied by an unrelated dev server on a shared machine, which would
    // silently make reuseExistingServer point these tests at the wrong app.
    baseURL: 'http://localhost:4331',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    // `astro preview` (v7) always forks itself into a background daemon and
    // returns immediately, which Playwright's webServer treats as an early
    // exit. `serve` stays in the foreground, so it works with Playwright's
    // normal start/health-check/teardown lifecycle.
    command: 'npm run build && npx serve dist --listen 4331',
    env: {
      ...process.env,
      PUBLIC_FORMSPREE_ENDPOINT: 'https://formspree.io/f/e2e-test',
    },
    url: 'http://localhost:4331',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
