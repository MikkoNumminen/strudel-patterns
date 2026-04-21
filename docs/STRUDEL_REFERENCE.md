# Strudel Reference for StrudelForge

> ⚠️ This reference was written without live verification against https://strudel.cc on 2026-04-21. It documents Strudel API that is well-established and widely referenced, but has not been reconfirmed against current docs. Treat any function not listed here as unverified — prefer leaving it out of generated patterns over guessing.

StrudelForge is an AI-first music production environment. Claude translates casual Finnish/English prompts into runnable Strudel REPL code. This document is the source of truth for which primitives Claude may emit.

---

## 1. Forbidden in StrudelForge

Do **not** emit any of the following in generated Strudel code:

| Forbidden | Reason / use instead |
|-----------|----------------------|
| `.play()` | StrudelForge auto-runs the top-level pattern. |
| `setcps(...)` / `setCps(...)` | Use `.cpm(N)` at the end of the final pattern instead. |
| `const`, `let`, `var` | Patterns are expressions, not statements. Inline them. |
| `register(...)` | No custom function registration. |
| `await` / async | Patterns are synchronous. |

A generated program is a **single expression** ending in `.cpm(N)`.

---

## 2. Mini-notation syntax

Mini-notation is the string DSL inside `"..."` passed to `s`, `n`, `note`, `struct`, etc. One cycle = the whole string.

| Syntax | Meaning | Example |
|--------|---------|---------|
| `"a b c"` | Sequence (evenly divided across cycle) | `s("bd sd hh")` |
| `"[a b] c"` | Subdivision (group plays in one step) | `s("[bd bd] sd")` |
| `"a,b"` | Stack (play simultaneously) | `s("bd,hh")` |
| `"a*4"` | Repeat N times inside its step | `s("bd*4")` |
| `"a/4"` | Stretch: play once every N cycles | `s("bd/4")` |
| `"<a b c>"` | One element per cycle, advancing | `note("<c e g>")` |
| `"a?"` | Degrade: 50% chance each cycle | `s("hh?")` |
| `"a!"` | Elongate: hold for extra step | `s("bd ! sd")` |
| `"~"` | Rest / silence | `s("bd ~ sd ~")` |
| `"bd(3,8)"` | Euclidean: 3 hits spread over 8 steps | `s("bd(3,8)")` |
| `"bd(3,8,1)"` | Euclidean with rotation offset | `s("bd(3,8,1)")` |
| `"a@2 b"` | Weighted duration (a takes 2x space) | `s("bd@2 sd")` |
| `"a:1"` | Sample index selector | `s("bd:2")` |

Nested freely: `"[bd*2, [~ cp]]"` is a stack of a doubled kick and an off-beat clap.

---

## 3. Pattern construction

### `stack(...patterns)`
Plays all arguments simultaneously (like `,` in mini-notation but JS-level).
```js
stack(
  s("bd*4"),
  s("~ cp ~ cp")
)
```

### `cat(...patterns)` / `slowcat(...patterns)`
Concatenate: one full pattern per cycle, then the next.
```js
cat(
  note("c e g"),
  note("d f a")
)
```

### `seq(...patterns)` / `fastcat(...patterns)`
Concatenate inside a single cycle (each arg gets `1/N` of the cycle).
```js
seq(
  s("bd*2"),
  s("cp")
)
```

### `arrange([bars, pattern], ...)`
Schedule sections for a fixed number of bars each. Well documented; treat as canonical.
```js
arrange(
  [4, s("bd*4")],
  [4, stack(s("bd*4"), s("~ cp ~ cp"))]
)
```

### `silence`
The empty pattern. Useful as a placeholder in `every`, conditional slots, etc.
```js
s("bd*4").every(4, () => silence)
```

---

## 4. Sound sources

### `s(pattern)` / `sound(pattern)`
Plays a **sample or synth waveform** by name. `sound` is an alias of `s`.
```js
s("bd sd hh cp")
```

### `n(pattern)`
Selects a **sample index** within the current sample name, or a scale degree when combined with `.scale`.
```js
s("bd").n("0 1 2 1")           // samples bd:0, bd:1, bd:2, bd:1
n("0 2 4 6").scale("C minor")  // scale degrees
```

