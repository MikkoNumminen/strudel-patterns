// Spacepotatis — galaxy overworld 2 (Tubernovae Cluster — advanced-tech civilization)
// Genre: ambient space chillout with sci-fi tech nuance (Tyrian × Stellaris × Mass Effect)
// Tempo: ~60 BPM feel, .cpm(15) — 1 cycle = 1 bar of 4 beats
// Key: E dorian, with a Cmaj7(#11) lydian borrow = "alien advanced tech" sparkle
// Progression: Em9 → Bm9 → Cmaj7(#11) → Am9 — each held 4 bars (16-bar loop ≈ 64s)
// Role: galaxy overworld music for the Tubernovae Cluster — same Stellaris-paced
//        contemplative bed as galaxy 1, but recolored to feel foreign + technological:
//          - lydian #11 in Cmaj7 = "their tech is ahead of ours"
//          - square-wave tracker arp replaces the soft triangle bell = computer/data feel
//          - mid-range sonar swell every 4 bars = scanner sweep
//          - bandpassed data burst every 8 bars = distant comms chatter
// v2 fix: original sonar (e7/f#7/g7) and transmission (e6/b6/d7) sat right on the
//          ear-pain band (2–4 kHz). Both now live in the mid range with softer
//          envelopes + bandpass shaping — same tech roles, no piercing beep.
// Notes: no drums, sparse, long reverb. Reminds of galaxy 1 without repeating it.

stack(
  // sub drone — sine on chord roots, 4 bars per note
  note("<e2 b1 c2 a1>").slow(4)
    .s("sine")
    .attack(2).decay(1).sustain(0.95).release(3)
    .gain(0.7)
    .room(0.45),

  // chord pad — detuned saw stack, lydian #11 voicings, slow filter breathing
  note("<[e3,g3,b3,d4,f#4] [b2,d3,f#3,a3,c#4] [c3,e3,g3,b3,f#4] [a2,c3,e3,g3,b3]>").slow(4)
    .s("sawtooth")
    .attack(2.5).decay(1.5).sustain(0.85).release(4)
    .lpf(perlin.range(700, 2600).slow(24))
    .lpq(2)
    .gain(0.42)
    .room(0.7)
    .jux(x => x.add(0.12)),

  // pad layer 2 — triangle warmth, voicing in upper-mid for body
  note("<[g3,b3,e4] [f#3,a3,d4] [e3,g3,b3] [a3,c4,e4]>").slow(4)
    .s("triangle")
    .attack(3).decay(2).sustain(0.8).release(5)
    .lpf(2200)
    .gain(0.3)
    .room(0.6),

  // tracker arp — square wave, sequenced 8th-note arpeggio = computer/data-stream feel
  //                replaces galaxy 1's soft triangle bell with a tighter, more digital voice
  note("<[e5 g5 b5 g5 d6 b5 g5 e5] [f#5 a5 c#6 a5 e6 c#6 a5 f#5] [g5 b5 e6 b5 f#6 e6 b5 g5] [a5 c6 e6 c6 g6 e6 c6 a5]>").slow(4)
    .s("square")
    .attack(0.001).decay(0.18).sustain(0).release(0.35)
    .lpf(4200).lpq(3)
    .gain(0.22)
    .delay(0.5).delaytime(0.375).delayfeedback(0.55)
    .room(0.5)
    .pan(sine.range(0.2, 0.8).slow(5))
    .degradeBy(0.18),

  // alien sonar swell — slow sine pulse-in mid range, one hit every 4 bars = scanner cycle
  //                      soft 0.4s attack + LPF 2200 = pulses IN rather than beeps,
  //                      pitched 2 oct lower than v1 to stay out of the 2–4 kHz pain band
  note("<e5 ~ ~ ~ f#5 ~ ~ ~ g5 ~ ~ ~ a4 ~ ~ ~>").slow(4)
    .s("sine")
    .attack(0.4).decay(0.6).sustain(0.5).release(2.8)
    .lpf(2200).lpq(2)
    .gain(0.3)
    .delay(0.7).delaytime(0.5).delayfeedback(0.65)
    .room(0.85)
    .pan(sine.range(0.15, 0.85).slow(13)),

  // distant high shimmer — sparse sine twinkle, wide pan drift (galaxy 1's signature glue)
  note("<b5 ~ ~ f#6 ~ d6 ~ ~ e6 ~ ~ b5 ~ a6 ~ ~>").slow(4)
    .s("sine")
    .attack(0.01).release(1.4)
    .gain(0.18)
    .delay(0.6).delaytime(0.5).delayfeedback(0.55)
    .room(0.8)
    .pan(sine.range(0.2, 0.8).slow(7)),

  // encrypted data burst — bandpassed square blip-shake, distant alien comms every 8 bars
  //                         pitched down 1 oct + bandpass 350–1600 Hz = "low-fi modem
  //                         handshake" reading instead of a piercing high beep;
  //                         softer 0.005s attack also takes the click off the front
  note("<~ ~ ~ ~ ~ ~ [e4 b4 d5 a4 e5 b4] ~>").slow(8)
    .s("square")
    .attack(0.005).decay(0.07).sustain(0).release(0.08)
    .lpf(1600).hpf(350).lpq(3)
    .gain(0.2)
    .delay(0.4).delaytime(0.1875).delayfeedback(0.5)
    .room(0.55)
    .pan(0.72),

  // stellar wind — filtered hat wash, one swell every 8 bars (same role as galaxy 1)
  s("hh ~ ~ ~ ~ ~ ~ ~").slow(8)
    .attack(2).decay(2).sustain(0.4).release(4)
    .lpf(saw.range(300, 2500).slow(8))
    .hpf(150)
    .gain(0.28)
    .room(0.85)
    .pan(sine.range(0.25, 0.75).slow(11))
).cpm(15)
