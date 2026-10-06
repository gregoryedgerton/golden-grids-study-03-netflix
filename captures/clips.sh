#!/bin/sh
# Cuts the short clips that play inside the squares: ten seconds from each
# film at the moment of its still, centre-cropped square, 480px, silent,
# H.264 at a size that streams from Pages. Same sources as stills.sh; this
# file is their provenance. Run from the repo root; needs ffmpeg.
set -e
OUT=public/clips
mkdir -p "$OUT"
NOS_URL="https://upload.wikimedia.org/wikipedia/commons/0/02/Nosferatu_%281922%2C_English_titles_1947%29.webm"
NOS="${NOS_LOCAL:-/tmp/nosferatu-1947.webm}"
UA="golden-grids-study/0.1 (https://github.com/gregoryedgerton/golden-grids)"
[ -f "$NOS" ] || curl -s -A "$UA" -o "$NOS" "$NOS_URL"
IA=https://archive.org/download

clip() { # name source seconds
  ffmpeg -v error -y -ss "$3" -t 10 -i "$2" -an \
    -vf "crop='min(iw,ih)':'min(iw,ih)',scale=480:480:flags=lanczos,fps=24" \
    -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart "$OUT/$1.mp4" </dev/null
}

clip s03-featured-berlin      "$IA/BerlinSymphonyofaGreatCity/BERLIN.AVI" 1800
clip s03-title-archway        "$NOS" 1232
clip s03-rank-01-metropolis   "$IA/Metropolis1927EnglishVersion/Metropolis_1927_English_Version.mp4" 2404.8
clip s03-rank-02-caligari     "$IA/DasKabinettdesDoktorCaligariTheCabinetofDrCaligari/The_Cabinet_of_Dr._Caligari.mpeg" 183.7
clip s03-rank-03-golem        "$IA/TheGolem_893/TheGolem_512kb.mp4" 2900.6
clip s03-rank-04-faust        "$IA/FaustF.W.MurnauSilentFilm/Faust2.mp4" 1059.4
clip s03-rank-05-lastlaugh    "$IA/Der_letzte_Mann/F.W..Murnau.-.Der.letzte.Mann.%281924%2C.CD1%29.mp4" 899.8
clip s03-rank-06-mabuse       "$IA/Dr.MabuseTheGamblerdr.MabuseDerSpieler1922Part1/DrMabuseDerSpielerPart11922_512kb.mp4" 1789.1
clip s03-rank-07-pandora      "$IA/pandoras.-box-1929/Pandoras.Box%20%281929%29.mp4" 4556.4
clip s03-rank-08-achmed       "$IA/die-abenteuer-des-prinzen-achmed/Die%20Abenteuer%20des%20Prinzen%20Achmed.mp4" 238.5
clip s03-rank-09-waxworks     "$IA/WaxWorks/Waxwork.mp4" 2158.2
clip s03-rank-10-destiny      "$IA/ZmeczonaSmiercr19212/Zmczonamier1921.mp4" 1095.3

# The scene that leads each act: the coach, the coffin, the window.
clip s03-act-1 "$NOS" 1148
clip s03-act-2 "$NOS" 2156
clip s03-act-3 "$NOS" 4704