### `note(pattern)`
Interprets the string as **pitched notes**. Accepts scientific pitch (`c4`, `f#3`, `bb5`), MIDI numbers, or note letters.
```js
note("c4 eb4 g4 bb4").s("sawtooth")
```
- Octave defaults to 3 if omitted (`"c"` ≈ `"c3"`).
- Sharps: `c#`, flats: `bb` / `eb`.
- Chords: `"c'maj"` / `"c'min7"` shortcuts are widely documented but syntax varies — **verify** before generating.

### `freq(pattern)`
Sets raw frequency in Hz. Rarely needed; prefer `note`.
```js
freq("220 330 440").s("sine")
```

---

## 5. Synth voices

Strudel ships a small set of built-in oscillator voices usable directly as `s(...)`:

| Voice | Example |
|-------|---------|
| `sine` | `note("c e g").s("sine")` |
| `triangle` | `note("c e g").s("triangle")` |
| `square` | `note("c e g").s("square")` |
| `sawtooth` | `note("c e g").s("sawtooth")` |
| `supersaw` | `note("c e g").s("supersaw")` — widely documented, confirm params |

Combine with envelope and filter controls (Sections 8 and 10) for usable tones. Raw oscillators without an envelope will click; always add `.attack` and `.release`, or use a filter envelope.

---

## 6. Sample playback

### Common drum-machine shorthands
The default sample pack includes standard drum names:

| Name | Role |
|------|------|
| `bd` | Kick |
| `sd` | Snare |
| `hh` | Closed hi-hat |
| `oh` | Open hi-hat |
| `cp` | Clap |
| `rim` | Rimshot |
| `cb` | Cowbell |
| `rs` | Rimshot / shaker variant |

```js
s("bd sd hh cp")
```

### `.bank(name)` — drum-machine selector
Likely available, **verify**. Switches the sample bank so names like `bd`, `sd` resolve to a specific kit.
```js
s("bd sd hh cp").bank("RolandTR909")
```
Common banks referenced in Strudel docs: `RolandTR909`, `RolandTR808`, `RolandTR707`, `AkaiLinn`, `CasioRZ1`. Treat bank names as soft-confirmed; if uncertain, omit `.bank` and use raw sample names.

### `.n(index)` for sample variants
`s("hh").n("0 1 2")` walks through hi-hat variants shipped with the bank.

---

## 7. Envelope / ADSR

Applied to any sound source. Values in seconds for A/D/R; sustain is a 0–1 level.

| Control | Purpose | Example |
|---------|---------|---------|
| `.attack(sec)` | Fade-in time | `.attack(0.01)` |
| `.decay(sec)` | Decay to sustain level | `.decay(0.2)` |
| `.sustain(level)` | Held level (0–1) | `.sustain(0.5)` |
| `.release(sec)` | Fade-out after note ends | `.release(0.3)` |

```js
note("c e g").s("sawtooth").attack(0.01).decay(0.2).sustain(0.5).release(0.4)
```

Short aliases `.att`, `.dec`, `.sus`, `.rel` are often documented — **verify** before using.

---

## 8. Amplitude / space

| Control | Purpose | Range | Example |
|---------|---------|-------|---------|
| `.gain(x)` | Output volume | 0–1+ | `.gain(0.8)` |
| `.velocity(x)` | Per-note velocity scaler | 0–1 | `.velocity("0.7 1 0.6 1")` |
| `.pan(x)` | Stereo position | 0 = L, 1 = R | `.pan("0 1 0.5")` |

```js
s("bd sd").gain(0.9).pan("<0 1>")
```

---

## 9. Filters

All accept a pattern of cutoff frequencies in Hz.

| Filter | Cutoff | Resonance |
|--------|--------|-----------|
| Low-pass | `.lpf(hz)` | `.lpq(q)` |
| High-pass | `.hpf(hz)` | `.hpq(q)` |
| Band-pass | `.bpf(hz)` | `.bpq(q)` |

```js
note("c2 c3 eb2 g2").s("sawtooth").lpf(800).lpq(8)
```

### Filter envelope (confirm)
The following are documented in Strudel but API names vary across versions — **confirm against docs before generation**:

- `.lpenv(amount)` — envelope amount applied to `.lpf` cutoff.
- `.lpattack(sec)`, `.lpdecay(sec)`, `.lpsustain(level)`, `.lprelease(sec)`.
- Equivalent `.hpenv` / `.bpenv` families.

