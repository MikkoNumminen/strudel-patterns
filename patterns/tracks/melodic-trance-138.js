// Genre: melodic / uplifting trance
// Tempo: 138 BPM
// Key: A minor (natural)
// Role: complete track — intro / buildup / drop / breakdown / drop
// Notes: anthem-style i–VI–III–VII (Am–F–C–G) on wide supersaw pad; rolling 16th offbeat
// Notes: bass ducks around the kick via filter/gain envelope — pad sits wide, lead stays centered.

cat(

  // =========================================================
  // SECTION 1 — INTRO (1 cycle)
  // Pad only, filter opens slowly, no drums. Establishes key and mood.
  // =========================================================
  stack(
    // supersaw pad — wide, bright, slow filter open
    note("<[a3,c4,e4] [f3,a3,c4] [c4,e4,g4] [g3,b3,d4]>")
      .s("sawtooth")
      .attack(1.2).decay(0.8).sustain(0.9).release(1.5)
      .lpf(sine.range(400, 1800).slow(8))
      .lpq(3)
      .room(0.75).roomsize(0.9)
      .delay(0.25).delaytime(0.375).delayfeedback(0.4)
      .gain(0.55)
      .jux(x => x.add(note(0.1))),
    // sub drone — low foundation, very soft
    note("<a1 f1 c2 g1>")
      .s("sine")
      .attack(0.5).release(1)
      .gain(0.35)
  ),

  // =========================================================
  // SECTION 2 — BUILDUP (1 cycle)
  // Add drums layer by layer, snare roll intensifies, filter opens more.
  // =========================================================
  stack(
    // pad still holds the progression, brighter now
    note("<[a3,c4,e4] [f3,a3,c4] [c4,e4,g4] [g3,b3,d4]>")
      .s("sawtooth")
      .attack(0.3).decay(0.4).sustain(0.85).release(0.8)
      .lpf(sine.range(800, 2400).slow(4))
      .lpq(4)
      .room(0.6).roomsize(0.85)
      .gain(0.5),
    // kick — tight four-on-the-floor, slightly softer attack
    s("bd*4").gain(0.9).attack(0.005),
    // 16th hats — tambourine-like energy, panned subtly
    s("hh*16")
      .gain(0.35)
      .hpf(7000)
      .pan(sine.range(0.35, 0.65).slow(2))
      .velocity("0.6 0.8 0.5 1 0.6 0.8 0.5 1 0.6 0.8 0.5 1 0.6 0.8 0.5 1"),
    // offbeat open hats
    s("~ oh ~ oh").gain(0.45),
    // snare roll — intensifies toward end of section
    s("sd*8").gain(sine.range(0.2, 0.7).slow(1)).room(0.35),
    // riser — white-noise-ish hat roll swelling
    s("hh*32").gain(saw.range(0.05, 0.5)).hpf(saw.range(2000, 9000)).degradeBy(0.3),
    // sub drone still present under the build
    note("<a1 f1 c2 g1>").s("sine").gain(0.55)
  ),

  // =========================================================
  // SECTION 3 — FIRST DROP (2 cycles)
  // Full stack: kick, offbeat rolling bass, chords, lead, pluck arp.
  // =========================================================
  stack(
    // kick — driving four-on-the-floor with slight click
    s("bd*4").gain(0.95).attack(0.003).shape(0.15),
    // clap — backbeat, plate-reverbed
    s("~ cp ~ cp").gain(0.65).room(0.3).roomsize(0.7),
    // 16th hats — velocity curve for groove
    s("hh*16")
      .gain(0.4)
      .hpf(7500)
      .velocity("0.5 0.8 0.6 1 0.5 0.8 0.6 1 0.5 0.8 0.6 1 0.5 0.8 0.6 1")
      .pan(sine.range(0.3, 0.7).slow(3)),
    // offbeat open hats — the trance "tss tss"
    s("~ oh ~ oh").gain(0.5).hpf(5000),
    // rolling 16th bass — offbeat pulses ducking around the kick
    // gain envelope simulates sidechain — kick hits = bass ducked via velocity pattern
    note("<a1 f1 c2 g1>*16")
      .s("sawtooth")
      .attack(0.002).decay(0.06).sustain(0).release(0.04)
      .lpf(700).lpq(6)
      .velocity("0.3 0.7 0.9 0.7 0.3 0.7 0.9 0.7 0.3 0.7 0.9 0.7 0.3 0.7 0.9 0.7")
      .gain(0.8)
      .shape(0.2),
    // sub layer — holds the root for weight
    note("<a1 f1 c2 g1>").s("sine").gain(0.7),
    // supersaw chord pad — wide, bright, the anthem voicing
    note("<[a3,c4,e4,a4] [f3,a3,c4,f4] [c4,e4,g4,c5] [g3,b3,d4,g4]>")
      .s("sawtooth")
      .attack(0.02).decay(0.3).sustain(0.8).release(0.4)
      .lpf(sine.range(1600, 3000).slow(8))
      .lpq(2)
      .room(0.5).roomsize(0.8)
      .gain(0.5)
      .jux(x => x.add(note(0.15))),
    // lead melody — simple, memorable, A minor pentatonic
    note("<[a4 ~ c5 e5] [f4 ~ a4 c5] [e4 ~ g4 c5] [d4 ~ g4 b4]>")
      .s("sawtooth")
      .attack(0.01).decay(0.2).sustain(0.7).release(0.3)
      .lpf(2800).lpq(3)
      .room(0.45).roomsize(0.75)
      .delay(0.3).delaytime(0.375).delayfeedback(0.45)
      .gain(0.55),
    // pluck arp counter-melody — higher octave, short envelope
    note("<[a5 e5 c5 e5] [a5 f5 c5 f5] [g5 e5 c5 e5] [g5 d5 b4 d5]>*2")
      .s("triangle")
      .attack(0.002).decay(0.08).sustain(0).release(0.1)
      .lpf(3500)
      .delay(0.4).delaytime(0.1875).delayfeedback(0.5)
      .room(0.3)
      .gain(0.35)
      .pan(0.65)
  ).slow(0.5),

  // =========================================================
  // SECTION 4 — BREAKDOWN (1 cycle)
  // Drop kick/bass, keep pad + lead with more reverb/delay, emotional pause.
  // =========================================================
  stack(
    // lush pad — longer envelope, deeper reverb
    note("<[a3,c4,e4] [f3,a3,c4] [c4,e4,g4] [g3,b3,d4]>")
      .s("sawtooth")
      .attack(0.8).decay(0.5).sustain(0.9).release(2)
      .lpf(sine.range(1200, 2600).slow(8))
      .lpq(2)
      .room(0.85).roomsize(0.95)
      .delay(0.4).delaytime(0.375).delayfeedback(0.55)
      .gain(0.55)
      .jux(x => x.add(note(0.2))),
    // lead floats — drenched in delay/reverb, emotional
    note("<a4 ~ e5 c5 f4 ~ c5 a4 e4 ~ g4 c5 d4 ~ g4 b4>")
      .s("triangle")
      .attack(0.05).decay(0.3).sustain(0.6).release(0.8)
      .lpf(2400)
      .room(0.8).roomsize(0.9)
      .delay(0.55).delaytime(0.375).delayfeedback(0.65)
      .gain(0.5)
      .sometimes(x => x.jux(rev)),
    // distant soft kick pulse — heartbeat under the breakdown
    s("bd ~ ~ ~").gain(0.35).lpf(120).room(0.4),
    // rising riser into the second drop
    s("hh*32")
      .gain(saw.range(0.02, 0.4))
      .hpf(saw.range(3000, 11000))
      .degradeBy(0.4)
  ),

  // =========================================================
  // SECTION 5 — SECOND DROP (2 cycles)
  // Return to full, more intensity via jux(rev) on lead, extra arp layer.
  // =========================================================
  stack(
    // kick — full drive
    s("bd*4").gain(1.0).attack(0.002).shape(0.2),
    // layered clap + snare on backbeat
    s("~ cp ~ cp").gain(0.7).room(0.35).roomsize(0.7),
    s("~ sd ~ sd").gain(0.4).room(0.25),
    // 16th hats — busier, with occasional double-time
    s("hh*16")
      .gain(0.45)
      .hpf(7500)
      .velocity("0.5 0.85 0.6 1 0.5 0.85 0.6 1 0.5 0.85 0.6 1 0.5 0.85 0.6 1")
      .pan(sine.range(0.25, 0.75).slow(3))
      .every(4, x => x.fast(2)),
    // offbeat open hats
    s("~ oh ~ oh").gain(0.55).hpf(5000),
    // ride — adds shimmer on the climax
    s("cb(5,8)").gain(0.3).hpf(6000).pan(0.7),
    // rolling bass — same shape, slightly more aggressive shape
    note("<a1 f1 c2 g1>*16")
      .s("sawtooth")
      .attack(0.002).decay(0.06).sustain(0).release(0.04)
      .lpf(sine.range(600, 1100).slow(4)).lpq(7)
      .velocity("0.3 0.75 0.95 0.75 0.3 0.75 0.95 0.75 0.3 0.75 0.95 0.75 0.3 0.75 0.95 0.75")
      .gain(0.85)
      .shape(0.3),
    // sub layer
    note("<a1 f1 c2 g1>").s("sine").gain(0.75),
    // supersaw chord pad — wider, brighter
    note("<[a3,c4,e4,a4] [f3,a3,c4,f4] [c4,e4,g4,c5] [g3,b3,d4,g4]>")
      .s("sawtooth")
      .attack(0.02).decay(0.3).sustain(0.85).release(0.4)
      .lpf(sine.range(2000, 3400).slow(8))
      .lpq(2)
      .room(0.55).roomsize(0.85)
      .gain(0.55)
      .jux(x => x.add(note(0.2))),
    // lead — jux(rev) for widescreen stereo motion on the second drop
    note("<[a4 ~ c5 e5] [f4 ~ a4 c5] [e4 ~ g4 c5] [d4 ~ g4 b4]>")
      .s("sawtooth")
      .attack(0.01).decay(0.2).sustain(0.75).release(0.35)
      .lpf(3000).lpq(3)
      .room(0.5).roomsize(0.8)
      .delay(0.35).delaytime(0.375).delayfeedback(0.5)
      .gain(0.6)
      .jux(rev)
      .sometimes(x => x.off(0.125, y => y.add(note(12)))),
    // pluck arp counter-melody — doubled density for drop 2
    note("<[a5 e5 c5 e5] [a5 f5 c5 f5] [g5 e5 c5 e5] [g5 d5 b4 d5]>*4")
      .s("triangle")
      .attack(0.002).decay(0.08).sustain(0).release(0.1)
      .lpf(3800)
      .delay(0.45).delaytime(0.1875).delayfeedback(0.55)
      .room(0.35)
      .gain(0.4)
      .pan(sine.range(0.3, 0.7).slow(2))
      .every(4, x => x.rev())
  ).slow(0.5)

).cpm(138)
