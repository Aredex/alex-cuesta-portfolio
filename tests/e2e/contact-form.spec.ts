import { test, expect } from '@playwright/test';

test.describe('Services contact form', () => {
  test('blocks submission and focuses the first invalid field when empty', async ({ page }) => {
    await page.goto('/services');

    const nameInput = page.locator('#contact-form input[name="name"]');
    await page.locator('#contact-form-submit').click();

    // Native validity blocks the submit handler entirely — no fetch, no
    // status change, and the browser focuses the first invalid control.
    await expect(nameInput).toBeFocused();
    await expect(page.locator('#contact-form-status')).toHaveText('');
  });

  test('shows a disabled "Enviando contexto…" state while the request is in flight', async ({
    page,
  }) => {
    await page.goto('/services');

    await page.route('https://formspree.io/f/e2e-test', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.fulfill({ status: 500, body: 'error' });
    });

    await page.locator('#contact-form input[name="name"]').fill('Jordan Rivera');
    await page.locator('#contact-form input[name="email"]').fill('jordan@example.com');
    await page.locator('#contact-form textarea[name="problem"]').fill('Nuestros reintentos de webhook fallan en silencio.');
    await page
      .locator('#contact-form textarea[name="outcome"]')
      .fill('Un runbook para repetir una entrega fallida.');

    const submit = page.locator('#contact-form-submit');
    const status = page.locator('#contact-form-status');

    await submit.click();
    await expect(submit).toBeDisabled();
    await expect(submit).toHaveText('Enviando contexto…');

    await expect(status).toHaveAttribute('role', 'alert');
    await expect(status).toContainText('Algo ha fallado al enviarlo');
    await expect(submit).toBeEnabled();
    await expect(submit).toHaveText('Enviar contexto del proyecto');
  });

  test('reaches the error state when the form provider rejects the request', async ({ page }) => {
    await page.goto('/services');

    await page.route('https://formspree.io/f/e2e-test', async (route) => {
      await route.fulfill({ status: 500, body: 'error' });
    });

    await page.locator('#contact-form input[name="name"]').fill('Jordan Rivera');
    await page.locator('#contact-form input[name="email"]').fill('jordan@example.com');
    await page.locator('#contact-form textarea[name="problem"]').fill('Nuestros reintentos de webhook fallan en silencio.');
    await page
      .locator('#contact-form textarea[name="outcome"]')
      .fill('Un runbook para repetir una entrega fallida.');

    const submit = page.locator('#contact-form-submit');
    const status = page.locator('#contact-form-status');

    await submit.click();
    await expect(status).toHaveAttribute('role', 'alert');
    await expect(status).toContainText('Algo ha fallado al enviarlo');
    await expect(submit).toBeEnabled();
  });

  test('shows success and clears the form when the provider accepts the request', async ({ page }) => {
    await page.goto('/services');

    await page.route('https://formspree.io/f/e2e-test', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
    });

    await page.getByLabel('Nombre').fill('Jordan Rivera');
    await page.getByLabel('Email de trabajo').fill('jordan@example.com');
    await page.getByLabel('¿En qué estás trabajando?').fill('Una integración que necesita revisión.');
    await page.getByLabel('¿Cómo sería un resultado útil?').fill('Una ruta de corrección verificable.');
    await page.locator('#contact-form-submit').click();

    await expect(page.locator('#contact-form-status')).toContainText('Gracias. Tengo tu contexto');
    await expect(page.getByLabel('Nombre')).toHaveValue('');
  });

  test('labels are programmatically associated with their fields', async ({ page }) => {
    await page.goto('/services');

    await expect(page.getByLabel('Nombre')).toHaveAttribute('name', 'name');
    await expect(page.getByLabel('Email de trabajo')).toHaveAttribute('name', 'email');
    await expect(page.getByLabel('¿En qué estás trabajando?')).toHaveAttribute('name', 'problem');
    await expect(page.getByLabel('¿Cómo sería un resultado útil?')).toHaveAttribute(
      'name',
      'outcome'
    );
  });
});
