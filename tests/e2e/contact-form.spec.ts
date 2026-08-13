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

  test('shows a disabled "Sending context…" state while the request is in flight', async ({
    page,
  }) => {
    await page.goto('/services');

    // config.servicesForm.formspreeEndpoint is still the TODO_* placeholder,
    // which resolves to a same-origin path — real enough to exercise the
    // fetch, but its response needs to be delayed here so the transient
    // "sending" state is observable instead of racing a near-instant local
    // 404.
    await page.route('**/TODO_FORMSPREE_ENDPOINT', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.fulfill({ status: 500, body: 'error' });
    });

    await page.locator('#contact-form input[name="name"]').fill('Jordan Rivera');
    await page.locator('#contact-form input[name="email"]').fill('jordan@example.com');
    await page.locator('#contact-form textarea[name="problem"]').fill('Our webhook retries silently fail.');
    await page
      .locator('#contact-form textarea[name="outcome"]')
      .fill('A runbook for replaying a failed delivery.');

    const submit = page.locator('#contact-form-submit');
    const status = page.locator('#contact-form-status');

    await submit.click();
    await expect(submit).toBeDisabled();
    await expect(submit).toHaveText('Sending context…');

    await expect(status).toHaveAttribute('role', 'alert');
    await expect(status).toContainText('Something went wrong sending this');
    await expect(submit).toBeEnabled();
    await expect(submit).toHaveText('Send project context');
  });

  test('reaches the error state against the real placeholder endpoint', async ({ page }) => {
    await page.goto('/services');

    await page.locator('#contact-form input[name="name"]').fill('Jordan Rivera');
    await page.locator('#contact-form input[name="email"]').fill('jordan@example.com');
    await page.locator('#contact-form textarea[name="problem"]').fill('Our webhook retries silently fail.');
    await page
      .locator('#contact-form textarea[name="outcome"]')
      .fill('A runbook for replaying a failed delivery.');

    const submit = page.locator('#contact-form-submit');
    const status = page.locator('#contact-form-status');

    // No interception here: config.servicesForm.formspreeEndpoint is still
    // TODO_FORMSPREE_ENDPOINT, which the static server 404s on same-origin —
    // this proves the error path works end-to-end before a real endpoint
    // exists, without asserting on the (possibly too-fast-to-observe)
    // intermediate "sending" state.
    await submit.click();
    await expect(status).toHaveAttribute('role', 'alert');
    await expect(status).toContainText('Something went wrong sending this');
    await expect(submit).toBeEnabled();
  });

  test('labels are programmatically associated with their fields', async ({ page }) => {
    await page.goto('/services');

    await expect(page.getByLabel('Name')).toHaveAttribute('name', 'name');
    await expect(page.getByLabel('Work email')).toHaveAttribute('name', 'email');
    await expect(page.getByLabel('What are you working on?')).toHaveAttribute('name', 'problem');
    await expect(page.getByLabel('What would a useful outcome look like?')).toHaveAttribute(
      'name',
      'outcome'
    );
  });
});
