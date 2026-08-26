// ============================================================
// AUDIO & SPEECH UTILITY (WEB AUDIO API + SPEECH SYNTHESIS)
// ------------------------------------------------------------
// Built-in Web Audio API synthesizer for sci-fi dimensional hums,
// web-shooting sweeps, and portal transitions — zero external audio
// files required!
// Includes Web Speech Synthesis for character & universe voice readouts.
// ============================================================

let audioCtx = null;
let ambientOsc1 = null;
let ambientOsc2 = null;
let ambientGain = null;
let isAudioActive = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Starts a smooth ambient cosmic drone using dual Web Audio oscillators
 */
function startAmbientSynth() {
  const ctx = getAudioContext();
  if (!ctx) return;

  stopAmbientSynth();

  try {
    ambientGain = ctx.createGain();
    ambientGain.gain.setValueAtTime(0.01, ctx.currentTime);
    ambientGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.5);

    // Deep sub drone (55Hz A1)
    ambientOsc1 = ctx.createOscillator();
    ambientOsc1.type = 'sine';
    ambientOsc1.frequency.setValueAtTime(55, ctx.currentTime);

    // Harmonic warm drone (110Hz A2)
    ambientOsc2 = ctx.createOscillator();
    ambientOsc2.type = 'triangle';
    ambientOsc2.frequency.setValueAtTime(110, ctx.currentTime);

    // Lowpass filter for smooth cosmic warmth
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, ctx.currentTime);

    ambientOsc1.connect(ambientGain);
    ambientOsc2.connect(ambientGain);
    ambientGain.connect(filter);
    filter.connect(ctx.destination);

    ambientOsc1.start();
    ambientOsc2.start();
    isAudioActive = true;
  } catch (err) {
    console.warn('Ambient synth error:', err);
  }
}

function stopAmbientSynth() {
  if (ambientGain && audioCtx) {
    try {
      ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      setTimeout(() => {
        ambientOsc1?.stop();
        ambientOsc2?.stop();
        ambientOsc1?.disconnect();
        ambientOsc2?.disconnect();
        ambientGain?.disconnect();
        ambientOsc1 = null;
        ambientOsc2 = null;
        ambientGain = null;
      }, 500);
    } catch {
      ambientOsc1 = null;
      ambientOsc2 = null;
      ambientGain = null;
    }
  }
  isAudioActive = false;
}

/**
 * Plays synthesized SFX effects (web-shoot, portal warp, click blip)
 */
export function playSound(key, { volume = 0.5, loop = false } = {}) {
  const ctx = getAudioContext();

  if (key === 'ambience') {
    startAmbientSynth();
    return;
  }

  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (key === 'web' || key === 'click') {
      // Primary web-shooter "thwip!" frequency sweep (950Hz -> 110Hz)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.14);

      // High-frequency air whip noise layer (1600Hz -> 300Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1600, now);
      osc2.frequency.exponentialRampToValueAtTime(300, now + 0.08);

      gain.gain.setValueAtTime(volume * 0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      gain2.gain.setValueAtTime(volume * 0.25, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.14);
      osc2.stop(now + 0.08);
      return;
    } else if (key === 'portal' || key === 'transition') {
      // Portal warp sub-bass drop (320Hz -> 45Hz)
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.6);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(100, now + 0.6);

      gain.gain.setValueAtTime(volume * 0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    }
  } catch (err) {
    console.warn('Sound play error:', err);
  }
}

export function stopSound(key) {
  if (key === 'ambience') {
    stopAmbientSynth();
  }
}

/**
 * Web Speech Synthesis: speaks text using browser text-to-speech
 */
export function speakVoice(text) {
  if (!('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel(); // Cancel ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 0.95;
    utterance.volume = 0.8;

    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const engVoice = voices.find((v) => v.lang.startsWith('en'));
    if (engVoice) utterance.voice = engVoice;

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
}
