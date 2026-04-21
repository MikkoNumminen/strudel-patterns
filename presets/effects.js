// ============================================================================
// presets/effects.js
// ----------------------------------------------------------------------------
// This file is a reference library of curated effect chains. Copy snippets
// into your patterns. Every snippet is paste-ready as a standalone pattern
// for auditioning — each one is demonstrated on a simple source (usually
// `s("bd*4")`, a saw bass, or a chord) so you can hear the effect in
// isolation.
//
// These are NOT imports. Copy the chain you want, then apply it to whatever
// part you're actually working on.
//
// Snippets omit `.cpm()` on purpose so they merge cleanly into host tempos.
// ============================================================================


// === FILTER MOVEMENTS ===

// --- slow lowpass breath ---
// Classic "filter opens over 8 bars" motion.
s("bd*4").lpf(sine.range(400, 2000).slow(8)).gain(0.8)

// --- tight rhythmic lowpass ---
// Filter locked to the bar — adds movement without slowness.
note("a2*8").s("sawtooth").lpf(sine.range(300, 1500).slow(1)).gain(0.7)

// --- highpass build ---
// Removes low end gradually — great into a drop.
s("bd*8").hpf(saw.range(20, 1200).slow(8)).gain(0.7)

// --- bandpass sweep ---
// Combined hpf + lpf converging on a moving center.
note("a3*8").s("sawtooth")
  .hpf(sine.range(200, 1200).slow(8))
  .lpf(sine.range(600, 2400).slow(8))
  .gain(0.6)

// --- chopped filter (every-bar flip) ---
// Uses `.every` to slam the filter closed every 4th bar.
note("a2 c3 e3 a3").s("sawtooth")
  .lpf(1800)
  .every(4, x => x.lpf(300))
  .gain(0.7)


// === DELAY / ECHO ===

// --- dotted 8th delay ---
// The "edge" delay. Subtle feedback, wide feel.
note("a4 ~ c5 ~ e5 ~ g5 ~").s("triangle")
  .delay(0.5).delaytime(0.375).delayfeedback(0.35)
  .gain(0.55)

// --- dub quarter-note echo ---
// Longer, wetter, more feedback. Use on stabs.
note("<a3 c4 e4>").s("square")
  .attack(0.005).release(0.1)
  .delay(0.7).delaytime(0.5).delayfeedback(0.55)
  .gain(0.55)

// --- slapback ---
// Short, single-bounce delay for vocal/lead grit.
note("a4 c5 e5 a5").s("sawtooth")
  .delay(0.35).delaytime(0.09).delayfeedback(0.1)
  .gain(0.6)

// --- ping-pong-ish wide delay ---
// Pair a panned source with a long delay for stereo tails.
note("e5 ~ g5 ~ a5 ~ c6 ~").s("triangle")
  .pan(sine.range(0.2, 0.8).slow(4))
  .delay(0.6).delaytime(0.25).delayfeedback(0.45)
  .gain(0.5)


// === REVERB / SPACE ===

// --- plate-style lead reverb ---
// Medium room, bright. Good on melodic leads.
note("a4 c5 e5 a5").s("triangle")
  .room(0.5).roomsize(0.6)
  .gain(0.55)

// --- cathedral pad wash ---
// Huge space, long pad — for breaks and intros.
note("<a3 c4 e4 g4>").s("sawtooth")
  .attack(1.5).release(2.5)
  .room(0.9).roomsize(0.9)
  .gain(0.4)

// --- drum room tail ---
// Small room on drums for glue without mud.
s("bd ~ sd ~").room(0.2).roomsize(0.3).gain(0.85)

// --- send-style short verb on hats ---
// Highpass the source so the tail stays clean.
s("hh*16").hpf(1200).room(0.35).roomsize(0.4).gain(0.5)


// === SATURATION / DISTORTION ===

// --- warm tape shape ---
// Gentle saturation. Thicker, not aggressive.
note("a2*8").s("sawtooth").shape(0.25).lpf(1200).gain(0.7)

// --- crunchy bass drive ---
// Harder edge. Pair with a lowpass to keep the mix tidy.
note("a1 a1 c2 a1").s("sawtooth").shape(0.55).lpf(700).gain(0.75)

// --- bit-crushed lofi kick ---
// Digital grit via `.crush`. Lower values = more destruction.
s("bd*4").crush(6).gain(0.85)

// --- crushed + saturated combo ---
// Both, for very broken textures.
note("a3*4").s("square").crush(5).shape(0.4).gain(0.6)


// === STEREO / MOVEMENT ===

// --- auto-pan slow ---
// Source drifts side to side over 4 bars.
note("a4 c5 e5 g5").s("triangle")
  .pan(sine.range(0.15, 0.85).slow(4))
  .gain(0.6)

// --- jux reverse accent ---
// Left channel normal, right channel reversed — wide shimmer.
note("a4 c5 e5 a5 g4 e5 c5 a4").s("triangle")
  .jux(x => x.rev())
  .gain(0.55)

// --- every-other-bar octave lift ---
// Arrangement-level movement without new notes.
note("a2 c3 e3 a3").s("sawtooth")
  .every(2, x => x.add(note(12)))
  .gain(0.65)

// --- stereo hat spread ---
// Closed hats ping across the field.
s("hh*16").pan(perlin.range(0.2, 0.8)).gain(0.45)

// --- rarely-flipped melody ---
// Keeps it human — occasionally runs backwards.
note("a4 c5 e5 a5 g5 e5 c5 a4").s("triangle")
  .rarely(x => x.rev())
  .gain(0.55)


// === SIDECHAIN FEEL ===

// NOTE: these are "feel" fakes — Strudel doesn't do true sidechain here,
// but the gain-pump pattern gives the same ducked-on-the-kick sensation.

// --- pumped pad (LFO gain) ---
// Pad gain dips on every quarter note. Classic kick-duck feel.
note("<a3 c4 e4 g4>").s("sawtooth")
  .attack(1).release(2)
  .gain(sine.range(0.15, 0.6).fast(4))
  .room(0.5)

// --- pumped bass ---
// Bass dips sharply on the downbeat, breathes back in.
note("a1*8").s("sawtooth")
  .gain(saw.range(0.2, 0.8).fast(4))
  .lpf(500)

// --- pumped chord stabs ---
// Stabs with per-quarter gain motion — tight house pump.
note("<a3 c4 e4>").s("square")
  .attack(0.01).release(0.2)
  .gain(sine.range(0.25, 0.7).fast(4))

// --- "stack with kick" pump demo ---
// Hear it in context: kick plus ducked pad.
stack(
  s("bd*4").gain(0.9).shape(0.2),
  note("<a3 c4 e4 g4>").s("sawtooth")
    .attack(0.8).release(1.5)
    .gain(sine.range(0.1, 0.55).fast(4))
    .room(0.4)
)
