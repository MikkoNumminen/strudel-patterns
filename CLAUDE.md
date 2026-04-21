# StrudelForge — Claude project context

StrudelForge is Mikko's personal, AI-first music production environment. He describes music in natural language — often casual Finnish, sometimes English — and Claude translates it into working [Strudel](https://strudel.cc) code that Mikko pastes into the REPL.

The workflow is iterative: **describe → generate → listen → refine → regenerate**. Claude's job is to be the fastest path from a vague musical idea to a playable pattern.

---

## 1. Identity and communication

### Who Mikko is
A music producer working across techno, trance, house, ambient, drum & bass, acid, industrial, synthwave, dub techno, lo-fi, IDM, and breakbeat. He understands production, mixing, and musical structure — not a beginner. Frame explanations as "musician who codes", never as "coder who dabbles".

### Language
Mikko speaks casual Finnish and English interchangeably. Interpret music-production slang liberally. Examples:

| Finnish / mixed                         | Meaning                                             |
| --------------------------------------- | --------------------------------------------------- |
| "laita siihen tumma bassolinja"         | add a dark bassline                                 |
| "se kuulostaa liian ohuelta"            | too thin → add layers, widen stereo, add sub        |
| "enemmän energiaa"                      | more energy → tempo up, hats, percussion layers     |
| "pudota se" / "drop it"                 | transition to the drop                              |
| "rauhottakaa se"                        | calm it down → strip elements, lower cutoff         |
| "toi on hyvä, mut lisää jotain vielä"   | keep what works, add a complementary layer          |
| "tee siitä groovaavampi"                | more groove → swing, ghost notes, syncopation       |
| "liian mekaanista"                      | humanize: velocity variation, micro-timing, .sometimes() |
| "enemmän tilaa"                         | more space → reverb, delay, fewer elements          |

**Interpret, don't ask.** Only ask for clarification when the request is truly ambiguous (e.g. "make it better" with no prior context). When given feedback after playback, assume Mikko just listened — respond with action, not questions.

---

## 2. Strudel code rules

These are non-negotiable. Patterns that violate these will break in the REPL.

### Output format
- Output ONLY valid Strudel REPL code as the final artifact. **No markdown code fences around it.** Paste-ready.
- Every pattern must be self-contained: paste into https://strudel.cc → press play → it works.
- Comment each musical layer with `// role description` (e.g. `// driving kick`, `// acid 303 riff`).
- Comments describe **musical intent**, not code mechanics.

### Forbidden
- ❌ `.play()` — the REPL handles playback
- ❌ `setcps()`, `setCps()`, global tempo setters — use `.cpm(N)` on the pattern instead
- ❌ `const`, `let`, `var` — raw pattern expressions only
- ❌ `register()`, `await`, top-level function declarations
- ❌ Inventing API methods — if unsure a function exists, leave it out and work around it

### Required
- ✅ Use `stack()` for layering parallel voices
- ✅ Use `cat()` / `seq()` for sequencing sections or phrases
- ✅ Use mini-notation (`"bd sd cp"`, `"<c eb g>"`, `"c*4"`, `"[bd [~ sd]]"`) wherever it fits
- ✅ Prefer idiomatic chaining: `.slow()`, `.fast()`, `.every(n, f)`, `.jux(rev)`, `.sometimes(f)`
- ✅ Reference `docs/STRUDEL_REFERENCE.md` — if a function isn't documented there, verify before using

### Minimal template
```js
stack(
  // kick — driving pulse
  s("bd*4").gain(0.9),
  // hats — offbeat drive
  s("hh*8").gain(0.5).pan(sine.range(0.3, 0.7)),
  // bass — tonal anchor
  note("<c2 eb2 g2 eb2>").s("sawtooth").lpf(600).cutoff(sine.range(300, 1200).slow(8))
).cpm(130)
```

---

## 3. Musical priorities

Apply these in order when there's a tradeoff:

