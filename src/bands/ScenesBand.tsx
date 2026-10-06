import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import type { PlacementValue } from "@gifcommit/golden-grids";
import { useViewport, pick } from "../lib/viewport";
import { useExpandGroup, ExpandedCell, ExpandableMedia, PhotoView } from "../lib/expand";
import { FILM, FRAMES, clip } from "../content";
import { Clip } from "../lib/clip";
import { Band } from "./Band";

/**
 * Nosferatu in three acts, seven frames each. Within an act the frames are
 * ordered by weight, the scene that carries the act first, so the band
 * reads as the act's argument rather than its clock; the timecode on each
 * frame keeps the order of events. Every frame opens to the still, large,
 * with its note. At 390 each act shows its five weightiest frames.
 */
const ACTS: { title: string; lesson: string; order: number[]; placement: PlacementValue; clockwise: boolean }[] = [
  {
    title: "Act one · Wisborg to the castle",
    lesson: "Hutter is sent east by his employer Knock to sell a house to a count no one will speak of. The villagers stop him at the pass; a coach without a driver carries him the rest of the way, and at midnight a clock with a skeleton on it strikes.",
    order: [5, 2, 6, 4, 7, 3, 1],
    placement: "bottom", clockwise: true,
  },
  {
    title: "Act two · The castle and the sea",
    lesson: "The count signs for the house across the square from Hutter's own. Hutter finds him by day in a coffin in the crypt, escapes down the river on a raft, and Orlok follows by sea with a hold of earth-filled boxes; the crew of the Empusa die one by one.",
    order: [9, 8, 14, 12, 13, 11, 10],
    placement: "top", clockwise: false,
  },
  {
    title: "Act three · Plague and dawn",
    lesson: "The ship drifts into harbour with no one alive. Plague is declared, and the town marks its doors. Ellen reads that only a woman pure in heart can hold the vampire until the cock crows, and opens her window.",
    order: [20, 21, 15, 17, 19, 16, 18],
    placement: "bottom", clockwise: false,
  },
];

export function ScenesBand({ act }: { act: 0 | 1 | 2 }) {
  return <Act index={act} {...ACTS[act]} />;
}

function Act({ index, title, lesson, order, placement, clockwise }: { index: number } & (typeof ACTS)[number]) {
  const viewport = useViewport();
  const x = useExpandGroup();
  const to = pick(viewport, { mobile: 5, tablet: 7, desktop: 7 });
  const frames = order.map((n) => FRAMES[n - 1]);
  return (
    <Band
      id={`act-${index + 1}`}
      title={title}
      lesson={lesson}
      note={`from=1 to=${to} · placement="${placement}" · clockwise=${clockwise} · frames by weight, timecode on each · ${to === 5 ? "five of seven at 390" : "seven"}`}
    >
      <GoldenGrid from={1} to={to} placement={placement} clockwise={clockwise}>
        {frames.map((f, i) => {
          const key = `f${f.index}`;
          if (i === 0) return (
            <GoldenBox key={key}>
              <Clip src={clip(`s03-act-${index + 1}`)} poster={f.src} alt={`${FILM.title}, ${f.timecode}: ${f.note}`}>
                <figcaption className="media__caption">{f.timecode} · {f.note}</figcaption>
              </Clip>
            </GoldenBox>
          );
          return (
            <GoldenBox key={key} {...x.boxProps(key)}>
              <ExpandableMedia
                group={x}
                slotKey={key}
                src={f.src}
                alt={`${FILM.title}, ${f.timecode}: ${f.note}`}
                caption={f.timecode}
              />
              {x.isOpen(key) && (
                <ExpandedCell id={x.panelId(key)} title={`${f.timecode} · ${f.note}`} onClose={x.close} closeRef={x.closeRef}>
                  <PhotoView src={f.src} alt="" caption={`${FILM.title}, frame ${f.index + 1} of ${FRAMES.length}, at ${f.timecode} of the 1947 print. ${f.note}.`} />
                </ExpandedCell>
              )}
            </GoldenBox>
          );
        })}
      </GoldenGrid>
    </Band>
  );
}
