// Spacepotatis — shop / market music (v2: humor-dominant + progressive)
// Genre: cartoonish prog-jazz solo over sci-fi ambient lounge backing
// Tempo: 96 BPM, .cpm(24) — 1 cycle = 1 bar of 4 beats
// Key: F major — Fmaj9 – Dm9 – Gm11 – C13  (I-vi-ii-V with jazz extensions)
//      Each chord 4 bars, progression plays twice across 32 bars.
// Length: 32 bars = 80 seconds
// Role: market / shop background — humor twist now dominates because trading is FUN,
//        and the theremin solo runs prog-style across the whole loop.
//
// v2 changes vs v1 (per Mikko's feedback "more humor twist, way less other stuff,
//                   more progressive"):
//   - Humor sine theremin is THE lead voice for all 32 bars (was: 8 bars only)
//   - Original main saw lead REMOVED entirely
//   - Drums / comping / shimmer / cowbell gain reduced 30-40% — theremin owns the foreground
//   - Pad voicings upgraded from triads → 9ths / 11ths / 13ths (prog-jazz harmony)
//   - Theremin now develops in 4 progressive sections (8 bars each):
//       bars 1-8   THEME    intro phrasing, chromatic gag (b5 over Fmaj9)
//       bars 9-16  CHORUS   elaboration; wider intervals; eb6 chromatic gag over Gm11
//       bars 17-24 SOLO     prog climax — fast 8th-note runs, octave leaps, full
//                            chromatic climb (a-b-c-c#-d-d#-e-f) on bar 23
//       bars 25-32 OUTRO    return to theme, settles for clean loop point

