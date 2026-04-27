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

---

## 2026-04-22 — Jaakko kulta rendered + repo policy: MP3-only audio

**Track / component:** `renders/Jaakkokulta.mp3`, `.gitignore`, `README.md`

**Change:**
- Mikko rendered `Jaakkokulta.wav` (48 kHz/16-bit stereo, 64 s, 12 MB) from the Strudel REPL.
- Installed ffmpeg 8.1 via `winget install Gyan.FFmpeg --scope user`.
- Converted to `Jaakkokulta.mp3` at 320 kbps CBR (2.5 MB) — archive quality for portfolio.
- Moved both into `renders/`.
- Added `.gitignore` with `*.wav` blanket rule — repo policy is MP3-only for renders.
- Linked MP3 from the Selected Tracks table in `README.md`.

**Why:** Mikko's explicit instruction — "jatkossa committaa ainoastaan mp3". Keeps repo lean and GitHub-friendly without needing git-LFS for a small hobby portfolio.

**Outcome:** committed + pushed. Future renders follow the same flow: render WAV → `ffmpeg -b:a 320k` → MP3 → commit only MP3.

---

## 2026-04-28 — Spacepotatis galaxy overworld (new track)

**Track / component:** `patterns/tracks/spacepotatis-galaxy-overworld.js`

