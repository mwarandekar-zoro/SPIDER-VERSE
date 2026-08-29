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

// Global unlock on pointerdown to bypass browser autoplay restrictions
if (typeof window !== 'undefined') {
  const unlock = () => {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  };
  window.addEventListener('pointerdown', unlock, { passive: true });
}

// Map universe IDs to pitch frequencies (Hz) for universe-specific ambient drone shifting
const UNIVERSE_PITCHES = {
  'earth-1610':  { f1: 55,   f2: 110, filter: 320, type1: 'sine',     type2: 'triangle' }, // Miles: Deep urban sub
  'earth-65':    { f1: 87.3, f2: 174.6,filter: 540, type1: 'sine',     type2: 'sine' },     // Gwen: Etheric synth
  'earth-928':   { f1: 110,  f2: 220, filter: 750, type1: 'sawtooth', type2: 'sine' },     // 2099: Cyber digital
  'earth-138':   { f1: 73.4, f2: 146.8,filter: 620, type1: 'sawtooth', type2: 'square' },   // Punk: Distorted raw
  'earth-90214': { f1: 43.6, f2: 87.3, filter: 220, type1: 'sine',     type2: 'triangle' }, // Noir: Dark vintage sub
  'earth-50101': { f1: 98,   f2: 196,  filter: 480, type1: 'triangle', type2: 'sine' },     // India: Warm golden
  'earth-8311':  { f1: 130.8,f2: 261.6,filter: 800, type1: 'sine',     type2: 'triangle' }, // Ham: Playful bouncy
  default:       { f1: 55,   f2: 110,  filter: 280, type1: 'sine',     type2: 'triangle' },
};

let ambientFilter = null;

/**
 * Starts a smooth ambient cosmic drone using dual Web Audio oscillators
 */
function startAmbientSynth(universeId = 'default') {
  const ctx = getAudioContext();
  if (!ctx) return;

  stopAmbientSynth();

  const pitch = UNIVERSE_PITCHES[universeId] ?? UNIVERSE_PITCHES.default;

  try {
    ambientGain = ctx.createGain();
    ambientGain.gain.setValueAtTime(0.01, ctx.currentTime);
    ambientGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.2);

    ambientOsc1 = ctx.createOscillator();
    ambientOsc1.type = pitch.type1;
    ambientOsc1.frequency.setValueAtTime(pitch.f1, ctx.currentTime);

    ambientOsc2 = ctx.createOscillator();
    ambientOsc2.type = pitch.type2;
    ambientOsc2.frequency.setValueAtTime(pitch.f2, ctx.currentTime);

    ambientFilter = ctx.createBiquadFilter();
    ambientFilter.type = 'lowpass';
    ambientFilter.frequency.setValueAtTime(pitch.filter, ctx.currentTime);

    ambientOsc1.connect(ambientGain);
    ambientOsc2.connect(ambientGain);
    ambientGain.connect(ambientFilter);
    ambientFilter.connect(ctx.destination);

    ambientOsc1.start();
    ambientOsc2.start();
  } catch (err) {
    console.warn('Ambient synth error:', err);
  }
}

/**
 * Shifts the pitch/tone of the running ambient drone when switching universes
 */
export function setUniversePitch(universeId) {
  if (!audioCtx || !ambientOsc1 || !ambientOsc2 || !ambientFilter) return;

  const pitch = UNIVERSE_PITCHES[universeId] ?? UNIVERSE_PITCHES.default;
  const now = audioCtx.currentTime;

  try {
    ambientOsc1.frequency.exponentialRampToValueAtTime(pitch.f1, now + 1.2);
    ambientOsc2.frequency.exponentialRampToValueAtTime(pitch.f2, now + 1.2);
    ambientFilter.frequency.exponentialRampToValueAtTime(pitch.filter, now + 1.2);
  } catch (err) {
    console.warn('Pitch shift error:', err);
  }
}

function stopAmbientSynth() {
  if (ambientGain && audioCtx) {
    try {
      ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
      setTimeout(() => {
        ambientOsc1?.stop();
        ambientOsc2?.stop();
        ambientOsc1?.disconnect();
        ambientOsc2?.disconnect();
        ambientGain?.disconnect();
        ambientFilter?.disconnect();
        ambientOsc1 = null;
        ambientOsc2 = null;
        ambientGain = null;
        ambientFilter = null;
      }, 300);
    } catch {
      ambientOsc1 = null;
      ambientOsc2 = null;
      ambientGain = null;
      ambientFilter = null;
    }
  }
}

/**
 * Creates a short noise buffer for organic silk "thwip" flutter & whoosh effects
 */
function createNoiseBuffer(ctx, duration = 0.15) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

/**
 * Plays clean synthesized SFX effects (web-shoot thwip, portal drop, section whoosh)
 */
export function playSound(key, { volume = 0.6, universeId = 'default' } = {}) {
  const ctx = getAudioContext();

  if (key === 'ambience') {
    startAmbientSynth(universeId);
    return;
  }

  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    if (key === 'web' || key === 'click') {
      // 1. Primary snap frequency sweep (1400Hz -> 110Hz)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.10);

      gain.gain.setValueAtTime(volume * 0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.10);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.10);

      // 2. Silk noise dispersion layer
      const noise = ctx.createBufferSource();
      const noiseFilter = ctx.createBiquadFilter();
      const noiseGain = ctx.createGain();

      noise.buffer = createNoiseBuffer(ctx, 0.08);
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(3200, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      noiseGain.gain.setValueAtTime(volume * 0.45, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);

    } else if (key === 'whoosh') {
      // Dynamic section transition whoosh (noise sweep 150Hz -> 1800Hz -> 200Hz)
      const noise = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      noise.buffer = createNoiseBuffer(ctx, 0.35);
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(1600, now + 0.18);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.35);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(volume * 0.45, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);

    } else if (key === 'portal' || key === 'transition') {
      // Clean portal warp sub-bass drop (320Hz -> 35Hz)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.5);

      gain.gain.setValueAtTime(volume * 0.65, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
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
 * Web Speech Synthesis: speaks text using browser speech engine
 */
export function speakVoice(text) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const performSpeak = () => {
    try {
      window.speechSynthesis.cancel(); // Stop any pending speech
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferredVoice =
          voices.find(
            (v) =>
              v.lang.startsWith('en') &&
              (v.name.includes('Natural') ||
                v.name.includes('Google') ||
                v.name.includes('David') ||
                v.name.includes('Mark') ||
                v.name.includes('George') ||
                v.name.includes('Zira'))
          ) || voices.find((v) => v.lang.startsWith('en'));

        if (preferredVoice) utterance.voice = preferredVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  };

  // If voices haven't loaded yet in Chrome, trigger once ready
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      performSpeak();
      window.speechSynthesis.onvoiceschanged = null;
    };
  } else {
    performSpeak();
  }
}