stack(
  // ============================================================================
  // DRUMS — soft jazz kit, REDUCED gain so theremin dominates
  // ============================================================================

  // kick — beats 1 and 3 (gentler than v1)
  s("bd ~ ~ ~ bd ~ ~ ~").gain(0.5).shape(0.12),

  // rim — backbeat (jazz brush feel)
  s("~ rim ~ rim").gain(0.32).hpf(800).room(0.25),

  // hi-hat — 8th tssk, dropped gain
  s("hh*8").gain(sine.range(0.12, 0.22).fast(2)).hpf(7500).cut(1),

  // (cowbell removed — too busy alongside the theremin)

  // ============================================================================
  // WALKING BASS — quarter-note saw bass walking through chord tones
  // ============================================================================

  note("<[f2 c3 f2 a2] [f2 c3 f2 a2] [f2 c3 f2 a2] [f2 c3 f2 a2] [d2 a2 d3 f2] [d2 a2 d3 f2] [d2 a2 d3 f2] [d2 a2 d3 f2] [g2 d3 g2 bb2] [g2 d3 g2 bb2] [g2 d3 g2 bb2] [g2 d3 g2 bb2] [c2 g2 c3 e2] [c2 g2 c3 e2] [c2 g2 c3 e2] [c2 g2 c3 e2] [f2 c3 f2 a2] [f2 c3 f2 a2] [f2 c3 f2 a2] [f2 c3 f2 a2] [d2 a2 d3 f2] [d2 a2 d3 f2] [d2 a2 d3 f2] [d2 a2 d3 f2] [g2 d3 g2 bb2] [g2 d3 g2 bb2] [g2 d3 g2 bb2] [g2 d3 g2 bb2] [c2 g2 c3 e2] [c2 g2 c3 e2] [c2 g2 c3 e2] [c2 g2 c3 e2]>")
    .s("sawtooth")
    .attack(0.005).decay(0.18).sustain(0.4).release(0.1)
    .lpf(1500).lpq(2)
    .gain(0.6),

  // ============================================================================
  // RHODES COMPING — sparser than v1 (one stab per bar instead of two)
  //                   so it leaves room for the theremin solo
  // ============================================================================

  note("<[f3,a3,c4,e4,g4] [f3,a3,c4,e4,g4] [f3,a3,c4,e4,g4] [f3,a3,c4,e4,g4] [d3,f3,a3,c4,e4] [d3,f3,a3,c4,e4] [d3,f3,a3,c4,e4] [d3,f3,a3,c4,e4] [g3,bb3,d4,f4,c5] [g3,bb3,d4,f4,c5] [g3,bb3,d4,f4,c5] [g3,bb3,d4,f4,c5] [c3,e3,g3,bb3,a4] [c3,e3,g3,bb3,a4] [c3,e3,g3,bb3,a4] [c3,e3,g3,bb3,a4] [f3,a3,c4,e4,g4] [f3,a3,c4,e4,g4] [f3,a3,c4,e4,g4] [f3,a3,c4,e4,g4] [d3,f3,a3,c4,e4] [d3,f3,a3,c4,e4] [d3,f3,a3,c4,e4] [d3,f3,a3,c4,e4] [g3,bb3,d4,f4,c5] [g3,bb3,d4,f4,c5] [g3,bb3,d4,f4,c5] [g3,bb3,d4,f4,c5] [c3,e3,g3,bb3,a4] [c3,e3,g3,bb3,a4] [c3,e3,g3,bb3,a4] [c3,e3,g3,bb3,a4]>")
    .struct("~ 1 ~ ~ ~ ~ ~ ~")
    .s("triangle")
    .attack(0.005).decay(0.5).sustain(0.15).release(0.4)
    .lpf(3500)
    .gain(0.28)
    .room(0.35)
    .delay(0.2).delaytime(0.375).delayfeedback(0.3),

  // ============================================================================
  // PAD — sustained vowel-formant pad with PROG-JAZZ extended chord voicings
  //       Fmaj9 / Dm9 / Gm11 / C13 — the 9ths/11ths/13ths give prog richness
  // ============================================================================

  note("<[a3,c4,e4,g4] [a3,c4,e4,g4] [a3,c4,e4,g4] [a3,c4,e4,g4] [f3,a3,c4,e4] [f3,a3,c4,e4] [f3,a3,c4,e4] [f3,a3,c4,e4] [bb3,d4,f4,c5] [bb3,d4,f4,c5] [bb3,d4,f4,c5] [bb3,d4,f4,c5] [e3,g3,bb3,a4] [e3,g3,bb3,a4] [e3,g3,bb3,a4] [e3,g3,bb3,a4] [a3,c4,e4,g4] [a3,c4,e4,g4] [a3,c4,e4,g4] [a3,c4,e4,g4] [f3,a3,c4,e4] [f3,a3,c4,e4] [f3,a3,c4,e4] [f3,a3,c4,e4] [bb3,d4,f4,c5] [bb3,d4,f4,c5] [bb3,d4,f4,c5] [bb3,d4,f4,c5] [e3,g3,bb3,a4] [e3,g3,bb3,a4] [e3,g3,bb3,a4] [e3,g3,bb3,a4]>")
    .s("sawtooth")
    .attack(2).decay(1).sustain(0.8).release(2)
    .lpf(perlin.range(1500, 2800).slow(16)).lpq(2)
    .vowel("<a o e o>".slow(8))
    .gain(0.32)
    .room(0.55)
    .jux(x => x.add(0.08)),

  // ============================================================================
  // HIGH SHIMMER — sparse, REDUCED gain so theremin shines
  // ============================================================================

  note("<f5 a5 c6 a5 a5 c6 d6 c6 d6 f6 g6 f6 g6 e6 c6 e6 f5 a5 c6 a5 a5 c6 d6 c6 d6 f6 g6 f6 g6 e6 c6 e6>").s("sine")
    .attack(0.05).release(0.9)
    .gain(0.12)
    .delay(0.55).delaytime(0.5).delayfeedback(0.5)
    .room(0.7)
    .pan(sine.range(0.3, 0.7).slow(11)),

  // ============================================================================
  // THEREMIN — humor-dominant lead voice, plays bars 1-32 with prog development
  //
  // bars 1-8   THEME    chromatic intro, b5 = "wrong note" gag
  // bars 9-16  CHORUS   elaboration, eb6 chromatic gag, climbs higher
  // bars 17-24 SOLO     prog climax — fast 8th-runs, octave leaps,
  //                       FULL CHROMATIC CLIMB on bar 23 (a-b-c-c#-d-d#-e-f)
  // bars 25-32 OUTRO    return to theme, settle for loop point
  // ============================================================================

  note("<[c6 d6 e6 f6 e6 d6 c6 a5] [f5 a5 c6 e6 g6 e6 c6 a5] [a5 b5 c6 d6 e6 f6 e6 d6] [c6 d6 e6 c6 a5 f5 ~ ~] [d6 c6 a5 d5 f5 a5 c6 e6] [a5 b5 c6 d6 e6 d6 c6 a5] [f5 a5 c6 a5 d6 a5 f5 ~] [a5 c6 d6 c6 a5 f5 d5 ~] [g5 bb5 d6 f6 d6 c6 bb5 g5] [bb5 d6 f6 g6 a6 g6 f6 d6] [bb5 c6 d6 eb6 d6 c6 bb5 g5] [d6 f6 g6 bb6 a6 g6 f6 d6] [c6 e6 g6 bb5 g5 e5 c5 ~] [e6 g6 bb6 c7 bb6 g6 e6 c6] [c6 e6 g6 a6 g6 f#6 g6 e6] [bb5 c6 d6 e6 ~ a5 g5 ~] [c6 d6 e6 f6 g6 a6 c7 a6] [a6 g6 f6 e6 d6 c6 b5 a5] [c6 e6 g6 c7 e7 c7 g6 e6] [f5 a5 c6 e6 g6 e6 c6 a5] [d5 f5 a5 d6 f6 a6 d7 a6] [a6 d7 a6 f6 d6 a5 f5 d5] [a5 b5 c6 c#6 d6 d#6 e6 f6] [a5 c6 e6 g6 a6 g6 e6 c6] [g5 bb5 d6 f6 d6 c6 bb5 g5] [bb5 c6 d6 eb6 d6 c6 bb5 g5] [g5 bb5 d6 f6 g6 f6 d6 ~] [~ ~ f6 d6 bb5 g5 ~ ~] [c6 e6 g6 bb5 g5 e5 c5 ~] [~ ~ g5 bb5 c6 e6 g6 ~] [c6 e6 g6 bb5 ~ a5 g5 ~] [~ e5 c5 a4 ~ ~ ~ ~]>")
    .s("sine")
    .attack(0.02).decay(0.25).sustain(0.7).release(0.4)
    .lpf(8000)
    .gain(0.7)
    .room(0.45)
    .delay(0.4).delaytime(0.375).delayfeedback(0.4)
    .pan(sine.range(0.35, 0.65).slow(7))
).cpm(24)
