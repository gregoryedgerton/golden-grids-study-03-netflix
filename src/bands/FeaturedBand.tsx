import { GoldenGrid, GoldenBox } from "@gifcommit/golden-grids";
import type { PlacementValue } from "@gifcommit/golden-grids";
import { useViewport, pick } from "../lib/viewport";
import { useExpandGroup, ExpandedCell, ExpandableMedia, PhotoView } from "../lib/expand";
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
      title="Featured"
      lesson="The promoted title, dominant. The reference lays its copy over the frame; here the copy has its own box until the band collapses to one."
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
        <GoldenBox className="surface surface--1">
          <div className="copy copy--center">
            <h3>{FEATURED.title}</h3>
            <p>{FEATURED.standfirst}</p>
            <p><a className="btn" href="#title">Open</a></p>
          </div>
        </GoldenBox>
        <GoldenBox className="surface surface--2">
          <div className="copy copy--center"><span className="chip">{FEATURED.meta}</span></div>
        </GoldenBox>
        <GoldenBox className="surface surface--3">
          <div className="copy copy--center"><span className="chip">{FEATURED.badge}</span></div>
        </GoldenBox>
      </GoldenGrid>
    </Band>
  );
}
