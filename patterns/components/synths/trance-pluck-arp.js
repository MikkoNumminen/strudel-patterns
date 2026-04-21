// Genre: uplifting / melodic trance
// Tempo: 132–142 BPM
// Key: A minor pentatonic (tracks i–VI–III–VII)
// Role: arp / counter-melody
// Notes: high-octave triangle pluck with 16th-note delay — sits above the lead as counter-motion.
//        Short envelope prevents muddiness. Pan right slightly so it clears the center lead.

note("<[a5 e5 c5 e5] [a5 f5 c5 f5] [g5 e5 c5 e5] [g5 d5 b4 d5]>*2")
  .s("triangle")
  // very short envelope — plucky, bell-like
  .attack(0.002).decay(0.08).sustain(0).release(0.1)
  .lpf(3500)
  // 16th delay — adds rhythmic density without stepping on the lead
  .delay(0.4).delaytime(0.1875).delayfeedback(0.5)
  .room(0.3)
  .gain(0.35)
  .pan(0.65)
  .cpm(138)
