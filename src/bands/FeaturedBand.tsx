import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import type { PlacementValue } from "@gifcommit/golden-grids";
import { useViewport, pick } from "../lib/viewport";
import { useExpandGroup, ExpandedCell, ExpandableMedia, PhotoView } from "../lib/expand";
import { Fact } from "../lib/boxes";
import { FILM } from "../content";
import { FEATURED } from "../content";
import { Band } from "./Band";

/**
 * Band 1 — Featured. Replaces the billboard.
 *
 * The reference's billboard is one 1344×614 frame with the title treatment
 * and the call to action laid over its left third. Here the art takes the
 * hero box and the copy gets a box of its own until there is no room for
 * one: 1–4 at 1440, 1–3 at 820, and at 390 the `single` model, where every
 * child after the first is ignored and the copy moves onto the art.
 *
 * Placement turns one step per box removed (right → bottom) so the hero
 * stays on the left and the band stays landscape. Lever: shrink + rotate,
 * then collapse + merge.
 */
export function FeaturedBand() {
  const viewport = useViewport();
  const x = useExpandGroup();
  const [to, placement] = pick<readonly [number, PlacementValue]>(viewport, {
    mobile: [1, "right"],
    tablet: [3, "bottom"],
    desktop: [4, "right"],
  });
  const single = to === 1;
  return (
    <Band
      id="featured"
      title="Featured: Nosferatu, 1922"
      lesson="F. W. Murnau's unauthorised adaptation of Bram Stoker's Dracula, made for the short-lived Prana Film with sets and costumes by the occultist Albin Grau. The names were changed and the story moved to a German port town; Stoker's widow sued, and in 1925 a court ordered every copy destroyed. Prints had already left the country, and from them the film survives."
      note={`from=1 to=${to} · placement="${placement}" · clockwise=true · hero left · ${single ? "single: copy overlaid on the art" : to === 3 ? "3:2" : "5:3"}`}
    >
      <GoldenGrid from={1} to={to} placement={placement}>
        <GoldenBox {...x.boxProps("art")}>
          <ExpandableMedia
            group={x}
            slotKey="art"
            className="media"
            src={FEATURED.art.src}
            alt={`Still from ${FEATURED.title}: the shadow of a clawed figure on a door`}
            objectPosition={FEATURED.art.subject}
          >
            {single && (
              <div className="overlay">
                <h3>{FEATURED.title}</h3>
                <p>{FEATURED.standfirst}</p>
              </div>
            )}
          </ExpandableMedia>
          {x.isOpen("art") && (
            <ExpandedCell id={x.panelId("art")} title={FEATURED.title} onClose={x.close} closeRef={x.closeRef}>
              <PhotoView src={FEATURED.art.src} alt="" caption={`${FEATURED.title} · ${FEATURED.meta}`} />
            </ExpandedCell>
          )}
        </GoldenBox>
        <GoldenBox {...x.boxProps("about")}>
          <Fact
            label="Featured"
            body={<p>{FEATURED.standfirst}</p>}
            source={FEATURED.meta}
            link={{ href: "#title", label: "Open", aria: `Open ${FEATURED.title}` }}
            expand={{
              group: x, slotKey: "about", title: FEATURED.title,
              full: <div className="cell__synopsis">{FILM.longer.map((p, i) => <p key={i}>{p}</p>)}</div>,
              source: "The study's own account; a draft.",
            }}
          >
            {FEATURED.title}
          </Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Year · director" fitClass="fit--light">{"1922\nF. W. Murnau"}</Fact>
        </GoldenBox>
        <GoldenBox>
          <Fact label="Genre" fitClass="fit--light">{FEATURED.badge.replace(" · ", "\n")}</Fact>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}
