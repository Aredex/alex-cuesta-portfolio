export interface ServicesContactResolution {
  formEnabled: boolean;
  endpoint: string | undefined;
  fallbackHref: string;
}

function isPublishableFormEndpoint(value: string): boolean {
  if (!value || value.startsWith('TODO_')) return false;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'formspree.io' && url.pathname.startsWith('/f/');
  } catch {
    return false;
  }
}

/**
 * Keeps an unfinished Formspree setup out of the public build. Visitors get
 * a working email path until a real HTTPS Formspree endpoint is configured.
 */
export function resolveServicesContact(
  formspreeEndpoint: string,
  fallbackHref: string
): ServicesContactResolution {
  const formEnabled = isPublishableFormEndpoint(formspreeEndpoint);

  return {
    formEnabled,
    endpoint: formEnabled ? formspreeEndpoint : undefined,
    fallbackHref,
  };
}
