// Genre: uplifting / melodic trance
// Tempo: 132–142 BPM
// Key: A minor pentatonic (melody tracks i–VI–III–VII)
// Role: lead
// Notes: simple memorable anthem lead with dotted-8th delay (0.375s @ 138 BPM).
//        Sits center; pair with supersaw-trance-pad for the full drop. Add jux(rev) for drop-2 width.

note("<[a4 ~ c5 e5] [f4 ~ a4 c5] [e4 ~ g4 c5] [d4 ~ g4 b4]>")
  .s("sawtooth")
  // crisp attack, moderate sustain — sings but doesn't smear
  .attack(0.01).decay(0.2).sustain(0.7).release(0.3)
  .lpf(2800).lpq(3)
  .room(0.45).roomsize(0.75)
  // dotted-8th delay — the trance staple
  .delay(0.3).delaytime(0.375).delayfeedback(0.45)
  .gain(0.55)
  .cpm(138)
