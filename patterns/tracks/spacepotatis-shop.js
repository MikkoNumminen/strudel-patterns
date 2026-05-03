// Spacepotatis — shop / market music (v3: sci-fi ambient on a bass-ostinato spine)
// Genre: weird space-jazz ambient (Twin Peaks Roadhouse × Blade Runner × ECM-ambient)
// Tempo: 80 BPM, .cpm(20) — 1 cycle = 1 bar of 4 beats = 3 seconds
// Key: D dorian — modal, neither bright nor dark; pedal-D throughout
//      Pad cycle: Dm9 → Cmaj7(#11) → B♭maj7(#11) → A7sus  (each chord 4 bars, 16-bar loop)
// Length: 32 bars = 96 seconds (chord cycle plays twice for natural variation)
// Role: shop / market background. Trade is meditative + alien, not childlike.
//
// v3 redesign brief (Mikko, Finnish): v2 sounded like a children's song +
// the high-frequency atmosphere hurt eardrums. Reset to:
//   - sci-fi ambient soundscape, weird and spacey
//   - rhythm carried by a self-repeating bass ostinato (the spine)
//   - everything else is strange spacey ambient texture; can lean jazzy
//   - NO clear lead melody, NO ear-piercing high content
//
// Design rules vs v1/v2:
//   1. NO theremin / sing-song melody — the previous lead is gone entirely.
//   2. Bass plays the SAME 8-note motif every bar (d2 ~ a2 c3 ~ a2 d2 ~)
//        regardless of the chord above — it's a groove anchor, not harmonized.
//   3. Pad voicings use sus + 9 + #11 extensions = modal jazz, not diatonic pop.
//   4. Highest frequency content stays under ~2.5 kHz on every layer.
//   5. Ambient textures use perlin / degradeBy / sometimes for non-repetition.

stack(
  // ============================================================================
  // BASS OSTINATO — the rhythmic spine. Same 8-note cell every bar.
  //                  d2 ~ a2 c3 ~ a2 d2 ~  = root, 5th, b7, 5th, root
  //                  syncopated 8ths = jazz-leaning groove without going walking
  // ============================================================================

  note("d2 ~ a2 c3 ~ a2 d2 ~")
    .s("sawtooth")
    .attack(0.005).decay(0.18).sustain(0.4).release(0.15)
    .lpf(750).lpq(3)
    .shape(0.18)
    .gain(0.6),

  // ============================================================================
  // SUB DRONE — long sustained sine on D pedal. Modal foundation.
  // ============================================================================

  note("d1").s("sine")
    .attack(3).decay(1).sustain(0.95).release(4)
    .gain(0.55).room(0.4),

  // ============================================================================
  // CHORD PAD — modal jazz voicings, vowel formant, perlin filter breathing.
  //              Dm9 → Cmaj7(#11) → B♭maj7(#11) → A7sus
  //              All voicings use 9 / #11 / sus = no diatonic pop sweetness
  // ============================================================================

  note("<[d3,f3,a3,c4,e4] [c3,e3,g3,b3,f#4] [bb2,d3,f3,a3,e4] [a2,d3,e3,g3,b3]>").slow(4)
    .s("sawtooth")
    .attack(3.5).decay(2).sustain(0.85).release(5)
    .lpf(perlin.range(800, 2200).slow(24)).lpq(2)
    .vowel("<a o u e>".slow(16))
    .gain(0.3)
    .room(0.7)
    .jux(x => x.add(0.08)),

  // ============================================================================
  // SPARSE RHODES — random jazz stabs, one per bar at an off-beat 16th position.
  //                  triangle wave + dotted-8th delay = old-radio Rhodes feel.
  //                  .sometimes(add(5)) randomly transposes a stab up a 4th = jazz substitution
  // ============================================================================

  note("<[d3,f3,a3,c4] [c3,e3,g3,b3] [bb2,d3,f3,a3] [a2,c#3,e3,g3]>").slow(4)
    .struct("~ ~ ~ 1 ~ ~ ~ ~")
    .s("triangle")
    .attack(0.005).decay(0.5).sustain(0.1).release(0.6)
    .lpf(2200)
    .gain(0.22)
    .delay(0.4).delaytime(0.375).delayfeedback(0.5)
    .room(0.5)
    .sometimes(x => x.add(5))
    .degradeBy(0.4),

  // ============================================================================
  // ATMOSPHERIC WASH — bandpassed white noise, slow filter drift, very soft.
  //                     Sits behind everything; reads as "air conditioning on
  //                     an alien space station". One swell every 2 bars.
  // ============================================================================

  s("white").struct("1 ~")
    .attack(1.2).decay(0.6).sustain(0.4).release(1.6)
    .bpf(perlin.range(700, 1700).slow(13)).bpq(7)
    .gain(0.09)
    .pan(sine.range(0.25, 0.75).slow(11))
    .room(0.6),

  // ============================================================================
  // ALIEN PLUCKS — sparse mid-range bell tones, randomized pitch & timing.
  //                  bandpass 700–1500 Hz keeps them muffled-warm, not glassy.
  //                  degradeBy(0.55) = roughly half the notes drop = sparse texture
  // ============================================================================

  note("<a4 d5 c5 g4 f4 c5 a4 e5 d4 a4 c5 e4>").slow(3)
    .s("sine")
    .attack(0.005).decay(0.2).sustain(0.15).release(0.7)
    .bpf(perlin.range(700, 1500).slow(7)).bpq(6)
    .gain(0.18)
    .delay(0.55).delaytime(0.5).delayfeedback(0.6)
    .room(0.75)
    .pan(perlin.range(0.15, 0.85).slow(13))
    .degradeBy(0.55),

  // ============================================================================
  // TAPE PULSE — extremely slow sub LFO breathing on D, "machine alive" cue.
  //               Below 180 Hz so it never fights the bass ostinato up top.
  // ============================================================================

  note("d1").s("sine")
    .attack(4).release(4)
    .lpf(180)
    .gain(sine.range(0.0, 0.18).slow(16))
).cpm(20)
