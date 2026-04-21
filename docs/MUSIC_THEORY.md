# Music Theory — Strudel Reference

Condensed theory notes for StrudelForge. Assumes you know what a dominant chord does; this is here so we can recall names, intervals, and idiomatic Strudel syntax fast.

Every snippet is self-contained and pasteable into https://strudel.cc.

---

## 1. Note names in Strudel

### Pitch notation

Strudel's `note()` takes **scientific pitch notation**: letter + optional accidental + octave number. Middle C is `c4`. A440 is `a4`.

| Syntax   | Meaning                      |
| -------- | ---------------------------- |
| `c4`     | middle C                     |
| `c#4`    | C sharp 4 (use `#`)          |
| `eb3`    | E flat 3 (use lowercase `b`) |
| `f##4`   | F double-sharp (rare)        |
| `gbb4`   | G double-flat (rare)         |
| `~`      | rest                         |
| `60`     | MIDI number (C4 = 60)        |

Octaves: `c0` is very low (16 Hz region), `c8` is very high. Safe range for basses: `c1`–`c3`. Pads/leads: `c3`–`c6`.

```js
// melody, mini-notation
note("c4 eb4 g4 bb4 c5 bb4 g4 eb4").s("sawtooth").cpm(120)
```

### Rests and holds

```js
// rest via ~, hold a step via _
note("c4 ~ eb4 _ g4 ~ bb4 _").s("square").cpm(110)
```

### MIDI numbers

Strudel accepts integers as MIDI. Useful for programmatic transposition.

```js
note("60 63 67 70").s("triangle").cpm(120)   // same as c4 eb4 g4 bb4
```

### Scale index vs absolute note

`n()` emits **indices**; combine with `.scale()` (if available in your build) or map manually. `note()` emits absolute pitches. Two ways to play the same C minor 7 arpeggio:

```js
// absolute note names
note("c4 eb4 g4 bb4").s("sawtooth").cpm(120)
```

```js
// scale-degree style: root + offsets (semitones)
note("0 3 7 10".add(60)).s("sawtooth").cpm(120)   // numeric form
```

For pure scale-degree playback without semitone math, use `n()` with a synth that interprets it as a degree, or stick to absolute names — simpler for producers.

---

## 2. Intervals

Semitone counts from the root. Memorize tension/release behavior.

| Interval        | Semis | Sound              | Use                              |
| --------------- | ----- | ------------------ | -------------------------------- |
| Unison          | 0     | identity           | doubling, octave stacks          |
| Minor 2nd       | 1     | harsh, leading     | chromatic tension, horror        |
| Major 2nd       | 2     | mild dissonance    | sus2, suspensions                |
| Minor 3rd       | 3     | dark               | defines minor triad              |
| Major 3rd       | 4     | bright             | defines major triad              |
| Perfect 4th     | 5     | open, suspended    | sus4, quartal voicings           |
| Tritone (♭5/♯4) | 6     | maximum tension    | dom7, diminished, blues          |
| Perfect 5th     | 7     | power, stable      | power chords, root motion        |
| Minor 6th       | 8     | melancholic        | minor add voicings               |
| Major 6th       | 9     | wistful            | maj6, pentatonic color           |
| Minor 7th       | 10    | bluesy, unresolved | dom7, min7                       |
| Major 7th       | 11    | jazzy, dreamy      | maj7, lush pads                  |
| Octave          | 12    | same note          | bass doubling, stereo widening   |

Rule of thumb: **odd intervals (3, 5, 7) build chords, even intervals (2, 4, 6) are added colors**.

---

## 3. Scales

All examples in C unless noted. Interval pattern = semitones between successive notes.

### Major (Ionian)

C D E F G A B — `2 2 1 2 2 2 1`

```js
note("c4 d4 e4 f4 g4 a4 b4 c5").s("triangle").cpm(120)
```

Genre use: pop, house, trance uplifts, synthwave bright sections.

### Natural minor (Aeolian)

C D Eb F G Ab Bb — `2 1 2 2 1 2 2`

```js
note("c4 d4 eb4 f4 g4 ab4 bb4 c5").s("sawtooth").cpm(120)
```

