/** A still cut from a film by captures/stills.sh. `px` is the file's side;
 *  `subject` is a CSS object-position. Provenance is in ASSETS.md. */
export interface Still {
  src: string;
  px: number;
  subject: string;
}
const still = (name: string, px: number, subject = "50% 50%"): Still => ({
  src: `${import.meta.env.BASE_URL}assets/${name}.jpg`,
  px,
  subject,
});

/**
 * Everything the page says and shows, in one place. Every image is a still
 * from the film it stands for.
 */
export interface RankedTitle {
  rank: number;
  title: string;
  meta: string;
  art: Still;
}

/**
 * The catalogue is real: ten films of Weimar-era German cinema, 1920–1929,
 * all in the public domain in the United States (published before 1931).
 * Several are still protected in Germany — see ASSETS.md for the rights
 * table. Titles, years and credits are facts. The ranking is the study's
 * own invention — nobody is trending — and the standfirst and synopsis are
 * drafts for Greg to replace.
 *
 * The reference prints a numeral on ten identical tiles; here the rank is
 * also the size. Each still is as large as its print allows, which is far
 * smaller than the largest slots ask for — see ASSETS.md.
 */
const TITLES: readonly [string, string, number, string][] = [
  ["Metropolis", "Metropolis", 1927, "Fritz Lang"],
  ["The Cabinet of Dr. Caligari", "Das Cabinet des Dr. Caligari", 1920, "Robert Wiene"],
  ["The Golem", "Der Golem, wie er in die Welt kam", 1920, "Paul Wegener, Carl Boese"],
  ["Faust", "Faust – Eine deutsche Volkssage", 1926, "F. W. Murnau"],
  ["The Last Laugh", "Der letzte Mann", 1924, "F. W. Murnau"],
  ["Dr. Mabuse the Gambler", "Dr. Mabuse, der Spieler", 1922, "Fritz Lang"],
  ["Pandora's Box", "Die Büchse der Pandora", 1929, "G. W. Pabst"],
  ["The Adventures of Prince Achmed", "Die Abenteuer des Prinzen Achmed", 1926, "Lotte Reiniger"],
  ["Waxworks", "Das Wachsfigurenkabinett", 1924, "Paul Leni"],
  ["Destiny", "Der müde Tod", 1921, "Fritz Lang"],
];
const STILLS: readonly Still[] = [
  still("s03-rank-01-metropolis", 480, "60% 50%"),
  still("s03-rank-02-caligari", 448),
  still("s03-rank-03-golem", 240, "60% 50%"),
  still("s03-rank-04-faust", 480),
  still("s03-rank-05-lastlaugh", 480),
  still("s03-rank-06-mabuse", 240),
  still("s03-rank-07-pandora", 480),
  still("s03-rank-08-achmed", 464),
  still("s03-rank-09-waxworks", 480, "60% 30%"),
  still("s03-rank-10-destiny", 576, "45% 40%"),
];
export const RANKED: RankedTitle[] = TITLES.map(([title, original, year, director], i) => ({
  rank: i + 1,
  title,
  meta: `${original === title ? "" : `${original} · `}${year} · ${director}`,
  art: STILLS[i],
}));

/** Promoted, and not in the ranked ten: the billboard leads to the one
 *  title the page opens, and to its frames. A different still from FILM.art. */
export const FEATURED = {
  title: "Nosferatu",
  standfirst: "A shadow at the bedroom door. The first vampire film is still the strangest.",
  meta: "1922 · F. W. Murnau",
  badge: "Silent · Horror",
  art: still("s03-featured-art-shadow", 480, "50% 40%"),
};

/** The single title the dial belongs to. */
export const FILM = {
  title: "Nosferatu",
  meta: "1922 · 84 min · Silent",
  cast: "Max Schreck, Gustav von Wangenheim, Greta Schröder",
  art: still("s03-title-art-archway", 480, "50% 60%"),
  // DRAFT copy, written to the slot's word count at each width.
  synopsis: {
    desktop: "A young clerk travels to the Carpathians to sell a house to Count Orlok, and learns too late what he has invited home. The count sails for Wisborg with a hold full of earth and rats, and the town begins to die behind him.",
    tablet: "A young clerk travels to the Carpathians to sell a house to Count Orlok, and learns too late what he has invited home. The count sails for Wisborg, and the town begins to die behind him.",
    mobile: "A clerk sells a house to Count Orlok and learns too late what he has invited home. The count sails for Wisborg, bringing plague.",
  },
  // Flat facts. The reference sets these as three equal cards; they are a
  // list, and they stay one.
  details: [
    ["Original title", "Nosferatu, eine Symphonie des Grauens"],
    ["Directed by", "F. W. Murnau"],
    ["Written by", "Henrik Galeen"],
    ["Genres", "Horror, Silent, Expressionist"],
    ["Intertitles", "German"],
    ["Cast", "Max Schreck, Gustav von Wangenheim, Greta Schröder, Alexander Granach, Georg H. Schnell, Ruth Landshoff, John Gottowt, Gustav Botz, Max Nemetz, Wolfgang Heinz"],
  ] as const,
};

/**
 * The frame sequence: 21 frames of the 1947 English-titled print, 84 minutes.
 * Nominal sampling is every 244 seconds from 0:02:20, the first picture
 * after the credits; each frame is then moved to the nearest strong picture
 * and never sits on an intertitle. FRAME_SECONDS is where each one actually
 * is, and must stay in step with the list in captures/stills.sh.
 *
 * TEXTURE_PX is the single source for the tile's render size AND the frame's
 * dimension. It is 480 because the print is 640×480 and nothing is upscaled.
 */
export const TEXTURE_PX = 480;
const FRAME_SECONDS = [
  140, 392, 616, 868, 1148, 1344, 1596, 1848, 2156, 2352, 2576,
  2828, 3052, 3360, 3444, 3780, 4032, 4256, 4536, 4704, 4956,
];
export const FRAME_COUNT = FRAME_SECONDS.length;
export const FRAMES = FRAME_SECONDS.map((seconds, i) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;
  const timecode = `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return { index: i, timecode, src: `${import.meta.env.BASE_URL}assets/s03-film-frame-${String(i + 1).padStart(2, "0")}.jpg` };
});
