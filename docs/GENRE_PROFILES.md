# Genre Profiles

Quick-lookup reference for choosing tempo, key, drum feel, and sound palette when generating Strudel patterns in StrudelForge. Written for producers; skip the lecture, grab the numbers.

---

## How to read a profile

Each profile follows the same shape so you can scan it in seconds:

- **Tempo range (BPM)** — realistic outer bounds plus a sensible default for a first sketch.
- **Time signature / feel** — grid and swing. Broken, straight, shuffled, free.
- **Essential elements** — the 3-6 things that make it unmistakably that genre. If your track lacks all of these, it is not the genre.
- **Drum palette** — kick character, snare/clap, hats, perc tendencies.
- **Bass** — register, articulation, rhythm, synthesis type.
- **Harmonic material** — scales, modes, chord density, typical progressions.
- **Signature sounds** — leads, stabs, pads, FX, vocal treatment.
- **Production notes** — reverb/delay, sidechain, filter movement, stereo, mix priorities.
- **Reference Strudel sketch** — a minimal paste-ready pattern. Kick + bass (and hats where they matter). Strip it, extend it, don't ship it.

Sketches use only these primitives: `stack`, `cat`, `seq`, `s(...)`, `note(...)`, `n(...)`, `.gain`, `.pan`, `.lpf`, `.hpf`, `.delay`, `.room`, `.crush`, `.shape`, `.slow`, `.fast`, `.rev`, `.jux`, `.every`, `.sometimes`, `.cpm`, and mini-notation. No `setcps`, no `.play()`, no declarations.

BPM in Strudel is set per-pattern with `.cpm(BPM)` at the end of the expression. One beat = one cycle unit in these sketches; tweak if your subdivision differs.

---

## 1. Techno (driving / peak-time)

**Tempo range:** 128-140 BPM. Default **132**.
Peak-time lives 130-135. Hard techno pushes 140+. Below 128 it reads as tech-house.

**Time signature / feel:** 4/4 straight. Grid-locked. Swing 0-8% max; anything more sounds housey.

**Essential elements**
- Four-on-the-floor kick, long tail, dominant in the mix.
- Offbeat open hat on the "and" of every beat.
- Driving 16th-note bass or perc loop locked to the kick.
- Rolling tension: filter opens slowly across 16-32 bars.
- Dry, mono-centered low end; wide, washy highs.

**Drum palette**
- Kick: 909-style or distorted 808, 50-60 Hz fundamental, 300-500 ms tail. Saturated, not clicky.
- Snare/clap: rare. When used, a dry rimshot or a single clap on beat 3 of every 4th bar as a marker.
- Hats: closed 16ths with velocity ducking, open hat on the off-beat. Metallic, noisy.
- Perc: shakers, clave, rides, tuned metal hits. Always panned, never center.

**Bass**
- Sub sine or short saw stab following the kick root. 16th-note pulses or rolling offbeats.
- One or two notes. Modal movement, not progressions.

**Harmonic material**
- Minor or phrygian. A minor, F minor, D minor are classics.
- Often modal drones on a single root. Chords are rare; when present they are sus2/sus4 pads, not triads.

**Signature sounds**
- Detuned saw stab, filter-resonance zaps, metallic risers, reversed crashes, tape-delay FX.
- Vocals: chopped, bit-crushed, drenched in delay. Single syllables, not lines.

**Production notes**
- Heavy sidechain pump on pads and bass from the kick.
- Long reverb (3-8 s) only on FX returns; drums stay dry.
- 1/4 or 1/8 dotted delays. Mono below 120 Hz.
- Low-pass automation is the arrangement.

**Reference Strudel sketch**
```
stack(
  s("bd*4").gain(1.0),
  s("~ ~ ~ oh").gain(0.55).pan(0.6),
  s("hh*16").gain(0.35).hpf(6000),
  s("~ cp ~ ~").gain(0.4).every(4, x => x.gain(0.55)),
  note("<a1 a1 a1 c2>").s("sawtooth").lpf(600).gain(0.7),
  note("a2*16").s("square").gain(0.25).lpf(2000).sometimes(x => x.delay(0.3))
).cpm(132)
```

---

## 2. Acid techno (303-driven)

**Tempo range:** 130-145 BPM. Default **138**.
Sits a touch faster than normal techno; the 303 wants energy.