**Brief from Mikko:** music for the menu / galaxy overworld view of his Tyrian-2000-like vertical shooter "Spacepotatis" (https://github.com/MikkoNumminen/Spacepotatis). Reference: Tyrian 2000 + Stellaris + 90s 16/32-bit tracker palette. Calm, slow, ambient — player should be able to make decisions without feeling hurried, but the game should still hum quietly underneath. Screenshot showed dark space scene with planets orbiting a sun.

**Change:** New track, `.cpm(15)` (~60 BPM feel, 1 cycle = 1 bar). D minor, modal — Dm9 → Fmaj7 → Cmaj9 → Am7, each held 4 bars (16-bar loop ≈ 64s). 6 layers, no drums:
- Sub sine drone on chord root (4 bars/note).
- Detuned saw chord pad with `perlin.range(700, 2400).slow(24)` filter breathing + `.jux(x => x.add(0.12))` for stereo width.
- Triangle pad layer for warmth.
- Triangle bell arp tracing chord tones, dotted-8th delay, `.sometimes(add 12)` octave bumps + `.degradeBy(0.35)` for sparseness.
- Distant high sine shimmer, slow pan drift.
- Filtered hat wash every 8 bars as "stellar wind" (saw filter sweep + heavy reverb).

**Why:** Stellaris-style harmonic patience rendered through Tyrian-era synth palette. The "reminds of itself without rushing" requirement = sparse ambient presence, not silence and not a beat. No noise oscillator (`s("white")` not in STRUDEL_REFERENCE.md), so substituted a heavily LPF'd hat sample for the wind.

**Outcome:** awaiting playback feedback. If it works, candidates to extract as components: the `perlin.range(...).slow(24)` LPF-breathing pad, the dotted-8th-delay triangle bell arp pattern, the "stellar wind" hat-wash technique.

---

## 2026-04-28 — Repo cleanup: starter tracks removed

**Change:** Removed the three Claude-scaffolded starter tracks per Mikko's instruction "only jaakkokulta and spacepotatis will remain in the repo. the 2 i made with you."

- DELETED `patterns/tracks/dark-techno-140.js`
- DELETED `patterns/tracks/melodic-trance-138.js`
- DELETED `patterns/tracks/ambient-drift-70.js`
- README.md: removed those rows from Selected Tracks table; replaced the "How I direct it" example prompt and the "A taste" code block (both used the dark-techno track) with material derived from `spacepotatis-galaxy-overworld.js`.

**Why:** Mikko wants the repo to reflect his actual collaborative output — the two tracks made together (Jaakko kulta, Spacepotatis) — not the example tracks the agent scaffolded on day one. Components in `patterns/components/` were extracted from those starters but stay, since they're presented as a reusable building-block library, not compositions.

**Outcome:** committed and pushed.

---

## 2026-04-28 — Spacepotatis main menu rendered to MP3

**Track / component:** `renders/SpacepotatisMainMenu.mp3`, `README.md`

**Change:**
- Mikko rendered `mainmenu3min.wav` (3:20, ~37 MB, 48 kHz stereo) of `spacepotatis-galaxy-overworld.js` from the Strudel REPL.
- Converted via `ffmpeg -codec:a libmp3lame -b:a 320k` to `renders/SpacepotatisMainMenu.mp3` (7.6 MB).
- Linked the MP3 from the Selected Tracks row in `README.md`.

**Why:** Mikko wanted both selected tracks to have play-button MP3 examples (parity with Jaakko kulta).

**Outcome:** committed + pushed. Source WAV stays in his Downloads folder, gitignored as per repo policy.

---

## 2026-04-28 — Spacepotatis combat / mission-flight track (new)

**Track / component:** `patterns/tracks/spacepotatis-combat.js`

**Brief from Mikko:** Tyrian-2000-style combat music for the in-mission 2D shooter view of Spacepotatis. Modern bridge: futuristic synthpop. "I really liked tyrian 2000 musics. perhaps you could come up with something similar."

**Change:** New track, `.cpm(33)` (132 BPM). A minor, classic i-VI-III-VII progression (Am – F – C – G), 4-bar chord cycle. 9 layers:
- `bd*4` driving kick (`shape(0.28)`).
- `~ cp ~ cp` backbeat clap with short room (gated synthwave snare feel).
- `hh*8` velocity-wiggled closed hats with `cut(1)` for monophonic tightness.
- `hh*16` 16th fill masked to bar 4 of every 4-bar phrase.
- Offbeat `oh` heartbeat.
- Octave-bouncing saw bass (8ths) — direct lift of the Tyrian "Mars" idiom — with `sine.range(600,2400).slow(8)` filter sweep.
- Chord pad: detuned saw stack with fake-sidechain `gain(sine.range(0.2,0.45).fast(4))` (4 ducks per cycle).
- Arp lead: triangle 8ths over chord tones, dotted-8th delay (`.delaytime(0.1875).delayfeedback(0.45)`), `.every(4, x => x.add(12))` for octave-up lift.
- Melody hook: detuned saw with `.jux(x => x.add(0.12))`, `.every(8, x => x.fast(2))` for mid-loop fills.
- `crash ~ ~ ~ ~ ~ ~ ~ .slow(8)` for phrase-top accent every 8 bars.

**Why:** Tyrian's combat tracks were FM/MOD-tracker driven with octave-bouncing basslines and arp leads — chip-style energy. Modern synthwave smooths that with detuned saws, fake-sidechained pads, gated reverb snares. This bridges both. Heroic-not-anxious mood — combat track, not horror track.

**Outcome:** awaiting playback feedback. Not pushed yet — waiting for Mikko's listen + iterate cycle (per CLAUDE.md iteration protocol).

---

## 2026-04-28 — Spacepotatis combat iteration 2 (buildup + futuristic palette)

**Track / component:** `patterns/tracks/spacepotatis-combat.js`

**Feedback from Mikko:** "I want a buildup to this. also i want it to be a bit more futuristic"

**Change:** Reworked from a flat 4-bar loop into a 32-bar arrangement with a real intro/build/drop arc, and pushed the palette toward cyberpunk-future:

- NEW STRUCTURE — 32-bar loop with three sections gated via 32-cycle masks:
  - bars 1–4: **intro** — sub sine drone on A1, sparse vowel-warbled pad with filter slowly opening, distant high shimmer twinkle
  - bars 5–8: **build** — pitch-rising saw riser (`saw.range(0,24).slow(4)` adds 0→24 semitones), accelerating snare roll `<sd*2 sd*4 sd*8 sd*16>`, hat sweep `s("hh*32").hpf(saw.range(2000,13000))`
  - bar 9 downbeat: **impact** — `s("crash").gain(0.85)` one-shot
  - bars 9–32: **main groove** — full kit (chord cycle × 6)
- FUTURISTIC PALETTE upgrades to main groove:
  - Chord pad: NEW `vowel("<a o e i>".slow(4))` formant warble for sci-fi/cyberpunk feel
  - Bass: CHANGED filter range 600–2400 → 800–3200 Hz for brighter cyberpunk edge
  - Arp: NEW `sometimesBy(0.1, x => x.crush(6))` for occasional bit-crush glitch
  - NEW high-octave sine shimmer layer with delay + room + slow pan drift, similar to galaxy-overworld but in upper register

**Why:** Buildup gives every loop iteration a sense of arrival rather than just looping at full intensity; the intro section also lets the track breathe before each combat phrase. The vowel/crush/shimmer trio shifts the aesthetic from "90s tracker pastiche" toward "modern cyberpunk synthwave" without abandoning the Tyrian DNA (octave-bouncing bass + arp+delay still core).

**Outcome:** awaiting playback feedback. Mask-driven 32-bar arrangement is a candidate to extract as a `structures/` component (`combat-buildup-drop-loop.js`) if Mikko likes the shape.

---

## 2026-04-28 — Spacepotatis combat iteration 3 (brighter "duri" melody)

**Track / component:** `patterns/tracks/spacepotatis-combat.js`

**Feedback from Mikko:** "change the melody somehow to more duri. the first fast solopart is diamond, but all the rest of it is mellow."

Translation: "duri" = duuri = major key. He liked the fast `.every(8, x => x.fast(2))` solo burst (called it "diamond") but found the slow melodic phrases too mellow.

**Change:** Rewrote the melody hook only — left the rest of the 32-bar arrangement untouched.

- CHANGED phrases: pushed up an octave, rewrote each 4-bar phrase to climb toward a C-major triad peak on bar 3 (the C chord of the progression), giving the listener a clear "duri" arrival point.
  - bar 1 over Am: `[c5 e5 g5 a5 g5 e5 c5 e5]` — Am9 with major-leaning top
  - bar 2 over F: `[a5 c6 a5 g5 f5 a5 c6 e6]` — Fmaj7 + 9, sustained high
  - bar 3 over C: `[g5 c6 e6 c6 g5 e5 c5 g4]` — C-major triad peak
  - bar 4 over G: `[d5 g5 b5 d6 b5 a5 g5 d5]` — G triad with 9th, descending back
- CHANGED filter range 2400-4800 → 3000-6500 Hz for more upper-register sparkle
- CHANGED gain 0.5 → 0.6 for prominence
- CHANGED envelope: snappier attack (0.02 → 0.01), shorter release (0.35 → 0.28) so notes punch instead of bleed
- KEPT `.every(8, x => x.fast(2))` — the "diamond" fast solo bursts at cycles 16 and 24

**Why:** Re-keying the chord progression would have ripple effects across bass/pad/arp; instead, brightening the melody alone re-centers the listener's ear on C major within the existing Am-F-C-G chord set, since both share the same diatonic notes. Cheap iteration, biggest perceptual impact.

**Outcome:** Mikko approved ("This is cool"). Renamed `spacepotatis-combat.js` → `spacepotatis-mission1.js` per his instruction "Push as a mission1 theme" — establishes a per-mission naming convention for future level themes (mission2, mission3, …). Added README row, committed and pushed.
