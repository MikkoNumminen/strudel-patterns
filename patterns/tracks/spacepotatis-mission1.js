// Spacepotatis — mission 1 theme (combat / level music)
// Genre: cyberpunk combat synthwave (Tyrian × futuristic synthpop × sci-fi formant pad)
// Tempo: 132 BPM, .cpm(33) — 1 cycle = 1 bar of 4 beats
// Key: A minor — Am – F – C – G  (i-VI-III-VII), 4-bar chord cycle
// Role: combat / level music for the first mission of Spacepotatis. Builds, drops, drives.
//
// Structure (32-bar loop, ~58s at 132 BPM):
//   bars 1–4   intro      sub drone + low-passed pad + distant shimmer
//   bars 5–8   build      pitch riser + accelerating snare roll + hat sweep
//   bar  9     IMPACT     crash + drop into main groove
//   bars 9–32  groove     full kit + bass + arp + melody + shimmer (chord cycle × 6)
//
// Futuristic upgrades vs v1: vowel-formant chord pad, brighter bass filter,
// occasional bit-crush glitches on arp, high-octave sine shimmer, buildup arc.

stack(
  // ============================== BUILDUP (bars 1-8) ==============================

  // BUILDUP — sub drone, pedal on root through the buildup
  note("a1").s("sine")
    .attack(2).decay(1).sustain(0.95).release(2)
    .gain(0.7).room(0.4)
    .mask("<1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0>"),

  // BUILDUP — sparse intro pad, filter slowly opening over 8 bars, vowel warble
  note("[a3,c4,e4,g4]").s("sawtooth")
    .attack(2.5).decay(1).sustain(0.85).release(3)
    .lpf(saw.range(500, 4500).slow(8))
    .lpq(3)
    .vowel("<a o>".slow(8))
    .gain(0.4).room(0.6)
    .jux(x => x.add(0.1))
    .mask("<1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0>"),

  // BUILDUP — distant high shimmer twinkle, sets the "in space" mood early
  note("<a5 ~ ~ e6 ~ c6 ~ ~ d6 ~ ~ a5 ~ e6 ~ ~>").s("sine")
    .attack(0.01).release(1.2)
    .gain(0.18)
    .delay(0.6).delaytime(0.5).delayfeedback(0.55)
    .room(0.8)
    .pan(sine.range(0.2, 0.8).slow(7))
    .mask("<1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0>"),

  // BUILD — pitch-rising saw riser, bars 5-8 (0→24 semitones across 4 cycles)
  note("a3").add(saw.range(0, 24).slow(4)).s("sawtooth")
    .attack(0.05).decay(0.3).sustain(0.8).release(0.4)
    .lpf(saw.range(800, 6500).slow(4)).lpq(4)
    .gain(saw.range(0.15, 0.6).slow(4))
    .room(0.4)
    .mask("<0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0>"),

  // BUILD — accelerating snare roll across bars 5-8
  s("<sd*2 sd*4 sd*8 sd*16>").gain(sine.range(0.4, 0.85).slow(4)).hpf(500)
    .mask("<0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0>"),

  // BUILD — hat sweep opening up, bars 5-8
  s("hh*32").gain(saw.range(0.2, 0.5).slow(4))
    .hpf(saw.range(2000, 13000).slow(4))
    .mask("<0 0 0 0 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0>"),

  // IMPACT — drop crash, fires once at bar 9
  s("crash").gain(0.85).room(0.55)
    .mask("<0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0>"),

  // ============================== MAIN GROOVE (bars 9-32) ==============================

  // kick — driving 4-on-the-floor
  s("bd*4").gain(0.95).shape(0.28)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1>"),

  // clap — backbeat on 2 & 4 (gated synthwave snare feel)
  s("~ cp ~ cp").gain(0.7).hpf(300).room(0.22)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1>"),

  // closed hats — 8th drive, velocity wiggle, monophonic via cut group
  s("hh*8").gain(sine.range(0.3, 0.55).fast(2)).hpf(7200).cut(1)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1>"),

  // 16th hat fill — bar 4 of each main-groove 4-bar phrase (cycles 12, 16, 20, 24, 28, 32)
  s("hh*16").gain(0.32).hpf(9000).cut(1)
    .mask("<0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 0 0 0 1 0 0 0 1 0 0 0 1 0 0 0 1>"),

  // open hat — offbeat synthwave heartbeat
  s("~ ~ oh ~").gain(0.42).hpf(5500)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1>"),

  // bass — saw, octave-bouncing 8ths (Tyrian "Mars" idiom)
  // CHANGED: filter range bumped 600-2400 → 800-3200 for brighter cyberpunk edge
  note("<[a1 a2 a1 e2 a1 a2 a1 e2] [f1 f2 f1 c2 f1 f2 f1 c2] [c2 c3 c2 g2 c2 c3 c2 g2] [g1 g2 g1 d2 g1 g2 g1 d2]>")
    .s("sawtooth")
    .attack(0.005).decay(0.1).sustain(0).release(0.06)
    .lpf(sine.range(800, 3200).slow(8))
    .lpq(7).shape(0.28).gain(0.72)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1>"),

  // chord pad — detuned saw stack, fake sidechain via 4-ducks-per-cycle gain LFO
  // NEW: vowel formant cycling a-o-e-i for futuristic warble
  note("<[a3,c4,e4] [f3,a3,c4] [c4,e4,g4] [g3,b3,d4]>")
    .s("sawtooth")
    .attack(0.4).decay(0.3).sustain(0.7).release(0.6)
    .lpf(2400).lpq(2)
    .gain(sine.range(0.2, 0.45).fast(4))
    .room(0.35)
    .vowel("<a o e i>".slow(4))
    .jux(x => x.add(0.1))
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1>"),

  // arp lead — triangle 8ths, dotted-8th delay, octave-up every 4 cycles
  // NEW: 10% chance of bit-crushed glitch per cycle for cyberpunk grit
  note("<[a4 c5 e5 c5 a4 c5 e5 g5] [f4 a4 c5 a4 f4 a4 c5 e5] [c5 e5 g5 e5 c5 e5 g5 b5] [g4 b4 d5 b4 g4 b4 d5 f5]>")
    .s("triangle")
    .attack(0.001).decay(0.16).sustain(0).release(0.18)
    .lpf(7200).gain(0.42)
    .delay(0.4).delaytime(0.1875).delayfeedback(0.45)
    .room(0.22)
    .every(4, x => x.add(12))
    .sometimesBy(0.1, x => x.crush(6))
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1>"),

  // melody hook — bright major-key phrasing, upper register, climbing to a C-major peak on bar 3
  // CHANGED: rewrote phrases for "duri" brightness — leans on C-major center
  //   bar 1 (over Am)  c-e-g-a   — Am9 with major-leaning top
  //   bar 2 (over F)   a-c-f-e   — Fmaj7 + 9, sustained high
  //   bar 3 (over C)   g-c-e     — THE PEAK, C-major triad in upper octave
  //   bar 4 (over G)   d-g-b-d   — G triad with 9th, descending to loop back
  // CHANGED: lpf range 2400-4800 → 3000-6500, gain 0.5 → 0.6, snappier attack
  // KEPT: every(8, fast(2)) — the fast solo bursts you called "diamond"
  note("<[c5 e5 g5 a5 g5 e5 c5 e5] [a5 c6 a5 g5 f5 a5 c6 e6] [g5 c6 e6 c6 g5 e5 c5 g4] [d5 g5 b5 d6 b5 a5 g5 d5]>")
    .s("sawtooth")
    .attack(0.01).decay(0.35).sustain(0.55).release(0.28)
    .lpf(sine.range(3000, 6500).slow(8))
    .gain(0.6).room(0.2)
    .jux(x => x.add(0.12))
    .every(8, x => x.fast(2))
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1>"),

  // NEW — high-octave sine shimmer drifting across stereo, sci-fi sparkle
  note("<a6 ~ ~ e6 ~ c6 ~ ~ d6 ~ b5 ~ ~ a5 ~ ~>").s("sine")
    .attack(0.01).release(0.9)
    .gain(0.18)
    .delay(0.55).delaytime(0.375).delayfeedback(0.5)
    .room(0.7)
    .pan(sine.range(0.2, 0.8).slow(11))
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1>"),

  // crash — phrase-top accent (cycles 8, 16, 24 of the loop)
  s("crash ~ ~ ~ ~ ~ ~ ~").slow(8).gain(0.55).room(0.45)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1>")
).cpm(33)
