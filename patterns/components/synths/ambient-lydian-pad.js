// Genre: ambient / drift
// Tempo: 60–80 BPM
// Key: D lydian (raised 4th shimmers on G#)
// Role: pad
// Notes: slowly evolving pad — filter sweeps over 24 cycles, vowel morphs over 16.
//        The .slow(8) outer call stretches the chord progression across many cycles.
//        Pair with ambient-drone-root for the full ambient bed.

note("<[d3,f#3,a3,c#4] [e3,g#3,b3,d4] [a3,c#4,e4,g#4] [f#3,a3,c#4,e4]>")
  .s("sawtooth")
  // very long envelope — pad breathes across multiple cycles
  .attack(3).decay(2).sustain(0.85).release(5)
  // slow sine filter breathe across 24 cycles
  .lpf(sine.range(300, 1800).slow(24))
  .lpq(3)
  // vowel morph — a o e i cycle over 16 cycles adds formant motion
  .vowel("<a o e i>".slow(16))
  .room(0.9).roomsize(0.95)
  .gain(0.38)
  .slow(8)
  .cpm(70)
