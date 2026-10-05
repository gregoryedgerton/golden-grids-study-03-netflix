# CLAUDE.md

Guidance for agents working in a Golden Grids layout study.

## What this repo is

Study 03, the hybrid: bands for browse, the dial for one title, on one page.
Five bands in `src/bands/`, stacked by `src/App.tsx`: `FeaturedBand`,
`TierOneBand` and `TierTwoBand` (both from `RankedBand.tsx`), `TitleBand`,
`FilmDialBand`. All content and the frame sequence live in `src/content.ts`.
The reference is the SIGNED-OUT netflix.com home page and a signed-out title
page; the signed-in browse page was never captured (`/browse` redirects to
login) and nothing may be asserted about it. Read `docs/program/PROGRAM.md`
first, then `docs/program/STUDY-BRIEF.md`, then `README.md` here, which holds
the inventory, the measured band table, and the asset spec.

Pass one is local only. No remote, no deploy, until Greg says.

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
  Grid outlines and band notes are off by default. The panel owns the
  viewport's top-right corner: it is fixed at
  `top: 12px; right: 12px` with `z-index: 2147483000` (`src/lib/tools.css`) —
  a collapsed tab, and a 260px-wide panel when open — and nothing the study
  draws may stack above it. A control the study puts in that corner is
  covered and cannot be clicked, however it is positioned. Put dialog and
  panel controls anywhere else; Study 02's album dialog uses a sticky bar at
  the top left, and an expanded cell's dismiss control sits at its head's
  left edge for the same reason.
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
- The dial: frames stay level (`toCssContentTransform`), are centre-cropped,
  and the film opens on the largest square (square k carries frame
  COUNT - 1 - k). `STEP` in `FilmDialBand.tsx` and in `captures/study.cjs`
  must agree. `TEXTURE_PX` in `src/content.ts` is the single source for tile
  size and frame dimension. The readout sits bottom LEFT.
- The Browser pane on Greg's machine reports `prefers-reduced-motion`, so it
  shows the strip. Verify the dial with `captures/study.cjs`, which forces
  motion on.
- The catalogue is real: Nosferatu (featured, the one title, the dial) and
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
- The register is Netflix's dark from measured tokens, declared once in
  `:root` in `src/styles.css`. Dark only. Rounded cards with 4px gutters,
  never grid lines. Do not add Netflix Sans or the wordmark.

Two geometry rules, verified against source, that every band relies on:

- Parity: with *n* = visible boxes (+1 for a placeholder), `right`/`left` are
  landscape only when *n* is even; `top`/`bottom` only when *n* is odd.
- Hero side: the largest box sits on the `placement` side turned *n − 2*
  quarter-turns in the spiral's direction (opposite at 4, one step at 3).

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
