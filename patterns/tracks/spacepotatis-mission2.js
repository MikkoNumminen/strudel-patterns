// Spacepotatis — mission 2 theme (90s space combat synth)
// Genre: 90s tracker space combat — Tyrian "Mars" / Wipeout XL / Descent palette
// Tempo: 144 BPM, .cpm(36) — 1 cycle = 1 bar of 4 beats
// Key: E minor / Phrygian-flavored — Em – F – C – D  (i-bII-bVI-bVII), 4-bar chord cycle
//      The F over E = Phrygian b2 = the half-step-above-tonic dread tone that defines
//      90s space-shooter combat music. D major in bar 4 borrows F# as a leading-tone
//      pull back to E (Phrygian dominant move).
// Role: combat / level music for the second mission of Spacepotatis. Aggressive, dark, driving.
//
// Structure (32-bar piece, ~53s, four 8-bar sections via 32-cycle masks):
//   bars 1–8    INTRO    sub + dark vowel pad + sparse low lead phrase, no drums
//   bars 9–16   MAIN A   full kit + Tyrian octave-bouncing saw bass + square 16th arp
//                          + distorted saw lead in mid register
//   bars 17–24  BREAK    kick / snare / bass / arp / open-hat / cowbell drop;
//                          hats + lead continue, carrying the line
//   bars 25–32  MAIN B   full return + lead doubled with a 5th-UP power harmony
//                          (NOT octave-up sparkle — power-chord lead instead)
//
// Tyrian DNA  : octave-bouncing 8th saw bass, fast 16th square arp with dotted-8th delay,
//                same melodic shape transposed across all 4 chord bars
// 90s combat  : Phrygian bII tension, distorted saw lead at mid register, square arp,
//                bit-crushed drums, cowbell percussion, harmony-stacked climax