Genre use: techno, trance, drum & bass — default dark palette.

### Dorian

C D Eb F G A Bb — `2 1 2 2 2 1 2` (minor with raised 6)

```js
note("c4 d4 eb4 f4 g4 a4 bb4 c5").s("sawtooth").cpm(120)
```

Genre use: deep house, dub techno, jazzy funk. The raised 6 gives the "cool minor" sound.

### Phrygian

C Db Eb F G Ab Bb — `1 2 2 2 1 2 2` (minor with flat 2)

```js
note("c4 db4 eb4 f4 g4 ab4 bb4 c5").s("sawtooth").cpm(120)
```

Genre use: industrial, dark techno, Spanish/flamenco tinge, metal.

### Lydian

C D E F# G A B — `2 2 2 1 2 2 1` (major with raised 4)

```js
note("c4 d4 e4 f#4 g4 a4 b4 c5").s("triangle").cpm(120)
```

Genre use: dreamy ambient, progressive trance, film-score shimmer.

### Mixolydian

C D E F G A Bb — `2 2 1 2 2 1 2` (major with flat 7)

```js
note("c4 d4 e4 f4 g4 a4 bb4 c5").s("sawtooth").cpm(120)
```

Genre use: funk, rock, dominant vamps, acid house riffs.

### Locrian

C Db Eb F Gb Ab Bb — `1 2 2 1 2 2 2` (diminished 5th)

```js
note("c4 db4 eb4 f4 gb4 ab4 bb4 c5").s("sawtooth").cpm(120)
```

Genre use: almost none melodically — great for horror pads, passing tension.

### Harmonic minor

C D Eb F G Ab B — `2 1 2 2 1 3 1` (minor with natural 7)

```js
note("c4 d4 eb4 f4 g4 ab4 b4 c5").s("sawtooth").cpm(120)
```

Genre use: neoclassical, hardstyle, epic trance, Middle-Eastern lead lines.

### Melodic minor (ascending)

C D Eb F G A B — `2 1 2 2 2 2 1`

```js
note("c4 d4 eb4 f4 g4 a4 b4 c5").s("sawtooth").cpm(120)
```

Genre use: jazz, sophisticated IDM harmonies, modal jazz-house.

### Whole tone

C D E F# G# A# — `2 2 2 2 2 2`

```js
note("c4 d4 e4 f#4 g#4 a#4 c5").s("triangle").cpm(120)
```

Genre use: dream sequences, transitions, impressionist pads. All notes equidistant — no tonal center.

### Pentatonic major

C D E G A — `2 2 3 2 3`

```js
note("c4 d4 e4 g4 a4 c5").s("triangle").cpm(120)
```

Genre use: riffs that never sound wrong. House, lo-fi, pop hooks.

### Pentatonic minor

C Eb F G Bb — `3 2 2 3 2`

```js
note("c4 eb4 f4 g4 bb4 c5").s("sawtooth").cpm(120)
```

Genre use: blues, hip hop, rock leads, techno acid lines.

### Blues (minor pent + ♭5)

C Eb F F# G Bb — `3 2 1 1 3 2`

```js
note("c4 eb4 f4 f#4 g4 bb4 c5").s("sawtooth").cpm(110)
```

Genre use: blues, breakbeat riffs, filthy acid.

### Phrygian dominant (5th mode of harmonic minor)

C Db E F G Ab Bb — `1 3 1 2 1 2 2`

```js
note("c4 db4 e4 f4 g4 ab4 bb4 c5").s("sawtooth").cpm(130)
```

Genre use: acid, psytrance, Middle-Eastern, metal. The signature "snake-charmer" sound.

### Quick scale summary

