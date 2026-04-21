// Genre: uplifting / melodic trance / big room
// Tempo: 128–142 BPM
// Key: any (unpitched)
// Role: fx / transition
// Notes: white-noise-style 32nd hat riser — saw ramp on gain AND hpf makes it swell upward.
//        Drop into the final bar of a buildup. degradeBy(0.3) adds noise grit.

s("hh*32")
  // saw signal ramps gain from soft to loud across the cycle
  .gain(saw.range(0.05, 0.5))
  // simultaneously rises through the spectrum
  .hpf(saw.range(2000, 9000))
  // degrade for a more noisy, less-metered feel
  .degradeBy(0.3)
  .cpm(138)
