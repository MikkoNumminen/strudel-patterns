// ============================================================================
// presets/sounds.js
// ----------------------------------------------------------------------------
// This file is a reference library of curated sound presets. Copy snippets
// into your patterns. Every snippet is paste-ready as a standalone pattern
// for auditioning in the Strudel REPL — drop one in, press play, hear it.
//
// These are NOT imports. Don't require this file. Copy the expression you
// want and adapt it in place.
//
// Snippets intentionally omit `.cpm()` so they can be merged into larger
// patterns without fighting the host tempo.
// ============================================================================


// === DRUMS ===

// --- driving techno kick ---
// Short, punchy, tuned low. Pairs with sub-layered bass.
s("bd*4").gain(0.95).shape(0.3).lpf(140)

// --- house four-on-the-floor ---
// A touch softer, rounder. Good bed under a swung hat.
s("bd*4").gain(0.85).lpf(180).shape(0.15)

// --- breakbeat skeleton ---
// Classic amen-ish placement. Feel is in the offbeat snare.
s("bd ~ sd ~ bd bd sd ~").gain(0.9)

// --- closed hat shuffle ---
// 16ths with dynamics and light swing via `.sometimes(fast)`.
s("hh*16").gain(perlin.range(0.3, 0.7)).sometimes(x => x.fast(2))

// --- open hat on the "and" ---
// Use stacked with a closed-hat line for classic house feel.
s("~ oh ~ oh").gain(0.55).hpf(800)

// --- rim / clap layer ---
// Weight on 2 and 4, lightly filtered for air.
s("~ cp ~ cp").gain(0.7).hpf(400).room(0.15)


// === BASS ===

// --- rolling sub bass ---
// Offbeat 8ths, sits under a kick. Use `.lpf` lower for even more weight.
note("a1 a1 c2 a1 a1 g1 a1 e1").s("sine").gain(0.9).lpf(220)

// --- reese-style detuned bass ---
// Stack of two saws at slightly different speeds for movement.
stack(
  note("a1*8").s("sawtooth").lpf(600),
  note("a1*8").s("sawtooth").speed(1.01).lpf(600)
).gain(0.7)

// --- acid-ish squelch ---
// Resonant saw with a slow filter sweep. Add `.shape(0.2)` for grit.
note("a1 c2 a1 e2 a1 g1 a1 d2")
  .s("sawtooth")
  .lpf(sine.range(300, 1800).slow(4))
  .hpf(80)
  .gain(0.75)

// --- plucky square bass ---
// Short envelope, works in DnB / electro.
note("a1 ~ a1 c2 ~ e1 ~ g1")
  .s("square")
  .attack(0.005).decay(0.12).sustain(0).release(0.05)
  .gain(0.8).lpf(900)

// --- dub sub stab ---
// One-hit, long tail, lots of room. Put it on downbeats only.
note("a1").s("sine").attack(0.01).release(0.8).gain(0.9).room(0.6)


// === SYNTHS / LEADS ===

// --- filtered saw lead ---
// Melodic line with a breathing filter. Swap the notes freely.
note("a4 c5 e5 g5 e5 c5 a4 g4")
  .s("sawtooth")
  .lpf(sine.range(800, 3500).slow(6))
  .gain(0.65)

// --- detuned stab ---
// Two-layer square stab for chord jabs.
stack(
  note("<a3 c4 e4 g4>").s("square"),
  note("<a3 c4 e4 g4>").s("square").speed(1.008)
).attack(0.01).decay(0.2).sustain(0.1).release(0.1).gain(0.6)

// --- vowel-filtered lead ---
// Formant character — morphs between "a" and "o".
note("e4 g4 a4 c5 a4 g4 e4 d4")
  .s("sawtooth")
  .vowel("<a o e i>")
  .gain(0.55)

// --- bright arpeggio ---
// Fast triangle arp with every-4-bar octave lift.
note("a4 c5 e5 a5 e5 c5 a4 e4")
  .s("triangle")
  .fast(2)
  .every(4, x => x.add(note(12)))
  .gain(0.5)

// --- tape-y pluck ---
// Short, saturated, with a tiny delay tail.
note("a4 e5 g4 d5 c5 a4")
  .s("triangle")
  .attack(0.003).release(0.1)
  .shape(0.2)
  .delay(0.25).delaytime(0.125).delayfeedback(0.3)
  .gain(0.6)


// === PADS ===

// --- slow evolving pad ---
// Long envelope, slow filter motion. Leave it under everything.
note("<a3 c4 e4 g4>")
  .s("sawtooth")
  .attack(1.5).release(2)
  .lpf(sine.range(400, 1500).slow(16))
  .room(0.7)
  .gain(0.45)

// --- shimmer pad ---
// Stacked octaves, big room, soft. Great for breaks.
stack(
  note("<a3 e4 g4 c5>").s("triangle"),
  note("<a4 e5 g5 c6>").s("triangle").gain(0.4)
).attack(2).release(3).room(0.8).gain(0.4)

// --- minor chord bed ---
// Uses a chord cycle. Chordal glue.
note("<Am7 Fmaj7 Cmaj7 G>")
  .s("sawtooth")
  .attack(1).release(2)
  .lpf(1200)
  .room(0.5)
  .gain(0.4)

// --- breath pad ---
// Vowel-filtered noise-ish pad. Sits high.
note("<a4 c5 e5 g5>")
  .s("sawtooth")
  .vowel("<a e i>")
  .attack(1.2).release(2.5)
  .hpf(300)
  .gain(0.35)


// === PERCUSSION / FX ===

// --- shaker 16ths ---
// Velocity noise via perlin. Glue for busy grooves.
s("sh*16").gain(perlin.range(0.2, 0.55)).hpf(500)

// --- tambourine ghost ---
// Sparse, random placement for organic feel.
s("tamb*8").sometimes(x => x.gain(0)).gain(0.5)

// --- riser sweep ---
// Noise with a rising filter over 8 bars.
s("white").hpf(sine.range(200, 6000).slow(8)).gain(0.4)

// --- downlifter ---
// Opposite of the riser — for drops and breakdowns entering.
s("white").lpf(saw.range(6000, 200).slow(4)).gain(0.35)

// --- impact / boom ---
// One-shot sub-heavy impact. Fire it on bar boundaries.
note("a1").s("sine").attack(0.001).release(1.2).gain(0.9).room(0.8)

// --- vinyl crackle layer ---
// Texture under quiet sections. Keep gain low.
s("white*32").gain(rand.range(0.02, 0.08)).hpf(1200)