**Time signature / feel:** 4/4 straight. Often with slight push on 16ths from slide/accent.

**Essential elements**
- TB-303 or 303-clone as the lead voice, always. Resonant, squelching, slid notes.
- Constant 16th-note bassline with accents and slides that never repeat the same way twice.
- Filter cutoff automation as the main arrangement tool.
- Distorted kick and 303 sharing the same saturation bus.
- Sparse harmonic content — the 303 carries melody, harmony, and bass at once.

**Drum palette**
- Kick: 909, cranked, saturated. Slightly shorter tail than peak techno so the 303 cuts through.
- Claps: 909 clap on 2 and 4, pitched up, short reverb.
- Hats: open hat on the off, tight closed 16ths, sometimes a reverse cymbal riser per 16 bars.
- Perc: minimal; the 303 IS the percussion.

**Bass**
- The 303 line. Root + octave + fifth + b3, with heavy use of slides and accents.
- Always 16th notes, always monophonic, always with moving cutoff/resonance.

**Harmonic material**
- Natural minor or phrygian dominant. A minor and E phrygian are staples.
- Single-key drone; no progressions. The filter is the progression.

**Signature sounds**
- TB-303 saw/square waves with high resonance.
- Distorted 303 through tube/tape emulation or soft-clipped saturation.
- Reversed crashes, tape-delay 1/8 dotted, spring reverb on snare only.

**Production notes**
- Saturation everywhere. Parallel distortion on the 303 bus.
- Sidechain bass to kick. Pad duck to kick if any pad exists.
- Stereo: kick/303 centered, hats/perc wide.
- Less is more. One 303 line, one kick, one hat pattern — arrange with filter and accent.

**Reference Strudel sketch**
```
stack(
  s("bd*4").gain(1.0).shape(0.4),
  s("~ cp ~ cp").gain(0.55),
  s("hh*16").gain(0.3).hpf(7000),
  s("~ ~ ~ oh").gain(0.5),
  note("a1 a2 a1 c2 a1 a2 e2 a1 a1 a2 a1 g2 a1 a2 e2 f2")
    .s("sawtooth")
    .lpf(sine.range(400, 3500).slow(8))
    .shape(0.5).gain(0.75)
).cpm(138)
```

---

## 3. Trance (uplifting / melodic)

**Tempo range:** 132-140 BPM. Default **138**.
Classic uplifting lives 136-140. Progressive trance sits 128-134.

**Time signature / feel:** 4/4 straight. No swing. Build-drop-build architecture is mandatory.

**Essential elements**
- 16th-note rolling bassline locked to kick (offbeat pulses).
- Supersaw lead, often in unison, with big reverb.
- 8-bar or 16-bar euphoric breakdown into a huge drop.
- Pluck arpeggio driving the energy before the lead enters.
- Pad wash holding long chords underneath everything.

**Drum palette**
- Kick: tight, clicky, layered with a subkick. 808-ish sub + 909-ish top.
- Clap: layered clap + snare on 2 and 4, plate reverb.
- Hats: 16ths with velocity curve, open hat offbeats, ride on climaxes.
- Perc: shakers, tambourine 16ths, reverse crashes every 8 bars.

**Bass**
- Offbeat rolling bass ("da-da-da-da" on the 16ths between kicks).
- Short sub or saw note, 50-70 ms length, heavy sidechain.

**Harmonic material**
- Minor, dorian, or lydian. Common progressions: i-VI-III-VII, i-VII-VI-VII, i-v-VI-VII.
- Four-chord loops. One chord per bar, sometimes two bars per chord during the breakdown.

**Signature sounds**
- Supersaw lead (7 detuned saws, octave up).
- Pluck arpeggios (saw + short envelope + delay).
- Huge pad stack (analog-warm + vocal-style + string layer).
- White-noise risers, reversed cymbals, sidechained bass drops.

**Production notes**
- Sidechain everything to the kick. Pump is the sound.
- Big reverbs (hall, 4-8 s) on lead and pluck.
- Stereo-wide leads; mono sub.
- Breakdown = strip to pad + vocal + reverb tail, then slam back in.

