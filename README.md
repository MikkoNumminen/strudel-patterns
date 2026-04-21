# strudel-patterns

![license](https://img.shields.io/badge/license-MIT-blue) ![engine](https://img.shields.io/badge/engine-Strudel-ff69b4) ![status](https://img.shields.io/badge/status-active-brightgreen)

Algorithmic music compositions written in [Strudel](https://strudel.cc) — a JavaScript live coding environment built on functional reactive programming and pattern composition.

This project demonstrates modular software architecture and domain-specific code generation applied to an unconventional domain: electronic music. Every track is built through a structured AI workflow — natural language direction → generation → listen → iterate — with the same engineering discipline I apply to production web applications.

**Listen & play:** paste any `.js` file from `patterns/tracks/` into the [Strudel REPL](https://strudel.cc) and press play.

## What's in here

```
patterns/
  tracks/          Complete compositions — paste into Strudel and hit play
  components/     Reusable building blocks (drums, bass, synths, fx)
  experiments/    Ideas in progress, sketches, happy accidents

presets/          Curated synth and effect chain configurations
sessions/         Production notes — what changed between iterations and why
docs/             Strudel API reference, genre profiles, music theory cheat sheets
```

## How I direct it

Input looks like this:

> *"140 BPM dark techno. Driving four-on-the-floor kick, gritty acid 303 bassline, industrial hi-hats. Leave space. Build tension for 16 bars, then drop a distorted reese bass."*

Output is a Strudel pattern, refined through listen-and-respond iteration. Decisions and changes live in `sessions/SESSION_LOG.md` alongside the git history.

## A taste

A few lines distilled from the main groove of `dark-techno-140.js` — Strudel is just expressions:

```js
stack(
  // driving four-on-the-floor, tuned low with body
  s("bd*4").gain(1.0).shape(0.55).lpf(3500),
  // rolling 16th closed hats, velocity ducking via sine
  s("hh*16").gain(sine.range(0.25, 0.5).fast(4)).hpf(7000).cut(1),
  // offbeat open hat — the techno heartbeat
  s("~ ~ ~ oh").gain(0.55).hpf(3500).pan(0.65),
  // acid 303 — phrygian ostinato, pedal on C with flat-2 lean
  note("c2 c3 db2 c2 c2 eb3 c2 g2 c2 c3 db2 f2 c2 eb3 bb2 ab2")
    .s("sawtooth")
    .attack(0.005).decay(0.18).sustain(0).release(0.08)
    .lpf(sine.range(350, 2800).slow(8))
    .lpq(12).shape(0.4).gain(0.78)
).cpm(140)
```

Every track in the repo is a single expression like this — composable, no build step, no state.

## Selected tracks

| Track | Genre | BPM | Description |
|-------|-------|-----|-------------|
| `dark-techno-140.js` | Dark Techno | 140 | Driving kick, acid 303, industrial textures |
| `melodic-trance-138.js` | Melodic Trance | 138 | Supersaw pads, rolling bass, breakdown → drop |
| `ambient-drift-70.js` | Ambient | 70 | Evolving pads, granular textures, space |
| `jaakko-kulta-future-bass.js` | Trance × future bass | 132 | Finnish children's canon reimagined — [▶ MP3](renders/Jaakkokulta.mp3) |

Rendered MP3s of selected tracks live in [`renders/`](renders/) (WAV sources are git-ignored to keep the repo lean).

## Component library

Worked-out drum patterns, basslines, synth layers, effect chains, and song skeletons live in `patterns/components/` — each self-contained, each carrying its own metadata header, each droppable into a new track via `stack()`.

## Tech

- **[Strudel](https://strudel.cc)** — JavaScript/TypeScript pattern engine, port of TidalCycles (functional reactive programming paradigm)
- **[Claude Code](https://claude.ai/code)** — AI-assisted code generation with structured project context (`CLAUDE.md`, skills, agent configuration)
- **Strudel superdough** — built-in Web Audio API synthesis (no external audio dependencies)
- **Git** — version control as creative history — every iteration is a commit

## Decisions behind the structure

**Modular architecture.** Drum patterns, basslines, effect chains — each lives in its own file with a metadata header. Compositions compose them via `stack()`.

**AI-first project design.** The repo is built around `CLAUDE.md` — a structured context document that teaches the agent the project's conventions, Strudel's API surface, music theory fundamentals, and genre-specific production rules.

**Iteration tracking.** Creative decisions are logged in `sessions/SESSION_LOG.md` with timestamps and reasoning. Combined with git history, the full evolution of any track is traceable from first idea to final version.

**Documentation as architecture.** `docs/STRUDEL_REFERENCE.md` is a curated API surface — not a dump of the full docs, but a filtered reference that prevents the agent from hallucinating non-existent functions. `docs/GENRE_PROFILES.md` encodes genre knowledge as structured data.

**No runtime dependencies.** Patterns are pure Strudel expressions — self-contained, portable, no build step. No global state, no side effects, no hidden configuration.

## Also from me

Same engineering style applied to full-stack web: [HRManager](https://github.com/MikkoNumminen/HRManager) · [ReadLog](https://github.com/MikkoNumminen/ReadLog) · [AudiobookMaker](https://github.com/MikkoNumminen/AudiobookMaker).

## Credits

- [TidalCycles](https://tidalcycles.org/) — the original pattern language by Alex McLean.
- [Strudel](https://strudel.cc) — JavaScript port and web REPL by Felix Roos and contributors.

## License

MIT — patterns and code. Sample content from Strudel's built-in library follows its own licensing.
