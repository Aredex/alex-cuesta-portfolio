import { test, expect } from '@playwright/test';

test.describe('Navigation between pages', () => {
  test('home header links to the case study, which links to services, which links back home', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Alex Cuesta');

    await page.getByRole('link', { name: 'Leer el caso de estudio', exact: true }).click();
    await expect(page).toHaveURL('/work/briefline');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'De un brief ambiguo a un producto verificable.'
    );

    // Header nav "Trabajo" item is active on the case study page.
    await expect(page.locator('.site-header__link[data-active="true"]')).toHaveText('Trabajo');

    await page.locator('.site-header__wordmark').click();
    await expect(page).toHaveURL('/');

    // Header nav only shows "Services" on the Services page itself; from
    // Home, the footer nav is the way there.
    await page.locator('.site-footer__nav').getByRole('link', { name: 'Servicios' }).click();
    await expect(page).toHaveURL('/services');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Ayuda de ingeniería enfocada para software que necesita funcionar.'
    );
  });

  test('services page highlights Services as the active nav item', async ({ page }) => {
    await page.goto('/services');
    await expect(page.locator('.site-header__link[data-active="true"]')).toHaveText('Servicios');
    await expect(page.locator('.site-header__link[data-active="true"]')).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  test('case study footer has no nav, services footer does', async ({ page }) => {
    await page.goto('/work/briefline');
    await expect(page.locator('.site-footer__nav')).toHaveCount(0);

    await page.goto('/services');
    await expect(page.locator('.site-footer__nav')).toBeVisible();
    await expect(page.locator('.site-footer').first()).toHaveAttribute('data-background', 'canvas');
  });

  test('skip link jumps to main content', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('.skip-link');
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL('/#main');
  });
});