**Reference Strudel sketch**
```
stack(
  s("bd*4").gain(1.0),
  s("~ cp ~ cp").gain(0.55).room(0.25),
  s("hh*16").gain(0.3),
  s("~ ~ ~ oh").gain(0.45),
  note("<f2 db2 ab2 eb2>").s("sawtooth").lpf(400).gain(0.7),
  note("[~ f2]*4").s("sawtooth").gain(0.55).lpf(1200),
  note("<f4 ab4 c5 eb5>*4").s("sawtooth").gain(0.35).room(0.6).delay(0.35)
).cpm(138)
```

---

## 4. House (classic + deep)

**Tempo range:** 118-128 BPM. Default **123**.
Deep house 118-122. Classic/garage 122-126. Tech-house 124-128.

**Time signature / feel:** 4/4 with 8-16% swing on hats and perc. Humanize — house breathes.

**Essential elements**
- Four-on-the-floor kick, warm, rounded, not aggressive.
- Off-beat open hat, swung closed hats.
- Clap/snare on 2 and 4, often layered with a rimshot.
- Rhodes or DX7 e-piano chords, seventh or ninth voicings.
- Vocal chops, often pitched and filtered.

**Drum palette**
- Kick: 909, Linn, or sampled soulful kick. Short tail, warm. Tuned to C/D.
- Clap: 909 or Linn clap. Layered with short reverb.
- Hats: swung 16ths, 909 hats. Closed on 1/2/4, open on the offbeat.
- Perc: shakers, congas, tambourines, cowbell. Lots of groove.

**Bass**
- Rounded sub + mid, often with a slight saw or square edge.
- Walking bass on classic, rolling on deep, plucked on tech-house.
- Syncopated — rarely just root quarter notes.

**Harmonic material**
- Minor 7, major 9, sus4 chords. Dorian is the house mode.
- Two-chord vamps (i7 - IV7) or four-chord loops.
- Jazz voicings. Rhodes is the default harmonic instrument.

**Signature sounds**
- Rhodes/DX7 e-piano chord stabs.
- Pitched vocal chops (often soul/gospel samples).
- Analog pads (Juno, Jupiter).
- Filter sweeps — high-pass rise is the house energy builder.

**Production notes**
- Groove over precision. Swing + humanize velocity.
- Tape/vinyl saturation on the mix bus.
- Moderate reverb on snare and vocals; dry drums otherwise.
- Sidechain subtle — a gentle duck, not trance-style pump.

**Reference Strudel sketch**
```
stack(
  s("bd*4").gain(0.95),
  s("~ cp ~ cp").gain(0.5).room(0.2),
  s("[hh ~ hh hh]*2").gain(0.35),
  s("~ ~ ~ oh").gain(0.5).pan(0.6),
  s("sh*8").gain(0.2).pan(-0.4),
  note("<c2 eb2 f2 g2>").s("sawtooth").lpf(500).gain(0.7),
  note("<[c3,eb3,g3,bb3] [f3,ab3,c4,eb4]>").s("sawtooth").gain(0.35).lpf(2000).room(0.3)
).cpm(123)
```

---

## 5. Drum & bass (170-180 BPM)

**Tempo range:** 170-180 BPM. Default **174**.
Liquid and rollers sit 172-175. Neurofunk and jump-up 174-178.

**Time signature / feel:** 4/4 at double-time — kick-and-snare feel on half-time is common (snare on beat 3 only), but hi-hats run 16ths at full speed.

**Essential elements**
- Chopped breakbeat (Amen, Think, Funky Drummer) OR two-step half-time pattern.
- Deep sub bass on the root, plus a mid-range Reese or growl.
- Snare on beat 3 (half-time) or beats 2 and 4 (full-time).
- Long, evolving breakdowns at the drop point.
- 16-bar or 32-bar phrasing with big drum edits on the turnaround.

**Drum palette**
- Kick: tight, punchy, often layered sub kick + click top. 808 sub + 909 click.
- Snare: layered — vinyl break snare + sample + clap. Usually two-stage envelope.
- Breaks: Amen, Think, Apache, Funky Drummer. Chopped and rearranged.
- Hats: fast 16ths with ghost notes; rides and crashes for sections.

**Bass**
- Two-layer: sub sine on the root + mid-range Reese/growl/wobble for character.
- Reese = detuned saws run through notch filters. Staple of neuro.
- Sub follows the bassline root note-for-note or holds long.

