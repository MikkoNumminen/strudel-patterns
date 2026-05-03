// Spacepotatis — storymusic 2 (Galaxy Transition Narrative — Tubernovae Cluster warp)
// Genre: ambient sci-fi storytelling underscore — ultra positive with progression
// Tempo: 60 BPM, .cpm(15) — 1 cycle = 1 bar of 4 beats = 4 seconds
// Key: C major foundation, chord progressions evolving by section
// Length: 20 bars = 80 seconds (covers ~78s narration + 2s tail)
// Role: background music for the Tubernovae Cluster transition narration —
//       grandmotherly storytelling voice on top, warp drive countdown payoff at the end.
//
// Narrative-aligned section structure:
//   bars 1–4   (0–16s)   A — peaceful retrospective    C – G – Am – F
//                          "Sol Spudensis grows quiet... potato fields harvested..."
//   bars 5–8   (16–32s)  B — discovery, harmonic motion F – G – Em – Am
//                          "But universe doesn't rest. Long range scanners..."
//   bars 9–12  (32–48s)  C — mystery, exploration       Am – F – C – G
//                          "Pirate outposts. Mutated crops. Weapons unlike anything."
//   bars 13–16 (48–64s)  D — resolve, anticipation      F – C – G – C
//                          "Our next harvest. Warp drive engaged. Battle stations."
//   bars 17–20 (64–80s)  E — countdown to WARP, climax  C – F – G – C
//                          "Three... two... one... PUNCH IT."
//
// "Ultra positive" + "brings a change" delivered by:
//   - C major foundation; mostly I-IV-V chords with vi/iii color for depth
//   - Motif climbs higher each section (oct 4-5 → oct 6-7 by climax)
//   - Pad LPF gradually opens 1200 → 3000 Hz across the full 80s = the journey
//   - Vowel formant cycles a-o-e-o-a-o for organic sci-fi color motion
//   - WARP SWELL enters at bar 17 = countdown begins, filter blooms over 4 bars
//   - WARP STINGER hits at bar 20 = "Punch it!" — sustained chord burst with room

stack(
  // ============================================================================
  // SUB DRONE — sine on chord roots, foundation through all 20 bars
  // ============================================================================

  // 20 chord roots (one per bar): C-G-Am-F  F-G-Em-Am  Am-F-C-G  F-C-G-C  C-F-G-C
  note("<c2 g1 a1 f1 f1 g1 e1 a1 a1 f1 c2 g1 f1 c2 g1 c2 c2 f1 g1 c2>").s("sine")
    .attack(2).decay(1).sustain(0.95).release(3)
    .gain(0.6).room(0.4),

  // ============================================================================
  // CHORD PAD — sustained vowel-formant sci-fi pad, evolves with chord changes
  //              LPF gradually opens across the full 80s = the journey arc
  // ============================================================================

  note("<[c3,e3,g3] [g2,b2,d3] [a2,c3,e3] [f2,a2,c3] [f2,a2,c3] [g2,b2,d3] [e3,g3,b3] [a2,c3,e3] [a2,c3,e3] [f2,a2,c3] [c3,e3,g3] [g2,b2,d3] [f2,a2,c3] [c3,e3,g3] [g2,b2,d3] [c3,e3,g3] [c3,e3,g3] [f2,a2,c3] [g2,b2,d3] [c3,e3,g3]>")
    .s("sawtooth")
    .attack(2).decay(1).sustain(0.85).release(3)
    .lpf(saw.range(1200, 3000).slow(20))
    .lpq(2)
    .vowel("<a o e o a o>".slow(20))
    .gain(0.32)
    .room(0.6)
    .jux(x => x.add(0.1)),

  // ============================================================================
  // MOTIF — main melodic theme, climbs higher each section to mirror the journey
  //   Section A: oct 4-5 (peaceful, low arpeggios)
  //   Section B: oct 5   (discovery, mid range)
  //   Section C: oct 5-6 (mystery, climbing)
  //   Section D: oct 6-7 (anticipation, peaks at c7/d7)
  //   Section E: oct 5-6 (final phrase, settles)
  // ============================================================================

  note("<[c5 e5 g5 c6] [b4 d5 g5 b5] [a4 c5 e5 a5] [f4 a4 c5 f5] [f5 a5 c6 a5] [g5 b5 d6 b5] [e5 g5 b5 e6] [a4 c5 e5 a5] [a5 c6 e6 c6] [f5 a5 c6 f6] [c6 e6 g6 e6] [b5 d6 g6 d6] [f5 a5 c6 e6] [c6 e6 g6 c7] [d6 g6 b6 d7] [c6 e6 g6 c7] [c5 e5 g5 c6] [f5 a5 c6 f6] [g5 b5 d6 g6] [c5 e5 g5 c6]>")
    .s("triangle")
    .attack(0.05).decay(0.4).sustain(0.7).release(0.6)
    .lpf(5500)
    .gain(0.4)
    .delay(0.45).delaytime(0.5).delayfeedback(0.4)
    .room(0.5)
    .jux(x => x.add(0.08)),

  // ============================================================================
  // HIGH SHIMMER — sparse sine sparkles, density INCREASES toward warp climax
  //                bar 1-12: mostly rests, one note every 1-2 bars
  //                bar 13-20: more notes per bar, climbing higher
  // ============================================================================

  note("<e6 ~ ~ b5 d6 ~ c6 ~ a5 e6 c6 e6 c6 e6 g6 b6 c7 e7 g7 c7>").s("sine")
    .attack(0.05).release(1.0)
    .gain(0.18)
    .delay(0.55).delaytime(0.5).delayfeedback(0.5)
    .room(0.75)
    .pan(sine.range(0.3, 0.7).slow(11)),

  // ============================================================================
  // WARP SWELL — sustained C major triangle chord, bars 17-20 only
  //              filter opens 1000 → 7000 Hz across the countdown bars,
  //              gain ramps 0.15 → 0.55 = "warp drive spinning up"
  // ============================================================================

  note("[c4,e4,g4,c5]").s("triangle")
    .attack(2).decay(1).sustain(0.9).release(3)
    .lpf(saw.range(1000, 7000).slow(4))
    .lpq(2)
    .gain(saw.range(0.15, 0.55).slow(4))
    .room(0.7)
    .jux(x => x.add(0.08))
    .mask("<0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1>"),

  // ============================================================================
  // WARP STINGER — final "Punch it!" moment at bar 20
  //                full C major chord burst with heavy room and delay tail
  // ============================================================================

  note("[c5,e5,g5,c6,e6]").s("triangle")
    .attack(0.01).decay(1.5).sustain(0).release(3)
    .lpf(8000)
    .gain(0.4)
    .room(0.85)
    .delay(0.6).delaytime(0.5).delayfeedback(0.55)
    .mask("<0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1>")
).cpm(15)
