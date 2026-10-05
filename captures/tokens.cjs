// Measured visual tokens of the reference, for matching the study's register.
//   NODE_PATH=<a node_modules with playwright> node captures/tokens.cjs
// Writes captures/reference-tokens.json. Values only — no assets are fetched.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const out = {};
  for (const [name, url] of [['home', 'https://www.netflix.com/'], ['title', 'https://www.netflix.com/title/80240715']]) {
    const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' })).newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(5000);
    out[name] = await page.evaluate(() => {
      const pick = (e) => { if (!e) return null; const c = getComputedStyle(e); const r = e.getBoundingClientRect();
        return { text: (e.innerText || '').trim().slice(0, 30), w: Math.round(r.width), h: Math.round(r.height), color: c.color, background: c.backgroundColor, backgroundImage: c.backgroundImage.slice(0, 120), font: `${c.fontWeight} ${c.fontSize}/${c.lineHeight} ${c.fontFamily.slice(0, 60)}`, radius: c.borderRadius, border: c.border, padding: c.padding, letterSpacing: c.letterSpacing }; };
      const byText = (sel, t) => [...document.querySelectorAll(sel)].find(e => e.offsetParent && (e.innerText || '').trim().startsWith(t));
      const tile = [...document.querySelectorAll('li')].find(e => { const r = e.getBoundingClientRect(); return r.width > 80 && r.height > 80; });
      const card = (h) => { let e = byText('h2,h3', h); for (let i = 0; e && i < 4; i++) { e = e.parentElement; if (e && getComputedStyle(e).borderRadius !== '0px') return e; } return null; };
      return {
        body: pick(document.body),
        h1: pick([...document.querySelectorAll('h1')].find(e => e.getBoundingClientRect().width > 10)),
        rowHeading: pick(byText('h2', 'Trending Now')),
        sectionHeading: pick(byText('h2', 'More Details') || byText('h2', 'More Reasons')),
        cta: pick(byText('button,a', 'Get Started') || byText('button,a', 'Join Now')),
        signIn: pick(byText('a,button', 'Sign In')),
        tile: pick(tile), tileImg: pick(tile && tile.querySelector('img')), tileButton: pick(tile && tile.querySelector('button,a')),
        rank: pick(tile && [...tile.querySelectorAll('span,div')].find(e => /^\d+$/.test((e.innerText || '').trim()) && !e.children.length)),
        detailsCard: pick(card('ROMA')), moreCard: pick(card('Enjoy on your TV')),
        cardText: pick([...document.querySelectorAll('p,span,div')].find(e => !e.children.length && (e.innerText || '').length > 60)),
      };
    });
  }
  fs.writeFileSync(path.join(__dirname, 'reference-tokens.json'), JSON.stringify(out, null, 1));
  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})();
