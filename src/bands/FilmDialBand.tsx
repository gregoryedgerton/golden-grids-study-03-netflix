import { useEffect, useMemo, useRef, useState } from "react";
import {
  generateGoldenGridLayout,
  spiralCamera,
  spiralWindow,
  tileOnScreen,
  toCssTileTransform,
  toCssContentTransform,
  trailToRotateDeg,
  focusIndexAt,
} from "@gifcommit/golden-grids";
import type { SpiralTrail } from "@gifcommit/golden-grids";
import { useReducedMotion } from "../lib/motion";
import { FILM, FRAMES, FRAME_COUNT, TEXTURE_PX } from "../content";
import { Band } from "./Band";
import "./FilmDialBand.css";

/**
 * Band 5 — the film, on the dial. Inline, directly under the title it
 * belongs to: the page goes from many titles, to one, to the inside of one.
 *
 * A scroll body with a sticky, viewport-tall stage. Half a viewport of
 * scroll is one frame deeper, so twenty-one frames cost ten viewports of
 * travel rather than twenty-one. Nothing wraps the library: `spiralCamera`,
 * `spiralWindow`, `tileOnScreen` and the per-tile transforms are called
 * directly, in the order the library's docs/spiral-dial.md prescribes.
 *
 * Decisions, each stated in the README:
 *   - Frames STAY LEVEL. A film frame is a window, not an object; a horizon
 *     that turns is a mistake. `toCssContentTransform(frame)` on the frame.
 *   - Frames are centre-cropped to the square tile by `object-fit: cover`.
 *     The dial scrubs a centre slice, not the full frame.
 *   - The film starts at the largest square. Depth 0 focuses the last square
 *     of the layout, so square k carries frame COUNT − 1 − k.
 *   - Reduced motion gets the strip: every frame, equal, in order. A film's
 *     frames are a flat sequence, so the static answer is the flat one. It
 *     is also the thing the dial is being compared with.
 */
const STEP = 0.5; // viewports of scroll per frame

function fibonacci(n: number): number[] {
  const seq = [1, 1];
  while (seq.length < n) seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
  return seq.slice(0, n);
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(Math.max(v, lo), hi);
}

/** The frame a layout square carries: the film opens on the largest. */
const frameOf = (k: number) => FRAMES[FRAME_COUNT - 1 - k];

export function FilmDialBand() {
  const reduced = useReducedMotion();
  return (
    <Band
      id="film"
      title={`${FILM.title}, frame by frame`}
      lesson="Twenty-one frames from the 1947 American print, which carries Stoker's names, Harker and Nina, in its English intertitles. Scroll to move through the film from the rooftops of Wisborg to the cock crow, with the frame in focus named below and the scenes to come and gone around it."
      note={reduced
        ? `reduced motion: the strip — ${FRAME_COUNT} equal frames in order`
        : `${FRAME_COUNT} squares · ${STEP} viewport per frame · frames level, centre-cropped to ${TEXTURE_PX}px`}
    >
      {reduced ? <Strip /> : <Dial />}
    </Band>
  );
}

function Strip() {
  return (
    <ol className="strip">
      {FRAMES.map((f) => (
        <li key={f.index}>
          <figure className="media">
            <img src={f.src} alt={`${FILM.title} at ${f.timecode}: ${f.note}`} />
            <figcaption className="media__tag">{f.timecode} · {f.note}</figcaption>
          </figure>
        </li>
      ))}
    </ol>
  );
}

function Dial() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const [trail, setTrail] = useState<SpiralTrail>("bottom");

  // The layout is rebuilt only when the open side of the stage changes.
  const layout = useMemo(
    () => generateGoldenGridLayout(fibonacci(FRAME_COUNT), true, trailToRotateDeg(trail, true, FRAME_COUNT)),
    [trail]
  );

  useEffect(() => {
    let raf = 0;
    const paint = () => {
      const stage = stageRef.current;
      const body = bodyRef.current;
      if (!stage || !body) return;
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      const step = (stage.offsetHeight || height) * STEP;
      if (!width || !height) return;

      // Which side is open is the stage's shape, measured, never assumed.
      const open: SpiralTrail = width >= height ? "right" : "bottom";
      if (open !== trail) {
        setTrail(open); // the effect re-runs with the re-solved layout
        return;
      }

      const top = body.getBoundingClientRect().top + window.scrollY;
      const depth = clamp((window.scrollY - top) / step, 0, FRAME_COUNT - 1);
      const frame = spiralCamera(layout, depth, width, height);
      const level = toCssContentTransform(frame);

      layout.squares.forEach((square, k) => {
        const tile = tilesRef.current[k];
        if (!tile) return;
        const { opacity, hidden } = spiralWindow(k, depth, FRAME_COUNT);
        const onScreen = tileOnScreen(frame, square, width, height);
        tile.style.transform = toCssTileTransform(frame, square, width, height, { texturePx: TEXTURE_PX });
        tile.style.opacity = String(opacity);
        tile.style.visibility = hidden || !onScreen ? "hidden" : "visible";
        (tile.firstElementChild as HTMLElement).style.transform = level;
      });

      if (readoutRef.current) {
        const focus = clamp(Math.round(focusIndexAt(depth, FRAME_COUNT)), 0, FRAME_COUNT - 1);
        const f = frameOf(focus);
        readoutRef.current.textContent = `${f.timecode} · frame ${f.index + 1} of ${FRAME_COUNT} · ${f.note}`;
      }
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(paint);
    };
    schedule();
    const observer = new ResizeObserver(schedule);
    if (stageRef.current) observer.observe(stageRef.current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [layout, trail]);

  return (
    <div className="dial" ref={bodyRef} style={{ height: `${((FRAME_COUNT - 1) * STEP + 1) * 100}svh` }}>
      <div className="dial__stage" ref={stageRef} role="group" aria-label={`Frames of ${FILM.title} on a spiral dial`}>
        {layout.squares.map((_, k) => (
          <div
            key={k}
            className="dial__tile"
            ref={(el) => { tilesRef.current[k] = el; }}
            style={{ width: TEXTURE_PX, height: TEXTURE_PX, visibility: "hidden" }}
          >
            <img className="dial__art" src={frameOf(k).src} alt={`${frameOf(k).timecode}: ${frameOf(k).note}`} draggable={false} />
          </div>
        ))}
        {/* Bottom LEFT: the study tools own the top-right corner. */}
        <p className="dial__readout" aria-live="off">
          <span ref={readoutRef}>{FRAMES[0].timecode} · frame 1 of {FRAME_COUNT} · {FRAMES[0].note}</span>
          <span className="dial__hint"> · scroll to scrub</span>
        </p>
      </div>
    </div>
  );
}
