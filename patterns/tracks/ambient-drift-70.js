// Genre: ambient / drift
// Tempo: 70 BPM
// Key: D lydian over an A drone (suspended 5th anchor — bright, floating, unresolved)
// Role: complete track — emergence / drift / glimmer / dissolve
// Notes: Everything breathes on 16-32 cycle modulations. The A drone is the gravity;
//        the pad sits on D lydian scale tones so the raised 4th (G#) shimmers in passing.
//        Percussion is barely present, heavily washed, and probabilistic.

stack(
  // drone root — sustained sub foundation, the gravity of the piece
  note("a1")
    .s("sine")
    .attack(4).release(6).sustain(1)
    .gain(0.55)
    .lpf(220),

  // drone harmonic fifth — quiet e2 shimmer an octave above the root, drifts in and out
  note("e2")
    .s("triangle")
    .attack(6).release(8).sustain(0.8)
    .gain(perlin.range(0.12, 0.28).slow(24))
    .lpf(400)
    .room(0.85),

  // evolving pad — D lydian chord tones, slow filter opens over 24 cycles
  note("<[d3,f#3,a3,c#4] [e3,g#3,b3,d4] [a3,c#4,e4,g#4] [f#3,a3,c#4,e4]>")
    .s("sawtooth")
    .attack(3).decay(2).sustain(0.85).release(5)
    .lpf(sine.range(300, 1800).slow(24))
    .lpq(3)
    .vowel("<a o e i>".slow(16))
    .room(0.9).roomsize(0.95)
    .gain(0.38)
    .slow(8),

  // granular texture layer — sparse lydian fragments, degraded, wide panned
  note("<d5 f#5 a5 c#6 b5 g#5 e5 f#5>")
    .s("triangle")
    .attack(0.4).decay(0.6).sustain(0.2).release(2.5)
    .gain(0.22)
    .lpf(perlin.range(1500, 4000).slow(20))
    .pan(sine.range(0.15, 0.85).slow(18))
    .delay(0.55).delaytime(0.75).delayfeedback(0.65)
    .room(0.92).roomsize(0.9)
    .degradeBy(0.55)
    .sometimes(x => x.rev())
    .slow(6),

  // glimmer fragment — tiny pentatonic bell flicks, rare and distant
  note("<a5 c#6 e6 b5>")
    .s("sine")
    .attack(0.01).decay(0.3).sustain(0).release(3)
    .gain(0.18)
    .pan(cosine.range(0.25, 0.75).slow(14))
    .room(0.95).roomsize(0.95)
    .delay(0.45).delaytime(1).delayfeedback(0.55)
    .almostNever(x => x.add(note(12)))
    .degradeBy(0.75)
    .slow(8),

  // sparse percussion — barely audible rim, drenched, one hit per 4 cycles on average
  s("~ ~ ~ ~ ~ ~ rim ~")
    .gain(0.18)
    .hpf(1200)
    .pan(perlin.range(0.3, 0.7).slow(10))
    .room(0.95).roomsize(0.98)
    .delay(0.4).delaytime(0.666).delayfeedback(0.6)
    .degradeBy(0.7)
    .slow(4),

  // distant cymbal breath — rare shimmer every few bars, reversed sometimes
  s("~ ~ ~ ~ hh ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~")
    .gain(0.12)
    .hpf(5000)
    .pan(sine.range(0.2, 0.8).slow(7))
    .room(0.95).roomsize(0.95)
    .delay(0.5).delaytime(0.875).delayfeedback(0.55)
    .degradeBy(0.6)
    .sometimes(x => x.rev())
    .slow(3)
).cpm(70)
