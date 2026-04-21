// Genre: any (electronic / trance / techno / ambient)
// Tempo: 100–140 BPM
// Key: C minor (generic — edit the chord stack)
// Role: fx / pad chain
// Notes: reusable filter-sweep chain on a simple pad. The .slow(8) sine sweep is the "breathe" —
//        lengthen to .slow(16) for ambient, shorten to .slow(4) for buildups.
//        Copy the .lpf(...).lpq(...) line as a chain onto any sawtooth source.

note("<[c3,eb3,g3] [ab2,c3,eb3] [f3,ab3,c4] [g3,bb3,d4]>")
  .s("sawtooth")
  // moderate pad envelope — lets the filter sweep do the motion
  .attack(0.2).decay(0.4).sustain(0.8).release(0.8)
  // THE sweep — sine range 400–2800 across 8 cycles, resonant
  .lpf(sine.range(400, 2800).slow(8))
  .lpq(4)
  .room(0.6).roomsize(0.85)
  .gain(0.5)
  .cpm(128)
