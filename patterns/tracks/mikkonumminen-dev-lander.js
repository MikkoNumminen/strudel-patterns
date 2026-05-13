// Mikko Numminen — portfolio landing page ambient drone
// Genre: progressive deep-space ambient (Brian Eno "Apollo" × Stars of the Lid × ST:TNG cues)
// Tempo: cpm(20) — 1 cycle = 1 bar = 3 seconds. Faster than glacial; meditative but moving.
// Key: F lydian — major-mode with raised 4th (B natural = #11) = bright, hopeful,
//      abstract sci-fi positive (Mass Effect / Stellaris / Star Trek TNG main theme).
// Progression: 8 chords × 2 bars (6 s) each = 16-bar loop = 48 s. Every chord change
//              lands inside Mikko's "7 s max per part" rule.
//              F → C → Am → G → C → F → G → C → loop
//              I → V → iii → II → V → I → II → V — modal floating, never cadential.
// Length: 16-bar loop = 48 seconds. Two structural entries inside the loop give
//         3 architectural events between t=0 and t=42 s (chord changes excluded).
// Role: ambient bed for the portfolio landing page (mikkonumminen-dev.vercel.app).
//        No beat, no rhythm — only drift. Should sit behind the page content
//        without demanding attention. Designed to enter or exit at any point.
//
// Visual reference: deep indigo + flying stars + galaxy spiral + solar flare.
// Sonic mirror: warm low end, vast bright space, constant gentle motion, occasional
// shimmer that reads like a passing star — never piercing, always muffled-warm.
//
// v2 change: D Aeolian → F lydian (positive but abstract).
// v3 change: melody layers (stars + far motif) sped up + densified.
// v4 change (per Mikko: "beginning is boring, takes too long. I want more progressive
//             approach. Avoid long pauses. 7 s max length of a part."):
//   - Tempo cpm(10) → cpm(20). 1 bar now 3 s.
//   - Chord progression: 3 chords / 96 s loop → 8 chords / 48 s loop.
//     Every chord = 2 bars = 6 s. No chord sustains longer than 7 s.
//   - Two new structural events INSIDE the loop:
//       bar 3 (t=6 s) : warm pad enters
//       bar 5 (t=12 s): far motif enters
//       bar 15 (t=42 s): both fade out for loop reset
//   - Stars + spectral wash + sub drone + main pad always on = no silence ever
//   - Melody patterns (stars + far motif) preserved; only periods rescaled to cpm(20)
//
// v5 change (per Mikko: "you can randomize it a bit" + "add some scifi/space themed
//             jazzy twist"):
//   - NEW LAYER: JAZZ STAB — triangle Rhodes-style with quartal "So What" voicings
//     (stacked perfect 4ths = canonical modal jazz harmony, Miles Davis Kind of Blue
//     palette). Dotted-8th delay gives the Rhodes-ringing-through-space tail.
//     1 stab per chord arrival = 8 opportunities per loop, degradeBy(0.55) drops
//     ~half → ~4 audible stabs per 48 s. .sometimes(add(12)) jumps half of them
//     up an octave for spatial variety.
//   - Stars: added .sometimes(x => x.add(12)) for occasional octave-up sparkle
//   - Far motif: added .sometimes(x => x.add(-5)) for occasional 4th-down jazz
//     ornament (existing add(7) already gave 5th-up; pair them = quartal motion)
//   - All other layers preserved verbatim from v4
//
// Audible-event budget inside one 48 s loop:
//   t=0      track begins (sub + pad + stars + wash already audible)
//   t=3-6    star twinkles (every ~3 s)
//   t=6      warm pad swells in + chord 2 (Cmaj9)
//   t=12     far motif first note + chord 3 (Am9)
//   t=18     chord 4 (G(add9))
//   t=24     chord 5 (Cmaj9 return)
//   t=30     chord 6 (Fmaj7#11 return — home)
//   t=36     chord 7 (G(add9) — lift before loop)
//   t=42     chord 8 (Cmaj9) + warm pad and motif fade
//   t=48     loop point
//
// Design rules (unchanged from v1):
//   - No rhythmic elements (no kick, no hat, no bass ostinato)
//   - All attacks soft (>0.5 s) — no transients, only swells
//   - Every layer LPF or BPF capped under ~2.5 kHz; 2–6 kHz pain band stays empty
//   - Stereo via jux + perlin pan drift, never hard-panned
//   - degradeBy on the sparkles so no two loop passes hit identically

