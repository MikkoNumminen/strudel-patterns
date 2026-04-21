// Genre: uplifting / melodic trance
// Tempo: 132–142 BPM
// Key: any (unpitched)
// Role: drum
// Notes: classic trance drum bed — kick + 16th hats with velocity groove + offbeat open hats + clap backbeat.
//        Drop in any trance bass/pad on top; tune hpf on hats to taste.

stack(
  // kick — tight four-on-the-floor with a touch of click
  s("bd*4").gain(0.95).attack(0.003).shape(0.15),
  // clap backbeat with plate reverb
  s("~ cp ~ cp").gain(0.65).room(0.3).roomsize(0.7),
  // 16th closed hats with velocity curve and gentle pan movement
  s("hh*16")
    .gain(0.4)
    .hpf(7500)
    .velocity("0.5 0.8 0.6 1 0.5 0.8 0.6 1 0.5 0.8 0.6 1 0.5 0.8 0.6 1")
    .pan(sine.range(0.3, 0.7).slow(3)),
  // offbeat open hats — the trance "tss tss"
  s("~ oh ~ oh").gain(0.5).hpf(5000)
).cpm(138)