**Harmonic material**
- Minor and phrygian dominant. Often single-key with modal movement.
- Jazzy extensions in liquid DnB (minor 9, major 7).
- Neurofunk is nearly atonal — it's about texture.

**Signature sounds**
- Reese bass, Amen break, reversed orchestra hits, pad washes, vocal hooks.
- Granular/resampled textures, FM stabs, pitched sub drops.

**Production notes**
- Heavy compression on the drum bus. Parallel compression on kick+snare.
- Saturation and multiband on bass. Sidechain sub to kick.
- Short reverbs on snare (plate, 0.5-1 s). Longer on pads.
- Mono sub, wide mid-bass, huge stereo pads. Energy in the 100-300 Hz region.

**Reference Strudel sketch**
```
stack(
  s("bd ~ ~ ~ ~ ~ bd ~").fast(2).gain(1.0),
  s("~ ~ ~ ~ sd ~ ~ ~").fast(2).gain(0.85).room(0.25),
  s("hh*16").gain(0.4).hpf(6000),
  s("[~ ~ ~ cp]").every(4, x => x.fast(2)).gain(0.4),
  note("<f1 f1 c2 eb1>").s("sine").gain(0.9),
  note("<f2*8 ~ ~ f2*4 eb2*8>").s("sawtooth").lpf(sine.range(300, 2000).slow(4)).shape(0.4).gain(0.6)
).cpm(174)
```

---

## 6. Ambient (60-90 BPM if rhythmic, often arrhythmic)

**Tempo range:** No fixed tempo; when rhythmic use 60-90 BPM. Default **72**.
Beatless ambient has no tempo — patterns evolve on long time scales (16-64 bars per event).

**Time signature / feel:** Free or 4/4. Rhythm is suggestion, not requirement. Long bars, slow changes.

**Essential elements**
- Long evolving pads (20-60 second phrases, no clear start/end).
- Spatial depth — big reverb tails, long delays.
- Textural layers — field recordings, granular clouds, tape hiss.
- Slow harmonic movement, often one chord for 32+ bars.
- Silence is an instrument.

**Drum palette**
- Often none. When present: brushed snares, soft mallets, distant kicks, tuned percussion.
- Reverb-drenched single hits, not grooves.
- Field recording percussion (rain, wind, scrapes).

**Bass**
- Sub drones, held for many bars.
- Sometimes no bass at all — pads carry the low end.
- Slow attack, long release.

**Harmonic material**
- Modal: lydian, dorian, aeolian. Suspended chords, open fifths.
- Single chords held for long durations. Two-chord movements at most.
- Microtonal detuning and drift is welcome.

**Signature sounds**
- Granular textures, reverse reverb, tape loops, soft FM bells.
- Field recordings processed through long reverbs.
- Prophet-5/DX7/Juno pad stacks.
- Vocal drones, shruti boxes, bowed metal.

**Production notes**
- Reverb is the instrument. 8-30 second tails.
- Low-pass filtering to darkness. High-frequency content is sparse, jewel-like.
- Wide stereo field, slow-moving panning.
- Mix for headphones and speakers equally; dynamics matter more than loudness.

**Reference Strudel sketch**
```
stack(
  note("<c3 eb3 g3 bb3>").s("sawtooth").slow(8).lpf(800).gain(0.4).room(0.9).delay(0.6),
  note("<c2 ~ eb2 ~>").s("sine").slow(4).gain(0.5),
  note("<g4 bb4 eb5 c5>").s("triangle").slow(16).gain(0.25).room(0.95).delay(0.75).pan(sine.range(0.2, 0.8).slow(12)),
  s("~ ~ ~ ~ rim ~ ~ ~").slow(4).gain(0.2).room(0.8)
).cpm(72)
```

---

## 7. Synthwave (retro-futurist)

**Tempo range:** 80-110 BPM. Default **96**.
Outrun / darksynth lives 100-110. Chillwave sits 80-95.

**Time signature / feel:** 4/4 straight. Occasional 8th-note gallop. No swing.

**Essential elements**
- Gated reverb snare on 2 and 4. The sound of 1985.
- Arpeggiated analog synth (saw or square) as constant motion.
- Lead line on a detuned saw or FM bell.
- Sidechain-pumped pads to suggest the kick even when it's sparse.
- Cinematic, nostalgic, overtly synthetic.

