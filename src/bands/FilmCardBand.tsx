import { useEffect, useRef } from "react";
import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import type { PlacementValue } from "@gifcommit/golden-grids";
import type { RankedTitle } from "../content";
import { Fact } from "../lib/boxes";
import { Band } from "./Band";
import { Player } from "../lib/clip";
import { useViewport } from "../lib/viewport";

/**
 * A film's own card, as a band of its own. Choosing a poster in the ranked
 * rows opens this directly beneath them: the still as the hero, the
 * synopsis, the credits, the cast, and the print the still came from. It
 * is a new band stacked under the rows, not a grid inside a grid.
 *
 * Each rank gets a different orientation, so moving down the ranking turns
 * the card: top and bottom placements take five squares and are landscape
 * 8:5; right and left take four and are landscape 5:3. Between them the ten
 * cards cover all eight placement × direction pairs. At 390 every card has
 * four squares.
 */
const ORIENT: readonly [PlacementValue, boolean][] = [
  ["top", true], ["left", false], ["bottom", true], ["right", true], ["top", false],
  ["left", true], ["bottom", false], ["right", false], ["top", true], ["left", false],
];

function heroSide(placement: PlacementValue, clockwise: boolean, n: number): string {
  const ring: PlacementValue[] = clockwise ? ["top", "right", "bottom", "left"] : ["top", "left", "bottom", "right"];
  return ring[(ring.indexOf(placement) + (n - 2)) % 4];
}

export function FilmCardBand({ film, onClose }: { film: RankedTitle; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const viewport = useViewport();
  const [placement, clockwise] = ORIENT[(film.rank - 1) % ORIENT.length];
  // Four squares at 390: a fifth would be 45px, too small for a name. With
  // four, top and bottom placements turn the card portrait, 3:5, which on a
  // phone is the better shape; the print's square is the one dropped.
  const to = viewport === "mobile" ? 4 : placement === "top" || placement === "bottom" ? 5 : 4;
  const hero = heroSide(placement, clockwise, to);

  // Focus lands on the close control so a keyboard reader arrives with the
  // card; the band scrolls into view, without animation under reduced motion.
  useEffect(() => {
    const el = document.getElementById("film-card");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el?.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCloseRef.current(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [film.rank]);

  return (
    <Band
      id="film-card"
      title={`${film.rank} · ${film.title}`}
      lesson={film.synopsis}
      note={`from=1 to=${to} · placement="${placement}" · clockwise=${clockwise} · hero ${hero} · one orientation per rank`}
    >
      <p className="film-card__bar">
        <span className="box__source">Chosen from the ranking above · {film.year} · {film.director}</span>
        <button ref={closeRef} type="button" className="cell__close" onClick={onClose} aria-label={`Close ${film.title}`} aria-keyshortcuts="Escape"><span className="cell__x" aria-hidden="true">×</span><span className="cell__closeword">Close</span></button>
      </p>
      <GoldenGrid from={1} to={to} placement={placement} clockwise={clockwise}>
        <GoldenBox>
          <Player clip={film.clip} poster={film.art.src} alt={`Still from ${film.title}`} title={film.title} embed={film.source.embed} />
        </GoldenBox>
        <GoldenBox>
          <Fact label="Synopsis" body={<p>{film.synopsis}</p>} source="The study's own words, a draft">{film.title}</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Year · director" fitClass="fit--light">{`${film.year}\n${film.director.replace(", ", "\n")}`}</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label={film.rank === 8 ? "Made by" : "Cast"} fitClass="fit--light">{film.cast.replace(/, /g, "\n")}</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact
            label="The print this still is from"
            fitClass="fit--light"
            source={film.source.label.split(" · ")[1]}
            link={{ href: film.source.href, label: "Open", aria: `Open the print of ${film.title} on the Internet Archive` }}
          >
            {"Internet\nArchive"}
          </Fact>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}