| Scale              | Formula (semitones from root)  | Mood                |
| ------------------ | ------------------------------ | ------------------- |
| Major              | 0 2 4 5 7 9 11                 | bright              |
| Natural minor      | 0 2 3 5 7 8 10                 | dark                |
| Dorian             | 0 2 3 5 7 9 10                 | cool minor          |
| Phrygian           | 0 1 3 5 7 8 10                 | dark, Spanish       |
| Lydian             | 0 2 4 6 7 9 11                 | dreamy              |
| Mixolydian         | 0 2 4 5 7 9 10                 | bluesy bright       |
| Locrian            | 0 1 3 5 6 8 10                 | unstable            |
| Harmonic minor     | 0 2 3 5 7 8 11                 | exotic              |
| Melodic minor      | 0 2 3 5 7 9 11                 | jazz                |
| Whole tone         | 0 2 4 6 8 10                   | floating            |
| Pentatonic major   | 0 2 4 7 9                      | universal bright    |
| Pentatonic minor   | 0 3 5 7 10                     | universal dark      |
| Blues              | 0 3 5 6 7 10                   | gritty              |
| Phrygian dominant  | 0 1 4 5 7 8 10                 | acid / Middle-East  |

---

## 4. Chords

### Triads

| Chord       | Intervals      | Notes (C root) | Strudel stack                              |
| ----------- | -------------- | -------------- | ------------------------------------------ |
| Major       | 0 4 7          | C E G          | `note("c3,e3,g3")`                         |
| Minor       | 0 3 7          | C Eb G         | `note("c3,eb3,g3")`                        |
| Diminished  | 0 3 6          | C Eb Gb        | `note("c3,eb3,gb3")`                       |
| Augmented   | 0 4 8          | C E G#         | `note("c3,e3,g#3")`                        |
| Sus2        | 0 2 7          | C D G          | `note("c3,d3,g3")`                         |
| Sus4        | 0 5 7          | C F G          | `note("c3,f3,g3")`                         |

Stacking syntax: **commas inside the mini-notation string create a simultaneous stack**.

```js
// minor triad stab on every 4th beat
note("[c3,eb3,g3]*2").s("sawtooth").lpf(900).cpm(120)
```

### 7th chords

| Chord       | Intervals         | Notes (C root)   | Use                        |
| ----------- | ----------------- | ---------------- | -------------------------- |
| maj7        | 0 4 7 11          | C E G B          | lush, jazzy, Rhodes pads   |
| min7        | 0 3 7 10          | C Eb G Bb        | deep house, neo-soul       |
| dom7        | 0 4 7 10          | C E G Bb         | blues, funk, tension       |
| min7♭5 (ø)  | 0 3 6 10          | C Eb Gb Bb       | ii° in minor ii-V-i        |
| dim7        | 0 3 6 9           | C Eb Gb A        | passing tension, horror    |

```js
// min7 chord progression — deep house style
note("<[c3,eb3,g3,bb3] [f3,ab3,c4,eb4] [ab2,c3,eb3,g3] [g2,bb2,d3,f3]>")
  .s("sawtooth").lpf(1200).room(0.3).cpm(118)
```

### Extended chords

9 / 11 / 13 — just keep stacking thirds. Typical electronic usage is rootless or sparse.

| Chord  | Notes (C root)          | Voicing tip                            |
| ------ | ----------------------- | -------------------------------------- |
| maj9   | C E G B D               | drop the root, play `E G B D`          |
| min9   | C Eb G Bb D             | drop root: `Eb G Bb D`                 |
| dom9   | C E G Bb D              | drop root: `E G Bb D`                  |
| 11     | add F (omit 3 for susness) | works great as sus-style pad         |
| 13     | add A                   | jazz-funk chord stabs                  |

### Sparse / electronic voicings

Full stacked chords sound muddy on synths. Common tricks:

- **Rootless**: bass plays the root, chord instrument plays 3rd + 7th (+ 9th).
- **Shell voicing**: just root + 3rd + 7th.
- **Quartal**: stack 4ths (`c3 f3 bb3`) — modern, ambiguous.
- **Power + 7**: root + 5th + 7th (no 3rd) — huge, genderless.
- **Octave + 10th**: root low, 3rd two octaves up — open, trance-y.

```js
// rootless min9 stab — bass handles root separately
stack(
  // bass root
  note("<c2 f2 ab1 g1>").s("sawtooth").lpf(400),
  // rootless chord: 3rd, 5th, 7th, 9th
  note("<[eb3,g3,bb3,d4] [ab3,c4,eb4,g4] [c4,eb4,g4,bb4] [bb3,d4,f4,a4]>")
    .s("triangle").gain(0.5).room(0.4)
).cpm(118)
```

