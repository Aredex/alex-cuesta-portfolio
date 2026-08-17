import { test, expect } from '@playwright/test';
import { LAB_PROJECT_COUNT } from '../../src/data/lab';

test.describe('Laboratorio público', () => {
  test('presenta 12 proyectos destacados y permite consultar el catálogo completo', async ({ page }) => {
    await page.goto('/laboratorio');

    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Sistemas pequeños para estudiar fallos reales'
    );
    await expect(page.locator('[data-lab-pillar]')).toHaveCount(4);
    await expect(page.locator('[data-lab-project]')).toHaveCount(LAB_PROJECT_COUNT);
    await expect(page.locator('[data-lab-project][data-flagship="true"]')).toHaveCount(12);
    await expect(page.getByText(`${LAB_PROJECT_COUNT} proyectos desplegados`, { exact: true })).toBeVisible();
  });

  test('cada proyecto expone demo, código y limitación sin promesas ambiguas', async ({ page }) => {
    await page.goto('/laboratorio');

    const cards = page.locator('[data-lab-project]');
    await expect(cards).toHaveCount(LAB_PROJECT_COUNT);

    for (const card of await cards.all()) {
      if ((await card.getAttribute('data-status')) === 'degraded') {
        await expect(card.locator('a', { hasText: 'Abrir demo' })).toHaveCount(0);
      } else {
        await expect(card.locator('a', { hasText: 'Abrir demo' })).toHaveAttribute(
          'href',
          /^https:\/\/[a-z0-9-]+\.alexcuesta\.dev$/
        );
      }
      await expect(card.locator('a', { hasText: 'Ver código' })).toHaveAttribute(
        'href',
        /^https:\/\/github\.com\/Aredex\/[a-z0-9-]+$/
      );
      await expect(card.locator('[data-lab-limitation]')).not.toBeEmpty();
    }
  });

  test('presenta Webhook como degradado sin enlazar la demo rota', async ({ page }) => {
    await page.goto('/laboratorio');

    const card = page.locator('#webhook-reliability-playground');
    const disclosure = card.locator('xpath=ancestor::details');
    await disclosure.evaluate((element: HTMLDetailsElement) => {
      element.open = true;
    });

    await expect(page.locator('.lab-metrics span', { hasText: 'código público' })).toHaveText(
      'código público'
    );
    await expect(card).toHaveAttribute('data-status', 'degraded');
    await expect(card.getByText('DEGRADADO', { exact: true })).toBeVisible();
    await expect(card.getByText(/su flujo servidor falla desde producción por CORS/)).toBeVisible();
    await expect(card.getByRole('link', { name: 'Abrir demo' })).toHaveCount(0);
    await expect(card.getByRole('link', { name: 'Ver código' })).toBeVisible();
  });

  test('se descubre desde la portada y mantiene el contexto en la navegación', async ({ page }) => {
    await page.goto('/');

    await page.locator('.site-header__nav').getByRole('link', { name: 'Laboratorio' }).click();
    await expect(page).toHaveURL('/laboratorio');
    await expect(page.locator('.site-header__link[data-active="true"]')).toHaveText('Laboratorio');

    await page.goto('/');
    await expect(page.getByRole('link', { name: `Explorar los ${LAB_PROJECT_COUNT} proyectos` })).toBeVisible();
  });

  test('enlaza evidencia pertinente desde cada servicio', async ({ page }) => {
    await page.goto('/services');

    await expect(page.locator('[data-service-evidence]')).toHaveCount(4);
    await expect(page.getByRole('link', { name: 'Ver evidencia en el laboratorio' })).toHaveCount(4);
  });

  test('abre el catálogo adicional con teclado y expone sus enlaces', async ({ page }) => {
    await page.goto('/laboratorio');

    const disclosure = page.locator('details').first();
    const summary = disclosure.locator('summary');
    await summary.focus();
    await page.keyboard.press('Enter');

    await expect(disclosure).toHaveAttribute('open', '');
    await expect(disclosure.getByRole('link', { name: 'Abrir demo' }).first()).toBeVisible();
  });

  test('los enlaces directos a pilares no quedan ocultos por la cabecera móvil', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/laboratorio#reliable-backend');

    const headerBox = await page.locator('.site-header').boundingBox();
    const pillarBox = await page.locator('#reliable-backend').boundingBox();
    expect(headerBox).not.toBeNull();
    expect(pillarBox).not.toBeNull();
    expect(pillarBox!.y).toBeGreaterThanOrEqual(headerBox!.height);

    const widths = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(widths.content).toBe(widths.viewport);
  });
});