**Drum palette**
- Kick: Linn LM-1, SimmonsSDS-V style. Punchy, pitched-down, noisy.
- Snare: massive gated reverb snare. Short reverb tail chopped hard.
- Hats: LinnDrum or 808 style, straight 16ths.
- Toms: pitched electronic toms for fills.

**Bass**
- Analog saw/square bass, often with pulse-width modulation.
- 8th-note pulses or syncopated held notes.
- Sometimes slapped/plucked for the funkier outrun sound.

**Harmonic material**
- Minor, harmonic minor, aeolian. Movie-OST progressions: i-VI-III-VII, i-v-VI-III.
- Chord stabs on beats 1 and 3; pads hold underneath.

**Signature sounds**
- Supersaw leads, DX7 bell lead, analog pad (CS-80, Jupiter-8 style).
- Gated reverb snare.
- Tape-saturated drums.
- FM bass with plenty of detune.

**Production notes**
- Tape saturation on everything. Slight pitch warble.
- Chorus on leads and pads, always.
- Gated reverb on snare (mandatory), plate on lead.
- Sidechain pads and arp to kick for pump.

**Reference Strudel sketch**
```
stack(
  s("bd ~ ~ ~ bd ~ bd ~").gain(0.95),
  s("~ ~ sd ~ ~ ~ sd ~").gain(0.7).room(0.6).shape(0.3),
  s("hh*8").gain(0.3),
  note("<a2 a2 f2 g2>").s("sawtooth").lpf(800).gain(0.7),
  note("<[a3 c4 e4 c4] [f3 a3 c4 a3] [g3 b3 d4 b3]>*2").s("sawtooth").gain(0.35).lpf(2500).room(0.4)
).cpm(96)
```

---

## 8. Lo-fi hip hop (swung, tape-saturated)

**Tempo range:** 70-90 BPM. Default **82**.
Study-beat territory lives 80-88. Slower heads sit 70-78.

**Time signature / feel:** 4/4 with heavy swing (15-25% on 16ths). Drunk, lazy feel. Humanize timing.

**Essential elements**
- Dusty, sampled drum break — filtered, bit-crushed, tape-warped.
- Sampled jazz chords (Rhodes, guitar, vibes) looping 2 or 4 bars.
- Vinyl crackle and tape hiss as constant texture.
- Mellow sub bass on the root.
- Occasional spoken-word sample, filtered.

**Drum palette**
- Kick: boom-bap style, muddy, soft attack. Often sampled from vinyl.
- Snare: dusty, tight, often just one sample. Beat 2 and 4, sometimes ghost notes.
- Hats: swung 16ths, often pitched down or filtered.
- Perc: rimshots, brushes, finger snaps. Subtle.

**Bass**
- Short sub or upright bass sample.
- Walking or half-note patterns. Behind the beat.
- Often a single note held for two beats, then a pickup.

**Harmonic material**
- Jazz: major 7, minor 9, dominant 13, altered chords.
- Two or four bar loops. ii-V-I, minor ii-V, modal interchange.
- Rhodes is king. Guitar (nylon, jazz clean) second.

**Signature sounds**
- Rhodes electric piano, nylon guitar, muted trumpet samples.
- Vinyl crackle, tape hiss, wow and flutter.
- Rain, coffee shop ambience, field recordings.
- Low-passed, mono-leaning samples.

**Production notes**
- Bit-crush and tape saturation on everything.
- Low-pass filter above 8-10 kHz to kill modern sheen.
- Wide pitch modulation for "tape wobble."
- Side channel dry; mid channel saturated.
- Quantize loosely. Nudge off-grid for human feel.

**Reference Strudel sketch**
```
stack(
  s("bd ~ ~ bd ~ ~ bd ~").gain(0.85).lpf(3000),
  s("~ ~ sd ~ ~ ~ sd ~").gain(0.55).crush(6),
  s("[hh ~ hh hh ~ hh ~ hh]").gain(0.3).hpf(4000).sometimes(x => x.gain(0.2)),
  note("<a2 ~ e2 g2>").s("sine").gain(0.7).lpf(400),
  note("<[a3,c4,e4,g4] [d3,f3,a3,c4] [g3,b3,d4,f4] [c4,e4,g4,b4]>").s("triangle").gain(0.35).lpf(1500).crush(8).room(0.3)
).cpm(82)
```

