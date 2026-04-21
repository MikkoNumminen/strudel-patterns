// Genre: uplifting / melodic trance
// Tempo: 132–142 BPM
// Key: any minor (edit placeholder layers to match your progression)
// Role: structure / skeleton
// Notes: paste-runnable trance section skeleton — intro / buildup / drop / breakdown / drop.
//        Replace the placeholder layers (marked "LAYER PLACEHOLDER: ...") with your real parts.
//        Current stand-ins use silence and s("bd*4") so it still runs as-is.

cat(

  // =========================================================
  // SECTION 1 — INTRO (1 cycle)
  // Pad only. No drums. Establishes key and mood.
  // =========================================================
  stack(
    // LAYER PLACEHOLDER: pad — drop in supersaw-trance-pad.js with a softer filter
    silence,
    // LAYER PLACEHOLDER: sub drone — long sine root
    silence
  ),

  // =========================================================
  // SECTION 2 — BUILDUP (1 cycle)
  // Drums enter, snare roll, riser sweeps in.
  // =========================================================
  stack(
    // LAYER PLACEHOLDER: pad (brighter version)
    silence,
    // placeholder kick so the buildup has a pulse
    s("bd*4").gain(0.9),
    // LAYER PLACEHOLDER: 16th hats with velocity curve
    silence,
    // LAYER PLACEHOLDER: snare roll with sine gain envelope
    silence,
    // LAYER PLACEHOLDER: hat riser — drop in fx/hat-riser-buildup.js layers
    silence,
    // LAYER PLACEHOLDER: sub drone
    silence
  ),

  // =========================================================
  // SECTION 3 — FIRST DROP (2 cycles via .slow(0.5))
  // Full stack: kick + rolling bass + chords + lead + arp.
  // =========================================================
  stack(
    // placeholder kick — replace with drums/trance-four-on-floor.js
    s("bd*4").gain(0.95),
    // LAYER PLACEHOLDER: clap on backbeat
    silence,
    // LAYER PLACEHOLDER: 16th hats + offbeat oh
    silence,
    // LAYER PLACEHOLDER: rolling 16th bass (bass/trance-rolling-16th.js)
    silence,
    // LAYER PLACEHOLDER: sub sine doubling the root
    silence,
    // LAYER PLACEHOLDER: supersaw chord pad (synths/supersaw-trance-pad.js)
    silence,
    // LAYER PLACEHOLDER: lead melody (synths/trance-pentatonic-lead.js)
    silence,
    // LAYER PLACEHOLDER: pluck arp counter-melody (synths/trance-pluck-arp.js)
    silence
  ).slow(0.5),

  // =========================================================
  // SECTION 4 — BREAKDOWN (1 cycle)
  // Kick/bass drop out. Pad + lead with more reverb. Emotional pause.
  // =========================================================
  stack(
    // LAYER PLACEHOLDER: lush pad with long release and deep reverb
    silence,
    // LAYER PLACEHOLDER: floating lead with heavy delay
    silence,
    // LAYER PLACEHOLDER: distant soft kick heartbeat — s("bd ~ ~ ~").gain(0.35).lpf(120)
    silence,
    // LAYER PLACEHOLDER: riser into second drop
    silence
  ),

  // =========================================================
  // SECTION 5 — SECOND DROP (2 cycles)
  // Return to full. Extra density: jux(rev) on lead, doubled arp, ride.
  // =========================================================
  stack(
    // placeholder kick — full drive
    s("bd*4").gain(1.0),
    // LAYER PLACEHOLDER: clap + snare on backbeat
    silence,
    // LAYER PLACEHOLDER: 16th hats (busier — every(4, fast(2)))
    silence,
    // LAYER PLACEHOLDER: offbeat oh + ride shimmer
    silence,
    // LAYER PLACEHOLDER: rolling bass (more aggressive shape)
    silence,
    // LAYER PLACEHOLDER: sub sine
    silence,
    // LAYER PLACEHOLDER: wider supersaw pad
    silence,
    // LAYER PLACEHOLDER: lead with .jux(x => x.rev()) for stereo motion
    silence,
    // LAYER PLACEHOLDER: pluck arp at doubled density
    silence
  ).slow(0.5)

).cpm(138)
