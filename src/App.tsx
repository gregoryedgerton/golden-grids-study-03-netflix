import { useEffect, useState } from "react";
import { Tools } from "./lib/tools";
import { RANKED } from "./content";
import { FilmCardBand } from "./bands/FilmCardBand";
import { FeaturedBand } from "./bands/FeaturedBand";
import { TierOneBand, TierTwoBand } from "./bands/RankedBand";
import { TitleBand } from "./bands/TitleBand";
import { ScenesBand } from "./bands/ScenesBand";
import { PlanBannerBand, ReasonsBand, PlansBand, FaqBand, CtaBand } from "./bands/MarketingBands";

/**
 * Study 03. Bands for browse, then one title, then that title in three acts
 * of frames: many films, then one, then the inside of one. Each band is one
 * small-range GoldenGrid called directly; nothing nests.
 */
export function App() {
  // Which ranked film is open as its own band beneath the rows. Choosing a
  // poster opens it; choosing the same poster, or Close, shuts it and
  // returns focus to the poster.
  const [selected, setSelected] = useState<number | null>(null);
  const close = (rank: number) => {
    setSelected(null);
    requestAnimationFrame(() => document.getElementById(`poster-${rank}`)?.focus());
  };
  const selection = { selected, onSelect: (rank: number) => (selected === rank ? close(rank) : setSelected(rank)) };
  const film = selected ? RANKED[selected - 1] : null;
  // Display type waits for Jost (styles.css hides it until then); two
  // seconds at most, whatever the network does.
  useEffect(() => {
    const show = () => { document.documentElement.dataset.fonts = "ready"; };
    if (!document.fonts) { show(); return; }
    Promise.all(["700 1em Jost", "300 1em Jost", "500 1em Jost"].map((f) => document.fonts.load(f).catch(() => []))).then(show, show);
    const timer = setTimeout(show, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Tools />
      <a className="skip" href="#content">Skip to content</a>
      <header className="masthead">
        <p className="masthead__kicker"><span>Layout study 03 · Netflix</span><span>Ten films, 1920–1929</span></p>
        <h1>Weimar cinema</h1>
        <p className="masthead__claim">
          Between the end of one war and the rise of the regime that would end the republic,
          German studios made the films that taught the rest of the world what a shadow could
          do. Ten of them, ranked, with Ruttmann's Berlin featured and Murnau's Nosferatu
          opened scene by scene in three acts.
        </p>
      </header>

      <main id="content">
        <FeaturedBand />
        <TierOneBand selection={selection} />
        {film && film.rank <= 5 && <FilmCardBand film={film} onClose={() => close(film.rank)} />}
        <PlanBannerBand />
        <TierTwoBand selection={selection} />
        {film && film.rank > 5 && <FilmCardBand film={film} onClose={() => close(film.rank)} />}
        <ReasonsBand />
        <TitleBand />
        <ScenesBand act={0} />
        <PlansBand />
        <ScenesBand act={1} />
        <ScenesBand act={2} />
        <FaqBand />
        <CtaBand />
      </main>

      <footer className="colophon">
        {/* Required on every study. Keep this line. */}
        <p>
          An unaffiliated layout study of <a href="https://www.netflix.com/">netflix.com</a>. The imagery
          is stills from films in the public domain in the United States and the copy is original;
          nothing from the reference site is reproduced. Built with{" "}
          <a href="https://github.com/gregoryedgerton/golden-grids">Golden Grids</a> ·{" "}
          <a href="https://www.npmjs.com/package/@gifcommit/golden-grids">npm</a> ·{" "}
          <a href="https://gregoryedgerton.github.io/golden-grids/">generator</a>.
        </p>
      </footer>
    </>
  );
}
