# CLAUDE.md

Guidance for agents working in a Golden Grids layout study.

## What this repo is

Study 03: Netflix's ranked rows as stacked golden grids, broken up by a fictional service's own modules, with one film opened in three act bands. The dial was REMOVED on 2026-10-06 at Greg's direction; this is a band-only study now.
Five bands in `src/bands/`, stacked by `src/App.tsx`: `FeaturedBand`,
`TierOneBand` and `TierTwoBand` (both from `RankedBand.tsx`), `TitleBand`,
`ScenesBand` (three acts), and the service's marketing bands. All content
lives in `src/content.ts`.
The reference is the SIGNED-OUT netflix.com home page and a signed-out title
page; the signed-in browse page was never captured (`/browse` redirects to
login) and nothing may be asserted about it. Read `docs/program/PROGRAM.md`
first, then `docs/program/STUDY-BRIEF.md`, then `README.md` here, which holds
the inventory, the measured band table, and the asset spec.

Live at https://gregoryedgerton.github.io/golden-grids-study-03-netflix/;
pushing to `main` deploys.

## Rules that are not negotiable

- Name the reference page. Substitute every asset. Nothing from the reference
  site — photography, wordmarks, copy — goes into the repo or the deploy.
- The library is consumed from npm at its published version. Never link a
  local checkout. A bug found here is an issue on the library, not a patch.
- Bands stack; they never nest. No wrapper component over `GoldenGrid` — the
  study exists to show the real API being used directly.
- Breakpoints live only in `src/lib/viewport.ts`. Three states, never two.
- Study tools (`src/lib/tools.tsx`) are the only floating UI. Controls go
  there, on their own stacking layer; the study's stylesheet never styles them.
  Grid outlines and band notes are off by default. The panel is HIDDEN by
  default since 2026-10-07 (`?tools=1` shows it; the g/n/m keys still work):
  it used to be fixed at the viewport's top-right corner at
  `z-index: 2147483000`, which is where a drill-down's Close belongs. Until
  it has a better trigger, nothing is drawn in that corner over an open
  cell, and an expanded cell's Close sits at the top right of the cell.
- Expansion (`src/lib/expand.tsx`) is how a slot shows content it cannot hold:
  the band grows, nothing scrolls inside a box, and the covered content goes
  inert. Every photograph should be expandable — points of interaction are
  encouraged, and the picture is the affordance.
- Media fills a slot with `object-fit: cover`; per-image `object-position` is
  the escape hatch. Never reshape a band to suit an image.
- Pass one ends with the asset spec in `README.md` filled in. Do not invent
  placeholder content and call the study done.
- No CSS framework, no design system, no routing, no state library, no tests.

## This study's own rules

- Ten ranks are two bands of five, never one 1–10 grid and never a nested
  grid. The seam between them is not monotone (rank 6 is larger than 4 and
  5) and the README says so; do not hide it by shrinking the tail.
- Tier two is made smaller by capping the band's WIDTH, never by re-ranging.
- The two unit squares are handed to the grid swapped so the numerals read
  in order. Keep `[a, b, c, e, d]` in `RankedBand.tsx`.
- No ranked title is dropped at 390. The band turns portrait instead.
- Flat content stays flat: the details are a `<dl>`, the reduced-motion
  frames are a plain CSS grid strip, and You Might Also Like, the plans and
  the FAQ are not rebuilt.
- The 21 Nosferatu frames are three act bands (`ScenesBand.tsx`), ordered
  by weight within an act, five of seven at 390. There is NO dial.
- The catalogue is real: Nosferatu (the opened title and its three acts), Berlin: Symphony of a Great City (featured) and
  ten Weimar-era German films in the ranked row. Every image is to be a STILL
  from its film, never a poster. `ASSETS.md` is the provenance and the
  rights table; keep it accurate. Greg decided 2026-10-05 that all ten
  ranked films stay on a US-public-domain basis, that stills from prints of
  unknown or restored origin are accepted, and that no further rights
  checking is wanted. Do not reopen it; do keep the German status stated.
- `captures/stills.sh` cuts all 33 images and is the record of every source
  URL and timecode. Its frame list and `FRAME_SECONDS` in `src/content.ts`
  must agree. Never upscale a still; `TEXTURE_PX` is 480 because the
  Nosferatu print is 640x480.
- The ranking is invented and the README says so. Nosferatu stays out of
  the ranked ten.
- The signed-in browse page is excluded by Greg's decision. Do not argue
  about it anywhere.
- Copy slots are `Fact` cards from `src/lib/boxes.tsx` with type fitted by
  `src/lib/fit.tsx` (ported from Study 04). `.box` is absolutely positioned
  inside its GoldenBox with a 4px gutter; `.box__fit` is `flex: 1 1 0` so
  the fit has a definite box to measure against in WebKit. Light scheme by
  device preference; dark stays the default. Formula-like lines use
  `fit--num` and break only at their own newlines.
- Clips (`public/clips`, `captures/clips.sh`) play in the squares via
  `src/lib/clip.tsx`: silent, looping, in-view only, `preload="none"`, and
  replaced by the still under reduced motion. `Player` swaps in the Internet
  Archive embed (or the Commons file for Nosferatu) only on request. Keep
  clips at 480px square and under ~700 KB.
- Marketing copy (banner, reasons, plans, FAQ, CTA) is for the fictional
  service GIFcommit, plain and straight, never cheeky; the form sends nothing.
- The featured film is Berlin: Symphony of a Great City; Nosferatu is the
  opened title and appears once before its acts.