```js
note("c2*4").s("sawtooth").lpf(400).lpenv(3).lpattack(0.01).lpdecay(0.3)
```

---

## 10. Distortion / shaping

| Control | Purpose | Example |
|---------|---------|---------|
| `.shape(x)` | Soft-clip waveshaper, 0–1 | `.shape(0.4)` |
| `.crush(bits)` | Bit-crush, lower = harsher | `.crush(4)` |
| `.coarse(x)` | Sample-rate reduction | `.coarse(4)` |
| `.distort(x)` | Harder distortion stage — **confirm** exact name | `.distort(0.5)` |

```js
note("c2 eb2 g2").s("sawtooth").shape(0.3).crush(8)
```

---

## 11. Time-based FX

### Delay
| Control | Purpose | Range | Example |
|---------|---------|-------|---------|
| `.delay(x)` | Send amount to delay | 0–1 | `.delay(0.4)` |
| `.delaytime(sec)` | Delay time in seconds (or pattern) | — | `.delaytime(0.375)` |
| `.delayfeedback(x)` | Feedback amount | 0–1 | `.delayfeedback(0.6)` |

```js
s("cp").delay(0.5).delaytime(0.375).delayfeedback(0.5)
```

### Reverb
| Control | Purpose | Range | Example |
|---------|---------|-------|---------|
| `.room(x)` | Reverb send amount | 0–1 | `.room(0.4)` |
| `.roomsize(x)` | Room size / decay | 0–1 | `.roomsize(0.8)` |

```js
note("c e g").s("triangle").room(0.6).roomsize(0.9)
```

---

## 12. Formant / vowel

`.vowel("a e i o u")` applies a formant filter that colours the sound like a sung vowel. Accepts a pattern.
```js
note("c e g b").s("sawtooth").vowel("<a e i o>")
```

---

## 13. Speed / pitch

| Control | Purpose | Example |
|---------|---------|---------|
| `.speed(x)` | Sample playback speed (also transposes) | `.speed(2)` = octave up |
| `.cut(group)` | Cut-group; new notes choke earlier notes with same group id | `.cut(1)` |
| `.loop(x)` | Loop the sample | `.loop(1)` |

```js
s("bd").speed("<1 2 0.5 1>")
s("hh*8").cut(1)        // monophonic hat: each hit chokes the previous
```

---

## 14. Pattern transforms — time

| Function | Purpose | Example |
|----------|---------|---------|
| `.slow(n)` | Stretch pattern across N cycles | `s("bd sd").slow(2)` |
| `.fast(n)` | Compress N cycles into one | `s("bd sd").fast(2)` |
| `.hurry(n)` | Like `.fast` but also transposes samples | `s("bd").hurry(2)` |
| `.rev()` | Reverse in time | `note("c e g b").rev()` |
| `.ply(n)` | Repeat each event N times in place | `s("bd sd").ply(2)` |

---

## 15. Pattern transforms — structure

### `.every(n, f)`
Apply function `f` every Nth cycle.
```js
s("bd*4").every(4, x => x.fast(2))
```

### `.jux(f)`
Apply `f` only to the right stereo channel, stacking the original on the left.
```js
note("c e g b").s("sawtooth").jux(x => x.rev())
```

### `.juxBy(amount, f)`
Like `.jux` but only partially pans the effect channel (0 = mono, 1 = full split).
```js
note("c e g b").s("sawtooth").juxBy(0.5, x => x.rev())
```

### `.off(time, f)`
Layer a shifted, transformed copy of the pattern at a time offset (fraction of a cycle).
```js
note("c e g").s("triangle").off(1/8, x => x.add(note(7)))
```

### `.chunk(n, f)`
Divide the cycle into N chunks; apply `f` to one chunk per cycle, rotating through.
```js
s("bd*8").chunk(4, x => x.speed(2))
```

### `.within(range, f)`
Apply `f` only within a fractional window `[start, end]` of the cycle.
```js
s("hh*8").within([0.5, 0.75], x => x.fast(2))
```

---

## 16. Conditional / probabilistic

| Function | Probability | Example |
|----------|-------------|---------|
| `.almostNever(f)` | ~10% | `p.almostNever(x => x.rev())` |
| `.rarely(f)` | ~25% | `p.rarely(x => x.fast(2))` |
| `.sometimes(f)` | 50% | `p.sometimes(x => x.ply(2))` |
| `.often(f)` | ~75% | `p.often(x => x.add(note(12)))` |
| `.almostAlways(f)` | ~90% | `p.almostAlways(x => x.gain(1))` |
| `.sometimesBy(p, f)` | custom `p` (0–1) | `p.sometimesBy(0.3, x => x.rev())` |

