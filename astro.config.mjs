// @ts-check
import { defineConfig } from 'astro/config';

// TODO: replace with the real production domain before launch (needed for sitemap/canonical/og:url).
const SITE_URL = 'https://alexcuesta.dev';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
});
