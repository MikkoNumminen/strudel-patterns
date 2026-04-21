// Genre: dark techno / industrial techno
// Tempo: 130–145 BPM
// Key: any (unpitched)
// Role: drum
// Notes: saturated four-on-the-floor kick with low-pass taming the top end.
//        Pair with acid-303-phrygian or any driving techno groove; lift shape(0.65) for peak-time.

s("bd*4")
  // driving four-on-the-floor, tuned low with body and soft-clip saturation
  .gain(1.0)
  .shape(0.55)
  .lpf(3500)
  .cpm(140)