---

## 5. Common progressions

Roman numerals: uppercase = major, lowercase = minor, ° = diminished. All examples in C major or A minor (same key signature) unless stated.

### I–V–vi–IV (pop/trance uplift)

C major: C G Am F

```js
note("<c3 g2 a2 f2>").s("sawtooth").lpf(800).cpm(128)
```

### vi–IV–I–V (emotional / trance breakdown)

C major: Am F C G

```js
note("<a2 f2 c3 g2>").s("sawtooth").lpf(900).cpm(132)
```

### i–VI–III–VII (minor anthem)

A minor: Am F C G

```js
note("<a2 f2 c3 g2>").s("sawtooth").lpf(700).cpm(138)
// same roots as vi-IV-I-V — just framed from the minor
```

### i–iv–v (minor blues / dark techno)

A minor: Am Dm Em (or E for dominant pull)

```js
note("<a2 d3 e3 e3>").s("sawtooth").lpf(600).cpm(125)
```

### ii–V–I (jazz cadence)

C major: Dm7 G7 Cmaj7

```js
stack(
  note("<d2 g2 c2>"),                                   // bass roots
  note("<[f3,a3,c4] [f3,g3,b3] [e3,g3,b3]>").gain(0.6)  // shell voicings
).s("triangle").cpm(90)
```

### Dorian vamp (i–IV)

C Dorian: Cm7 F7 (the raised-6 F chord is the dorian signature)

```js
stack(
  note("<c2 f2>"),
  note("<[eb3,g3,bb3] [a3,c4,eb4]>").gain(0.6)
).s("sawtooth").lpf(1000).cpm(118)
```

### Phrygian vamp (i–♭II)

C Phrygian: Cm Db

```js
stack(
  note("<c2 db2 c2 db2>"),
  note("<[c3,eb3,g3] [db3,f3,ab3]>").gain(0.6)
).s("sawtooth").lpf(800).cpm(130)
```

### Four-chord trance/house loop

Am F C G — 8-bar structure, one chord every 2 bars:

```js
stack(
  // pad
  note("<[a3,c4,e4] [f3,a3,c4] [c3,e3,g3] [g3,b3,d4]>/2")
    .s("sawtooth").lpf(1500).room(0.5).gain(0.5),
  // bass
  note("<a1 f1 c2 g1>/2").s("square").lpf(300)
).cpm(132)
```

### Progression cheat sheet

| Name             | Roman numerals       | Vibe                       |
| ---------------- | -------------------- | -------------------------- |
| Pop              | I–V–vi–IV            | bright, predictable        |
| Emotional        | vi–IV–I–V            | uplift from sadness        |
| Minor anthem     | i–VI–III–VII         | epic, cinematic            |
| Andalusian       | i–VII–VI–V           | Spanish, psytrance         |
| Minor blues      | i–iv–v               | gritty, low-slung          |
| Jazz             | ii–V–I               | resolution, sophistication |
| Dorian vamp      | i–IV                 | cool, funky minor          |
| Phrygian vamp    | i–♭II                | dark, exotic               |
| Modal plagal     | i–♭VII–i             | rock, techno stasis        |

---

## 6. Bass & root motion

Root motion drives perceived harmony more than the chord voicings on top. In electronic music, basslines often *are* the chord.

### Patterns by genre

| Genre        | Typical root motion                                  |
| ------------ | ---------------------------------------------------- |
| Techno       | Pedal tone (one note for 8–16 bars), octave jumps    |
| House        | Root–5th–root, walking bass, disco octaves           |
| Trance       | Root every 2 bars, smooth step motion                |
| Acid         | Single-note ostinato with slides and accents         |
| Drum & bass  | Reese on root, halftime jumps, 5ths                  |
| Dub techno   | Offbeat pedal, occasional minor 3rd drop             |
| Synthwave    | Root–5th–octave arp, 80s-style                       |
| Industrial   | Chromatic descent, tritone leaps                     |

