#!/bin/sh
# Cuts every image on the page from its source print. This file IS the
# provenance: each line is slot, name, source URL, timecode in seconds.
# Stills are centre-cropped square at the print's own height and never
# upscaled. Run from the repo root; needs ffmpeg.
#
# The Nosferatu print is fetched whole, once (505 MB, kept out of the repo),
# because 23 separate seeks against Wikimedia Commons are refused with 429.
set -e
OUT=public/assets
NOS_URL="https://upload.wikimedia.org/wikipedia/commons/0/02/Nosferatu_%281922%2C_English_titles_1947%29.webm"
NOS="${NOS_LOCAL:-/tmp/nosferatu-1947.webm}"
UA="golden-grids-study/0.1 (https://github.com/gregoryedgerton/golden-grids)"
[ -f "$NOS" ] || curl -s -A "$UA" -o "$NOS" "$NOS_URL"
IA=https://archive.org/download

cut() { # name source seconds [extra-filter]
  ffmpeg -v error -y -ss "$3" -i "$2" -frames:v 1 -pix_fmt yuvj420p \
    -vf "${4:+$4,}crop='min(iw,ih)':'min(iw,ih)'" -q:v 3 "$OUT/$1.jpg" </dev/null
}

# Band 1 and band 4: two different stills of the one film.
cut s03-featured-art-shadow        "$NOS" 1988
cut s03-title-art-archway          "$NOS" 1232

# Bands 2 and 3: one still per ranked film.
cut s03-rank-01-metropolis   "$IA/Metropolis1927EnglishVersion/Metropolis_1927_English_Version.mp4" 2404.8
cut s03-rank-02-caligari     "$IA/DasKabinettdesDoktorCaligariTheCabinetofDrCaligari/The_Cabinet_of_Dr._Caligari.mpeg" 183.7
cut s03-rank-03-golem        "$IA/TheGolem_893/TheGolem_512kb.mp4" 2900.6
cut s03-rank-04-faust        "$IA/FaustF.W.MurnauSilentFilm/Faust2.mp4" 1059.4
cut s03-rank-05-lastlaugh    "$IA/Der_letzte_Mann/F.W..Murnau.-.Der.letzte.Mann.%281924%2C.CD1%29.mp4" 899.8
cut s03-rank-06-mabuse       "$IA/Dr.MabuseTheGamblerdr.MabuseDerSpieler1922Part1/DrMabuseDerSpielerPart11922_512kb.mp4" 1789.1
cut s03-rank-07-pandora      "$IA/pandoras.-box-1929/Pandoras.Box%20%281929%29.mp4" 4556.4
cut s03-rank-08-achmed       "$IA/die-abenteuer-des-prinzen-achmed/Die%20Abenteuer%20des%20Prinzen%20Achmed.mp4" 238.5
cut s03-rank-09-waxworks     "$IA/WaxWorks/Waxwork.mp4" 2158.2
cut s03-rank-10-destiny      "$IA/ZmeczonaSmiercr19212/Zmczonamier1921.mp4" 1095.3

# Band 5: 21 frames of Nosferatu. Nominal sampling is every 244 s from
# 0:02:20 (the first picture after the credits); each is then moved to the
# nearest strong picture, never onto an intertitle. Keep this list in step
# with FRAME_SECONDS in src/content.ts.
i=1
for t in 140 392 616 868 1148 1344 1596 1848 2156 2352 2576 2828 3052 3360 3444 3780 4032 4256 4536 4704 4956; do
  cut "s03-film-frame-$(printf %02d $i)" "$NOS" "$t"
  i=$((i + 1))
done