---

## 9. Industrial (harsh textures, 120-145 BPM)

**Tempo range:** 120-145 BPM. Default **130**.
EBM/classic industrial 120-128. Rhythmic noise / hellectro 135-145.

**Time signature / feel:** 4/4, often with 8th-note gallop on the kick. Machine-like, rigid.

**Essential elements**
- Distorted kick, clipped and saturated into square-wave territory.
- Metallic, noisy percussion — sampled machinery, chains, anvils.
- Screaming sawtooth leads or bit-crushed synth stabs.
- Aggressive bassline, often distorted and detuned.
- Dark, minor-key, dystopian atmosphere.

**Drum palette**
- Kick: heavily distorted, clipped. Often 909 pushed through a chain of saturators.
- Snare: short, sharp, noise-heavy. Layered with metal hits.
- Hats: noise bursts rather than traditional hats. Filtered white noise on 16ths.
- Perc: sampled factory noise, metal scrapes, hydraulic sounds.

**Bass**
- Distorted saw or square, often detuned.
- 8th or 16th-note pulses. Sometimes Reese-style growls.
- Sidechain to kick for rhythmic pump.

**Harmonic material**
- Minor, phrygian, locrian. Dissonance welcome.
- Drones, single-note stabs, power chords.
- Rarely more than two notes at once.

**Signature sounds**
- Bit-crushed stabs, screaming modular leads.
- Sampled machinery, industrial ambiences.
- Vocoded or distorted vocals, often spoken-word.
- Granular textures, feedback loops.

**Production notes**
- Distortion, clipping, bit-crushing on nearly every channel.
- Short, tight reverbs. Long reverbs only on FX.
- Compressed dynamics — industrial is LOUD and FLAT.
- Parallel distortion on drum bus. Heavy EQ carving for room to breathe in the mids.

**Reference Strudel sketch**
```
stack(
  s("bd*4").gain(1.0).shape(0.7).crush(5),
  s("~ sd ~ sd").gain(0.7).shape(0.5).hpf(300),
  s("hh*16").gain(0.4).crush(6).hpf(7000),
  s("~ ~ mt ~ ~ mt ~ ~").gain(0.5).shape(0.4),
  note("<e1 e1 e1 g1 e1 e1 bb1 e1>").s("sawtooth").lpf(1200).shape(0.6).gain(0.8),
  note("<e3 ~ g3 ~>").s("square").gain(0.45).shape(0.5).delay(0.3).room(0.3)
).cpm(130)
```

---

## 10. Dub techno (chord stabs + delay)

**Tempo range:** 118-128 BPM. Default **123**.
Basic Channel / Chain Reaction territory.

**Time signature / feel:** 4/4 straight. Patient, hypnotic, minimal.

**Essential elements**
- Signature chord stab on the offbeat, drenched in delay and reverb.
- Deep, warm, round sub bass.
- Sparse, soft-focus drums — almost background.
- Long tape-delay feedback trails.
- 16-bar minimum phrasing; changes happen glacially.

**Drum palette**
- Kick: soft, round, 909 with a long tail. Not dominant.
- Snare/clap: brushed, distant, heavily reverbed. Sometimes absent.
- Hats: soft closed 16ths, heavily filtered.
- Perc: almost none, or tuned woodblocks panned wide.

**Bass**
- Deep sub sine, held for whole bars.
- One or two notes per loop. Slow movement.
- Root-fifth or root-only.

**Harmonic material**
- Minor 7, minor 9, sus chords. Two-chord vamps (i - IV or i - bVII).
- Dorian or aeolian modes.
- Chord density is ONE stab per offbeat — the delay fills the rest.

**Signature sounds**
- Warm analog pad chord stab (Juno, Jupiter, Prophet).
- Long tape-delay trails with feedback filter self-oscillating.
- Vinyl crackle, room ambience, tape hiss.
- Subtle field-recording textures.

**Production notes**
- Tape delay is the sound. Long delay times (1/4 dotted, 3/8), high feedback.
- Big hall reverb on chord stabs.
- Everything warm, analog-flavored, tape-saturated.
- Mono sub, wide chord/delay, centered drums.
- Dynamics preserved — dub techno is not loudness-war music.

