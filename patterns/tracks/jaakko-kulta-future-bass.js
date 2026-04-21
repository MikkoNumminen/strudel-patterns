// Jaakko kulta — uplifting trance edition
// Genre: uplifting trance × future bass sparkle
// Tempo: 132 BPM  →  .cpm(33)  (cycles/min: 1 cycle = 1 bar of 4 beats)
// Key: C major (I–V–vi–IV : C–G–Am–F)
// Role: full track — Finnish children's canon as uplifting trance anthem
// Structure: Main (1–8) → Buildup (9–11) → Silence/impact (12) → Drop 2 (13–16)
//
// Iteration 2026-04-22 notes:
//   CHANGED: tempo .cpm(132) → .cpm(33). Earlier version was gabber-fast because
//            cpm counts cycles/min (1 cycle = 1 bar = 4 beats), so cpm(132) with
//            bd*4 played 528 kicks/min. cpm(33) gives 33 × 4 = 132 BPM.
//   NEW:     sub bass (sine, sustained) + rolling offbeat mid bass (saw, 16ths).
//   NEW:     supersaw chord pad — plays THROUGHOUT including buildup (trance wash).
//   NEW:     explicit buildup: kick mask-out, accelerating sd*4→8→16 roll,
//            stepwise pitch riser C-E-G, filter+gain sweep, bar 12 silence, impact.

stack(
  // ============ DRUMS ============
  // driving four-on-the-floor kick, OUT during buildup+silence bars 9–12
  s("bd*4").gain(0.95).shape(0.22)
    .mask("<1 1 1 1 1 1 1 1 0 0 0 0 1 1 1 1>"),
  // backbeat clap
  s("~ cp ~ cp").gain(0.65).room(0.22).hpf(400)
    .mask("<1 1 1 1 1 1 1 1 0 0 0 0 1 1 1 1>"),
  // main 16th hats, velocity bounce
  s("hh*16").gain(perlin.range(0.22, 0.4).fast(4)).hpf(6500)
    .mask("<1 1 1 1 1 1 1 1 0 0 0 0 1 1 1 1>"),
  // open hat sparkle on the "and" of 4
  s("~ ~ ~ oh").gain(0.4).hpf(5500)
    .mask("<1 1 1 1 1 1 1 1 0 0 0 0 1 1 1 1>"),
  // NEW: extra snare backbone for drop 2
  s("~ ~ ~ [sd sd]").gain(0.42).hpf(500)
    .mask("<0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1>"),
  // NEW: accelerating snare roll during buildup (bars 9–11: 4→8→16 hits)
  s("<sd*4 sd*8 sd*16 sd*32>").gain(sine.range(0.35, 0.8).slow(4)).hpf(500)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0>"),

  // ============ BASS (NEW — depth) ============
  // sub bass — sustained sine, C–G–Am–F roots
  note("<c2 g1 a1 f1>").s("sine")
    .attack(0.03).decay(0.2).sustain(0.95).release(0.35)
    .gain(0.85)
    .mask("<1 1 1 1 1 1 1 1 0 0 0 0 1 1 1 1>"),
  // rolling offbeat mid bass — classic trance 16ths between kicks
  note("<c3 g2 a2 f2>")
    .struct("~ 1 1 1 ~ 1 1 1 ~ 1 1 1 ~ 1 1 1")
    .s("sawtooth")
    .lpf(sine.range(650, 1500).slow(16)).lpq(9)
    .attack(0.003).decay(0.08).sustain(0).release(0.09)
    .gain(0.58)
    .mask("<1 1 1 1 1 1 1 1 0 0 0 0 1 1 1 1>"),

  // ============ HARMONY ============
  // NEW: supersaw chord pad — plays THROUGHOUT, holds tonality through buildup
  note("<[c4, e4, g4] [g3, b3, d4] [a3, c4, e4] [f3, a3, c4]>")
    .s("sawtooth")
    .attack(0.35).decay(0.3).sustain(0.8).release(1.3)
    .lpf(sine.range(1800, 3800).slow(8)).lpq(4)
    .gain(0.45).room(0.4)
    .jux(x => x.add(0.12)),
  // trance pluck arp — triangle with dotted-8th delay feedback, out during buildup
  note("<[c5 e5 g5 e5] [g4 b4 d5 b4] [a4 c5 e5 c5] [f4 a4 c5 a4]>*2")
    .s("triangle")
    .attack(0.001).decay(0.12).sustain(0).release(0.09)
    .lpf(6200).gain(0.48)
    .delay(0.4).delaytime(0.1875).delayfeedback(0.5)
    .every(4, x => x.add(12))
    .mask("<1 1 1 1 1 1 1 1 0 0 0 0 1 1 1 1>"),

  // ============ MELODY ============
  // Jaakko kulta on bright detuned supersaw, wide stereo via jux
  note("c4 d4 e4 c4 c4 d4 e4 c4 e4 f4 g4 ~ e4 f4 g4 ~ [g4 a4] [g4 f4] e4 c4 [g4 a4] [g4 f4] e4 c4 c4 g3 c4 ~ c4 g3 c4 ~")
    .slow(8)
    .s("sawtooth")
    .attack(0.01).decay(0.25).sustain(0.8).release(0.22)
    .lpf(6500).gain(0.7).room(0.22)
    .jux(x => x.add(0.15))
    .mask("<1 1 1 1 1 1 1 1 0 0 0 0 1 1 1 1>"),
  // octave-up triangle double — drop 2 sparkle
  note("c5 d5 e5 c5 c5 d5 e5 c5 e5 f5 g5 ~ e5 f5 g5 ~ [g5 a5] [g5 f5] e5 c5 [g5 a5] [g5 f5] e5 c5 c5 g4 c5 ~ c5 g4 c5 ~")
    .slow(8)
    .s("triangle")
    .attack(0.001).release(0.14).gain(0.35)
    .delay(0.28).delaytime(0.1875).delayfeedback(0.35)
    .mask("<0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1>"),

  // ============ BUILDUP FX (NEW) ============
  // stepwise pitch riser c3→e3→g3 (C-major arpeggio climbing), filter+gain opening
  note("<~ ~ ~ ~ ~ ~ ~ ~ c3 e3 g3 ~ ~ ~ ~ ~>")
    .s("sawtooth")
    .attack(0.08).decay(0.2).sustain(0.85).release(0.5)
    .lpf(saw.range(600, 9000).slow(4)).lpq(10)
    .gain(saw.range(0.25, 0.7).slow(4)).room(0.3),
  // fast hat sweep riser during buildup
  s("hh*32").gain(saw.range(0.15, 0.55).slow(4))
    .hpf(saw.range(2000, 13000).slow(4))
    .mask("<0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0>"),

  // ============ EAR CANDY ============
  // crash on each drop transition (bar 1 and bar 13)
  s("crash").gain(0.7).room(0.5)
    .mask("<1 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0>"),
  // NEW: muted impact on bar 12 (the silent anticipation bar)
  s("crash").gain(0.5).room(0.45).lpf(3500)
    .mask("<0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0>")
).cpm(33)
