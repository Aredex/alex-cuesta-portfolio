import { describe, expect, it } from 'vitest';
import { resolveServicesContact } from '../../src/lib/contact-config';

describe('resolveServicesContact', () => {
  it('uses a direct email fallback when Formspree is not configured', () => {
    expect(resolveServicesContact('', 'mailto:develop@example.com')).toEqual({
      formEnabled: false,
      endpoint: undefined,
      fallbackHref: 'mailto:develop@example.com',
    });
  });

  it('enables the form only for a publishable HTTPS endpoint', () => {
    expect(
      resolveServicesContact('https://formspree.io/f/example', 'mailto:develop@example.com')
    ).toEqual({
      formEnabled: true,
      endpoint: 'https://formspree.io/f/example',
      fallbackHref: 'mailto:develop@example.com',
    });
  });

  it('rejects placeholders and non-HTTPS endpoints', () => {
    for (const endpoint of ['TODO_FORMSPREE_ENDPOINT', '/relative-endpoint', 'http://example.com']) {
      expect(resolveServicesContact(endpoint, 'mailto:develop@example.com').formEnabled).toBe(false);
    }
  });
});
