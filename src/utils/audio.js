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
    ambientGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.2);

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
  } catch (err) {
    console.warn('Ambient synth error:', err);
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
        ambientOsc1 = null;
        ambientOsc2 = null;
        ambientGain = null;
      }, 300);
    } catch {
      ambientOsc1 = null;
      ambientOsc2 = null;
      ambientGain = null;
    }
  }
}

/**
 * Plays clean synthesized SFX effects (web-shoot thwip, portal drop)
 */
export function playSound(key, { volume = 0.6 } = {}) {
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
      // Crisp organic web-shooter "THWIP!" frequency sweep (850Hz -> 100Hz)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(850, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.12);

      gain.gain.setValueAtTime(volume * 0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (key === 'portal' || key === 'transition') {
      // Clean portal warp sub-bass drop (280Hz -> 40Hz)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.5);

      gain.gain.setValueAtTime(volume * 0.6, now);
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