- Page copy is about the FILMS, never about the grid: band titles and
  lessons describe Weimar cinema; grid geometry goes in `note` and README.
- The type is Jost (Futura revival), German New Typography register: red
  rules, red capital labels, lowercase masthead. Display type is gated on
  the font (`html[data-fonts]`), set in App.tsx.
- Choosing a ranked poster opens `FilmCardBand` beneath the rows, a NEW band
  (never a grid in a grid), one orientation per rank; at 390 four squares.
  Selection state lives in App.tsx.
- The register is Netflix's dark from measured tokens, declared once in
  `:root` in `src/styles.css`. Dark only. Rounded cards with 4px gutters,
  never grid lines. Do not add Netflix Sans or the wordmark.

Two geometry rules, verified against source, that every band relies on:

- Parity: with *n* = visible boxes (+1 for a placeholder), `right`/`left` are
  landscape only when *n* is even; `top`/`bottom` only when *n* is odd.
- Hero side: the largest box sits on the `placement` side turned *n − 2*
  quarter-turns in the spiral's direction (opposite at 4, one step at 3).

## Disclosure and neutrality

- **Every page says it is a study, in three places**: its metadata, a sticky
  banner at the top, and a disclosure that is the last element on the page.
  All three read `src/study.json`. `study.meta.ts` writes each entry's title
  (`{Page} · {Reference} · Golden Grids layout study {NN}`), description and
  favicon link, so the HTML entries carry none; `StudyBanner` and
  `StudyDisclosure` (`src/lib/study.tsx`, `study.css`) draw the other two.
  The banner's sentence and the meta description are the same sentence. Do
  not restyle them from the study's stylesheet, do not hide or shorten them,
  and do not put anything after the disclosure.
- **Keep `src/study.json` true.** When pages, sources, assets or dates change,
  change it in the same commit: pages reviewed and when, how they were read,
  what is real, what is invented or changed, each asset's source and licence,
  and `updated`. Say what is not known (an unknown licence, a figure checked
  only at second hand). A page's own credit list goes to `StudyDisclosure` as
  children.
- **Anything that sticks to the top offsets by `--study-banner-h`**, which the
  banner sets: an opened cell's head, a strip, a rail, a stage.
- **A study records; it does not judge.** Do not write, on the page or in the
  README, that Golden Grids suits or does not suit this content, that the
  reference is worse, or that the study succeeded or failed. No "claim", no
  "what did not", no "honest failure". The README has "Approach" (describe both
  arrangements) and "Notes for review" (plain observations for the people who
  will review it). The assessment is made once, after all studies have been
  reviewed by people. (Greg, 2026-10-09.)
- **Favicon**: `public/favicon.svg`, a 32-unit tile with 6-unit corners and one
  letter in the study's colours.

## API facts, verified against 5.0.0 source

- `GoldenGrid` props: `from` (1), `to` (4), `color`, `outline`, `clockwise`
  (true), `placement` (`"right"` | `"bottom"` | `"left"` | `"top"`), `children`.
- `GoldenBox` children map largest slot → smallest. Extra children are ignored.
- When `from > 1`, the skipped positions collapse into one placeholder slot,
  rendered first in the DOM and filled by the **last** `GoldenBox` child.
- Structural CSS is auto-injected. `GoldenBox` renders a 100%×100%
  `position: relative` div and nothing else; it accepts `className` and
  `style`. All visual styling is ours.
- Only direct `GoldenBox` children count; a wrapper component or fragment is
  dropped silently. `from={2}` skips position 1 alone:
  a 1×1 placeholder, rendered first, filled by the last child, raw base colour.
  Same rectangles as `from={1}`, different child mapping and colours. `from === to === 1`
  is `single`: one box, later children ignored.
- DOM order is placeholder first, then slots smallest to largest: the hero is
  the last element.
- The dial (`FilmDialBand.tsx`) uses `spiralCamera`, `toCssTileTransform`,
  `spiralWindow`, `tileOnScreen`, `toCssContentTransform`, `trailToRotateDeg`
  directly, per `docs/spiral-dial.md` in the library repo.

## The Close

Every drill-down has one plain way out: a labelled Close at the top right of
the opened cell, and Escape. The Close is the study's SECONDARY CTA:
`.cell__close` (and, in Study 02, the album dialog's `.album__back`) reads the
`--cta2-*` tokens from `src/lib/expand.css`, and this study declares them once,
at the end of its stylesheet, from its own secondary button, so the Close
always looks like the study's other secondary controls. The study tools panel
is hidden by default (`?tools=1` shows it) so nothing covers that corner.
(Greg, 2026-10-08.)

## Commands

```bash
npm install
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build → dist/
npm run preview
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/pages.yml`.
Base path derives from `GITHUB_REPOSITORY`; do not hard-code it.

## Sandbox constraints

The library README links this repo as its "try it without installing" path,
opened in StackBlitz at `https://stackblitz.com/~/github.com/gregoryedgerton/golden-grids-study-template`.

- **Vite stays on 7.x.** Vite 8 depends on rolldown, whose WebContainer
  binding is a wasm download fetched at first run under an experimental WASI
  runtime. It made the sandbox slow and fragile. Do not bump to 8 without
  loading the StackBlitz link afterwards and watching it reach `VITE ready`.
- `.stackblitzrc` pins install and start so the importer does not guess.
- Do not append `?file=` to the `~/github.com` link; it made the IDE fail to
  start in testing. The classic `/github/` importer accepts `?file=` but waits
  on a WebSocket and can stall at "Cloning repo from GitHub".
