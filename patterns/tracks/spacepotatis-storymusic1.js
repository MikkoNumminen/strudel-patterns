// Spacepotatis — storymusic 1 (The Great Potato Awakening — opening narration underscore)
// Genre: ambient sci-fi storytelling underscore, voiceover bed
// Tempo: 60 BPM, .cpm(15) — 1 cycle = 1 bar of 4 beats = 4 seconds
// Key: A minor — Am – F – G – Am  (i-VI-VII-i), each chord 2 bars
// Length: 8 bars = 32 seconds (covers 30s narration with a 2s tail to resolve)
// Role: background music for the opening narration of Spacepotatis,
//        read aloud by a grandmotherly storytelling voice.
//
// Narration sync (target):
//   bar 1-2 (Am, 0-8s):   "Long ago, in a quiet Finnish garden, a humble potato grew tired of being mashed."
//   bar 3-4 (F,  8-16s):  "So it did what any self-respecting tuber would do —"
//                         "it grew engines, sprouted lasers, and launched itself into space."
//   bar 5-6 (G,  16-24s): "Now it fights the bugs."  (G = tension lift = "fighting")
//   bar 7-8 (Am, 24-32s): "For all potatoes. Forever."  (resolution back home)
//
// VO MIXING PHILOSOPHY:
//   - Sub-bass (oct 1) and high shimmer (oct 6+) are prominent — they sit BELOW
//     and ABOVE the vocal range, so they never mask the grandmother's voice.
//   - Mid-range pad sits at LOW gain (0.32) so the voice rides clearly on top.
//   - Pad LPF slowly opens 800 → 2200 Hz over all 32s = "awakening" arc.
//   - Motif plays only 4 sustained notes across 32s (one every ~8s) — sparse on
//     purpose so the listener's ear stays on the voice, not the music.
//   - No drums. No rhythm. Pure atmosphere.

stack(
  // ============================================================================
  // SUB DRONE — sine on chord roots, foundation. Well below voice fundamentals.
  // ============================================================================

  // Am - F - G - Am, each held 2 cycles (8s)
  note("<a1 a1 f1 f1 g1 g1 a1 a1>").s("sine")
    .attack(2).decay(1).sustain(0.95).release(3)
    .gain(0.6).room(0.4),

  // ============================================================================
  // CHORD PAD — sustained saw stack, slow filter open ("awakening"), vowel formant
  // ============================================================================

  // each chord doubled across 2 cycles for 8s sustain
  // LPF starts at 800 Hz (dark) and opens to 2200 Hz over the full 32s
  // vowel cycles a-o-e-o for subtle organic motion
  // gain 0.32 keeps it BEHIND the voice
  note("<[a3,c4,e4] [a3,c4,e4] [f3,a3,c4] [f3,a3,c4] [g3,b3,d4] [g3,b3,d4] [a3,c4,e4] [a3,c4,e4]>")
    .s("sawtooth")
    .attack(3).decay(2).sustain(0.85).release(4)
    .lpf(saw.range(800, 2200).slow(8))
    .lpq(2)
    .vowel("<a o e o>".slow(8))
    .gain(0.32)
    .room(0.7)
    .jux(x => x.add(0.1)),

  // ============================================================================
  // HIGH SHIMMER — sparse sine sparkles in oct 6, well above vocal range,
  //                long delay tails + slow stereo drift = sci-fi atmosphere
  // ============================================================================

  // 4 sustained notes across 32s (one every 8s), aligned with chord changes
  note("<e6 ~ a6 ~ b6 ~ e6 ~>").s("sine")
    .attack(0.5).release(3)
    .gain(0.2)
    .delay(0.6).delaytime(0.5).delayfeedback(0.55)
    .room(0.85)
    .pan(sine.range(0.3, 0.7).slow(11)),

  // ============================================================================
  // MOTIF — memorable 4-note "storytelling" phrase, triangle wave
  //         a4 (Am, "long ago") → c5 (F, "did what any tuber would")
  //         → e5 (G, "fights the bugs", PEAK) → a4 (Am return, "forever")
  //         each note held 2 bars (8s); long release blends one note into the next
  // ============================================================================

  note("<a4 ~ c5 ~ e5 ~ a4 ~>").s("triangle")
    .attack(0.8).decay(1).sustain(0.7).release(3)
    .lpf(3500)
    .gain(0.35)
    .delay(0.45).delaytime(0.5).delayfeedback(0.4)
    .room(0.55)
    .jux(x => x.add(0.08))
).cpm(15)
