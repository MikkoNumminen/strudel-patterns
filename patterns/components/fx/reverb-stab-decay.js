// Genre: dark techno / industrial / dub
// Tempo: 125–145 BPM
// Key: any (unpitched clap/sample)
// Role: fx
// Notes: reverb-drenched industrial stab on the last 8th — long tail, delay feedback, bit-crush grit.
//        Use as a periodic accent over a techno groove. Paired with a kick for context.

stack(
  // minimal kick context so the stab has a pulse to breathe against
  s("bd*4").gain(0.85).shape(0.4),
  // reverb stab — crushed, high-passed, long delay tail on the "and" of 4
  s("cp").struct("~ ~ ~ ~ ~ ~ ~ 1")
    .gain(0.5)
    .crush(5)
    .hpf(800)
    .room(0.9).roomsize(0.95)
    .delay(0.55).delaytime(0.5).delayfeedback(0.55)
).cpm(140)