### Degrade
| Function | Purpose | Example |
|----------|---------|---------|
| `.degrade()` | 50% random drop of events | `s("hh*16").degrade()` |
| `.degradeBy(p)` | Drop with custom probability | `s("hh*16").degradeBy(0.2)` |

---

## 17. Choice / randomness

| Function | Purpose | Example |
|----------|---------|---------|
| `choose(...values)` | Pick one at random each event | `n(choose(0, 3, 5, 7))` |
| `wchoose([v, w], ...)` | Weighted choose | `n(wchoose([0, 3], [7, 1]))` |
| `pick(index, [a, b, c])` | Select from an array by pattern index | `pick("<0 1 2>", [s("bd"), s("sd"), s("hh")])` |
| `rand` | Continuous random 0–1 signal | `.gain(rand.range(0.5, 1))` |
| `irand(n)` | Integer random 0..n-1 | `n(irand(8))` |
| `perlin` | Smooth Perlin noise 0–1 | `.lpf(perlin.range(300, 2000))` |

---

## 18. Signals

Continuous LFO-style signals. Each runs one cycle long by default; combine with `.slow` / `.fast` to change rate, `.range` to scale, `.segment` to quantise to steps.

| Signal | Shape |
|--------|-------|
| `sine` | Sine 0–1 |
| `cosine` | Cosine 0–1 |
| `saw` | Ramp 0→1 |
| `square` | 0 / 1 square |
| `tri` | Triangle 0–1 |
| `rand` | Random steps (see Section 17) |
| `perlin` | Smooth noise (see Section 17) |

| Method | Purpose | Example |
|--------|---------|---------|
| `.range(min, max)` | Rescale 0–1 signal to `[min, max]` | `sine.range(200, 2000)` |
| `.segment(n)` | Sample the signal at N evenly spaced steps per cycle | `sine.segment(8)` |
| `.slow(n)` | Stretch signal across N cycles | `sine.slow(4)` |
| `.fast(n)` | Speed up signal | `sine.fast(2)` |

```js
note("c2*8").s("sawtooth").lpf(sine.range(200, 2000).slow(4))
```

---

## 19. Structure / masking

| Function | Purpose | Example |
|----------|---------|---------|
| `struct(pattern, source)` | Impose rhythmic structure: source plays only where `pattern` is truthy | `note("c e g").struct("1 0 1 1")` |
| `mask(pattern, source)` | Gate source by a boolean pattern | `s("hh*16").mask("<1 1 0 1>")` |
| `euclid(pulses, steps)` | Euclidean rhythm as a method | `s("bd").euclid(3, 8)` |
| `euclidLegato(pulses, steps)` | Legato euclidean: sustain across rests | `note("c3").euclidLegato(5, 8)` |
| `euclidRot(pulses, steps, rot)` | Euclidean with rotation | `s("bd").euclidRot(3, 8, 2)` |
| `polymeter(...patterns)` | Patterns cycle at their own step counts against a common pulse | `polymeter(s("bd sd"), s("hh hh hh"))` |
| `polyrhythm(...patterns)` | Patterns share total duration, each keeping its own subdivision | `polyrhythm(s("bd bd bd"), s("cp cp cp cp"))` |

---

## 20. Tempo

### `.cpm(N)`
Sets tempo in **cycles per minute**. A 4-beat bar = 1 cycle by convention, so `.cpm(120)` ≈ 120 BPM.
```js
stack(
  s("bd*4"),
  s("~ cp ~ cp")
).cpm(120)
```

Every StrudelForge output must end with `.cpm(N)` on the outermost pattern.

---

## 21. Tuning / scales

### `.scale(name)`
Maps a pattern of numeric degrees (via `n`) to a named scale.
```js
n("0 2 4 7 4 2").scale("C:minor").s("triangle")
```

Commonly documented scale names: `"C:major"`, `"C:minor"`, `"C:dorian"`, `"C:mixolydian"`, `"C:minor:pentatonic"`, `"C:major:pentatonic"`. Scale-name syntax varies between Strudel versions (colon vs space) — **verify** with a quick test before shipping a generated pattern. The colon form is the more recent idiom.

