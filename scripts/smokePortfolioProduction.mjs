import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const MAX_WORKERS = 3;
const VIEWPORT = { width: 390, height: 844 };
const OUTPUT = process.env.SMOKE_OUTPUT ?? path.resolve('test-results/production-smoke.json');

function catalogSlugs(source) {
  const block = source.match(/LAB_PROJECT_SLUGS\s*=\s*\[(.*?)\]\s*as const/s)?.[1];
  if (!block) throw new Error('LAB_PROJECT_SLUGS not found');
  const slugs = [...block.matchAll(/'([a-z0-9-]+)'/g)].map((match) => match[1]);
  if (slugs.length !== 29 || new Set(slugs).size !== 29) {
    throw new Error(`Expected 29 unique slugs, received ${slugs.length}/${new Set(slugs).size}`);
  }
  return slugs;
}

async function checkDemo(browser, slug) {
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();
  const pageErrors = [];
  const consoleErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });

  try {
    const url = `https://${slug}.alexcuesta.dev/`;
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    const heading = page.locator('h1').first();
    await heading.waitFor({ state: 'visible', timeout: 15_000 });
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    const result = {
      slug,
      url: page.url(),
      status: response?.status() ?? 0,
      title: await page.title(),
      h1: (await heading.textContent())?.trim() ?? '',
      dimensions,
      pageErrors,
      consoleErrors,
    };
    return {
      ...result,
      passed:
        result.status === 200 &&
        Boolean(result.title) &&
        Boolean(result.h1) &&
        dimensions.scrollWidth <= dimensions.clientWidth &&
        pageErrors.length === 0 &&
        consoleErrors.length === 0,
    };
  } catch (error) {
    return {
      slug,
      url: page.url(),
      status: 0,
      title: '',
      h1: '',
      dimensions: null,
      pageErrors,
      consoleErrors,
      error: error instanceof Error ? error.message : String(error),
      passed: false,
    };
  } finally {
    await context.close();
  }
}

async function pooled(items, concurrency, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => run()));
  return results;
}

const source = await readFile(new URL('../src/data/lab.ts', import.meta.url), 'utf8');
const slugs = catalogSlugs(source);
const browser = await chromium.launch({ headless: true });
let demos;
try {
  demos = await pooled(slugs, MAX_WORKERS, (slug) => checkDemo(browser, slug));
} finally {
  await browser.close();
}

const result = {
  generatedAt: new Date().toISOString(),
  maxWorkers: MAX_WORKERS,
  viewport: VIEWPORT,
  catalogCount: slugs.length,
  passedCount: demos.filter((demo) => demo.passed).length,
  allPassed: demos.every((demo) => demo.passed),
  demos,
};
await mkdir(path.dirname(OUTPUT), { recursive: true });
await writeFile(OUTPUT, `${JSON.stringify(result, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      catalogCount: result.catalogCount,
      passedCount: result.passedCount,
      failures: demos.filter((demo) => !demo.passed),
      allPassed: result.allPassed,
      output: OUTPUT,
    },
    null,
    2,
  ),
);
if (!result.allPassed) process.exitCode = 1;
