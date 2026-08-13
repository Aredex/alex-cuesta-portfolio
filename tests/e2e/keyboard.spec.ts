import { test, expect } from '@playwright/test';

test.describe('Full keyboard walkthrough', () => {
  test('every header control is reachable and operable by keyboard alone', async ({ page }) => {
    await page.goto('/');

    // Skip link is the first stop and is only ever visible on focus.
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();

    // Walk the rest of the header: wordmark, nav links, theme toggle, CTA.
    const focusableInHeader = [
      page.locator('.site-header__wordmark'),
      ...(await page.locator('.site-header__link').all()),
      page.locator('#theme-toggle'),
      page.locator('.site-header__cta'),
    ];

    for (const control of focusableInHeader) {
      await page.keyboard.press('Tab');
      await expect(control).toBeFocused();
    }
  });

  test('theme toggle activates with the keyboard (Enter and Space)', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('#theme-toggle');
    await toggle.focus();

    await page.keyboard.press('Enter');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.keyboard.press(' ');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('every focusable element in the header shows a visible focus outline', async ({ page }) => {
    await page.goto('/');
    const controls = await page
      .locator('.site-header a, .site-header button')
      .all();

    for (const control of controls) {
      await control.focus();
      const outline = await control.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return { style: style.outlineStyle, width: style.outlineWidth };
      });
      expect(outline.style).not.toBe('none');
      expect(outline.width).not.toBe('0px');
    }
  });

  test('services contact form is fully operable by keyboard, including submit', async ({ page }) => {
    await page.goto('/services');

    await page.getByLabel('Name').focus();
    await page.keyboard.type('Jordan Rivera');
    await page.keyboard.press('Tab');
    await page.keyboard.type('jordan@example.com');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Our webhook retries silently fail.');
    await page.keyboard.press('Tab');
    await page.keyboard.type('A runbook for replaying a failed delivery.');

    // Tab through the honeypot (kept out of the tab order) straight to submit.
    await page.keyboard.press('Tab');
    await expect(page.locator('#contact-form-submit')).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(page.locator('#contact-form-status')).toHaveAttribute('role', 'alert');
  });
});
