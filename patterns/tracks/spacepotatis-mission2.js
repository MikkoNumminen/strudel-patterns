// Spacepotatis — mission 2 theme (aggressive major synthpop, Tyrian-tracker DNA)
// Genre: bright aggressive synthpop bridge between 90s tracker game music and modern synthwave
// Tempo: 144 BPM, .cpm(36) — 1 cycle = 1 bar of 4 beats
// Key: E major — E – C#m – A – B  (I-vi-IV-V), 4-bar chord cycle
// Role: combat / level music for the second mission of Spacepotatis.
//
// Structure (32-bar piece, ~53s, four 8-bar sections gated via 32-cycle masks):
//   bars 1–8    INTRO    sub + sidechained pad + sparse lead phrase, no drums
//   bars 9–16   MAIN A   full kit + octave-bouncing saw bass + fast 16th arp + lead hook
//   bars 17–24  BREAK    kick/snare/bass/arp drop; hats continue; lead breathes; pad opens
//   bars 25–32  MAIN B   full kit returns; lead jumps octave UP with wider stereo for climax
//
// Tyrian DNA  : octave-bouncing 8th saw bass; dotted-8th delay 16th triangle arp;
//                single repeating melodic shape transposed across all 4 chord bars.
// Modern polish: 4-ducks-per-cycle sidechain LFO on pad; .jux stereo width on lead;
//                perlin LPF breathing on pad; crashes mark section transitions.

