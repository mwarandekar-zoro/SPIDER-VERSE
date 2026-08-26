// ============================================================
// AUDIO & SPEECH UTILITY (WEB AUDIO API + SPEECH SYNTHESIS)
// ------------------------------------------------------------
// Built-in Web Audio API synthesizer for sci-fi dimensional hums
// and clean web-shooting SFX.
// Includes single-voice Speech Synthesis for character readouts.
// ============================================================

let audioCtx = null;
let ambientOsc1 = null;
let ambientOsc2 = null;
let ambientGain = null;

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
    ambientGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.5);

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
    filter.frequency.setValueAtTime(240, ctx.currentTime);

    ambientOsc1.connect(ambientGain);
    ambientOsc2.connect(ambientGain);
    ambientGain.connect(filter);
    filter.connect(ctx.destination);

    ambientOsc1.start();
    ambientOsc2.start();
  } catch (err) {
    console.warn('Ambient synth error:', err);
  }
}

function stopAmbientSynth() {
  if (ambientGain && audioCtx) {
    try {
      ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
      setTimeout(() => {
        ambientOsc1?.stop();
        ambientOsc2?.stop();
        ambientOsc1?.disconnect();
        ambientOsc2?.disconnect();
        ambientGain?.disconnect();
        ambientOsc1 = null;
        ambientOsc2 = null;
        ambientGain = null;
      }, 400);
    } catch {
      ambientOsc1 = null;
      ambientOsc2 = null;
      ambientGain = null;
    }
  }
}

/**
 * Plays clean synthesized SFX effects (single organic web-shoot thwip, portal drop)
 */
export function playSound(key, { volume = 0.4 } = {}) {
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
      // Single clean organic web-shooter "thwip!" (650Hz -> 90Hz)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.09);

      gain.gain.setValueAtTime(volume * 0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (key === 'portal' || key === 'transition') {
      // Clean portal warp sub-bass drop (240Hz -> 45Hz)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.4);

      gain.gain.setValueAtTime(volume * 0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch {
    /* no-op */
  }
}

export function stopSound(key) {
  if (key === 'ambience') {
    stopAmbientSynth();
  }
}

/**
 * Single-Voice Web Speech Synthesis: speaks text cleanly without voice overlap
 */
export function speakVoice(text) {
  if (!('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel(); // Stop any previous speech immediately
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.volume = 0.9;

    const voices = window.speechSynthesis.getVoices();
    // Pick a single clear natural English voice
    const preferredVoice = voices.find((v) => 
      v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David') || v.name.includes('Mark') || v.name.includes('George'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) utterance.voice = preferredVoice;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
}
