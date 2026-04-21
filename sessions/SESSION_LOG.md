# StrudelForge — Session Log

A running log of musical iterations: what was created, what changed, what worked, what didn't.

Format per entry:
```
## YYYY-MM-DD — short title
**Track / component:** path
**Change:** what changed
**Why:** motivation (feedback, mix note, taste call)
**Outcome:** kept / reverted / extracted as component / shelved
```

---

## 2026-04-21 — Project initialized

**Change:** StrudelForge scaffolded from scratch.
- Created project structure: `docs/`, `patterns/{tracks,components,experiments}/`, `presets/`, `sessions/`, `scripts/`.
- Wrote `CLAUDE.md` with communication rules, Strudel code rules, iteration protocol, and component-reuse workflow.
- Drafted `docs/STRUDEL_REFERENCE.md`, `docs/GENRE_PROFILES.md`, `docs/MUSIC_THEORY.md`, `docs/ARCHITECTURE.md`.
- Created 3 starter tracks: `dark-techno-140.js`, `melodic-trance-138.js`, `ambient-drift-70.js`.
- Extracted reusable components into `patterns/components/{drums,bass,synths,fx,structures}/`.
- Added `presets/sounds.js`, `presets/effects.js`, `scripts/export.js`.

**Why:** establish the AI-first workflow so every future session starts from a ready environment.

**Outcome:** baseline established. Next session: iterate on starter tracks and grow the component library.

---

## 2026-04-21 — Component extraction from starter tracks

**Track / component:** `patterns/components/{drums,bass,synths,fx,structures}/`
**Change:** Extracted 15 standalone component files from the three starter tracks.

- **drums/** (5): `driving-techno-kick.js`, `acid-techno-hats.js`, `techno-metallic-cb.js` (from `dark-techno-140.js`); `trance-four-on-floor.js` (from `melodic-trance-138.js`); `ambient-sparse-percussion.js` (from `ambient-drift-70.js`).
- **bass/** (3): `acid-303-phrygian.js` (dark techno), `trance-rolling-16th.js` (trance, velocity-sidechain), `ambient-drone-root.js` (ambient, sine+triangle drone stack).
- **synths/** (5): `techno-drone-pad.js` (dark techno); `supersaw-trance-pad.js`, `trance-pentatonic-lead.js`, `trance-pluck-arp.js` (trance); `ambient-lydian-pad.js` (ambient, D lydian with vowel morph).
- **fx/** (3): `filter-sweep-pad.js`, `reverb-stab-decay.js`, `hat-riser-buildup.js`.
- **structures/** (2): `trance-intro-buildup-drop.js`, `techno-intro-groove-break-groove.js` — paste-runnable skeletons with `silence` and `s("bd*4")` placeholders.

**Why:** seed the reusable component library so future tracks can be composed from known-good building blocks rather than reinvented.

**Outcome:** kept. All files end in `.cpm(N)`, use only primitives from `STRUDEL_REFERENCE.md`, and carry the required metadata header + per-layer musical-intent comments.

---

## 2026-04-22 — Jaakko kulta future bass remix (new track)

**Track / component:** `patterns/tracks/jaakko-kulta-future-bass.js`
**Change:** New full track. 132 BPM, C major. 16-bar arrangement (Drop 1 → Buildup → Drop 2) driven by `.mask("<...>")` alternations on sub, melody, octave double, riser, snare roll, filter-sweep hats, and crash. Melody = Jaakko kulta (Frère Jacques) on detuned supersaw with `.jux(x => x.add(0.15))` for wide stereo. Arp = C–Am–F–G triangle pluck with `.every(4, x => x.add(12))` octave bounce. Buildup uses `saw.range(0, 24).slow(4)` pitch riser + rising hat filter sweep.

**Why:** user request — cheerful upbeat remix of a traditional Finnish children's song, chiptune × Monstercat flavour. Picked Jaakko kulta because it's a canon (melody + arp counterpoint), simple C-major diatonic, universally recognisable.

**Outcome:** awaiting playback feedback. Candidates to extract as components if they work: the mask-driven arrangement trick (`drop/buildup/drop` via parallel masks), the supersaw `.jux`+`.add(0.15)` stereo trick, the `saw.range(...).slow(4)` pitch riser.

---

## 2026-04-22 — Jaakko kulta iteration 2 (tempo fix + trance rework)

**Track / component:** `patterns/tracks/jaakko-kulta-future-bass.js`

**Feedback from Mikko:** "Liian nopea. Emme tee gabberia, ajattele tätä trance biisinä. Täytyisi myös olla syvällisempi varsinkin bassottelun suhteen. Builduppia ei ole ollenkaan."

**Change:**
- CHANGED tempo `.cpm(132)` → `.cpm(33)` (cycles/min where 1 cycle = 1 bar of 4 beats, so cpm(33) × 4 = 132 BPM). Earlier pattern played at ~528 BPM-equivalent because I treated cpm as BPM.
- NEW sub-bass layer: sustained sine, C–G–Am–F roots (c2/g1/a1/f1).
- NEW rolling offbeat mid-bass: saw with `.struct("~ 1 1 1"×4)` rhythm, 16ths between kicks — classic trance pattern.
- NEW supersaw chord pad: `note("<[c4,e4,g4] [g3,b3,d4] [a3,c4,e4] [f3,a3,c4]>")` playing THROUGHOUT (including buildup) as the tonal wash.
- REWORKED buildup arc into 4-bar structure: bars 9–11 = accelerating snare roll (`<sd*4 sd*8 sd*16 sd*32>`) + stepwise pitch riser (c3→e3→g3 C-major arp climb) + hat sweep (`hh*32` with `.hpf(saw.range(2000, 13000).slow(4))`); bar 12 = total silence except one muted crash impact.
- CHANGED arp voicings to root-position chord tones per I–V–vi–IV.

**Why:** Feedback demanded slower tempo (not gabber), deeper bass, and an actual buildup. Also established the correct `.cpm` convention — saved as feedback memory so future patterns don't repeat the mistake.

**Outcome:** awaiting playback feedback. The starter tracks and components in `patterns/components/` likely have the same cpm mistake — audit pending if any sound too fast.
