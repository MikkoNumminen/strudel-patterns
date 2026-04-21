// Genre: techno / industrial
// Tempo: 130–145 BPM
// Key: any (unpitched)
// Role: drum / perc
// Notes: Euclidean cowbell with delay and occasional reversal — adds industrial polyrhythm.
//        Layer on top of a straight kick; swap (5,16) to (7,16) for more density.

s("cb(5,16)")
  // metallic industrial tick, reverb-soaked, every 3rd cycle reverses for motion
  .gain(0.45)
  .hpf(2000)
  .room(0.5)
  .delay(0.35).delaytime(0.375)
  .every(3, x => x.rev())
  .cpm(140)
