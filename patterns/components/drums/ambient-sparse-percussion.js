// Genre: ambient / drift
// Tempo: 60–80 BPM
// Key: any (unpitched)
// Role: drum
// Notes: barely-there percussion bed — high-passed rim and cymbal breaths, heavy wash, high degrade.
//        Use as the ONLY rhythm layer in an ambient piece, or under a drone pad. No kick by design.

stack(
  // sparse rim — roughly one hit per 4 cycles, wide delay tails
  s("~ ~ ~ ~ ~ ~ rim ~")
    .gain(0.18)
    .hpf(1200)
    .pan(perlin.range(0.3, 0.7).slow(10))
    .room(0.95).roomsize(0.98)
    .delay(0.4).delaytime(0.666).delayfeedback(0.6)
    .degradeBy(0.7)
    .slow(4),
  // distant cymbal breath — rare shimmer, occasionally reversed
  s("~ ~ ~ ~ hh ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~")
    .gain(0.12)
    .hpf(5000)
    .pan(sine.range(0.2, 0.8).slow(7))
    .room(0.95).roomsize(0.95)
    .delay(0.5).delaytime(0.875).delayfeedback(0.55)
    .degradeBy(0.6)
    .sometimes(x => x.rev())
    .slow(3)
).cpm(70)
