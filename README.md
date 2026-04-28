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

> *"Slow ambient for a space game menu. Stellaris vibe — long pad chords, sparse twinkling bells up high, no drums. Should feel like floating, not waiting."*

Output is a Strudel pattern, refined through listen-and-respond iteration. Decisions and changes live in `sessions/SESSION_LOG.md` alongside the git history.

## A taste

A few lines distilled from `spacepotatis-galaxy-overworld.js` — Strudel is just expressions:

```js
stack(
  // sub drone — chord roots, soft sine
  note("<d2 f2 c2 a2>").slow(4).s("sine").attack(2).release(3).gain(0.7),
  // detuned saw pad with breathing filter and stereo width
  note("<[d3,f3,a3,c4,e4] [c3,f3,a3,c4,e4] [c3,e3,g3,b3,d4] [a2,c3,e3,g3,c4]>").slow(4)
    .s("sawtooth")
    .attack(2.5).release(4)
    .lpf(perlin.range(700, 2400).slow(24)).lpq(2)
    .room(0.7).gain(0.45)
    .jux(x => x.add(0.12)),
  // sparse triangle bells with dotted-8th delay — stars twinkling
  note("<a4 c5 e5 d5 c5 a4 e5 c5>").slow(4)
    .s("triangle").release(0.6)
    .delay(0.55).delaytime(0.375).delayfeedback(0.6)
    .room(0.55).gain(0.32).degradeBy(0.4)
).cpm(15)
```

Every track in the repo is a single expression like this — composable, no build step, no state.

## Selected tracks

| Track | Genre | BPM | Description |
|-------|-------|-----|-------------|
| `jaakko-kulta-future-bass.js` | Trance × future bass | 132 | Finnish children's canon reimagined — [▶ MP3](renders/Jaakkokulta.mp3) |
| `spacepotatis-galaxy-overworld.js` | Ambient space chillout | ~60 | Main menu / galaxy view of [Spacepotatis](https://github.com/MikkoNumminen/Spacepotatis) — Stellaris-paced pad + Tyrian-era synths — [▶ MP3](renders/SpacepotatisMainMenu.mp3) |
| `spacepotatis-mission1.js` | Combat synthwave | 132 | Mission 1 theme of [Spacepotatis](https://github.com/MikkoNumminen/Spacepotatis) — Tyrian-style buildup → drop → loop, cyberpunk palette — [▶ MP3](renders/SpacepotatisMission1.mp3) |

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