**Reference Strudel sketch**
```
stack(
  s("bd*4").gain(0.85),
  s("~ ~ ~ cp").gain(0.35).room(0.7),
  s("hh*8").gain(0.25).hpf(6000),
  note("<a1 a1 e2 a1>").s("sine").gain(0.85),
  note("~ <[a3,c4,e4] [a3,c4,e4]> ~ <[a3,c4,e4] [a3,c4,e4]>")
    .s("sawtooth").lpf(900).gain(0.45).room(0.75).delay(0.7).delaytime(0.375)
).cpm(123)
```

---

## 11. Breakbeat (chopped breaks, 130-150 BPM)

**Tempo range:** 130-150 BPM. Default **138**.
Big beat lives 130-140. Nu-breaks and funky breaks 135-145.

**Time signature / feel:** 4/4 with breakbeat swing. Syncopated snares, ghost-note hats. Not straight.

**Essential elements**
- Chopped breakbeat as the drum foundation (Amen, Think, Apache, Funky Drummer).
- Syncopated snare placement — never just 2 and 4.
- Punchy bassline with groove and syncopation.
- Filter sweeps and big build-ups.
- Hooky sampled or synth lead.

**Drum palette**
- Breaks: Amen and Think chopped on 16ths. Programmed with groove.
- Kick: 808 or 909 layered under the break kick for weight.
- Snare: the break's snare, sometimes layered with 909 clap.
- Hats: from the break, plus added 16th-note closed hats on top.

**Bass**
- Chunky sub + mid-saw bass.
- Syncopated rhythm — follows the break's groove, not 4-on-the-floor logic.
- Note lengths vary: short stabs mixed with held sub notes.

**Harmonic material**
- Minor pentatonic, dorian. Funky, blues-influenced.
- Two-chord vamps or one-chord modal grooves.
- Less harmonic content than melodic — it's about the break.

**Signature sounds**
- Chopped Amen, Think, Apache breaks.
- Moog or TB-303-style bass.
- Filter-swept pads, big-beat synth stabs.
- Vocal hooks — often hip-hop or funk samples.

**Production notes**
- Parallel compression on drum bus. Transient shaping on kick/snare.
- Stereo wide on drums and pads; mono on bass and kick.
- Short reverb on snare, medium on lead.
- Saturation on drum bus; make the break feel FAT.

**Reference Strudel sketch**
```
stack(
  s("bd ~ ~ bd sd ~ bd sd").gain(0.9).shape(0.3),
  s("~ ~ sd ~ ~ sd ~ ~").gain(0.6).room(0.3),
  s("hh*16").gain(0.35).sometimes(x => x.gain(0.15)),
  s("~ ~ ~ cp ~ ~ cp ~").gain(0.45).room(0.35),
  note("<e2 e2 g2 a2>").s("sawtooth").lpf(900).gain(0.75).shape(0.3),
  note("<[e3,g3,b3] ~ [d3,f3,a3] ~>*2").s("sawtooth").gain(0.4).lpf(1800)
).cpm(138)
```

---

## 12. IDM (variable, glitchy)

**Tempo range:** Variable, 80-170 BPM common. Default **110**.
Often polyrhythmic — multiple tempos stacked.

**Time signature / feel:** Odd meters, polyrhythm, broken grids. 5/4, 7/8, 11/16 all welcome. Euclidean rhythms everywhere.

**Essential elements**
- Heavily processed, chopped, glitched drums.
- Unconventional rhythms — odd meters, polyrhythms, ratcheting.
- Granular synthesis, FM, additive, physical modeling.
- Melodic content that's dissonant, microtonal, or harmonically unusual.
- Sound design IS the composition.

**Drum palette**
- Programmed percussion, not sampled breaks. Every hit different.
- Kick: varies — from 808 to click to noise to impossible-to-classify.
- Snare: chopped, bit-crushed, time-stretched, layered with unusual sources.
- Perc: everything and anything. Cutlery, glass, granular clouds, stochastic triggers.

**Bass**
- Anything goes. FM, granular, wavetable, additive, modular.
- Rhythm is rarely 4-on-the-floor — syncopated, polymetric, or free.
- Often melodic rather than rhythmic.

