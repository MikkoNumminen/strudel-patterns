// Genre: dark / acid techno
// Tempo: 130–145 BPM
// Key: any (unpitched)
// Role: drum / hats
// Notes: rolling 16th closed hats with sine-wave velocity ducking + offbeat open hat.
//        cut(1) keeps the closed hats monophonic so each hit chokes the previous — tight groove.

stack(
  // rolling 16th closed hats, velocity ducking via sine, choked on cut group 1
  s("hh*16").gain(sine.range(0.25, 0.5).fast(4)).hpf(7000).cut(1),
  // offbeat open hat — the techno heartbeat
  s("~ ~ ~ oh").gain(0.55).hpf(3500).pan(0.65)
).cpm(140)
