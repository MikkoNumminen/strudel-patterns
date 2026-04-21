// Genre: uplifting / melodic trance
// Tempo: 132–142 BPM
// Key: A minor (i–VI–III–VII: Am–F–C–G), transpose by editing root notes
// Role: bass
// Notes: rolling 16th offbeat bass — velocity pattern simulates sidechain ducking around the kick.
//        Dips on 1/5/9/13 where the kick lands (velocity 0.3), peaks on the and-of (0.9).
//        Pair with trance-four-on-floor for the classic trance drop feel.

note("<a1 f1 c2 g1>*16")
  .s("sawtooth")
  // very short envelope — plucky offbeat pulse
  .attack(0.002).decay(0.06).sustain(0).release(0.04)
  .lpf(700).lpq(6)
  // velocity curve = pseudo-sidechain: dip on kick beats, peak on the offbeat
  .velocity("0.3 0.7 0.9 0.7 0.3 0.7 0.9 0.7 0.3 0.7 0.9 0.7 0.3 0.7 0.9 0.7")
  .gain(0.8)
  .shape(0.2)
  .cpm(138)