### Pedal tone (techno)

```js
note("c1*8").s("sawtooth").lpf(300).gain(0.9).cpm(132)
```

### Octave jumps (house)

```js
note("c1 c2 c1 c2").s("sawtooth").lpf(500).cpm(125)
```

### Root–5th–root (classic)

```js
note("<c1 g1 c1 g1>*2").s("sawtooth").lpf(400).cpm(128)
```

### Walking bass (deep house)

```js
note("c2 eb2 g2 bb2").s("sawtooth").lpf(600).cpm(120)
```

### Reese-style (D&B)

```js
note("<c1!6 eb1 g1>").s("sawtooth").lpf(400).room(0.2).cpm(174)
```

### Chromatic descent (industrial)

```js
note("c2 b1 bb1 a1").s("square").lpf(500).cpm(130)
```

---

## 7. Rhythmic theory primer

### Grid basics

- **4/4** is default. One bar = 4 beats = 16 sixteenth notes.
- **Straight** = even 16ths. **Swung** = late 2nd and 4th 16ths (MPC swing).
- Strudel divides each bar across your mini-notation automatically; `"bd bd bd bd"` = 4-on-the-floor.

### Straight vs swung

```js
// straight 16th hats
s("hh*16").gain(0.5).cpm(120)
```

```js
// swung hats via .swing or .late — fall back to manual shuffle
s("hh ~ hh ~ hh ~ hh ~").fast(2).gain(0.5).cpm(120)
```

### Polyrhythms

**3 over 4**: triplets against quarters.

```js
stack(
  s("bd*4").gain(0.9),          // 4
  s("cp*3").gain(0.5)           // 3 — cycles against the kick
).cpm(120)
```

**5 over 4**: 5 hits in the time of 4.

```js
stack(
  s("bd*4"),
  s("rim*5").gain(0.5)
).cpm(120)
```

### Euclidean rhythms

`s("bd(k,n)")` distributes `k` hits as evenly as possible across `n` steps. The origin of most world rhythms.

| Notation       | Pattern                | Use                     |
| -------------- | ---------------------- | ----------------------- |
| `bd(3,8)`      | X..X..X.               | tresillo, Latin kick    |
| `bd(5,8)`      | X.XX.XX.               | cuban cinquillo         |
| `bd(3,4)`      | X.XX                   | gallop                  |
| `bd(7,16)`     | X.X.X.X.X.X.X...       | busy kick               |
| `cp(2,5)`      | X..X.                  | odd clap                |
| `hh(11,16)`    | sparse hat groove       | off-grid hats           |

```js
stack(
  s("bd(3,8)").gain(0.9),
  s("hh(11,16)").gain(0.4),
  s("cp(2,8,4)")                // shifted pattern
).cpm(130)
```

### Kick/snare patterns

| Style             | Pattern                                    |
| ----------------- | ------------------------------------------ |
| Four-on-floor     | `s("bd*4")`                                |
| Techno + ghost    | `s("bd bd [bd bd] bd")`                    |
| House w/ clap     | `stack(s("bd*4"), s("~ cp ~ cp"))`         |
| Breakbeat (amen)  | `s("bd sd [~ bd] sd")`                     |
| D&B halftime      | `s("bd ~ ~ sd ~ ~ bd ~")`                  |
| Trap              | `s("bd ~ ~ bd ~ ~ bd ~")` + `s("cp*2")` on snare |
| Dub techno off    | `s("bd ~ ~ ~")` + `s("~ rim ~ rim")`       |

```js
// classic techno drum core
stack(
  s("bd*4").gain(0.9),
  s("~ cp ~ cp").gain(0.7),
  s("hh*8").gain(0.4).pan(sine.range(0.3, 0.7))
).cpm(130)
```

---

## 8. Putting it together — quick recipes

Three complete Strudel patterns combining scale, progression, and rhythm. Paste into the REPL.

### Recipe 1 — Dorian deep house (118 BPM)

C Dorian, i–IV vamp, walking bass, swung hats.

