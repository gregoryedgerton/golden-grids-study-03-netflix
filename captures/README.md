# Reference captures

Full-page screenshots of the reference page, taken before the build. They are
the left half of every side-by-side and the evidence for the structural
argument, so they live in the repo.

Capture all three, every time, in the same content state:

| File                  | Width  | Why                                                                      |
| --------------------- | ------ | ------------------------------------------------------------------------ |
| `reference-{home,title}-390.png`   | 390px  | Where the original's grid collapses to one column and order carries it.  |
| `reference-{home,title}-820.png`   | 820px  | The awkward middle — where twelve-column grids are weakest.              |
| `reference-{home,title}-1440.png`  | 1440px | The width the grid was designed for.                                     |

Full-page captures, not viewport crops. After the study is built, capture the
rebuild at the same three widths as `study-390.png`, `study-820.png`, and
`study-1440.png`.

These files are commentary on a named site. They are not redistributed as
assets of the study and nothing from them is copied into the build.

## Study 03

Two reference pages, both signed out: `reference-home-*` (netflix.com) and
`reference-title-*` (netflix.com/title/80240715), taken with `capture.cjs`,
which declines cookie banners and writes a `.json` of headings and measured
tile boxes beside each screenshot. `study.cjs` captures the rebuild:
`study-*` full page under reduced motion, `dial-*-d<depth>` with motion on.
Both need a `node_modules` with playwright on `NODE_PATH`.
