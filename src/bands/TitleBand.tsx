import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import { useViewport } from "../lib/viewport";
import { useExpandGroup, ExpandedCell } from "../lib/expand";
import { FILM } from "../content";
import { Band } from "./Band";

/**
 * Band 4 — Title detail, leading into the dial.
 *
 * The reference's title page is a billboard, one card (title, year, rating,
 * genre, a 25-word synopsis, a starring line), then three equal "More
 * Details" cards. Art, synopsis, metadata and cast are a real descent, so
 * they get 1–4. The three cards are flat facts and stay a list, behind the
 * metadata box: expanding it turns the band into that list.
 *
 * Images survive demotion; prose does not. Below desktop the synopsis takes
 * the hero and the art steps down. Same props, reordered children.
 * Lever: reorder.
 */
export function TitleBand() {
  const viewport = useViewport();
  const x = useExpandGroup();
  const art = {
    key: "art",
    surface: undefined as string | undefined,
    node: (
      <figure className="media">
        <img src={FILM.art.src} alt={`Still from ${FILM.title}: a thin figure standing in a dark archway`} style={{ objectPosition: FILM.art.subject }} />
      </figure>
    ),
  };
  const synopsis = {
    key: "synopsis",
    surface: "surface surface--1",
    node: (
      <div className="copy copy--prose">
        <h3>{FILM.title}</h3>
        <p>{FILM.synopsis[viewport]}</p>
      </div>
    ),
  };
  const meta = {
    key: "meta",
    surface: "surface surface--2",
    node: (
      <>
        <div className="copy copy--center">
          <button className="chip chip--button" {...x.triggerProps("meta")}>{FILM.meta} · details</button>
        </div>
        {x.isOpen("meta") && (
          <ExpandedCell id={x.panelId("meta")} title={`${FILM.title} — details`} onClose={x.close} closeRef={x.closeRef}>
            <dl className="details">
              {FILM.details.map(([term, value]) => (
                <div key={term}><dt>{term}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </ExpandedCell>
        )}
      </>
    ),
  };
  const cast = {
    key: "cast",
    surface: "surface surface--3",
    node: <div className="copy copy--center"><span className="chip">{FILM.cast}</span></div>,
  };
  const boxes = viewport === "desktop" ? [art, synopsis, meta, cast] : [synopsis, art, meta, cast];

  return (
    <Band
      id="title"
      title="One title"
      lesson="Art, synopsis, metadata, cast: a descent, so a grid. The reference's three detail cards are flat facts, so a list, one click behind the metadata box."
      note={`from=1 to=4 · placement="left" · clockwise=false · hero right · children [${boxes.map((b) => b.key).join(", ")}]`}
      cap="60rem"
    >
      <GoldenGrid from={1} to={4} placement="left" clockwise={false}>
        {boxes.map((b) => {
          const expand = b.key === "meta" ? x.boxProps("meta").className : undefined;
          return (
            <GoldenBox key={b.key} className={[b.surface, expand].filter(Boolean).join(" ") || undefined}>
              {b.node}
            </GoldenBox>
          );
        })}
      </GoldenGrid>
    </Band>
  );
}
