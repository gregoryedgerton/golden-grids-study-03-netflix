// Captures of the study itself, against a running dev server or the deploy.
//   NODE_PATH=<a node_modules with playwright> node captures/study.cjs [base-url]
// study-<width>.png        full page, reduced motion (the strip), since a
//                          sticky dial cannot be captured in one full-page shot
// dial-<width>-d<depth>.png the dial stage at a given depth, motion on
// Prints the dial's readout and painted-tile count at each sampled depth.
const { chromium } = require('playwright');
const path = require('path');
const STEP = 0.5; // viewports per frame; keep in step with FilmDialBand.tsx

(async () => {
  const base = process.argv[2] || 'http://localhost:5177/';
  const browser = await chromium.launch({ channel: 'chrome' });
  for (const [w, h] of [[390, 844], [820, 1180], [1440, 900]]) {
    let ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    let page = await ctx.newPage();
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(__dirname, `study-${w}.png`), fullPage: true });
    await ctx.close();

    ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
    page = await ctx.newPage();
    await page.goto(base, { waitUntil: 'networkidle' });
    for (const depth of [0, 1, 5.5, 12, 20]) {
      const line = await page.evaluate(async ([depth, STEP]) => {
        const d = document.querySelector('.dial');
        const top = d.getBoundingClientRect().top + scrollY;
        scrollTo(0, top + depth * STEP * innerHeight);
        await new Promise(r => setTimeout(r, 500));
        const vis = [...d.querySelectorAll('.dial__tile')]
          .map((t, k) => ({ k, v: t.style.visibility, w: Math.round(t.getBoundingClientRect().width) }))
          .filter(t => t.v === 'visible').sort((a, b) => b.w - a.w);
        return `${d.querySelector('.dial__readout').textContent} | painted ${vis.length} | largest square ${vis[0] && vis[0].k} at ${vis[0] && vis[0].w}px`;
      }, [depth, STEP]);
      console.log(w, 'depth', depth, '|', line);
      await page.screenshot({ path: path.join(__dirname, `dial-${w}-d${String(depth).replace('.', '_')}.png`) });
    }
    await ctx.close();
  }
  await browser.close();
})();