1. **Groove first** — rhythm must feel intentional. Use swing, ghost notes, syncopation. Static grids are boring.
2. **Tonality** — pick a key/scale and stay in it unless asked otherwise. Default minor/dorian/phrygian for dark genres, major/mixolydian for uplifting.
3. **Structure** — phrases with variation, not 1-bar static loops. Use `.every()`, `.sometimes()`, `cat()` for song sections.
4. **Clarity** — few strong ideas beat a wall of noise. Cut before adding.
5. **Space** — leave room in the mix. Not every beat needs every layer. Frequency masking kills energy.

---

## 4. Iteration protocol

When Mikko gives feedback after listening:

1. **Identify what to KEEP** — the parts that worked. Don't regenerate from scratch.
2. **Identify what to CHANGE** — based on the specific feedback.
3. **Identify what to ADD / REMOVE** — additive vs. subtractive edit.
4. **Output the complete updated pattern** with changes marked in inline comments (e.g. `// NEW: darker filter sweep`, `// CHANGED: bass octave down`).
5. **Log the iteration** in `sessions/SESSION_LOG.md`: date, what changed, why.

Never silently regenerate. If the bassline was already good, it stays exactly the same.

---

## 5. Component reuse

When a drum pattern, bassline, synth layer, effect chain, or song structure works well:

1. Extract it to `patterns/components/<category>/` as a standalone `.js` file.
2. Name it descriptively: `driving-techno-kick.js`, `acid-303-riff.js`, `dub-chord-stab.js`, `trance-supersaw-pad.js`.
3. Add a metadata comment at the top:
   ```js
   // Genre: techno
   // Tempo: 128–140 BPM
   // Key: C minor (works in any minor)
   // Role: main kick + sub-layered percussion
   // Notes: best with sidechain on pad layers
   ```
4. Reference components in future compositions — prefer composing from known-good pieces.

Categories:
- `drums/` — kicks, snares, hats, full drum loops
- `bass/` — basslines, sub layers, 303 sequences
- `synths/` — pads, leads, arps, stabs
- `fx/` — risers, sweeps, impacts, effect chains
- `structures/` — intro/buildup/drop/breakdown arrangements

---

## 6. Project layout

```
/
├── CLAUDE.md                    # this file
├── .claude/settings.json        # harness config
├── docs/
│   ├── ARCHITECTURE.md          # how it fits together
│   ├── STRUDEL_REFERENCE.md     # verified API reference — source of truth
│   ├── GENRE_PROFILES.md        # genre templates + parameter ranges
│   └── MUSIC_THEORY.md          # scales, chords, progressions
├── patterns/
│   ├── tracks/                  # complete compositions
│   ├── components/              # reusable building blocks (by category)
│   └── experiments/             # scratch space
├── presets/
│   ├── sounds.js                # curated sample/synth presets
│   └── effects.js               # effect chain presets
├── sessions/SESSION_LOG.md      # iteration log
└── scripts/export.js            # REPL-paste helper
```

---

## 7. Genre knowledge

Claude must have working knowledge of sonic characteristics, tempo ranges, common patterns, and production techniques for: **techno, trance, house, ambient, drum & bass, lo-fi hip hop, synthwave, industrial, acid techno, breakbeat, IDM, dub techno**.

See `docs/GENRE_PROFILES.md` for canonical parameter ranges and reference patterns.

---

## 8. Future integration — Strudel MCP

A Strudel MCP server exists at https://github.com/williamzujkowski/strudel-mcp-server that can give Claude direct control over Strudel playback (start/stop, swap patterns, tweak knobs live). This is a future integration — for now the workflow is paste-based:

> Claude generates code → Mikko pastes into REPL → listens → gives feedback → Claude iterates.

When MCP is wired up, the same rules apply; only the delivery mechanism changes.

---

## 9. Quality gates before outputting

Before you hand a pattern back, check:

- [ ] No forbidden syntax (`.play()`, `setcps`, `const`, `register`, `await`).
- [ ] Every function used is in `docs/STRUDEL_REFERENCE.md` or known-good Strudel core.
- [ ] Tempo is set via `.cpm()` on the final pattern.
- [ ] Layers have role comments.
- [ ] Pattern is self-contained and pasteable.
- [ ] Groove, tonality, structure, clarity, space — in that priority order.

If any check fails, fix it before responding.
