// Genre: dark techno / industrial techno
// Tempo: 130–145 BPM
// Key: any minor or phrygian (edit placeholders to match your key)
// Role: structure / skeleton
// Notes: paste-runnable techno structure — intro / main groove / breakdown / main-harder.
//        Each section is .slow(2) so it runs for 2 cycles before the next arrives.
//        Replace placeholders ("LAYER PLACEHOLDER: ...") with components from drums/bass/synths.

cat(

  // =========================================================
  // SECTION 1 — INTRO (2 cycles)
  // Drums building, no bass yet, drone breathes.
  // =========================================================
  stack(
    // placeholder kick — arrives immediately
    s("bd*4").gain(0.9).shape(0.4),
    // LAYER PLACEHOLDER: sparse metallic rim — s("rim(3,8)") panned
    silence,
    // LAYER PLACEHOLDER: crushed hats, half-present (degradeBy)
    silence,
    // LAYER PLACEHOLDER: offbeat open hat, soft at first
    silence,
    // LAYER PLACEHOLDER: atmospheric drone pad (synths/techno-drone-pad.js)
    silence
  ).slow(2),

  // =========================================================
  // SECTION 2 — MAIN GROOVE (2 cycles)
  // Full engine: kick + acid bass + hats + pad + metallic perc.
  // =========================================================
  stack(
    // placeholder kick — replace with drums/driving-techno-kick.js
    s("bd*4").gain(1.0).shape(0.55),
    // LAYER PLACEHOLDER: 16th hats with cut(1) + offbeat oh (drums/acid-techno-hats.js)
    silence,
    // LAYER PLACEHOLDER: metallic cb perc (drums/techno-metallic-cb.js)
    silence,
    // LAYER PLACEHOLDER: acid 303 bass line (bass/acid-303-phrygian.js)
    silence,
    // LAYER PLACEHOLDER: slow drone pad (synths/techno-drone-pad.js)
    silence,
    // LAYER PLACEHOLDER: reverb stab on the "and" of 4 (fx/reverb-stab-decay.js)
    silence
  ).slow(2),

  // =========================================================
  // SECTION 3 — BREAKDOWN (2 cycles)
  // Drums drop, textures and drone remain, tension builds.
  // =========================================================
  stack(
    // distant kick thud every 2 bars marks time
    s("bd").struct("1 ~ ~ ~ ~ ~ ~ ~").gain(0.7).lpf(900).room(0.4),
    // LAYER PLACEHOLDER: filtered 303 with jux(x => x.rev()) — feels underwater
    silence,
    // LAYER PLACEHOLDER: pad opens up — emotional core of the break
    silence,
    // LAYER PLACEHOLDER: metallic rim texture with heavy delay
    silence
  ).slow(2),

  // =========================================================
  // SECTION 4 — MAIN GROOVE HARDER (2 cycles)
  // Return to full with more filter, extra perc bite, harder 303.
  // =========================================================
  stack(
    // placeholder kick — more weight and clip
    s("bd*4").gain(1.05).shape(0.65),
    // LAYER PLACEHOLDER: 16th hats with every(4, fast(2)) for push
    silence,
    // LAYER PLACEHOLDER: offbeat oh, pushed harder
    silence,
    // LAYER PLACEHOLDER: extra clap stabs on beat 3
    silence,
    // LAYER PLACEHOLDER: denser cb perc with ping-pong pan
    silence,
    // LAYER PLACEHOLDER: acid 303 with higher filter + more resonance
    silence,
    // LAYER PLACEHOLDER: fuller drone pad voicing
    silence
  ).slow(2)

).cpm(140)
