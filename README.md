# Layout study 03 — Netflix

**Live:** https://gregoryedgerton.github.io/golden-grids-study-03-netflix/

An unaffiliated layout study. It takes the structure of Netflix's signed-out
home and title pages, a ranked row of identical tiles broken up by the
service's own modules, and rebuilds it as stacked golden grids for
GIFcommit, a fictional service streaming German films of the 1920s (the
brand is the author's own). The imagery is stills
and clips from films in the public domain in the United States; the copy is
original. Nothing from Netflix is reproduced. Built with
[Golden Grids](https://github.com/gregoryedgerton/golden-grids) from the
[study template](https://github.com/gregoryedgerton/golden-grids-study-template).

## Reference

The signed-out netflix.com home page and a signed-out title page
(https://www.netflix.com/title/80240715), captured 2026-10-05 at 390 / 820 /
1440; `/browse` redirects to login and was not captured. Captures, measured
tile boxes and tokens are in [`captures/`](captures/).

| Width | Home | Title | Rebuild |
| --- | --- | --- | --- |
| 390px | ![](captures/reference-home-390.png) | ![](captures/reference-title-390.png) | ![](captures/study-390.png) |
| 820px | ![](captures/reference-home-820.png) | ![](captures/reference-title-820.png) | ![](captures/study-820.png) |
| 1440px | ![](captures/reference-home-1440.png) | ![](captures/reference-title-1440.png) | ![](captures/study-1440.png) |

What the capture shows: the home page's one content row, *Trending Now*,
numbers ten tiles 1 to 10 and draws them all at one size (224×268 at 1440,
132×166 at both 820 and 390); between its rows the page puts a plan banner,
four reasons to join, a FAQ and an email call to action. The title page is a
billboard, a details card, three detail cards, two rows and a price table.

## Approach

The reference numbers its trending titles one to ten and draws them at one size, between banners, reasons to join, plans and questions. The study sets the ten in two grids in which a title's rank sets its square, keeps the reference's other modules in their places, and opens one film into its scenes in three further bands.

## The page

Fourteen bands in the order below. Measured grid sizes are width×height at
390 / 820 / 1440.

| Band | Range · placement · clockwise | Measured | What it holds |
| --- | --- | --- | --- |
| Featured | 1–1 / 1–3 / 1–4 · right, bottom, right · cw | 366² / 771×514 / 1360×816 | *Berlin: Symphony of a Great City* (1927): clip and player, account, year, genre |
| One to five | 1–5 · right / bottom / bottom · cw | 366×586 / 771×482 / 1360×850 | Ranks 1–5; the numeral and the square agree; a poster opens its film |
| Film card | 1–4 or 1–5, one orientation per rank | varies | Opened beneath its row: clip and player, synopsis, year and director, cast, the print |
| Plan banner | 1–1 / 1–2 · right | — | The service's plan with ads |
| Six to ten | 1–5 · bottom · ccw, capped 61.8% / 38.2% | 366×229 / 476×298 / 520×325 | Ranks 6–10, mirrored, narrower |
| More reasons to join | 1–3 / 1–4 · bottom / left · cw | — | Four reasons |
| Nosferatu | 1–4 · left · ccw, capped 60rem | 366×220 / 771×462 / 960×576 | Clip and the whole film, synopsis, details, cast; each opens |
| Act one | 1–5 / 1–7 · bottom · cw | — | Seven frames, the coach leading |
| A plan to suit your needs | 1–3 · bottom · cw | — | Three plans, the one most chosen largest |
| Act two | 1–5 / 1–7 · top · ccw | — | Seven frames, the coffin leading |
| Act three | 1–5 / 1–7 · bottom · ccw | — | Seven frames, the window leading |
| FAQ | list | — | Five questions, `details` elements, not a grid |
| Start watching | 1–1 / 1–2 · left | — | The call to action; the form sends nothing |

The ten film cards between them use all eight placement × direction pairs.
At 390 every card has four squares, portrait where the placement is top or
bottom; the acts show their five weightiest frames.

## The films

Twelve films of Weimar cinema, 1920–1929, all public domain in the United
States, where the study is hosted: *Berlin* featured, *Nosferatu* opened and
in three acts, and the ranked ten (Metropolis, Caligari, The Golem, Faust,
The Last Laugh, Dr. Mabuse the Gambler, Pandora's Box, The Adventures of
Prince Achmed, Waxworks, Destiny). Six appear still protected in Germany;
Greg decided (2026-10-05) that all stay on the US basis, with no further
checking. The ranking is the study's own. Every still and clip is cut from a
print on the Internet Archive or Wikimedia Commons by
[`captures/stills.sh`](captures/stills.sh) and
[`captures/clips.sh`](captures/clips.sh); [`ASSETS.md`](ASSETS.md) is the
provenance, the rights table, and which prints are known to be unrestored.
The synopses and the account of *Nosferatu* are the study's words and are
drafts.

## Register

Jost, a revival of Paul Renner's Futura (1927), in the New Typography
manner these films were advertised in: a lowercase masthead, heavy tight
headlines, spaced red labels, red rules, red and black. Netflix Sans is the
reference's own and is not used; its measured dark tokens are
(`captures/reference-tokens.json`): black ground, 70% white secondary text,
10% white cards at 16px, tiles at 8px, the red call to action. Dark is the
default; a light scheme follows the device, with the dark tokens turned
over.

## How it works

- **Type fits its square.** Copy slots are cards: a label, a line fitted to
  the room the card leaves it ([`src/lib/fit.tsx`](src/lib/fit.tsx)), body
  copy, a foot. Nothing is cut: labels wrap, body copy is removed whole in
  short cards. Display type waits for Jost so it does not flash.
- **Everything opens in flow.** Cards expand to fuller passages; a poster
  opens its film's band beneath the row and returns focus on close
  ([`src/lib/expand.tsx`](src/lib/expand.tsx),
  [`src/bands/FilmCardBand.tsx`](src/bands/FilmCardBand.tsx)).
- **Clips, and the whole film.** Fifteen ten-second clips play silently in
  their squares while on screen, fetched only then; *Play the film* swaps in
  the Internet Archive's player or the Commons file, on request
  ([`src/lib/clip.tsx`](src/lib/clip.tsx)). Under reduced motion every clip
  is its still.
- **Checks.** `captures/scan.cjs` is clean in Chrome and WebKit at 390, 820
  and 1440 in both schemes with every card open: nothing overflows, no
  fitted line under 12px, no axe-core violations.

## Notes for review

Observations for whoever reviews this study, recorded without a verdict. Whether the layout suits the page is assessed separately, after every study has been reviewed.

- **Two grids for ten ranks.** Rank 6 leads the second grid and is drawn larger than ranks 4 and 5 in the first.
- **Still resolution.** The stills are 240 to 576 pixels wide; rank 1 draws a 480px still at 850px.
- **Print provenance.** Seven of the ten ranked stills come from prints of unknown or restored origin; `ASSETS.md` says which.
- **Scene frames.** Each was moved by up to two minutes from an even sample, to avoid intertitles.
- **No dial.** An earlier version scrubbed one film on a spiral dial; it was replaced by the three act bands on 2026-10-06.

## Disclosure

Every page says what it is in three places, all read from
[`src/study.json`](src/study.json): its title and description, a sticky notice
at the top, and a disclosure at the very end listing the pages reviewed, what
is real, what is invented or changed, and where each kind of asset came from.

## Study tools

A floating panel (top right) toggles grid outlines (`g`), band notes (`n`,
which carry each band's range and placement) and reduced motion (`m`).

## Running and deploying

```bash
npm install
npm run dev
```

`npm run build` type-checks and builds to `dist/`; pushing to `main`
deploys to GitHub Pages. The library is consumed from npm at its published
version.
