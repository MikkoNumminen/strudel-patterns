// Spacepotatis — galaxy overworld
// Genre: ambient space chillout (Tyrian × Stellaris × 90s tracker palette)
// Tempo: ~60 BPM feel, .cpm(15) — 1 cycle = 1 bar of 4 beats
// Key: D minor, modal
// Progression: Dm9 → Fmaj7 → Cmaj9 → Am7 — each held 4 bars (16-bar loop ≈ 64s)
// Role: menu / galaxy overworld music for Spacepotatis (Tyrian-2000-like shooter)
// Notes: no drums, sparse arp, long reverb. "Reminds of itself without rushing."

stack(
  // sub drone — soft sine on chord root, 4 bars per note
  note("<d2 f2 c2 a2>").slow(4)
    .s("sine")
    .attack(2).decay(1).sustain(0.95).release(3)
    .gain(0.7)
    .room(0.45),

  // chord pad — detuned saw stack, slow filter breathing, stereo widened via jux
  note("<[d3,f3,a3,c4,e4] [c3,f3,a3,c4,e4] [c3,e3,g3,b3,d4] [a2,c3,e3,g3,c4]>").slow(4)
    .s("sawtooth")
    .attack(2.5).decay(1.5).sustain(0.85).release(4)
    .lpf(perlin.range(700, 2400).slow(24))
    .lpq(2)
    .gain(0.42)
    .room(0.7)
    .jux(x => x.add(0.12)),

  // pad layer 2 — triangle warmth, voicing in upper-mid for body
  note("<[a3,d4,f4] [a3,c4,f4] [g3,b3,d4] [a3,c4,e4]>").slow(4)
    .s("triangle")
    .attack(3).decay(2).sustain(0.8).release(5)
    .lpf(2200)
    .gain(0.32)
    .room(0.6),

  // bell arp — triangle "stars twinkling", dotted-8th delay, sparse via degrade
  note("<[a4 c5 e5 d5 c5 a4 e5 c5] [a4 c5 f5 c5 a4 f5 a4 c5] [b4 d5 g5 e5 d5 b4 g5 e5] [c5 e5 a5 g5 e5 c5 a5 e5]>").slow(4)
    .s("triangle")
    .attack(0.001).decay(0.4).sustain(0).release(0.6)
    .lpf(5500)
    .gain(0.34)
    .delay(0.55).delaytime(0.375).delayfeedback(0.6)
    .room(0.55)
    .sometimes(x => x.add(12))
    .degradeBy(0.35),

  // distant high shimmer — sparse sine twinkle, wide pan drift
  note("<a5 ~ ~ e6 ~ c6 ~ ~ d6 ~ ~ a5 ~ e6 ~ ~>").slow(4)
    .s("sine")
    .attack(0.01).release(1.4)
    .gain(0.2)
    .delay(0.6).delaytime(0.5).delayfeedback(0.55)
    .room(0.8)
    .pan(sine.range(0.2, 0.8).slow(7)),

  // stellar wind — filtered hat wash, one swell every 8 bars
  s("hh ~ ~ ~ ~ ~ ~ ~").slow(8)
    .attack(2).decay(2).sustain(0.4).release(4)
    .lpf(saw.range(300, 2500).slow(8))
    .hpf(150)
    .gain(0.28)
    .room(0.85)
    .pan(sine.range(0.25, 0.75).slow(11))
).cpm(15)
