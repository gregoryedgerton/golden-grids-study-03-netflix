import { Tools } from "./lib/tools";
import { FeaturedBand } from "./bands/FeaturedBand";
import { TierOneBand, TierTwoBand } from "./bands/RankedBand";
import { TitleBand } from "./bands/TitleBand";
import { FilmDialBand } from "./bands/FilmDialBand";

/**
 * Study 03 — the hybrid. Bands for browse, the dial for one title, on one
 * page: many titles, then one, then the inside of one. Each band is one
 * small-range GoldenGrid called directly; nothing nests.
 */
export function App() {
  return (
    <>
      <Tools />
      <a className="skip" href="#content">Skip to content</a>
      <header className="masthead">
        <h1>Layout study 03 — Netflix, bands and the dial</h1>
        <p className="masthead__claim">
          A row that numbers its titles one to ten and draws them all the same size is a
          layout declining to say what the product just said. Rank becomes size here, and
          one title opens into its own frames.
        </p>
      </header>

      <main id="content">
        <FeaturedBand />
        <TierOneBand />
        <TierTwoBand />
        <TitleBand />
        <FilmDialBand />
      </main>

      <footer className="colophon">
        {/* Required on every study. Keep this line. */}
        <p>
          An unaffiliated layout study of <a href="https://www.netflix.com/">netflix.com</a>. All imagery and
          copy are original; nothing from the reference site is reproduced. Built with{" "}
          <a href="https://github.com/gregoryedgerton/golden-grids">Golden Grids</a> ·{" "}
          <a href="https://www.npmjs.com/package/@gifcommit/golden-grids">npm</a> ·{" "}
          <a href="https://gregoryedgerton.github.io/golden-grids/">generator</a>.
        </p>
      </footer>
    </>
  );
}
