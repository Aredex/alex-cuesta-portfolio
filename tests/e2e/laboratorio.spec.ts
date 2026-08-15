import { test, expect } from '@playwright/test';

test.describe('Laboratorio público', () => {
  test('presenta 12 proyectos destacados y permite consultar los 29', async ({ page }) => {
    await page.goto('/laboratorio');

    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Sistemas pequeños para estudiar fallos reales'
    );
    await expect(page.locator('[data-lab-pillar]')).toHaveCount(4);
    await expect(page.locator('[data-lab-project]')).toHaveCount(29);
    await expect(page.locator('[data-lab-project][data-flagship="true"]')).toHaveCount(12);
    await expect(page.getByText('29 proyectos desplegados', { exact: true })).toBeVisible();
  });

  test('cada proyecto expone demo, código y limitación sin promesas ambiguas', async ({ page }) => {
    await page.goto('/laboratorio');

    const cards = page.locator('[data-lab-project]');
    await expect(cards).toHaveCount(29);

    for (const card of await cards.all()) {
      await expect(card.getByRole('link', { name: 'Abrir demo' })).toHaveAttribute(
        'href',
        /^https:\/\/[a-z0-9-]+\.alexcuesta\.dev$/
      );
      await expect(card.getByRole('link', { name: 'Ver código' })).toHaveAttribute(
        'href',
        /^https:\/\/github\.com\/Aredex\/[a-z0-9-]+$/
      );
      await expect(card.locator('[data-lab-limitation]')).not.toBeEmpty();
    }
  });

  test('se descubre desde la portada y mantiene el contexto en la navegación', async ({ page }) => {
    await page.goto('/');

    await page.locator('.site-header__nav').getByRole('link', { name: 'Laboratorio' }).click();
    await expect(page).toHaveURL('/laboratorio');
    await expect(page.locator('.site-header__link[data-active="true"]')).toHaveText('Laboratorio');

    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Explorar los 29 proyectos' })).toBeVisible();
  });

  test('enlaza evidencia pertinente desde cada servicio', async ({ page }) => {
    await page.goto('/services');

    await expect(page.locator('[data-service-evidence]')).toHaveCount(4);
    await expect(page.getByRole('link', { name: 'Ver evidencia en el laboratorio' })).toHaveCount(4);
  });
});
