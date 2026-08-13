import { test, expect } from '@playwright/test';

const track = '[data-capabilities-track]';
const counter = '[data-capabilities-counter]';
const prev = '[data-capabilities-prev]';
const next = '[data-capabilities-next]';

/** Reads the track's translateX from its computed transform matrix. */
async function getTranslateX(page: import('@playwright/test').Page) {
  return page.locator(track).evaluate((el) => {
    const matrix = new DOMMatrixReadOnly(window.getComputedStyle(el).transform);
    return matrix.m41;
  });
}

test.describe('Capabilities carousel', () => {
  test('shows 3 slides per view on desktop and pages forward', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.locator('[data-capabilities-viewport]').scrollIntoViewIfNeeded();

    await expect(page.locator(counter)).toHaveText('CAPACIDAD 1–3 DE 4');
    const startX = await getTranslateX(page);
    expect(startX).toBe(0);

    await page.locator(next).click();
    await expect(page.locator(counter)).toHaveText('CAPACIDAD 2–4 DE 4');
    const afterNext = await getTranslateX(page);
    expect(afterNext).toBeLessThan(0);
  });

  test('wraps circularly at both ends', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.locator('[data-capabilities-viewport]').scrollIntoViewIfNeeded();

    // maxIndex = 4 - 3 = 1 at this width. Prev from index 0 should wrap to 1.
    await page.locator(prev).click();
    await expect(page.locator(counter)).toHaveText('CAPACIDAD 2–4 DE 4');

    // Next from the max index should wrap back to 0.
    await page.locator(next).click();
    await expect(page.locator(counter)).toHaveText('CAPACIDAD 1–3 DE 4');
  });

  test('recalculates slides-per-view on resize (3 -> 2 -> 1)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.locator('[data-capabilities-viewport]').scrollIntoViewIfNeeded();
    await expect(page.locator(counter)).toHaveText('CAPACIDAD 1–3 DE 4');

    await page.setViewportSize({ width: 800, height: 900 });
    // The resize handler is debounced ~100ms.
    await expect(page.locator(counter)).toHaveText('CAPACIDAD 1–2 DE 4');

    await page.setViewportSize({ width: 500, height: 900 });
    await expect(page.locator(counter)).toHaveText('CAPACIDAD 1–1 DE 4');
  });

  test('arrow keys move the carousel while it has focus', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.locator(next).focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator(counter)).toHaveText('CAPACIDAD 2–4 DE 4');
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator(counter)).toHaveText('CAPACIDAD 1–3 DE 4');
  });
});
