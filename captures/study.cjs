// Captures of the study itself, against a running dev server or the deploy.
//   NODE_PATH=<a node_modules with playwright> node captures/study.cjs [base-url]
// study-<width>.png: full page at the three widths. Nothing animates, so one
// capture per width is the whole page.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const base = process.argv[2] || 'http://localhost:5177/';
  const browser = await chromium.launch({ channel: 'chrome' });
  for (const [w, h] of [[390, 844], [820, 1180], [1440, 900]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(__dirname, `study-${w}.png`), fullPage: true });
    await ctx.close();
  }
  await browser.close();
})();
