set xlabel 'step'
set yrange [0:2.5]
set ylabel 'belt movement'
p 'JustNoticeable.txt' u (1-cos($1/30)) dt 3 title 'just noticeable belt', (x**1.55)/52 t 'gamma 1.55'
replot 'JustNoticeable.txt' u (2 * $1/90) w l title 'just noticeable servo correction', (1 - cos(3*x/20)) t 'uncorrected swingarm belt'
