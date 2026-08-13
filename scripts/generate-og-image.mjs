#!/usr/bin/env node
/**
 * One-off script to render the site's 1200×630 social preview image
 * (`public/og-image.png`) using Playwright, which is already a devDependency
 * for the E2E suite — no new runtime dependency (no satori/@vercel/og).
 *
 * Renders a local HTML string styled with the site's real design tokens
 * (see src/styles/tokens.css) and self-hosted Geist fonts, then screenshots
 * it at the exact OG image size. Re-run manually whenever the hero copy or
 * palette changes:
 *
 *   node scripts/generate-og-image.mjs
 */
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const outputPath = path.join(rootDir, 'public', 'og-image.png');

const WIDTH = 1200;
const HEIGHT = 630;

const sansFontPath = path.join(
  rootDir,
  'node_modules/@fontsource/geist-sans/files/geist-sans-latin-600-normal.woff2'
);
const sansRegularFontPath = path.join(
  rootDir,
  'node_modules/@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff2'
);
const monoFontPath = path.join(
  rootDir,
  'node_modules/@fontsource/geist-mono/files/geist-mono-latin-500-normal.woff2'
);

function toDataUri(filePath) {
  const buffer = readFileSync(filePath);
  return `data:font/woff2;base64,${buffer.toString('base64')}`;
}

const sansBold = toDataUri(sansFontPath);
const sansRegular = toDataUri(sansRegularFontPath);
const mono = toDataUri(monoFontPath);

// Colors match :root in src/styles/tokens.css (light theme).
const html = /* html */ `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face {
        font-family: 'Geist Sans';
        src: url('${sansBold}') format('woff2');
        font-weight: 600;
      }
      @font-face {
        font-family: 'Geist Sans';
        src: url('${sansRegular}') format('woff2');
        font-weight: 400;
      }
      @font-face {
        font-family: 'Geist Mono';
        src: url('${mono}') format('woff2');
        font-weight: 500;
      }

      * { margin: 0; padding: 0; box-sizing: border-box; }

      html, body {
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
        background: #F7F8F5;
        font-family: 'Geist Sans', Arial, sans-serif;
      }

      .card {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 72px;
        position: relative;
      }

      .eyebrow {
        font-family: 'Geist Mono', monospace;
        font-size: 20px;
        font-weight: 500;
        letter-spacing: 0.08em;
        color: #58635D;
        text-transform: uppercase;
      }

      .name {
        font-size: 84px;
        font-weight: 600;
        letter-spacing: -0.03em;
        color: #111713;
        line-height: 1.05;
        margin-top: 28px;
      }

      .role {
        font-size: 34px;
        font-weight: 400;
        color: #2257D6;
        margin-top: 20px;
      }

      .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #D8DEDA;
        padding-top: 32px;
      }

      .tagline {
        font-family: 'Geist Mono', monospace;
        font-size: 18px;
        color: #58635D;
      }

      .domain {
        font-family: 'Geist Mono', monospace;
        font-size: 18px;
        color: #111713;
        font-weight: 500;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div>
        <p class="eyebrow">Desarrollo full-stack freelance</p>
        <h1 class="name">Alex&nbsp;Cuesta</h1>
        <p class="role">Sevilla y su área · Node.js · TypeScript · React</p>
      </div>
      <div class="footer">
        <p class="tagline">Decisiones claras. Software fiable. Trabajo verificable.</p>
        <p class="domain">alexcuesta.dev</p>
      </div>
    </div>
  </body>
</html>
`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
await page.setContent(html, { waitUntil: 'networkidle' });
const buffer = await page.screenshot({ type: 'png' });
writeFileSync(outputPath, buffer);
await browser.close();

console.log(`OG image written to ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
