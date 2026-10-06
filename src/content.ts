/** A still cut from a film by captures/stills.sh. `px` is the file's side;
 *  `subject` is a CSS object-position. Provenance is in ASSETS.md. */
export interface Still {
  src: string;
  px: number;
  subject: string;
}
/** A ten-second clip cut by captures/clips.sh, beside its still. */
export const clip = (name: string) => `${import.meta.env.BASE_URL}clips/${name}.mp4`;
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
  original: string;
  year: number;
  director: string;
  meta: string;
  art: Still;
  /** Principal cast, or for an animated film its makers. */
  cast: string;
  /** Two or three sentences, the study's own words. A draft. */
  synopsis: string;
  /** The public-domain print the still was cut from, and its player. */
  source: { label: string; href: string; embed: string };
  clip: string;
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
const TITLES: readonly [string, string, number, string, string, string][] = [
  ["Metropolis", "Metropolis", 1927, "Fritz Lang", "Brigitte Helm, Gustav Fröhlich, Alfred Abel, Rudolf Klein-Rogge", "In a towering city of the future the planners live above and the workers toil below. The master's son follows a young woman into the depths, while his father has a machine made in her likeness to undo her; flood and uprising follow before hands and head are reconciled."],
  ["The Cabinet of Dr. Caligari", "Das Cabinet des Dr. Caligari", 1920, "Robert Wiene", "Werner Krauss, Conrad Veidt, Lil Dagover, Friedrich Fehér", "A fairground showman exhibits a sleepwalker who foretells deaths that then occur. A young man traces the murders to the showman and the asylum he runs, in a town painted in leaning walls and sharp shadows; the ending turns the story on its teller."],
  ["The Golem", "Der Golem, wie er in die Welt kam", 1920, "Paul Wegener, Carl Boese", "Paul Wegener, Albert Steinrück, Lyda Salmonova, Ernst Deutsch", "In sixteenth-century Prague a rabbi shapes a man of clay and gives it life to protect his people from an edict of expulsion. The creature saves the emperor's court and then turns on the ghetto, until a child reaches the word on its chest."],
  ["Faust", "Faust – Eine deutsche Volkssage", 1926, "F. W. Murnau", "Gösta Ekman, Emil Jannings, Camilla Horn", "An angel and a demon wager over the soul of an old scholar. Mephisto grants Faust youth and the world; the price is paid by the girl he loves, and the film ends in fire and a single word."],
  ["The Last Laugh", "Der letzte Mann", 1924, "F. W. Murnau", "Emil Jannings, Maly Delschaft, Max Hiller", "The doorman of a grand hotel is demoted to washroom attendant and hides it from his neighbours behind the uniform he steals back each night. Told almost without intertitles, with a camera that moves as he does; an epilogue reverses his fortune and says so."],
  ["Dr. Mabuse the Gambler", "Dr. Mabuse, der Spieler", 1922, "Fritz Lang", "Rudolf Klein-Rogge, Aud Egede-Nissen, Bernhard Goetzke, Alfred Abel", "A criminal mastermind in disguise rigs the stock exchange and the card table by hypnosis, while a state prosecutor closes in. Two parts and over four hours: a portrait of a city in which money, chance and will have come loose."],
  ["Pandora's Box", "Die Büchse der Pandora", 1929, "G. W. Pabst", "Louise Brooks, Fritz Kortner, Francis Lederer, Carl Goetz", "Lulu, a dancer whose desire is unconsidered and complete, passes through a newspaper magnate, his son, a countess and a gambling ship to a London fog on Christmas Eve. From Wedekind's plays; Brooks's bob became the image of the decade."],
  ["The Adventures of Prince Achmed", "Die Abenteuer des Prinzen Achmed", 1926, "Lotte Reiniger", "Lotte Reiniger, with Carl Koch, Walter Ruttmann, Berthold Bartosch", "The oldest surviving animated feature, cut entirely from paper silhouettes and photographed frame by frame over three years. A sorcerer's flying horse carries the prince to Wak-Wak; Aladdin, a witch and a demon battle follow."],
  ["Waxworks", "Das Wachsfigurenkabinett", 1924, "Paul Leni", "Emil Jannings, Conrad Veidt, Werner Krauss, William Dieterle", "A young writer hired to invent stories for a fairground wax museum imagines Harun al-Rashid, Ivan the Terrible and Jack the Ripper, each in a different manner of film. The last pursues him through the fair itself."],
  ["Destiny", "Der müde Tod", 1921, "Fritz Lang", "Lil Dagover, Walter Janssen, Bernhard Goetzke", "A young woman bargains with Death for her lover's life and is given three candles, three lives in three times and places to save. She fails each one, and is offered a last exchange."],
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
const SOURCES: readonly [string, string][] = [
  ["Internet Archive · Metropolis1927EnglishVersion", "https://archive.org/details/Metropolis1927EnglishVersion"],
  ["Internet Archive · DasKabinettdesDoktorCaligari…", "https://archive.org/details/DasKabinettdesDoktorCaligariTheCabinetofDrCaligari"],
  ["Internet Archive · TheGolem_893", "https://archive.org/details/TheGolem_893"],
  ["Internet Archive · FaustF.W.MurnauSilentFilm", "https://archive.org/details/FaustF.W.MurnauSilentFilm"],
  ["Internet Archive · Der_letzte_Mann", "https://archive.org/details/Der_letzte_Mann"],
  ["Internet Archive · Dr. Mabuse, Part 1", "https://archive.org/details/Dr.MabuseTheGamblerdr.MabuseDerSpieler1922Part1"],
  ["Internet Archive · pandoras.-box-1929", "https://archive.org/details/pandoras.-box-1929"],
  ["Internet Archive · die-abenteuer-des-prinzen-achmed", "https://archive.org/details/die-abenteuer-des-prinzen-achmed"],
  ["Internet Archive · WaxWorks", "https://archive.org/details/WaxWorks"],
  ["Internet Archive · ZmeczonaSmiercr19212", "https://archive.org/details/ZmeczonaSmiercr19212"],
];
export const RANKED: RankedTitle[] = TITLES.map(([title, original, year, director, cast, synopsis], i) => ({
  rank: i + 1,
  title,
  original,
  year,
  director,
  meta: `${original === title ? "" : `${original} · `}${year} · ${director}`,
  art: STILLS[i],
  cast,
  synopsis,
  source: { label: SOURCES[i][0], href: SOURCES[i][1], embed: SOURCES[i][1].replace("/details/", "/embed/") },
  clip: clip(`s03-rank-${String(i + 1).padStart(2, "0")}-${["metropolis", "caligari", "golem", "faust", "lastlaugh", "mabuse", "pandora", "achmed", "waxworks", "destiny"][i]}`),
}));

/** Promoted, and not in the ranked ten nor the opened title: the billboard
 *  is a film of its own. */
export const FEATURED = {
  title: "Berlin: Symphony of a Great City",
  original: "Berlin: Die Sinfonie der Großstadt",
  standfirst: "One day in the capital, from the first train before dawn to the lights going out, with no actors and no story but the city's.",
  meta: "1927 · Walter Ruttmann",
  badge: "Silent · Documentary",
  art: still("s03-featured-art-berlin", 384, "50% 55%"),
  clip: clip("s03-featured-berlin"),
  embed: "https://archive.org/embed/BerlinSymphonyofaGreatCity",
  // DRAFT: the fuller account behind the More control. The study's words.
  longer: [
    "Walter Ruttmann's film follows a single day in Berlin in five acts, from a train running into the city at dawn, through the morning rush, the working day, the lunch hour and the afternoon, to the theatres, cafés and dance halls of the night. Nothing is staged for a story; the film is cut to rhythm, and the camera takes the city as it finds it.",
    "The idea came from the screenwriter Carl Mayer, who had written The Cabinet of Dr. Caligari and The Last Laugh, and who left the project before it was finished, objecting to the direction it took. The photography was led by Karl Freund, who had shot Metropolis and The Last Laugh, often with hidden cameras. Edmund Meisel composed a score for the premiere in September 1927.",
    "It is the best known of the city symphonies, a form taken up in the same years in Paris, Moscow and New York, and the most purely cinematic film of the Weimar decade: its subject is movement, and its argument is made by the cut.",
  ],
  details: [
    ["Original title", "Berlin: Die Sinfonie der Großstadt"],
    ["Directed by", "Walter Ruttmann"],
    ["From an idea by", "Carl Mayer"],
    ["Cinematography", "Karl Freund"],
    ["Score for the premiere", "Edmund Meisel"],
    ["Form", "Documentary, in five acts, without intertitles for most of its length"],
  ] as const,
};

/** The one title the page opens. */
export const FILM = {
  title: "Nosferatu",
  meta: "1922 · 84 min · Silent",
  cast: "Max Schreck, Gustav von Wangenheim, Greta Schröder",
  // DRAFT: the fuller account behind the synopsis's More control.
  longer: [
    "Thomas Hutter, a young clerk in the town of Wisborg, is sent by his employer Knock to the Carpathians to close the sale of a house to a Count Orlok. The villagers will not take him past the pass after dark; a coach without a driver does. At the castle the count signs for the house across the square from Hutter's own, and cuts himself on the deed; by the second night Hutter has found him asleep in a coffin in the crypt.",
    "Orlok sails for Wisborg with a hold of earth-filled boxes, and the crew of the Empusa die one by one until the ship drifts into harbour with a dead captain lashed to the wheel. Plague is declared. Hutter's wife Ellen reads in the book he brought back that only a woman pure in heart can end the vampire, by keeping him at her side until the cock crows. She opens her window.",
    "Murnau's film is an unauthorised adaptation of Bram Stoker's Dracula; the names were changed and the story moved from England to Germany, and Stoker's widow sued. A court ordered the prints destroyed. Copies survived abroad, and from them every later version descends.",
  ],
  art: still("s03-title-art-archway", 480, "50% 60%"),
  clip: clip("s03-title-archway"),
  /** The whole film, streamed from the Commons file the frames were cut from. */
  video: "https://upload.wikimedia.org/wikipedia/commons/0/02/Nosferatu_%281922%2C_English_titles_1947%29.webm",
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
 * is, and must stay in step with the list in captures/stills.sh. Each is a
 * 480-pixel square because the print is 640×480 and nothing is upscaled.
 */
const FRAME_SECONDS = [
  140, 392, 616, 868, 1148, 1344, 1596, 1848, 2156, 2352, 2576,
  2828, 3052, 3360, 3444, 3780, 4032, 4256, 4536, 4704, 4956,
];
/** What is on screen at each frame, in the study's words, from the print. */
const FRAME_NOTES = [
  "Wisborg: roofs and a church tower at dawn",
  "Knock, the estate agent, over the letter from the count",
  "The Carpathian passes on the road to the castle",
  "Hutter at the inn, where the villagers warn him not to go on",
  "The count's coach, no driver, at the bridge",
  "A clock strikes midnight; the figure on it is a skeleton",
  "Hutter at the window with the book of vampires",
  "Orlok in the hall, at the far door",
  "Orlok asleep in the coffin, seen through its boards",
  "Hutter escapes downriver on a raft",
  "Knock in his cell, reaching towards the window",
  "The Empusa under sail",
  "The crew on deck: the first sailor has fallen ill",
  "Orlok comes up through the hatch, a coffin under his arm",
  "Orlok rises out of the hold among the rats",
  "The ship arrives in harbour with no one left alive",
  "Orlok carries his coffin through the town's arches",
  "Hutter home again, in the room across the square",
  "Ellen in her chair, reading what only a woman can do",
  "Orlok at his window, looking across at hers",
  "The cock crows; Orlok at the window as the sun comes up",
];
export const FRAME_COUNT = FRAME_SECONDS.length;
export const FRAMES = FRAME_SECONDS.map((seconds, i) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;
  const timecode = `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return { index: i, timecode, note: FRAME_NOTES[i], src: `${import.meta.env.BASE_URL}assets/s03-film-frame-${String(i + 1).padStart(2, "0")}.jpg` };
});

/**
 * The service. The reference breaks its rows with a plan banner, four
 * "reasons to join", a price table, a FAQ and an email call to action. This
 * study's service is fictional and so is every word here; nothing is
 * submitted by the form.
 */
export const SERVICE = {
  name: "Kinothek",
  banner: {
    headline: "Kinothek for $5.99 a month",
    body: "The plan with ads: the whole library in HD, on one screen, with a short account of every film and the print it comes from.",
    cta: "See the plans",
  },
  reasons: [
    { title: "Watch on any screen", body: "Phone, tablet, laptop and television, and the same place in the film on each." },
    { title: "Download the films", body: "Save any film to watch where there is no connection." },
    { title: "Notes with every film", body: "Who made it, when, and from which print; the scenes named as you go." },
    { title: "Cancel at any time", body: "No contract. Change or end the plan whenever you choose." },
  ],
  plans: [
    { name: "Standard", quality: "1080p", price: "$11.99", per: "a month", points: ["Two screens at once", "Downloads on two devices", "No ads"], note: "Most chosen" },
    { name: "Basic with ads", quality: "1080p", price: "$5.99", per: "a month", points: ["One screen", "A few ads an hour"] },
    { name: "Premium", quality: "4K + HDR", price: "$17.99", per: "a month", points: ["Four screens at once", "Spatial audio", "Downloads on six devices"] },
  ],
  faq: [
    ["What is Kinothek?", "A streaming library of German films of the 1920s, each with a short account of the film, its makers, and the print it is shown from."],
    ["Where do the films come from?", "From prints in the public domain in the United States, held by the Internet Archive and Wikimedia Commons. Each film's page names its print. Where a print is a modern restoration, the page says so."],
    ["How much does it cost?", "From $5.99 a month with ads, to $17.99 a month for 4K on four screens. The plans are listed below."],
    ["Can I cancel?", "At any time, from the account page. There is no contract and no fee for leaving."],
    ["Are the films suitable for children?", "Most carry no rating, having been made before ratings existed. Each film's notes say whether it contains frightening scenes; Nosferatu, Caligari and Waxworks do."],
  ],
  cta: { headline: "Start watching tonight", body: "Enter your email to begin a membership or restart one.", button: "Get started", disclaimer: "A demonstration. Nothing is sent." },
};
