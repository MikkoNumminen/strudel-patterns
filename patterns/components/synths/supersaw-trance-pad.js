// Genre: uplifting / melodic trance
// Tempo: 132–142 BPM
// Key: A minor (i–VI–III–VII = Am–F–C–G); edit the chord stack to retune
// Role: pad
// Notes: wide anthem-style chord pad. jux(add(0.1)) detunes the right channel slightly for supersaw spread.
//        Slow sine on cutoff opens the filter across 8 cycles — the classic trance breathe.

note("<[a3,c4,e4,a4] [f3,a3,c4,f4] [c4,e4,g4,c5] [g3,b3,d4,g4]>")
  .s("sawtooth")
  // mid-length envelope — sustains through chord changes but decays enough to not muddy
  .attack(0.02).decay(0.3).sustain(0.8).release(0.4)
  // filter breathe across 8 cycles — lifts across each 4-bar phrase
  .lpf(sine.range(1600, 3000).slow(8))
  .lpq(2)
  .room(0.5).roomsize(0.8)
  .gain(0.5)
  // detune right channel for supersaw-style width
  .jux(x => x.add(note(0.15)))
  .cpm(138)
