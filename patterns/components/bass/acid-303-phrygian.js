// Genre: dark / acid techno
// Tempo: 135–145 BPM
// Key: C phrygian (pedal on C, flat-2 = Db)
// Role: bass / lead
// Notes: classic 303 ostinato — pedal C with Db lean and octave jumps for dystopian tilt.
//        Slow sine sweeps the cutoff; 20% chance of octave-up events adds acid chaos.
//        Pair with driving-techno-kick and acid-techno-hats.

note("c2 c3 db2 c2 c2 eb3 c2 g2 c2 c3 db2 f2 c2 eb3 bb2 ab2")
  .s("sawtooth")
  // short plucky envelope — the defining 303 shape
  .attack(0.005).decay(0.18).sustain(0).release(0.08)
  // slow LFO on cutoff — the acid filter sweep
  .lpf(sine.range(350, 2800).slow(8))
  .lpq(12)
  // soft-clip bite
  .shape(0.4)
  .gain(0.78)
  // occasional octave jumps for acid variation
  .sometimesBy(0.2, x => x.add(note(12)))
  .cpm(140)
