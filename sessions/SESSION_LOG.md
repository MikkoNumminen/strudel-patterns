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

---

## 2026-04-28 — Spacepotatis mission 1 rendered to MP3

**Track / component:** `renders/SpacepotatisMission1.mp3`, `README.md`

**Change:**
- Mikko rendered `Mission1.wav` (1:40, ~18 MB, 48 kHz stereo) of `spacepotatis-mission1.js` from the Strudel REPL.
- Converted via `ffmpeg -codec:a libmp3lame -b:a 320k` to `renders/SpacepotatisMission1.mp3` (3.8 MB).
- Linked the MP3 from the Selected Tracks row in `README.md` so the mission1 row now has play-button parity with Jaakko kulta and the main-menu track.

**Why:** Mikko's standing instruction — render any track that's worth keeping into a 320k MP3 in `renders/`, link from README, ship.

**Outcome:** committed + pushed.

---

## 2026-04-28 — Spacepotatis mission 2 theme (mellow flight) — new track

**Track / component:** `patterns/tracks/spacepotatis-mission2.js`

**Brief from Mikko:** "Now i want you to create another different but similar masterpiece. mellow, slow, but with clear sound and melody" — and on the next breath confirmed "This will also be a mission music" → `spacepotatis-mission2.js`.

**Change:** New track. Designed as the deliberate anti-mission1: same Tyrian × futuristic-synthpop palette, but slower, no drop, no buildup, just smooth layered fade-in and a sung-feeling melody hook.