stack(
  // ============================================================================
  // SUB DRONE — sine on chord-root pedal. Foundation. Roots track the 8 chords.
  //              f1 → c2 → a1 → g1 → c2 → f1 → g1 → c2 (each 2 cycles = 6 s)
  // ============================================================================

  note("<f1 c2 a1 g1 c2 f1 g1 c2>").slow(2).s("sine")
    .attack(3).decay(1).sustain(0.95).release(5)
    .gain(0.65)
    .room(0.5),

  // ============================================================================
  // MAIN PAD — detuned saw stack, vowel formant, slow perlin filter breathing.
  //             8-chord progression in F lydian. Long-tailed envelope means
  //             chords overlap on the transitions = continuous evolution.
  // ============================================================================

  note("<[f2,a2,c3,e3,g3,b3] [c3,e3,g3,b3,d4] [a2,c3,e3,g3,b3] [g2,b2,d3,a3] [c3,e3,g3,b3,d4] [f2,a2,c3,e3,g3,b3] [g2,b2,d3,a3] [c3,e3,g3,b3,d4]>").slow(2)
    .s("sawtooth")
    .attack(3.5).decay(2).sustain(0.9).release(6)
    .lpf(perlin.range(600, 2000).slow(30)).lpq(2)
    .vowel("<o u a o>".slow(24))
    .gain(sine.range(0.26, 0.38).slow(20))
    .room(0.85)
    .jux(x => x.add(0.08)),

  // ============================================================================
  // WARM PAD — triangle warmth in upper-mid. Enters bar 3 (t=6 s), exits bar 15.
  //             Mask "<0 1 1 1 1 1 1 0>".slow(2) gates the 8-chord pattern:
  //             chord 1 (bars 1-2) off, chords 2-7 on, chord 8 (bars 15-16) off.
  // ============================================================================

  note("<[c4,e4,a4] [e3,g3,b3] [c4,e4,g4] [b3,d4,a4] [e3,g3,b3] [c4,e4,a4] [b3,d4,a4] [e3,g3,b3]>").slow(2)
    .mask("<0 1 1 1 1 1 1 0>".slow(2))
    .s("triangle")
    .attack(4).decay(1.5).sustain(0.85).release(6)
    .lpf(2000)
    .gain(0.26)
    .room(0.75)
    .jux(x => x.add(0.05)),

  // ============================================================================
  // DISTANT STARS — sparse sine twinkles. Always on. v3 pattern preserved.
  //                  At cpm(20) with slow(16) = 16 events / 16 cycles = 1 per 3 s.
  //                  Bandpass 800–2000 Hz keeps them muffled-warm, not glassy.
  // ============================================================================

  note("<a4 ~ c5 b4 ~ d5 c5 ~ e5 ~ b4 a4 ~ d5 ~ c5>").slow(16)
    .s("sine")
    .attack(0.6).decay(0.4).sustain(0.3).release(3)
    .bpf(perlin.range(800, 2000).slow(11)).bpq(4)
    .gain(0.2)
    .delay(0.6).delaytime(0.5).delayfeedback(0.6)
    .room(0.88)
    .pan(perlin.range(0.15, 0.85).slow(13))
    .sometimes(x => x.add(12))
    .degradeBy(0.45),

  // ============================================================================
  // SPECTRAL WASH — bandpassed noise, slow overlapping swells. Always on.
  //                  Reads as "solar wind" / "cosmic background radiation".
  // ============================================================================

  s("white")
    .attack(2).decay(1).sustain(0.55).release(3.5)
    .bpf(perlin.range(600, 1800).slow(20)).bpq(7)
    .gain(0.1)
    .pan(sine.range(0.2, 0.8).slow(17))
    .room(0.8),

  // ============================================================================
  // FAR MOTIF — sparse "passing constellation". Enters bar 5 (t=12 s), exits bar 15.
  //              Mask "<0 0 1 1 1 1 1 0>".slow(2) gates the 8-chord-aligned pattern.
  //              v3 pattern preserved; .sometimes(add(7)) gives 5th-up variety.
  // ============================================================================

  note("<a4 ~ d5 ~ ~ c5 ~ e5 ~ ~ g5 ~ ~ a4 ~ b4>").slow(16)
    .mask("<0 0 1 1 1 1 1 0>".slow(2))
    .s("triangle")
    .attack(1.2).decay(0.5).sustain(0.3).release(4)
    .lpf(2200)
    .gain(0.22)
    .delay(0.7).delaytime(0.5).delayfeedback(0.65)
    .room(0.9)
    .pan(perlin.range(0.2, 0.8).slow(19))
    .sometimes(x => x.add(7))
    .sometimes(x => x.add(-5))
    .degradeBy(0.3),

  // ============================================================================
  // JAZZ STAB — sparse Rhodes-style triangle with quartal "So What" voicings.
  //              Stacked perfect 4ths (the canonical modal jazz quartal sound,
  //              Miles Davis Kind of Blue). Dotted-8th delay = the ringing-through-
  //              space Rhodes tail. degradeBy(0.55) keeps it sparse (~4 audible
  //              stabs per 48 s loop); sometimes(add(12)) jumps half of them an
  //              octave up for spatial variety. This is the sci-fi/space jazz twist.
  // ============================================================================

  note("<[c3,f3,b3,e4] [d3,g3,c4,f4] [e3,a3,d4,g4] [d3,g3,c4,f4] [d3,g3,c4,f4] [c3,f3,b3,e4] [d3,g3,c4,f4] [d3,g3,c4,f4]>").slow(2)
    .s("triangle")
    .attack(0.05).decay(1).sustain(0.1).release(4)
    .lpf(2200)
    .gain(0.22)
    .delay(0.55).delaytime(0.375).delayfeedback(0.55)
    .room(0.7)
    .pan(perlin.range(0.3, 0.7).slow(13))
    .sometimes(x => x.add(12))
    .degradeBy(0.55)
).cpm(20)
