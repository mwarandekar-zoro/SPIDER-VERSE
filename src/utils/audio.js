// ============================================================
// AUDIO UTILITY
// ------------------------------------------------------------
// Section 39: audio is optional and must never crash or force
// loud playback. No actual sound assets ship with this project
// yet (public/sounds/*.mp3 are placeholders per the folder
// structure) — this module is the working plumbing so real files
// can be dropped in later without touching any component code.
// ============================================================

const SOUND_PATHS = {
  ambience: '/sounds/ambience.mp3',
  portal: '/sounds/portal.mp3',
  web: '/sounds/web.mp3',
  transition: '/sounds/transition.mp3',
};

const cache = {};

function getAudio(key) {
  if (!SOUND_PATHS[key]) return null;
  if (!cache[key]) {
    const audio = new Audio(SOUND_PATHS[key]);
    audio.preload = 'none';
    cache[key] = audio;
  }
  return cache[key];
}

/**
 * Plays a sound by key. Missing files or blocked autoplay both fail
 * silently — this is expected until real assets exist, and should
 * never surface as a crash or a console error flood.
 */
export function playSound(key, { volume = 0.5, loop = false } = {}) {
  const audio = getAudio(key);
  if (!audio) return;
  try {
    audio.loop = loop;
    audio.volume = volume;
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        /* asset missing or autoplay blocked — no-op */
      });
    }
  } catch {
    /* no-op — audio is optional per section 39 */
  }
}

export function stopSound(key) {
  const audio = cache[key];
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
}
