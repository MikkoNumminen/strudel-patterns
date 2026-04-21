// Genre: dark techno / industrial
// Tempo: 130–145 BPM
// Key: C phrygian (i and bII voicings — C minor to Db major lean)
// Role: pad / drone
// Notes: slow moving dark drone pad that hints at the phrygian flat-2.
//        Perlin on the filter = non-repeating organic motion. Sits low — layer under a kick + 303.

note("<[c3,g3,ab3] [c3,g3,ab3] [db3,ab3,f4] [c3,g3,ab3]>")
  .s("sawtooth")
  // long envelope — pad glides between chords
  .attack(1.2).release(2.5)
  // perlin noise on cutoff = organic, non-cyclic filter drift
  .lpf(perlin.range(400, 1200).slow(12))
  .lpq(4)
  .room(0.7).roomsize(0.9)
  .gain(0.32)
  .cpm(140)