- Tempo: **88 BPM**, `.cpm(22)` (vs mission1's 132 BPM)
- Key: **D major** with progression D – A – Bm – G (I-V-vi-IV) — most singable progression in pop, max melodic clarity, color contrast with mission1's A minor / C-major center
- Structure (32-bar loop, ~87s):
  - bars 1–4: intro — pad + sub + shimmer + sparse arp only
  - bars 5–8: rhythm fades in — half-time kick + lazy beat-3 clap + soft 8th hats
  - bars 9–32: full song — melody hook joins, chord cycle × 6
- No buildup, no impact crash, no `.every(8, fast(2))` solo bursts — the contrast point with mission1
- Layers: sub sine, vowel-formant pad (`vowel("<a o e>".slow(12))`), high sine shimmer, sparse triangle arp with dotted-8th delay, half-time `bd ~ ~ ~ bd ~ ~ ~` kick, beat-3 clap, soft 8th hats, and a saw-lead **melody hook** with rests between phrases (long note → 3-note gesture → breath) climbing to c#6 peak on the A bar.

**Why "clear melody" choice:** rests are clarity. Each 4-bar phrase opens with a held note, has a quick 3-note answer, then a breath — the "singer phrasing" pattern. Forces the listener's ear onto the hook instead of letting it blend into a wall of motion.

**Outcome:** rejected. Mikko clarified: "This was not what i was looking for. This is a fast phase mission. I need clearer main melody and some kine of old console kine of kick drum." Mellow ballad direction was wrong — mission 2 is a FAST phase, with a bit-crushed console-style kick and a chip-clear lead.

---

## 2026-04-28 — Spacepotatis mission 2 iteration 2 (fast-phase chiptune rebuild)

**Track / component:** `patterns/tracks/spacepotatis-mission2.js` (full rewrite, not edit)

**Feedback from Mikko:** mellow ballad rejected. Wants: fast phase, old-console kick drum, clearer main melody.

**Change:** Complete redesign from 88 BPM ballad to 144 BPM chiptune-arcade.

- TEMPO: 88 BPM → **144 BPM** (`.cpm(22)` → `.cpm(36)`). Fastest of all Spacepotatis tracks; clearly distinct from mission1 (132 BPM).
- KICK: bd → `s("bd*4").crush(8).coarse(2).shape(0.45)` — bit-crush (8-bit reduction) + sample-rate reduction = real "old console" punch. The crush+coarse combo is the canonical "console kick" recipe in Strudel.
- LEAD: sawtooth ballad → `s("square")` chiptune lead. Square wave is the chiptune signature; cuts through the mix for clarity.
- MELODY HOOK: rewrote with the "Mega Man / Sonic" trick — *same rhythmic pattern across all 4 chord bars*, pitches transposed to each chord. Pattern: `[d5 d5 ~ f#5 a5 f#5 d5 ~]`. Repetition = memorability. Peak at d6 on the Bm bar.
- BASS: sub sine → `s("triangle")` NES-style octave-bouncing 8ths (root-oct-root-5th × 2 per bar).
- ARP: kept the chord-tone counter-melody concept but switched to square wave (8ths over each chord, low gain).
- DROPPED: pad, vowel formant, shimmer, intro buildup, mask gates. Drops in instantly at full energy — no fade-in for a "fast phase" mission.
- KEPT: same key (D major) and same chord progression (D-A-Bm-G) for sonic continuity within the mission2 development arc.

**Why:** "Fast phase mission" reframed the brief — what I read as "mellow ballad" Mikko meant as "lighter than combat but fast-paced level". The chiptune palette (square leads, triangle bass, crushed kick) hits the "old console" feel directly; same-rhythm-across-chords technique is the chiptune trick for cutting through a busy arcade mix with a hook the player can hum after one playthrough.

**Outcome:** rejected. "this was bad. the rythm is nonexistent ... simplify, use references like pokemon."

---

## 2026-04-28 — Spacepotatis mission 2 iteration 3 (Pokemon-style chiptune rebuild)

**Track / component:** `patterns/tracks/spacepotatis-mission2.js` (full rewrite)

**Feedback from Mikko:** "the rythm is nonexistent, this is a fast phase mission where this plays, simplify, use references like pokemon"

**Diagnosis of v2 failure:** the rhythm read as "nonexistent" because (a) over-processed kick (`crush(8) + coarse(2)`) lost its punch, (b) the 16th hat + offbeat open hat + square arp piled up, washing out the kick/snare pulse, (c) the lead melody had `~` rests in syncopated positions that broke the rhythmic flow.

**Change:** Stripped to the bones, modeled directly on Pokemon Gym Leader / Trainer Battle music.

- TEMPO: 144 → **152 BPM** (`.cpm(36)` → `.cpm(38)`) — Pokemon battle pace.
- LAYERS: 7 → **5**. Removed: open hat, square arp, the heavy crush+coarse stack on kick.
- KICK: `s("bd*4").shape(0.45).crush(10)` — 4-on-the-floor with light crush only. crush(10) is mild (chip flavour without losing punch); shape(0.45) restores body.
- SNARE: `s("~ sd ~ sd")` — proper snare on 2 & 4 (was clap before; sd is more chip-authentic).
- HAT: `hh*8` straight 8ths (was `hh*16` — too busy).
- BASS: kept as the **rhythm engine** — Pokemon-style relentless octave-bouncing 8ths, never stops driving. Pattern per bar: `root – oct – root – oct – 5th – oct(5th) – 5th – oct(5th)`. This is what carries the rhythm in chip music; the drums are accents on top.
- LEAD: rewrote as **8th-notes throughout, no rests** — constant flow. Peak (d6) on beat 3 of each bar (aligns with second kick = maximum impact). Same hook climb-and-return shape transposed across all 4 chords.

**Key insight that flipped the design:** in Pokemon-style chip music the BASS drives the rhythm, not the drums. The Game Boy only had one noise channel for percussion — drums are minimal punctuation. The pulse channel bass running constant 8ths is what makes the listener feel the pulse. v2 had a great triangle bass but it was buried under arp + extra hats + heavy kick processing.

**Outcome:** rejected. "trash this. Lets start clear" — followed by `/clear`. All three mission 2 iterations (mellow ballad, generic chiptune, Pokemon-style chiptune) missed the mark. File deleted from disk; was never committed so the repo is unaffected. Slate is clean — next attempt starts with a fresh brief from Mikko.

---

## 2026-04-28 — Aggressive Major Synthpop — fresh template track

**Track / component:** `patterns/tracks/aggressive-major-synthpop.js`

**Brief from Mikko (full reset):** detailed multi-paragraph brief asking for a stylistic template that bridges (1) Tyrian 2000 / Alexander Brandon's 90s tracker game music — driving basslines, memorable melodic hooks, punchy lead synths, fast arpeggios, tight percussion, tracker-style layering, **melodies that carry the track**; and (2) modern synth-driven genres (synthwave / synthpop / contemporary electronic) — clean mixing, wider stereo, sidechain pumping, lush pads, modern polish. Target: aggressive major-key synthpop with the compositional DNA of a 90s Tyrian track. Bright, energetic, melodically dense (NOT minimalist), but with modern production. **Don't water it down into generic chill synthwave.** Required: clear sectioned structure (intro/main/break/variation), multiple layered voices (bass/lead/arp/pad/drums), code comments per layer.

**Change:** New track. 32-bar piece with four distinct 8-bar sections gated by 32-cycle masks. **First track of the new direction** — to be iterated on, then used as a style template for game-specific tracks.

- **Tempo:** 144 BPM (`.cpm(36)`). Major-key tracks at fast tempo land as aggressive — that's the trick the brief asks for.
- **Key:** E major. Progression **E – C#m – A – B** (I-vi-IV-V) — the four-chord anthem progression.
- **Sections** (8 bars each):
  - INTRO: sub + sidechained pad + sparse one-note-per-bar lead phrase
  - MAIN A: full kit + octave-bouncing saw bass (Tyrian "Mars" idiom) + 16th triangle arp with dotted-8th delay + detuned saw lead in oct 5 carrying the hook
  - BREAK: kick/snare/bass/arp drop; hats continue (continuity); lead breathes for 8 bars
  - MAIN B: full return + lead jumps to oct 6 with wider `.jux(0.18)` for the climax
- **Modern polish:** `gain(sine.range(0.18,0.42).fast(4))` 4-ducks-per-cycle sidechain on pad; `.jux(x=>x.add(0.12))` stereo width on lead; perlin LPF breathing on pad; crashes on bars 9 / 17 / 25 mark section transitions.
- **The hook:** each 4-bar phrase climbs through its chord's arpeggio, peaks on beat 3 (e6 / c#6 / a5 / b5), descends via the chord's leading tone (D# over E, B over C#m, G# over A, A# over B). Same melodic shape transposed across all four chords — the Tyrian repetition trick that makes a hook stick after one listen.

**Why these choices:**
- E major instead of D / A / B♭ — gives a fresh sonic palette (none of the existing repo tracks use it) and the sharp keys feel "tense bright"
- I-vi-IV-V over more obvious progressions because the relative minor (C#m) on bar 2 adds harmonic depth without leaving the major-key brightness
- Octave-bouncing saw bass is non-negotiable for Tyrian DNA; same with the 16th-arp-with-dotted-8th-delay
- Lead intentionally dense (8 notes per bar, no rests within each phrase) to honor the "melodically dense, not minimalist" requirement — this is the explicit rebuke to the rejected mission 2 ballad direction
- Octave-up climax in main B is the classic Tyrian "second chorus" move; modern .jux widening is the synthpop polish on top

**Outcome:** Mikko approved on the first listen ("This is excelllent =DD push as mission2"). Renamed `aggressive-major-synthpop.js` → `spacepotatis-mission2.js`, updated header to mention the mission 2 role, added a row to README. Committed and pushed. The detailed brief style + plan-then-write flow nailed it where three previous mission2 iterations failed — the brief itself was what was missing before.

---

## 2026-04-28 — Spacepotatis mission 2 iteration (reframe to space combat)

**Track / component:** `patterns/tracks/spacepotatis-mission2.js` (full rewrite of approved version)

**Feedback from Mikko:** "Thats a bit too much unicorns with rainbows etc. I want a space combat themed 90s vibe synth combat music"

**Diagnosis:** the v1 (aggressive major synthpop) approval was real but on second listen the major-key brightness read as cheerful/anthemic — wrong mood for a mission combat track. Major-key + fast tempo = aggressive in theory, but the I-vi-IV-V progression, upper-register lead arpeggios climbing to e6/c#6 peaks, and bright triangle arp added up to "uplifting" rather than "combat".

**Change:** Same skeleton (32 bars, four 8-bar sections, mask-gated, Tyrian DNA preserved), darker palette throughout.

- KEY: E major → **E minor / Phrygian-flavored**. Progression: E – C#m – A – B  →  **Em – F – C – D** (i-bII-bVI-bVII). The F over E (Phrygian b2) is the half-step-above-tonic that defines 90s space-shooter combat music. D major in bar 4 borrows F# as a leading tone for dominant pull back to E.
- LEAD: oct 5-6 detuned saw (bright) → **oct 4-5 distorted saw** (`shape(0.3)`, mid register, menacing). LPF range 3000-6500 → 2500-5000 (darker).
- MAIN B CLIMAX: octave-up to oct 6-7 (sparkle) → **5th-up power-harmony stacked on the lead** (`add(7)`, same register). Power instead of rainbows.
- ARP: triangle (sweet/bright) → **square wave** (bite, 90s chip aggression). LPF cap 7000 → 5000.
- DRUMS: clean kick/snare → light `crush(12)` on both for 90s console grit.
- ADDED: cowbell offbeat (`~ ~ ~ cb ~ ~ ~ cb`) for combat percussion texture.
- ADDED: vowel formant on pad (`vowel("<a o>".slow(8))`) for industrial color, dropped pad LPF range from 2000-3500 → 1500-2800 (deeper).
- INTRO LEAD: bright single-note ascent E-C#-A-B → Phrygian ascent E-F-G-A in oct 4 (broody).
- KEPT: tempo 144 BPM, structure (intro/main A/break/main B), mask logic, hats-continue-through-break, Tyrian octave-bouncing bass idiom, fast 16th arp with dotted-8th delay, sub sine on roots, sidechain pad gain LFO, .jux stereo width on lead, crash on section transitions.

**Why these specific changes hit the brief:**
- Phrygian bII is the canonical "video game combat dread" sound. Tyrian's darker tracks, Doom's E1M1, Wipeout XL — they all use it.
- 5th-up harmony instead of octave-up climax = "power chord lead" rather than "sparkly high lead". Maintains energy without the cheerful upper-register pull.
- Square arp + distorted saw lead in mid register = 90s chip-combat tone palette.
- Cowbell offbeat is the small-but-mighty percussion accent that says "this is combat", not "this is anthem".

**Outcome:** awaiting playback feedback. v1 (the approved major-key version) is still on `main` at commit `84d749e`; this iteration has not been committed/pushed yet — listen first per protocol.

---

## 2026-04-29 — Spacepotatis story 1 — opening narration underscore (new track)

**Track / component:** `patterns/tracks/spacepotatis-story1.js`

**Brief from Mikko:** music for the first storytelling box of Spacepotatis. A grandmotherly voice reads "The Great Potato Awakening" — the absurd-but-dignified origin story (potato grew tired of being mashed → grew engines, sprouted lasers, launched into space, fights the bugs forever). Read in 30s. Need ambient sci-fi background.

**Change:** New track. Designed strictly as voiceover underscore.

- TEMPO: 60 BPM, `.cpm(15)`
- KEY: A minor, progression Am – F – G – Am (i-VI-VII-i), each chord held 2 bars
- LENGTH: 8 bars = 32 seconds (30s narration + 2s tail to resolve)
- LAYERS (4): sub sine drone on chord roots (oct 1, well below voice), vowel-formant sawtooth pad with `lpf(saw.range(800,2200).slow(8))` slow opening filter for "awakening" arc, sparse high sine shimmer in oct 6 with long delay (above voice), 4-note triangle motif (`a4 → c5 → e5 → a4` — one note every 8s sustained across 32s).
- NO DRUMS, NO RHYTHM — pure atmospheric bed.

**VO mixing principles applied:**
- Frequency separation: sub (oct 1, 50-100 Hz) + shimmer (oct 6+, 1300+ Hz) take prominence; mid-range (200-3000 Hz where the voice lives) is given minimum musical content.
- Pad gain capped at 0.32 — sits explicitly BEHIND the voice.
- Motif is 4 sustained notes total in 32s — not a melody, just punctuation. Doesn't compete for the listener's attention.
- Chord arc mirrors narrative arc: Am ("humble") → F ("does what tuber would do") → G (tension/lift = "fights the bugs") → Am ("forever" returns home).

**Why no drums:** any rhythmic pulse pulls the listener's ear off the storyteller. For grandmotherly storytelling underscore, drums are the wrong tool — needs to be a pad bed.

**Outcome:** Mikko approved on the first listen ("this is great! push as storymusic1 for space potatis"). File renamed `spacepotatis-story1.js` → `spacepotatis-storymusic1.js` per his exact wording, header updated, README row added. Committed and pushed. Naming convention extended: `spacepotatis-storymusic<N>.js` for narration underscores (alongside `spacepotatis-mission<N>.js` for combat themes).

---

## 2026-04-29 — Spacepotatis shop / market music

**Track / component:** `patterns/tracks/spacepotatis-shop.js`

**Brief from Mikko (Finnish, with two follow-ups):**
1. "Hyvä. Nyt tarvitsemme menevän musiikin kauppaan. pysymme scifi teemassa ja ambientissa, mutta voisi olla startrekkiläistä prokeilua ja jazzia" — driving music for the shop, sci-fi + ambient, with Star Trek prog vibes and jazz.
2. "pelaaja voi olla tässä valikossa pitemmän aikaa joten kappaleella on aikaa kehittyä ja muuttua. haluan kuitenkin, että jotain tapahtuu jo ensimmäisen viiden sekunnin kohdalla" — player camps here a while; track must develop; something must happen in the first 5 sec.
3. "Lisäksi haluan siihen humoristisen tvistin, koska muu musiikki saattaa olla vakavampaa, mutta kaupanteko on kivaa" — humorous twist; trading is fun, while the rest of the soundtrack is more serious.

**Change:** Started as a 16-bar (40s) lounge loop, then expanded per the follow-ups into an 80-second piece with development and a comedic cameo.

- TEMPO: 96 BPM (`.cpm(24)`) — laid-back lounge pace
- KEY: F major. Progression **Fmaj7 – Dm7 – Gm7 – C7** (I-vi-ii-V — the canonical jazz cadence) with full 7th-chord extensions: maj7 on F (e), m7 on Dm (c), m7 on Gm (f), dom7 on C (bb = leading-tone pull back to F).
- LENGTH: 32 bars = 80 seconds. Chord progression plays twice (each chord 4 bars).
- STRUCTURE (3 sections in the loop):
  - **bars 1–16 (0–40s)**: main lounge — drums + bass + comping + pad + lead all hit at bar 1. Lead's opening lick (`f5 a5 c6 a5 g5 e5 f5 ~`) lands inside 5 sec, satisfying the "something must happen early" requirement.
  - **bars 17–24 (40–60s)**: HUMOR TWIST — main saw lead drops; cartoonish sine "theremin" enters with chromatic non-diatonic moves (b5 over Fmaj7, eb6 implied, f#6 — "wrong notes" played confidently = the comedic gag). Crash sting at bar 17 marks the entry.
  - **bars 25–32 (60–80s)**: humor lead leaves; main saw lead returns over Gm7→C7 to round out. Crash sting at bar 25 marks the return.
- LAYERS (8): `bd ~ ~ ~ bd ~ ~ ~` half-time kick, beat-2/4 rim (jazz brush feel, not full snare), 8th hats, `~ ~ cb ~` cowbell ride accent, walking saw bass (root–5th–root–3rd quarter notes), Rhodes-style triangle comping with `.struct("~ 1 ~ ~ ~ 1 ~ ~")` Charleston rhythm + dotted-8th delay, vowel-formant pad, sparse high sine shimmer, main noodle saw lead (sax-like phrasing with breath rests), HUMOR TWIST sine theremin (masked to bars 17–24), transition crash stings on bars 17 and 25.
- "DEVELOP & CHANGE" requirement: humor twist is the primary development. Pad has perlin LPF breathing. Vowel cycles a-o-e-o. Lead phrases are 4-bars-per-chord, no immediate repetition until bar 17.

**Why these specific choices for the humor:**
- Sine wave (vs. saw or square) sounds soft and theremin-ish — alien jazz singer rather than aggressive synth lead
- Chromatic non-diatonic notes (b5, eb6) over major-key chords = the comedic "almost-wrong-note" trick used in cartoon scoring (Carl Stalling, Looney Tunes era)
- High register (oct 5-6) puts it ABOVE the main lead's register — unmistakably "different"
- Light delay tail makes the goofy notes echo, leaning into the comedy

**Outcome:** awaiting playback feedback. Designed to loop cleanly every 80s; player rotation through the shop should reliably hit the humor cameo at least once if they spend more than ~40s browsing.

---

## 2026-04-29 — Spacepotatis shop iteration 2 (humor-dominant + progressive)

**Track / component:** `patterns/tracks/spacepotatis-shop.js` (full rewrite of the lead architecture)

**Feedback from Mikko:** "We must iterate this a bit. I want more of the humor twist and way less of the other stuff. Also more progressive"

**Diagnosis of v1:** humor was a cameo (8 of 32 bars = 25% of the track). Mikko wants it to be the personality of the entire track. "More progressive" = deeper development within the solo + richer harmony.

**Change:** Complete restructure of the lead architecture; backing layers preserved but reduced in gain.

- **Theremin = THE lead voice for all 32 bars** (was: only 8 bars in v1). Original main saw lead REMOVED entirely; humor took its job.
- **Backing layers reduced**: drums gain 0.7→0.5 (kick), 0.45→0.32 (rim), 0.32→0.22 (hats); cowbell removed; comping density halved (`struct("~ 1 ~ ~ ~ ~ ~ ~")` = one stab per bar instead of two); shimmer gain 0.18→0.12. The theremin owns the foreground now.
- **Pad voicings extended for prog-jazz**: triads → 9ths/11ths/13ths
  - Fmaj9 = `[a3,c4,e4,g4]` (g = the 9th)
  - Dm9   = `[f3,a3,c4,e4]` (e = the 9th)
  - Gm11  = `[bb3,d4,f4,c5]` (c5 = the 11th)
  - C13   = `[e3,g3,bb3,a4]` (a4 = the 13th)
- **Theremin solo follows prog song form** in 4 sections of 8 bars:
  - bars 1–8 THEME: chromatic climb intro `c6 d6 e6 f6...`, `b5` non-diatonic gag at bar 3
  - bars 9–16 CHORUS: elaboration, climbs higher to c7, `eb6` chromatic gag at bar 11, `f#6` at bar 15
  - bars 17–24 SOLO: prog climax — fast 8th-note runs, octave leaps (e5→c7), and a **full chromatic ascent** on bar 23 (`a5 b5 c6 c#6 d6 d#6 e6 f6` — every half-step in order, the prog rock signature move)
  - bars 25–32 OUTRO: returns to the theme phrasing, descends and settles to `a4` at bar 32 = perfect loop-point setup

**The "more progressive" elements specifically:**
- Pad with 9th/11th/13th extensions = jazz fusion / Steely Dan / prog-jazz harmony
- Theremin uses bar-by-bar developmental phrasing (theme → chorus → climax → outro) instead of a single repeating motif
- Bar 23 chromatic climb (8 consecutive half-steps) is a textbook prog-rock virtuoso move
- Octave leaps in bar 19 (`c6 e6 g6 c7 e7 c7 g6 e6` spans c6 to e7 = an octave + 3rd) = prog drama
- Chromatic non-diatonic notes (b5, eb6, f#6, c#6, d#6) sprinkled throughout = the cartoonish "wrong-note-played-confidently" gag and prog harmonic boldness rolled into one

**Outcome:** awaiting playback feedback.

---

## 2026-04-29 — Spacepotatis storymusic 2 (Galaxy Transition / Tubernovae Cluster warp narration)

**Track / component:** `patterns/tracks/spacepotatis-storymusic2.js`

**Brief from Mikko:** music for a galaxy-transition cutscene. Grandmotherly storytelling voice reads the Tubernovae Cluster narration (~78s of text, ending with "Three... two... one... Punch it." warp jump countdown). Wants ambient melodical underscore that's "ultra positive" but also "brings a change" (i.e., evolves through the piece, not a static loop).

**Change:** New track, structurally and tonally distinct from storymusic1.

- TEMPO: 60 BPM, `.cpm(15)` (same as storymusic1 for VO-underscore consistency)
- KEY: C major (positive, contrasts with storymusic1's A-minor solemnity)
- LENGTH: 20 bars = 80 sec (storymusic1 was 8 bars / 32 sec — this one is longer because the narration is longer and needs a journey arc)
- STRUCTURE — 5 sections of 4 bars each, narrative-aligned:
  - bars 1–4   A peaceful retrospective    C – G – Am – F
  - bars 5–8   B discovery                  F – G – Em – Am
  - bars 9–12  C mystery                    Am – F – C – G
  - bars 13–16 D anticipation               F – C – G – C
  - bars 17–20 E warp climax / countdown    C – F – G – C
- LAYERS (6): sub sine drone on chord roots; vowel-formant sawtooth pad with slow LPF "journey" sweep across the full 80s; triangle motif that climbs higher each section (oct 4-5 → oct 6-7 by climax); sparse sine shimmer with density rising toward the climax; **WARP SWELL** sustained C major triangle chord masked to bars 17–20 with filter opening 1000→7000 Hz and gain ramping (= "engines warming up" musical metaphor); **WARP STINGER** final chord burst at bar 20 only ("Punch it!").

**Why these choices for "ultra positive + brings a change":**
- C major foundation = ultra-positive baseline
- Section progressions evolve harmonically (each section's chord set differs) = brings a change
- Motif climbs higher each section = audible journey arc
- LPF on pad opens gradually over 80s = continuous evolution
- WARP SWELL + STINGER = the "Punch it!" payoff at the end is both the narrative AND musical climax
- Only 6 layers, no drums = stays as VO underscore (won't fight grandmother's voice)

**Outcome:** awaiting playback feedback. Designed for one-shot play under the narration; not meant to loop.

---

## 2026-04-30 — Spacepotatis mission 2 — repalette to 90s tracker space combat

**Track / component:** `patterns/tracks/spacepotatis-mission2.js` (full sonic rework, structure preserved)

**Brief from Mikko:** the original "aggressive major synthpop" reading of mission 2 didn't sit right next to mission 1 (combat synthwave) in the soundtrack. He wanted mission 2 to feel like a **90s tracker-era space combat theme** — Tyrian "Mars", Wipeout XL, Descent — same family as mission 1 but darker and grittier.

**Change:** Kept the 32-bar structure (intro → main A → break → main B), kept the masking architecture, kept the Tyrian octave-bouncing bass + 16th arp + dotted-8th delay. Repainted everything else:

- KEY: E major (I-vi-IV-V) → **E minor / Phrygian-flavored** `Em – F – C – D` (i-bII-bVI-bVII). The F over E = Phrygian b2 = the canonical 90s space-combat dread tone. D in bar 4 borrows F# as a leading-tone pull back to E.
- PAD: stripped sparkle. Vowel formant (`a o`) for industrial color, LPF range pulled down (2000–3500 → 1500–2800), no high jux sparkle.
- INTRO LEAD: dropped from oct 5 → oct 4 (low + menacing instead of sparkly statement). Climbs E→F→G→A across the 4 chords (Phrygian ascent).
- DRUMS: kick + snare given `crush(12)` for 90s console grit. Cowbell added as combat percussion accent on last 8th of beats 2/4.
- ARP: triangle → **square wave** (more bite, more chip-combat).
- LEAD HOOK: triangle-bright saw → **distorted saw** (`shape(0.3)`), pulled down to oct 4–5 (mid register = menacing, not heroic). Phrasing rewritten with chromatic neighbor tones (b5 over Fmaj implied via 7th, c6 as leading tone descent over Cmaj, etc).
- MAIN B: previously octave-up sparkle → **5th-up power-chord harmony** (`.add(7)`). Same hook, stacked, wider `.jux(0.15)` for fatter stereo. Power lift instead of brightness lift.
- LEAD CONTINUITY: lead now plays bars 9–32 continuously (was 9–24 with a break gap). Carries the line through the break section, which is the 90s combat convention.

**Why this preserves mission 2's identity while solving the brief:**
- Structure (32-bar, 4 sections, masking) is unchanged — same arrangement DNA
- Tyrian DNA (octave bass, 16th arp, dotted-8th delay) is unchanged — same era reference
- Only the *palette* moved from major-synthpop to minor-Phrygian-tracker — surgical repaint, not a rewrite

**Outcome:** committed. Sits next to mission 1 in the soundtrack now without tonal whiplash.