stack(
  // ============================================================================
  // ALWAYS-ON FOUNDATION (no mask) — sub bass + sidechained pad
  // ============================================================================

  // sub bass — sine on chord roots, foundation, plays through all sections
  note("<e2 c#2 a2 b2>").s("sine")
    .attack(0.05).decay(0.4).sustain(0.85).release(0.3)
    .gain(0.7).room(0.2),

  // sidechained pad — detuned saw chord stack, fake sidechain via 4-ducks/cycle gain LFO
  // perlin LPF breathing for modern movement, .jux for stereo width
  note("<[e3,g#3,b3,e4] [c#3,e3,g#3,c#4] [a3,c#4,e4,a4] [b3,d#4,f#4,b4]>")
    .s("sawtooth")
    .attack(0.4).decay(0.4).sustain(0.75).release(0.6)
    .lpf(perlin.range(2000, 3500).slow(16))
    .lpq(2)
    .gain(sine.range(0.18, 0.42).fast(4))   // 4-ducks-per-cycle = sidechain pump
    .room(0.45)
    .jux(x => x.add(0.1)),

  // ============================================================================
  // INTRO (bars 1-8) — sparse lead phrase only, no drums
  // ============================================================================

  // intro lead — single chord-root note per bar, lots of space, sets the key
  // each chord gets one held note; cycles through E-C#m-A-B twice across 8 bars
  note("<[e5 ~ ~ ~ ~ ~ ~ ~] [c#5 ~ ~ ~ ~ ~ ~ ~] [a4 ~ ~ ~ ~ ~ ~ ~] [b4 ~ ~ ~ ~ ~ ~ ~]>")
    .s("sawtooth")
    .attack(0.05).decay(0.4).sustain(0.7).release(0.6)
    .lpf(4000).gain(0.5).room(0.4)
    .jux(x => x.add(0.12))
    .mask("<1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0>"),

  // ============================================================================
  // DRUMS — main A (9-16) and main B (25-32). Hats also play through break.
  // ============================================================================

  // kick — punchy 4-on-the-floor, modern shaping
  s("bd*4").shape(0.4).gain(0.95)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1>"),

  // snare — backbeat on 2 & 4
  s("~ sd ~ sd").gain(0.7).hpf(300).room(0.18)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1>"),

  // closed hats — driving 8ths with velocity wiggle. CONTINUES through break for continuity.
  s("hh*8").gain(sine.range(0.28, 0.5).fast(2)).hpf(8000).cut(1)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1>"),

  // offbeat open hat — synthwave heartbeat (drops in break)
  s("~ ~ oh ~").gain(0.45).hpf(5500)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1>"),

  // ============================================================================
  // BASS (main A & main B) — Tyrian "Mars" octave-bouncing saw 8ths
  // ============================================================================

  // pattern per bar: root – oct – root – 5th – root – oct – root – 5th
  // E:   e2 e3 e2 b2 e2 e3 e2 b2
  // C#m: c#2 c#3 c#2 g#2 c#2 c#3 c#2 g#2
  // A:   a2 a3 a2 e3 a2 a3 a2 e3
  // B:   b2 b3 b2 f#3 b2 b3 b2 f#3
  note("<[e2 e3 e2 b2 e2 e3 e2 b2] [c#2 c#3 c#2 g#2 c#2 c#3 c#2 g#2] [a2 a3 a2 e3 a2 a3 a2 e3] [b2 b3 b2 f#3 b2 b3 b2 f#3]>")
    .s("sawtooth")
    .attack(0.005).decay(0.1).sustain(0).release(0.06)
    .lpf(sine.range(800, 3200).slow(8)).lpq(7)
    .shape(0.28).gain(0.72)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1>"),

  // ============================================================================
  // ARPEGGIO (main A & main B) — fast 16th triangle, dotted-8th delay (Tyrian core)
  // ============================================================================

  // each chord gets a chord-tone arpeggio playing twice per bar (= 16 hits per bar = 16ths)
  // E:   e4 g#4 b4 e5 g#5 e5 b4 g#4   ×2
  // C#m: c#4 e4 g#4 c#5 e5 c#5 g#4 e4 ×2
  // A:   a3 c#4 e4 a4 c#5 a4 e4 c#4   ×2
  // B:   b3 d#4 f#4 b4 d#5 b4 f#4 d#4 ×2
  note("<[e4 g#4 b4 e5 g#5 e5 b4 g#4]*2 [c#4 e4 g#4 c#5 e5 c#5 g#4 e4]*2 [a3 c#4 e4 a4 c#5 a4 e4 c#4]*2 [b3 d#4 f#4 b4 d#5 b4 f#4 d#4]*2>")
    .s("triangle")
    .attack(0.001).decay(0.08).sustain(0).release(0.1)
    .lpf(7000).gain(0.4)
    .delay(0.4).delaytime(0.1875).delayfeedback(0.45)
    .room(0.2)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1>"),

  // ============================================================================
  // LEAD HOOK — main A (oct 5) plays bars 9-24 (continues through break for breath)
  // ============================================================================

  // each 4-bar phrase climbs through chord arpeggio, peaks on beat 3, descends via leading tone:
  // bar 1 (E):   e5 g#5 b5 e6 d#6 b5 g#5 e5     PEAK e6, descends through D# (leading tone)
  // bar 2 (C#m): c#5 e5 g#5 c#6 b5 g#5 e5 c#5   PEAK c#6, descends through B
  // bar 3 (A):   a4 c#5 e5 a5 g#5 e5 c#5 a4     PEAK a5, descends through G# (7th of A)
  // bar 4 (B):   b4 d#5 f#5 b5 a#5 f#5 d#5 b4   PEAK b5, descends through A# (7th of B)
  note("<[e5 g#5 b5 e6 d#6 b5 g#5 e5] [c#5 e5 g#5 c#6 b5 g#5 e5 c#5] [a4 c#5 e5 a5 g#5 e5 c#5 a4] [b4 d#5 f#5 b5 a#5 f#5 d#5 b4]>")
    .s("sawtooth")
    .attack(0.01).decay(0.25).sustain(0.65).release(0.2)
    .lpf(sine.range(3000, 6500).slow(8))
    .gain(0.62).room(0.22)
    .jux(x => x.add(0.12))
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0>"),

  // ============================================================================
  // LEAD HOOK — main B (oct 6) plays bars 25-32 — same hook UP AN OCTAVE for climax
  // ============================================================================

  // wider .jux detune (0.18 vs 0.12) for fatter stereo at the peak moment
  note("<[e6 g#6 b6 e7 d#7 b6 g#6 e6] [c#6 e6 g#6 c#7 b6 g#6 e6 c#6] [a5 c#6 e6 a6 g#6 e6 c#6 a5] [b5 d#6 f#6 b6 a#6 f#6 d#6 b5]>")
    .s("sawtooth")
    .attack(0.01).decay(0.25).sustain(0.65).release(0.2)
    .lpf(sine.range(3500, 7500).slow(8))
    .gain(0.55).room(0.22)
    .jux(x => x.add(0.18))
    .mask("<0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1>"),

  // ============================================================================
  // CRASH — section transition markers (bars 9, 17, 25 = section starts)
  // ============================================================================

  s("crash").gain(0.6).room(0.4)
    .mask("<0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0>")
).cpm(36)