**Harmonic material**
- Modal, atonal, microtonal, serial. Sometimes simple diatonic against dissonant textures.
- Chord density varies wildly — from single notes to 12-tone clusters.
- Autechre/Aphex/Squarepusher reference points all differ.

**Signature sounds**
- Granular textures, FM bells, modular bleeps, pitched noise, physical models.
- Reversed hits, time-stretched artifacts, bit-crush to the point of destruction.
- Carefully placed silence and surprise.

**Production notes**
- Every sound is designed, not chosen. Layering and processing is the art.
- Automation is granular — parameters move constantly.
- Dynamic range preserved; IDM isn't a loud genre.
- Stereo image is active — sounds move, jump, morph.
- Let strange mistakes stay if they sound good.

**Reference Strudel sketch**
```
stack(
  s("bd(3,8)").gain(0.9).shape(0.4),
  s("cp(5,16)").gain(0.55).crush(7).pan(sine.range(0.2, 0.8).slow(3)),
  s("hh(7,16)").gain(0.35).hpf(5000).sometimes(x => x.fast(2)),
  s("~ rim ~ ~ ~ ~ rim ~").gain(0.4).every(3, x => x.rev()).crush(5),
  note("c3(3,8) eb3(5,8) g3(2,8)").s("sine").gain(0.6).delay(0.35).jux(x => x.rev()),
  note("<c5 eb5 g5 bb5 a4>(5,13)").s("triangle").gain(0.3).lpf(3000).room(0.5).sometimes(x => x.crush(4))
).cpm(110)
```

---

## Cross-genre cheat sheet

| Genre | BPM (default) | Key tendency | Kick | Bass | Signature |
|---|---|---|---|---|---|
| Techno | 128-140 (132) | A/F minor, phrygian | 909 saturated, long tail | Sub sine following kick, 16ths | Offbeat open hat, modal drone |
| Acid techno | 130-145 (138) | A minor, E phrygian | 909 distorted | 303 monophonic 16ths with slides | TB-303 filter sweeps |
| Trance | 132-140 (138) | Minor, dorian, lydian | Layered sub+click | Offbeat rolling saw | Supersaw lead, big breakdown |
| House | 118-128 (123) | Minor 7, dorian | 909/Linn warm | Walking/rolling syncopated | Rhodes stabs, swung hats |
| Drum & bass | 170-180 (174) | Minor, phrygian dominant | Tight + click layer | Sub + Reese/growl | Chopped Amen, half-time snare |
| Ambient | free or 60-90 (72) | Modal, lydian, aeolian | Often none | Sub drone | Long pads, huge reverb |
| Synthwave | 80-110 (96) | Minor, harmonic minor | LinnDrum/Simmons | Analog saw 8ths | Gated snare, arp, supersaw lead |
| Lo-fi hip hop | 70-90 (82) | Jazz (maj7/min9) | Dusty boom-bap | Short sub or upright | Rhodes, vinyl crackle, swing |
| Industrial | 120-145 (130) | Minor, phrygian, locrian | Distorted 909 clipped | Distorted saw/square | Metallic perc, harsh textures |
| Dub techno | 118-128 (123) | Minor 7/9, sus | Soft round 909 | Deep sub sine, held notes | Offbeat chord stab + delay |
| Breakbeat | 130-150 (138) | Minor pent, dorian | 808/909 under break | Chunky sub + mid saw | Amen chops, filter sweeps |
| IDM | 80-170 (110) | Any, incl. atonal | Programmed, one-off | FM/granular/modular | Polyrhythms, glitch, sound design |

---

## Quick recipe: going from profile to sketch

1. Set `.cpm()` to the default BPM at the bottom.
2. Kick pattern first — match the genre's kick style.
3. Backbeat (snare/clap) — placement per profile.
4. Hats — density and swing per profile.
5. Bass — one line, right register, right rhythm.
6. Harmonic layer — chord stabs, pad, or lead.
7. Effects — match reverb/delay/saturation to the genre's production notes.
8. Test with `.gain(0.0)` on individual layers to hear each part.

Rule of thumb: if removing a layer still leaves the genre recognizable, the remaining layers are doing the work — keep them tight. If removing a layer kills the identity, that's your signature element.
