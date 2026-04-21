// Genre: dark techno / industrial techno
// Tempo: 140 BPM
// Key: C phrygian (C Db Eb F G Ab Bb) — flat-2 gives the dystopian tilt
// Role: complete track — intro / main / breakdown / main-harder
// Notes: peak-time feel, hypnotic pedal on C with occasional Db lean. Acid 303 chases a slow pad drone.
// Lean on filter-sweep arrangement and perc degradation rather than chord changes.

cat(

  // ==== INTRO — drums building, no bass yet, room for the drone to breathe ====
  stack(
    // driving kick, tuned low, saturated for weight — arrives immediately
    s("bd*4").gain(0.95).shape(0.5).lpf(3200),
    // sparse metallic rim hit, wandering across the stereo field
    s("rim(3,8)").gain(0.45).hpf(1500).pan(sine.range(0.2, 0.8).slow(4)).room(0.35),
    // crushed noise hat, only half-present — introduces grit
    s("hh*8").gain(0.35).hpf(6500).crush(6).degradeBy(0.3),
    // offbeat open hat as a classic techno signature, soft at first
    s("~ ~ ~ oh").gain(0.4).hpf(4000),
    // atmospheric drone pad — long, dark, sits under everything
    note("<c3,g3,ab3>").s("sawtooth")
      .attack(2).release(3)
      .lpf(perlin.range(300, 900).slow(16))
      .lpq(3)
      .room(0.85).roomsize(0.95)
      .gain(0.38)
  ).slow(2),

  // ==== MAIN GROOVE — full engine on: kick + acid 303 + hats + pad ====
  stack(
    // driving four-on-the-floor, tuned low with body
    s("bd*4").gain(1.0).shape(0.55).lpf(3500),
    // rolling 16th closed hats, velocity ducking via sine, cut group keeps them monophonic
    s("hh*16").gain(sine.range(0.25, 0.5).fast(4)).hpf(7000).cut(1),
    // offbeat open hat — the techno heartbeat
    s("~ ~ ~ oh").gain(0.55).hpf(3500).pan(0.65),
    // metallic industrial tick, reverb-soaked, every 3rd cycle it reverses
    s("cb(5,16)").gain(0.4).hpf(2000).room(0.5).delay(0.35).delaytime(0.375)
      .every(3, x => x.rev()),
    // acid 303 — phrygian ostinato, pedal on C with flat-2 lean and octave jumps
    note("c2 c3 db2 c2 c2 eb3 c2 g2 c2 c3 db2 f2 c2 eb3 bb2 ab2")
      .s("sawtooth")
      .attack(0.005).decay(0.18).sustain(0).release(0.08)
      .lpf(sine.range(350, 2800).slow(8))
      .lpq(12)
      .shape(0.4)
      .gain(0.78)
      .sometimesBy(0.2, x => x.add(note(12))),
    // slow moving pad drone — i to bII to i, phrygian signature
    note("<[c3,g3,ab3] [c3,g3,ab3] [db3,ab3,f4] [c3,g3,ab3]>")
      .s("sawtooth")
      .attack(1.2).release(2.5)
      .lpf(perlin.range(400, 1200).slow(12))
      .lpq(4)
      .room(0.7).roomsize(0.9)
      .gain(0.32),
    // reverb-drenched stab — industrial metallic hit on the upbeat, sparse
    s("cp").struct("~ ~ ~ ~ ~ ~ ~ 1")
      .gain(0.5).crush(5).hpf(800)
      .room(0.9).roomsize(0.95)
      .delay(0.55).delaytime(0.5).delayfeedback(0.55)
  ).slow(2),

  // ==== BREAKDOWN — drums drop, textures and drone remain, tension builds ====
  stack(
    // kick gone; only a distant thud every 2 bars marks time
    s("bd").struct("1 ~ ~ ~ ~ ~ ~ ~").gain(0.7).lpf(900).room(0.4),
    // the 303 keeps going but filtered down, feels underwater and ominous
    note("c2 c3 db2 c2 c2 eb3 c2 g2 c2 c3 db2 f2 c2 eb3 bb2 ab2")
      .s("sawtooth")
      .attack(0.005).decay(0.2).sustain(0).release(0.1)
      .lpf(sine.range(220, 900).slow(16))
      .lpq(10)
      .shape(0.25)
      .gain(0.55)
      .jux(x => x.rev()),
    // pad opens up — the emotional core of the breakdown
    note("<[c3,g3,ab3,eb4] [db3,ab3,f4] [c3,g3,ab3,eb4] [c3,g3,bb3,eb4]>")
      .s("sawtooth")
      .attack(2).release(3)
      .lpf(perlin.range(500, 2200).slow(10))
      .lpq(3)
      .room(0.9).roomsize(0.98)
      .gain(0.45),
    // metallic industrial texture — crushed, panned, drenched in delay tails
    s("rim(7,16)").gain(0.35).crush(4).hpf(1800)
      .pan(sine.range(0.15, 0.85).slow(3))
      .delay(0.6).delaytime(0.375).delayfeedback(0.65)
      .room(0.7)
  ).slow(2),

  // ==== MAIN GROOVE AGAIN — harder, higher filter, extra percussion bite ====
  stack(
    // kick back with more weight and clip
    s("bd*4").gain(1.05).shape(0.65).lpf(4000),
    // 16th hats, now louder and occasionally doubled up for drive
    s("hh*16").gain(sine.range(0.3, 0.55).fast(4)).hpf(7500).cut(1)
      .every(4, x => x.fast(2)),
    // offbeat open hat, pushed harder
    s("~ ~ ~ oh").gain(0.65).hpf(3500).pan(0.65),
    // extra industrial clap stabs on beat 3 every other bar
    s("~ ~ cp ~").gain(0.55).crush(6).hpf(400)
      .room(0.8).roomsize(0.95)
      .delay(0.4).delaytime(0.5).delayfeedback(0.5)
      .every(2, x => x.gain(0.3)),
    // metallic perc with ping-pong pan, sometimes reversed for variation
    s("cb(7,16)").gain(0.45).hpf(2200).room(0.55)
      .delay(0.4).delaytime(0.375)
      .pan(sine.range(0.15, 0.85).slow(4))
      .sometimes(x => x.rev()),
    // acid 303 — same line but filter opens higher, more resonance bite
    note("c2 c3 db2 c2 c2 eb3 c2 g2 c2 c3 db2 f2 c2 eb3 bb2 ab2")
      .s("sawtooth")
      .attack(0.005).decay(0.16).sustain(0).release(0.08)
      .lpf(sine.range(500, 3800).slow(8))
      .lpq(14)
      .shape(0.5)
      .gain(0.85)
      .sometimesBy(0.25, x => x.add(note(12)))
      .every(8, x => x.jux(y => y.rev())),
    // pad drone — fuller voicing with the minor 3rd added for darkness
    note("<[c3,eb3,g3,ab3] [c3,eb3,g3,ab3] [db3,f3,ab3,f4] [c3,eb3,g3,ab3]>")
      .s("sawtooth")
      .attack(1).release(2.5)
      .lpf(perlin.range(500, 1500).slow(10))
      .lpq(4)
      .room(0.7).roomsize(0.9)
      .gain(0.35)
  ).slow(2)

).cpm(140)