---

## 22. Idiomatic recipes cheat sheet

All recipes use only primitives documented above and end with `.cpm(N)`. Drop any one into the REPL as-is.

### 22.1 Four-on-the-floor techno base
```js
stack(
  s("bd*4").gain(0.95),
  s("~ cp ~ cp").gain(0.7),
  s("hh*8").gain(0.5).pan(sine.range(0.3, 0.7))
).cpm(128)
```

### 22.2 Euclidean hat + clap
```js
stack(
  s("bd*4"),
  s("cp").struct("~ 1 ~ 1"),
  s("hh").euclid(7, 16).gain(0.6),
  s("oh").euclid(2, 8).gain(0.5)
).cpm(124)
```

### 22.3 Rolling 16th bass with filter sweep
```js
stack(
  s("bd*4"),
  note("c2*16")
    .s("sawtooth")
    .attack(0.01).decay(0.15).sustain(0).release(0.1)
    .lpf(sine.range(300, 2200).slow(8))
    .lpq(8)
    .gain(0.8)
    .sometimesBy(0.2, x => x.add(note(12)))
).cpm(130)
```

### 22.4 Polyrhythmic percussion
```js
stack(
  s("bd").euclid(3, 8),
  s("rim").euclid(5, 8),
  s("cb").euclid(7, 16).gain(0.5),
  s("hh*16").degradeBy(0.4).gain(0.4)
).cpm(118)
```

### 22.5 Chord stabs with delay
```js
stack(
  s("bd ~ ~ bd ~ ~ bd ~"),
  note("<c3,eb3,g3 ab2,c3,eb3 f3,ab3,c4 g3,bb3,d4>")
    .s("sawtooth")
    .attack(0.005).decay(0.25).sustain(0).release(0.2)
    .lpf(1800).lpq(4)
    .delay(0.45).delaytime(0.375).delayfeedback(0.55)
    .room(0.3).roomsize(0.7)
    .gain(0.7)
).cpm(100)
```

### 22.6 Ambient slow pad with evolving filter
```js
note("<c3,eb3,g3,bb3 f2,ab2,c3,eb3 ab2,c3,eb3,g3 g2,bb2,d3,f3>")
  .s("sawtooth")
  .attack(1.5).decay(1).sustain(0.8).release(2)
  .lpf(perlin.range(400, 2400).slow(16))
  .lpq(3)
  .vowel("<a o i e>".slow(4))
  .room(0.9).roomsize(0.95)
  .gain(0.55)
  .slow(4)
  .cpm(70)
```

---

## 23. Re-verification checklist

When WebFetch becomes available, re-fetch the following pages and reconcile anything flagged **confirm** / **verify** / **likely available** above:

- https://strudel.cc/workshop/getting-started/
- https://strudel.cc/workshop/first-sounds/
- https://strudel.cc/workshop/first-notes/
- https://strudel.cc/workshop/first-effects/
- https://strudel.cc/workshop/pattern-effects/
- https://strudel.cc/functions/intro/
- https://strudel.cc/learn/mini-notation/
- https://strudel.cc/learn/synths/
- https://strudel.cc/learn/effects/
- https://strudel.cc/learn/samples/
- https://strudel.cc/learn/signals/
- https://strudel.cc/learn/structure/
- https://strudel.cc/learn/conditional-modifiers/
- https://strudel.cc/learn/random-modifiers/

Particular items to re-check on that pass:

1. Exact names of filter-envelope controls (`.lpenv`, `.lpattack`, `.lpdecay`, `.lpsustain`, `.lprelease`, and `hp`/`bp` siblings).
2. Whether `.distort` is a canonical control or a non-core alias for `.shape`.
3. Canonical `.bank` name and list of ships-in-the-box drum banks.
4. Exact scale-name syntax (`"C:minor"` vs `"C minor"` vs `"c minor"`).
5. Confirm `supersaw` is a first-class synth voice and what extra params it exposes.
6. Confirm `.hurry` semantics (fast + transpose) match current docs.
7. Confirm `arrange([bars, pattern], ...)` signature and whether bars is beats or cycles.
8. Confirm short aliases `.att` / `.dec` / `.sus` / `.rel` before using in generated code.
9. Confirm chord-shortcut syntax (`"c'maj"`, `"c'min7"`) — currently excluded from this reference.
