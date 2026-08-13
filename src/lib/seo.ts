/**
 * Small SEO helpers shared by BaseLayout so meta-tag and JSON-LD markup is
 * defined once instead of duplicated per page.
 */

/**
 * Serializes a JSON-LD value for a `<script type="application/ld+json">`
 * tag rendered via `set:html`. Escapes `<` so a string value containing
 * `</script>` cannot break out of the tag — JSON.stringify alone does not
 * guard against that.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** Builds an absolute canonical URL from the configured site origin and the
 * current pathname, without a trailing slash (matches `trailingSlash:
 * 'never'` in astro.config.mjs), except for the root path itself. */
export function buildCanonicalUrl(site: URL | undefined, pathname: string): string {
  const origin = site ? site.origin : '';
  const trimmed = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return `${origin}${trimmed}`;
}

/** Builds an absolute URL for an asset (e.g. the OG image) from the
 * configured site origin. */
export function buildAbsoluteUrl(site: URL | undefined, path: string): string {
  const origin = site ? site.origin : '';
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}
