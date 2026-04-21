# StrudelForge Architecture

StrudelForge is an **AI-first music production environment**. You describe music
in casual Finnish or English; Claude turns that into runnable
[Strudel](https://strudel.cc) code; you paste it into the Strudel REPL and
listen. Iterate by talking, not by hand-coding.

The repo is the long-term memory of that process: reference material, curated
presets, track sketches, reusable components, and session logs.

---

## Project goal

- **Describe → hear, fast.** "Tumma techno 140 bpm, rullaava bassline, hihat
  shuffle" should become a pasteable Strudel snippet in seconds.
- **Claude reads the repo, not just the prompt.** Conventions, genre knowledge,
  and previously-proven components live on disk so every new request starts
  informed.
- **Paste-ready output.** Everything is designed to drop straight into the
  Strudel REPL — no build step, no imports.
- **Growable library.** Every good-sounding phrase earns a home as a component
  so the next track starts stronger than the last.

---

## Directory layout

```
strudel-patterns/
├── CLAUDE.md                  # always-loaded project rules for Claude
├── docs/
│   ├── ARCHITECTURE.md        # this file
│   ├── STRUDEL_REFERENCE.md   # verified API surface, source of truth
│   ├── GENRE_PROFILES.md      # tempo/key/instrumentation per genre
│   └── MUSIC_THEORY.md        # scales, chord moves, rhythmic tricks
├── patterns/
│   ├── tracks/                # full-song-length sketches, one file each
│   ├── components/
│   │   ├── drums/             # kicks, hats, breaks, fills
│   │   ├── bass/              # basslines, subs, reeses
│   │   ├── synths/            # leads, stabs, arps
│   │   ├── fx/                # risers, impacts, transitions
│   │   └── structures/        # arrangement skeletons (intro/drop/break)
│   └── experiments/           # scratchpad, anything goes, no promises
├── presets/
│   ├── sounds.js              # curated sound snippets (drums/bass/synths…)
│   └── effects.js             # curated effect chains (filter/delay/reverb…)
├── sessions/                  # iteration logs, one per working session
└── scripts/
    └── export.js              # strip metadata headers, copy to clipboard
```

Why this shape?

- `patterns/tracks/` — **songs**. Self-contained, auditioned end-to-end.
- `patterns/components/` — **parts**. Reusable building blocks, categorized by
  musical role (not by sound source).
- `patterns/experiments/` — **play**. No quality bar. Most die here; a few
  graduate to tracks or components.
- `presets/` — **palette**. Reference snippets to copy, not modules to import.
- `sessions/` — **memory**. What you asked for, what worked, what didn't.

---

## The role of `CLAUDE.md`

`CLAUDE.md` is loaded into every Claude conversation in this repo. It holds:

- house rules for Strudel code (which primitives to use, what to avoid);
- project conventions (file naming, metadata headers, where new files go);
- tone and language (Finnish + English mixed is fine).

If a rule keeps coming up in feedback, it belongs in `CLAUDE.md`, not in your
next prompt.

---

## Reference docs

Three documents anchor generation quality. They live in `docs/` and are
referenced by Claude on demand.

- **`STRUDEL_REFERENCE.md`** — the API source of truth. Lists the Strudel
  primitives, combinators, and effects that are known-good in this environment.
  If a function isn't here, treat it as untrusted.
- **`GENRE_PROFILES.md`** — per-genre cheat sheet: typical tempo range, key
  tendencies, drum feel, sound palette, arrangement clichés. Read this before
  writing a new track in a genre.
- **`MUSIC_THEORY.md`** — scales, modes, voice-leading tricks, rhythmic
  devices. The "why it sounds good" reference.

---

## Workflow

```
   ┌──────────────┐    describe (FI/EN, casual)
   │   Mikko      │ ───────────────────────────────┐
   └──────────────┘                                │
          ▲                                        ▼
          │                               ┌──────────────────┐
          │ feedback ("tylsä", "moar")    │     Claude       │
          │                               │  reads repo,     │
          │                               │  writes Strudel  │
          │                               └──────────────────┘
          │                                        │
          │                                        ▼
          │                               ┌──────────────────┐
          │  listen (ear, not eyes)       │  Strudel REPL    │
          │ ◀─────────────────────────────│  (paste & play)  │
          │                               └──────────────────┘
          │                                        │
          │                                        ▼
          │                               ┌──────────────────┐
          └─────────── iterate ◀──────────│   session log    │
                                          │   append entry   │
                                          └──────────────────┘
                       when something is keeper-tier:
                                    │
                                    ▼
                         extract to patterns/components/
```

In short: **describe → generate → paste → listen → feedback → iterate →
(when good) extract component → log**.

---

## Component lifecycle

Nothing starts its life as a component. Reusable parts earn their status.

1. **Born in a track or experiment.** Claude writes a fresh phrase inline.
2. **Tested in context.** It has to actually sound good next to other parts.
3. **Recognized as reusable.** Mikko says "tää bassline on hyvä, tallennetaan"
   — or Claude notices a recurring pattern across sessions.
4. **Extracted** to `patterns/components/<category>/<name>.js` with a metadata
   header:

   ```js
   // Genre: dark techno
   // Tempo: 138-142
   // Key: A minor
   // Role: bassline (rolling, offbeat)
   // Notes: works well under a filtered-noise hat loop
   stack(
     note("a1 a1 c2 a1").s("sawtooth").lpf(sine.range(300, 900).slow(8)),
     // ...
   )
   ```

5. **Referenced later.** Next time a similar brief lands, Claude can pull the
   component, adapt it, or stack it with fresh material.

The metadata header is what makes components *searchable and composable*. It's
also the first thing `scripts/export.js` strips so the REPL sees only music.

---

## Experiments vs tracks vs components

| Folder         | Intent                         | Quality bar              | Lifespan                |
|----------------|--------------------------------|--------------------------|-------------------------|
| `experiments/` | Try something weird            | None                     | Usually short           |
| `tracks/`      | A full sketch, auditioned end-to-end | "I'd listen to this"     | Long, revisited         |
| `components/`  | Reusable, well-named part      | "I'd build on this"      | Indefinite, versioned   |

Rule of thumb: **start in `experiments/`**. Promote to `tracks/` when it holds
together as a piece. Promote individual parts to `components/` when you catch
yourself wanting them again.

---

## Session log

`sessions/` contains one file per working session (e.g.
`sessions/2026-04-21-dark-techno.md`). Each entry captures:

- **Goal** — what the session was aiming for.
- **Prompts** — the key descriptions you gave Claude.
- **What worked** — phrases, sounds, moves to reuse.
- **What didn't** — so we don't repeat the same dead end.
- **Artifacts** — new files in `tracks/`, `experiments/`, or `components/`.

Appending is a plain `>>` — no schema police. The log is for *you* a month from
now, and for Claude to skim when you start a follow-up session.

---

## Future: Strudel MCP integration

Right now the loop ends at "paste into the REPL." The next step is
[strudel-mcp-server](https://github.com/williamzujkowski/strudel-mcp-server),
which exposes Strudel playback as an MCP tool. With that connected, Claude can:

- start/stop playback directly,
- swap patterns without a manual paste,
- A/B two versions on command.

The repo is intentionally shaped to survive that transition: code stays
paste-ready, components stay modular, reference docs stay authoritative. The
MCP server just removes the last manual step.
