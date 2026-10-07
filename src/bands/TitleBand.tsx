import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import { useViewport } from "../lib/viewport";
import { useExpandGroup } from "../lib/expand";
import { Fact } from "../lib/boxes";
import { Player } from "../lib/clip";
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
    node: (
      <Player clip={FILM.clip} poster={FILM.art.src} alt={`Still from ${FILM.title}: a thin figure standing in a dark archway`} title={FILM.title} video={FILM.video} />
    ),
  };
  const synopsis = {
    key: "synopsis",
    node: (
      <Fact
        label="Synopsis"
        body={<p>{FILM.synopsis[viewport]}</p>}
        source="The study's own words"
        expand={{
          group: x, slotKey: "synopsis", title: FILM.title,
          full: <div className="cell__synopsis">{FILM.longer.map((p, i) => <p key={i}>{p}</p>)}</div>,
          source: "The study's own account; a draft.",
        }}
      >
        {FILM.title}
      </Fact>
    ),
  };
  const meta = {
    key: "meta",
    node: (
      <Fact
        label="Details"
        fitClass="fit--light"
        expand={{
          group: x, slotKey: "meta", title: `${FILM.title} — details`,
          full: (
            <dl className="details">
              {FILM.details.map(([term, value]) => (
                <div key={term}><dt>{term}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          ),
        }}
      >
        {FILM.meta.replace(/ · /g, "\n")}
      </Fact>
    ),
  };
  const cast = {
    key: "cast",
    node: (
      <Fact
        label="Starring"
        fitClass="fit--light"
        spoken={viewport === "mobile" ? FILM.cast : undefined}
        expand={{
          group: x, slotKey: "cast", title: `${FILM.title} — cast`,
          full: <p className="cell__synopsis">{FILM.details.find(([t]) => t === "Cast")?.[1]}</p>,
        }}
      >
        {viewport === "mobile" ? FILM.cast.split(", ")[0] : FILM.cast.replace(/, /g, "\n")}
      </Fact>
    ),
  };
  const boxes = viewport === "desktop" ? [art, synopsis, meta, cast] : [synopsis, art, meta, cast];

  return (
    <Band
      id="title"
      title="Nosferatu, eine Symphonie des Grauens"
      lesson="Shot in 1921 in Wismar, Lübeck and Rostock, and at Orava Castle in what is now Slovakia, with Max Schreck as Count Orlok. Murnau filmed much of it on location rather than on painted sets, which set it apart from Caligari, and used the camera's own tricks, negative film for the forest and stop motion for the coach, where the story left the ordinary world."
      note={`from=1 to=4 · placement="left" · clockwise=false · hero right · children [${boxes.map((b) => b.key).join(", ")}]`}
      cap="60rem"
    >
      <GoldenGrid from={1} to={4} placement="left" clockwise={false}>
        {boxes.map((b) => (
          <GoldenBox key={b.key} {...x.boxProps(b.key)}>
            {b.node}
          </GoldenBox>
        ))}
      </GoldenGrid>
    </Band>
  );
}
