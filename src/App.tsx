import { useEffect, useState } from "react";
import { Tools } from "./lib/tools";
import { StudyBanner, StudyDisclosure } from "./lib/study";
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
      <StudyBanner />
      {/* The reference's signed-out header: the name at the left, a language
          control and Sign In at the right, then the headline over the rows. */}
      <header className="top">
        <a className="wordmark" href="#content">GIFflix</a>
        <div className="top__right">
          <span className="top__lang" title="The study is in English only">English</span>
          <a className="btn top__signin" href="#cta">Sign In</a>
        </div>
      </header>
      <main id="content">
        <div className="masthead">
          <p className="masthead__kicker">Ten films, 1920–1929</p>
          <h1>Weimar cinema</h1>
          <p className="masthead__claim">
            Between the end of one war and the rise of the regime that would end the republic,
            German studios made the films that taught the rest of the world what a shadow could
            do. Ten of them, ranked, with Ruttmann's Berlin featured and Murnau's Nosferatu
            opened scene by scene in three acts.
          </p>
        </div>
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

      <StudyDisclosure />
    </>
  );
}