stack(
  // ============================================================================
  // ALWAYS-ON FOUNDATION — sub bass + dark pad
  // ============================================================================

  // sub bass — sine on chord roots, foundation through all sections
  note("<e2 f2 c2 d2>").s("sine")
    .attack(0.05).decay(0.4).sustain(0.85).release(0.3)
    .gain(0.7).room(0.2),

  // dark pad — detuned saw chord stack, vowel formant for industrial color,
  // 4-ducks/cycle sidechain LFO, low-mid LPF range (no high sparkle)
  note("<[e3,g3,b3,e4] [f3,a3,c4,f4] [c3,e3,g3,c4] [d3,f#3,a3,d4]>")
    .s("sawtooth")
    .attack(0.4).decay(0.4).sustain(0.75).release(0.6)
    .lpf(perlin.range(1500, 2800).slow(16)).lpq(2)
    .gain(sine.range(0.18, 0.42).fast(4))
    .vowel("<a o>".slow(8))
    .room(0.4)
    .jux(x => x.add(0.1)),

  // ============================================================================
  // INTRO (bars 1-8) — sparse low lead, broody, sets the dark key
  // ============================================================================

  // intro lead — single note per bar, oct 4 (low/menacing), light shape
  // climbs E → F → G → A across 4 chords (Phrygian ascent)
  note("<[e4 ~ ~ ~ ~ ~ ~ ~] [f4 ~ ~ ~ ~ ~ ~ ~] [g4 ~ ~ ~ ~ ~ ~ ~] [a4 ~ ~ ~ ~ ~ ~ ~]>")
    .s("sawtooth")
    .attack(0.05).decay(0.4).sustain(0.7).release(0.6)
    .lpf(2800).gain(0.5).room(0.5).shape(0.2)
    .jux(x => x.add(0.1))
    .mask("<1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0>"),

  // ============================================================================
  // DRUMS — main A & main B (hats also play through break for continuity)
  // ============================================================================

  // kick — punchy 4-on-floor with light bit-crush for 90s console grit
  s("bd*4").shape(0.45).crush(12).gain(0.95)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1>"),

  // snare — backbeat on 2 & 4, light crush to match the kick
  s("~ sd ~ sd").gain(0.7).hpf(300).room(0.18).crush(12)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1>"),

  // closed hats — driving 8ths, CONTINUES through break for continuity
  s("hh*8").gain(sine.range(0.28, 0.5).fast(2)).hpf(8000).cut(1)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1>"),

  // open hat — offbeat heartbeat
  s("~ ~ oh ~").gain(0.4).hpf(5500)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1>"),

  // cowbell — combat percussion accent, hits last 8th of beats 2 and 4
  s("~ ~ ~ cb ~ ~ ~ cb").gain(0.32).hpf(3000)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1>"),

  // ============================================================================
  // BASS (main A & main B) — Tyrian "Mars" octave-bouncing saw 8ths, distorted
  // ============================================================================

  // pattern per bar: root – oct – root – 5th – root – oct – root – 5th
  // Em: e2 e3 e2 b2 e2 e3 e2 b2
  // F : f2 f3 f2 c3 f2 f3 f2 c3
  // C : c2 c3 c2 g2 c2 c3 c2 g2
  // D : d2 d3 d2 a2 d2 d3 d2 a2
  note("<[e2 e3 e2 b2 e2 e3 e2 b2] [f2 f3 f2 c3 f2 f3 f2 c3] [c2 c3 c2 g2 c2 c3 c2 g2] [d2 d3 d2 a2 d2 d3 d2 a2]>")
    .s("sawtooth")
    .attack(0.005).decay(0.1).sustain(0).release(0.06)
    .lpf(sine.range(700, 2800).slow(8)).lpq(7)
    .shape(0.4).gain(0.75)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1>"),

  // ============================================================================
  // ARPEGGIO (main A & main B) — fast 16th SQUARE arp, dotted-8th delay
  // ============================================================================

  // square wave instead of triangle = more bite, more 90s chip combat
  // Em: e3 g3 b3 e4 g4 e4 b3 g3   ×2
  // F : f3 a3 c4 f4 a4 f4 c4 a3   ×2
  // C : c3 e3 g3 c4 e4 c4 g3 e3   ×2
  // D : d3 f#3 a3 d4 f#4 d4 a3 f#3 ×2
  note("<[e3 g3 b3 e4 g4 e4 b3 g3]*2 [f3 a3 c4 f4 a4 f4 c4 a3]*2 [c3 e3 g3 c4 e4 c4 g3 e3]*2 [d3 f#3 a3 d4 f#4 d4 a3 f#3]*2>")
    .s("square")
    .attack(0.001).decay(0.08).sustain(0).release(0.08)
    .lpf(5000).gain(0.32)
    .delay(0.4).delaytime(0.1875).delayfeedback(0.45)
    .room(0.2)
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1>"),

  // ============================================================================
  // LEAD HOOK — main A + break + main B (continuous, oct 4-5, distorted saw)
  // ============================================================================

  // Phrygian-flavored melody, mid register (oct 4-5 = menacing not sparkly).
  // Each 4-bar phrase climbs through chord arpeggio + chromatic neighbor:
  // bar 1 (Em): e4 e4 g4 b4 c5 b4 g4 e4    hammer + climb to bVI(c5) + descend
  // bar 2 (F):  f4 a4 c5 f5 e5 c5 a4 f4    F arpeggio with bII flavor; e5 = 7th leading tone
  // bar 3 (C):  c5 e5 g5 c6 b5 g5 e5 c5    C major peak at c6, b5 = leading tone descent
  // bar 4 (D):  d5 f#5 a5 d6 c6 a5 f#5 d5  D7 sound (c6 = b7 of D), strong pull back to E
  note("<[e4 e4 g4 b4 c5 b4 g4 e4] [f4 a4 c5 f5 e5 c5 a4 f4] [c5 e5 g5 c6 b5 g5 e5 c5] [d5 f#5 a5 d6 c6 a5 f#5 d5]>")
    .s("sawtooth")
    .attack(0.01).decay(0.25).sustain(0.65).release(0.2)
    .lpf(sine.range(2500, 5000).slow(8))
    .shape(0.3)
    .gain(0.62).room(0.2)
    .jux(x => x.add(0.12))
    .mask("<0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1>"),

  // ============================================================================
  // MAIN B HARMONY — same hook stacked a 5TH UP (power-chord lead, not sparkle)
  // ============================================================================

  // adds a 7-semitone-up harmony only in cycles 25-32 = power lift for the climax,
  // wider .jux(0.15) detune for fatter stereo
  note("<[e4 e4 g4 b4 c5 b4 g4 e4] [f4 a4 c5 f5 e5 c5 a4 f4] [c5 e5 g5 c6 b5 g5 e5 c5] [d5 f#5 a5 d6 c6 a5 f#5 d5]>")
    .add(7)
    .s("sawtooth")
    .attack(0.01).decay(0.25).sustain(0.65).release(0.2)
    .lpf(sine.range(2800, 5500).slow(8))
    .shape(0.25)
    .gain(0.45).room(0.2)
    .jux(x => x.add(0.15))
    .mask("<0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1>"),

  // ============================================================================
  // CRASH — section transition markers (bars 9 / 17 / 25 = section starts)
  // ============================================================================

  s("crash").gain(0.6).room(0.4)
    .mask("<0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0>")
).cpm(36)
