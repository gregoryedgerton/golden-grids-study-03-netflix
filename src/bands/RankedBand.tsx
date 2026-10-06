import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import type { PlacementValue } from "@gifcommit/golden-grids";
import { useViewport, pick } from "../lib/viewport";
import { RANKED } from "../content";
import { Band } from "./Band";
import { Clip } from "../lib/clip";

/**
 * Bands 2 and 3 — the ranked row, as two tiers.
 *
 * The reference prints a numeral from 1 to 10 on ten tiles of one size
 * (224×268 at 1440; 132×166 at 820 AND at 390). The row states a ranking and
 * the grid declines to show it. Here rank is size.
 *
 * One 1–10 grid cannot do it: the tenth square is 1/55 of the first, which
 * is not a poster. So the ten are two bands of five. Each is its own
 * GoldenGrid called directly; the bands stack, they do not nest.
 *
 * Tier one (ranks 1–5): full width. 1–5 `bottom` is 8:5 with the hero on the
 * right. At 390 nothing is dropped — a ranking with a hole in it is worse
 * than a tall band — so the same five turn to `right`, which is 5:8
 * portrait with the hero on top. Lever: rotate placement only.
 *
 * Tier two (ranks 6–10): the same five-box grid mirrored (counter-clockwise,
 * hero left) and made smaller by capping the band's WIDTH, never by
 * re-ranging: 38.2% at 1440, 61.8% at 820, full width at 390 where tier one
 * has already gone portrait and is the taller of the two. Lever: cap width.
 *
 * What this does not solve, on purpose left visible: the descent restarts at
 * the seam. Rank 6 leads its band and is larger than ranks 4 and 5 above it.
 * The README's honest-risk section says so.
 */
export interface Selection {
  selected: number | null;
  onSelect: (rank: number) => void;
}

function Ranked({
  id, title, lesson, start, placement, clockwise, cap, heroSide, selection,
}: {
  id: string;
  title: string;
  lesson: string;
  start: number;
  placement: PlacementValue;
  clockwise: boolean;
  cap?: string;
  heroSide: string;
  selection: Selection;
}) {
  // The two unit squares are the same size, and the spiral lays the later
  // child ahead of the earlier one in reading order. Handing them over
  // swapped puts the lower numeral first, at every width and in both bands.
  const [a, b, c, d, e] = RANKED.slice(start, start + 5);
  const five = [a, b, c, e, d];
  return (
    <Band
      id={id}
      title={title}
      lesson={lesson}
      note={`from=1 to=5 · placement="${placement}" · clockwise=${clockwise} · hero ${heroSide} · ranks ${start + 1}–${start + 5}`}
      cap={cap}
    >
      <GoldenGrid from={1} to={5} placement={placement} clockwise={clockwise}>
        {five.map((t) => {
          const open = selection.selected === t.rank;
          return (
            <GoldenBox key={t.rank}>
              {/* The poster is the control: choosing it opens the film's own
                  band beneath the rows. */}
              <div className={`media media--inset${open ? " media--chosen" : ""}`}>
                <Clip src={t.clip} poster={t.art.src} alt={`Still from ${t.title}`} objectPosition={t.art.subject} />
                <button
                  id={`poster-${t.rank}`}
                  type="button"
                  className="media__open"
                  aria-expanded={open}
                  aria-controls="film-card"
                  onClick={() => selection.onSelect(t.rank)}
                >
                  <span className="visually-hidden">{open ? `Close ${t.title}` : `Open ${t.title}, ranked ${t.rank}`}</span>
                </button>
                <span className="rank" aria-hidden="true">{t.rank}</span>
              </div>
            </GoldenBox>
          );
        })}
      </GoldenGrid>
    </Band>
  );
}

export function TierOneBand({ selection }: { selection: Selection }) {
  const viewport = useViewport();
  const placement = pick<PlacementValue>(viewport, { mobile: "right", tablet: "bottom", desktop: "bottom" });
  return (
    <Ranked
      id="tier-one"
      title="One to five"
      lesson="Lang's Metropolis, the most expensive film the UFA studio had made; Wiene's Caligari, the painted nightmare that gave the movement its name abroad; Wegener's Golem, the clay man of the Prague ghetto; and two from Murnau, the Faust legend staged in smoke and the wordless fall of a hotel doorman in The Last Laugh. Choose a poster to open the film."
      start={0}
      placement={placement}
      clockwise
      heroSide={viewport === "mobile" ? "top, 5:8 portrait" : "right, 8:5"}
      selection={selection}
    />
  );
}

export function TierTwoBand({ selection }: { selection: Selection }) {
  const viewport = useViewport();
  const cap = pick<string | undefined>(viewport, { mobile: undefined, tablet: "61.8%", desktop: "38.2%" });
  return (
    <Ranked
      id="tier-two"
      title="Six to ten"
      lesson="Lang's four-hour portrait of a criminal hypnotist, Dr. Mabuse; Pabst's Pandora's Box, with the American Louise Brooks as Lulu; Lotte Reiniger's Prince Achmed, the oldest surviving animated feature, cut from paper; Leni's Waxworks, three stories in three styles; and Lang's Destiny, in which a woman bargains with Death three times."
      start={5}
      placement="bottom"
      clockwise={false}
      cap={cap}
      heroSide="left, 8:5"
      selection={selection}
    />
  );
}
