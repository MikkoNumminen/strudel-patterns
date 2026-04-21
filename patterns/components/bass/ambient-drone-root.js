// Genre: ambient / drift
// Tempo: 60–80 BPM
// Key: A (swap the note for any drone root)
// Role: bass / drone
// Notes: sustained sub sine foundation with a slow triangle fifth drifting above, modulated by perlin.
//        Long attack/release — do not use with percussive mixes. Pair with ambient-lydian-pad.

stack(
  // drone root — sustained sub foundation, the gravity of the piece
  note("a1")
    .s("sine")
    .attack(4).release(6).sustain(1)
    .gain(0.55)
    .lpf(220),
  // harmonic fifth — drifts in and out over 24 cycles via perlin
  note("e2")
    .s("triangle")
    .attack(6).release(8).sustain(0.8)
    .gain(perlin.range(0.12, 0.28).slow(24))
    .lpf(400)
    .room(0.85)
).cpm(70)
