# Assets — Study 03

Every image on the page is to be a **still taken from a film**, cut square by
the slot. No posters, no lobby cards, no wordmarks: a poster is a separate
artwork with its own author, and titles here are set in type.

**Status: sourced 2026-10-05.** All 33 images are in `public/assets/`, cut by
[`captures/stills.sh`](captures/stills.sh), which holds every source URL and
timecode and reproduces the set. Each still is a centre square at the print's
own height. Nothing is upscaled.

## The catalogue and its rights

All twelve films were published before 1931 and are in the public domain in
the **United States**, which is where the study is hosted.

**Germany is a different answer.** There a film is protected for seventy
years after the death of the last of its director, screenwriter and
composer. By that rule six of these are still protected. The table is
written from memory and has not been checked against a source.

**Decision, Greg, 2026-10-05:** all ten stay. United States public domain is
the basis, the study is hosted in the United States, and no further rights
checking is planned. This file keeps stating the German status so nobody
has to rediscover it.

| Film | Year | Director | Other credited authors | Public domain in Germany? |
| --- | --- | --- | --- | --- |
| Nosferatu, eine Symphonie des Grauens | 1922 | F. W. Murnau (d. 1931) | Henrik Galeen (d. 1949) | Yes |
| Berlin: Die Sinfonie der Großstadt | 1927 | Walter Ruttmann (d. 1941) | Carl Mayer (d. 1944), Karl Freund (cinematographer, d. 1969, not counted) | Yes |
| Metropolis | 1927 | Fritz Lang (d. 1976) | Thea von Harbou (d. 1954) | **No — through 2046** |
| Das Cabinet des Dr. Caligari | 1920 | Robert Wiene (d. 1938) | Carl Mayer (d. 1944), Hans Janowitz (d. 1954) | Yes, since 2025 |
| Der Golem, wie er in die Welt kam | 1920 | Paul Wegener (d. 1948), Carl Boese (d. 1958) | Henrik Galeen (d. 1949) | **No — through 2028** |
| Faust – Eine deutsche Volkssage | 1926 | F. W. Murnau (d. 1931) | Hans Kyser (d. 1940) | Yes |
| Der letzte Mann | 1924 | F. W. Murnau (d. 1931) | Carl Mayer (d. 1944) | Yes |
| Dr. Mabuse, der Spieler | 1922 | Fritz Lang (d. 1976) | Thea von Harbou (d. 1954) | **No — through 2046** |
| Die Büchse der Pandora | 1929 | G. W. Pabst (d. 1967) | Ladislaus Vajda (d. 1933) | **No — through 2037** |
| Die Abenteuer des Prinzen Achmed | 1926 | Lotte Reiniger (d. 1981) | — | **No — through 2051** |
| Das Wachsfigurenkabinett | 1924 | Paul Leni (d. 1929) | Henrik Galeen (d. 1949) | Yes |
| Der müde Tod | 1921 | Fritz Lang (d. 1976) | Thea von Harbou (d. 1954) | **No — through 2046** |

Three more cautions:

- **Restorations.** A modern restoration can carry its own rights in the
  tinting, the reconstructed intertitles, the score and the scan. Take
  stills from an unrestored public-domain print and say which.
- **No audio.** Nothing is played, so no score is used.
- **A still is not the film.** A handful of frames per title, as commentary,
  is a much smaller use than hosting the film. That is context, not a
  licence.

## Provenance

IA is `https://archive.org/details/<identifier>`. Timecodes are seconds into
the named file.

| Slot | Film | File side | Source | Timecode | Print |
| --- | --- | --- | --- | --- | --- |
| featured | Berlin: Symphony of a Great City | 384 | IA `BerlinSymphonyofaGreatCity` | 1800 | Probably unrestored: a 2006 upload at 512×384 |
| film | Nosferatu | 480 | same | 1232 | same |
| frame-01 … 21 | Nosferatu | 480 | same | list in `stills.sh` | same |
| rank-1 | Metropolis | 480 | IA `Metropolis1927EnglishVersion` | 2404.8 | Unknown. A 2014 upload at 640×480 with English titles |
| rank-2 | The Cabinet of Dr. Caligari | 448 | IA `DasKabinettdesDoktorCaligariTheCabinetofDrCaligari` | 183.7 | Probably unrestored: a 2005 upload, untinted, long before the 2014 restoration |
| rank-3 | The Golem | 240 | IA `TheGolem_893` | 2900.6 | **Unrestored**, by the uploader's own description |
| rank-4 | Faust | 480 | IA `FaustF.W.MurnauSilentFilm` | 1059.4 | Unknown |
| rank-5 | The Last Laugh | 480 | IA `Der_letzte_Mann` | 899.8 | Unknown. Sepia-toned transfer |
| rank-6 | Dr. Mabuse the Gambler | 240 | IA `Dr.MabuseTheGamblerdr.MabuseDerSpieler1922Part1` | 1789.1 | Probably unrestored: an old low-resolution transfer |
| rank-7 | Pandora's Box | 480 | IA `pandoras.-box-1929` | 4556.4 | **Almost certainly a restoration**: the item's original is a clean 1080p file |
| rank-8 | The Adventures of Prince Achmed | 464 | IA `die-abenteuer-des-prinzen-achmed` | 238.5 | **A restoration.** The film survives only through its tinted reconstruction |
| rank-9 | Waxworks | 480 | IA `WaxWorks` | 2158.2 | Unknown. Tinted |
| rank-10 | Destiny | 576 | IA `ZmeczonaSmiercr19212` | 1095.3 | Unknown, likely from a restored disc |

**What that means.** Two prints are known to be unrestored and two are
probably so. Two are restorations and five are unknown. The plan said
unrestored prints only and for most of the ranked row that was not met:
unrestored transfers of these films either are not online or could not be
told apart from restored ones by their descriptions. Greg accepted this for single stills on 2026-10-05.

**Resolution.** The largest file is 576 pixels and the largest slot is 850.
Rank 1 is a 480-pixel still drawn at 850 and it is visibly soft. Ranks 3 and
6 are 240-pixel stills drawn at 340 and 325.

**The frames.** 21 frames, nominally every 244 seconds from 0:02:20, the
first picture after the credits. Each was then moved to the nearest strong
picture — at most 112 seconds — so that none is an intertitle and the vampire
appears. That is editing, not sampling, and the page's readout shows each
frame's true timecode.

## Clips

Fifteen ten-second clips, `public/clips/*.mp4`, cut by `captures/clips.sh`
from the same files at the same timecodes as the stills above (the act clips
at 1148, 2156 and 4704 of the Nosferatu print), centre-cropped square, 480px,
24 fps, silent, H.264 CRF 27. 5.8 MB in all. Provenance is the stills'. The
whole-film players load from the sources themselves: the Internet Archive's
embed for each item, and the Commons file for Nosferatu.