```js
stack(
  // kick — four on the floor
  s("bd*4").gain(0.9),
  // clap — backbeat
  s("~ cp ~ cp").gain(0.6),
  // hats — 8ths with open accent
  s("hh*8").gain(0.4).pan(sine.range(0.3, 0.7)),
  s("~ ~ ~ oh ~ ~ ~ ~").gain(0.5),
  // bass — walks up C Dorian
  note("c2 eb2 g2 a2").s("sawtooth").lpf(500).gain(0.8),
  // rootless chord stab: i (Cm9) — IV (F9) — two bars each
  note("<[eb3,g3,bb3,d4] [a3,c4,eb4,g4]>/2")
    .s("triangle").lpf(1800).room(0.3).gain(0.5)
).cpm(118)
```

### Recipe 2 — Phrygian acid techno (138 BPM)

C Phrygian dominant, i–♭II vamp, pedal-tone bass, euclidean percussion.

```js
stack(
  // kick — driving
  s("bd*4").gain(0.95),
  // offbeat hats
  s("~ hh ~ hh").gain(0.5),
  // euclidean perc for interest
  s("rim(5,8)").gain(0.4),
  // pedal-tone bass with flat-2 drop
  note("<c1!6 db1 c1>").s("sawtooth").lpf(400).gain(0.9),
  // acid line — phrygian dominant
  note("c3 db3 e3 g3 ab3 g3 e3 db3")
    .s("sawtooth").lpf(sine.range(400, 2500).slow(4))
    .gain(0.6).sometimes(x => x.add(12))
).cpm(138)
```

### Recipe 3 — Minor anthem trance (132 BPM)

A minor, vi–IV–I–V (= Am–F–C–G), supersaw pad, octave bass, 16th hats.

```js
stack(
  // kick
  s("bd*4").gain(0.95),
  // clap on 2 and 4
  s("~ cp ~ cp").gain(0.7),
  // 16th hats for energy
  s("hh*16").gain(0.35).pan(sine.range(0.25, 0.75)),
  // open hat accent
  s("~ ~ oh ~").gain(0.5),
  // bass — octave jumps on each chord
  note("<a1 a2 f1 f2 c2 c3 g1 g2>").s("sawtooth").lpf(500).gain(0.85),
  // pad — full triad stack, one chord per bar
  note("<[a3,c4,e4] [f3,a3,c4] [c4,e4,g4] [g3,b3,d4]>")
    .s("sawtooth").lpf(sine.range(800, 2500).slow(8))
    .room(0.5).gain(0.45),
  // lead — pentatonic minor riff, every 4 bars
  note("a4 c5 e5 d5 c5 a4 ~ ~")
    .s("triangle").delay(0.3).room(0.3).gain(0.5)
    .every(4, x => x.fast(2))
).cpm(132)
```

---

## Quick-recall appendix

### Key signatures by genre default

| Genre          | Default key feel                |
| -------------- | ------------------------------- |
| Techno         | A minor / C minor / F minor     |
| Trance         | A minor / E minor / F# minor    |
| House          | C minor / G minor / A minor     |
| Deep house     | C dorian / D dorian             |
| Acid           | A phrygian / C phrygian dom.    |
| D&B            | F minor / G minor               |
| Synthwave      | D minor / A minor (major IVs)   |
| Ambient        | modal — any, often lydian       |
| Dub techno     | A minor / dorian pedal          |
| Industrial     | locrian/phrygian, chromatic     |

### Fast chord-from-scale lookup (diatonic 7ths)

In **major**: Imaj7  ii7  iii7  IVmaj7  V7  vi7  vii°7
In **minor** (natural): i7  ii°7  ♭IIImaj7  iv7  v7  ♭VImaj7  ♭VII7

### Semitones you'll reach for constantly

- **Minor 3rd up** = +3  (e.g. c → eb)
- **Perfect 5th up** = +7  (e.g. c → g)
- **Octave** = +12
- **Transpose to relative major** = +3 from minor root (A minor → C major)
- **Transpose to parallel major** = change 3rd from minor to major (Am → A)

---

End of reference. When in doubt: stay in the scale, let rhythm carry the idea, add chromaticism only on purpose.
