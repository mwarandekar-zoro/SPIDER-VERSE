// ============================================================
// GLOBAL CONSTANTS
// Single source of truth for tuning values referenced across
// the 3D scene, cursor engine, and animation systems.
// ============================================================

export const QUALITY_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

// Particle counts, DPR caps, and effect toggles per quality tier.
// deviceQuality.js decides which tier a given device gets by default.
export const QUALITY_SETTINGS = {
  [QUALITY_LEVELS.HIGH]: {
    particleCount: 3800,
    dpr: [1, 2],
    shadows: true,
    postProcessing: true,
  },
  [QUALITY_LEVELS.MEDIUM]: {
    particleCount: 1800,
    dpr: [1, 1.5],
    shadows: false,
    postProcessing: false,
  },
  [QUALITY_LEVELS.LOW]: {
    particleCount: 600,
    dpr: [1, 1],
    shadows: false,
    postProcessing: false,
  },
};

// Cursor -> camera / parallax intensity per layer.
// Lower = subtler movement. Tuned in Phase 3 (cursor engine).
export const PARALLAX_INTENSITY = {
  background: 0.02,
  particles: 0.04,
  environment: 0.06,
  character: 0.1,
  ui: 0.02,
};

// Lerp factor for smoothing raw mouse input into eased motion.
// Smaller = smoother/slower catch-up, larger = snappier/twitchier.
export const MOUSE_LERP_FACTOR = 0.06;

// Camera defaults for the base multiverse scene.
export const CAMERA_DEFAULTS = {
  position: [0, 0, 8],
  fov: 50,
  near: 0.1,
  far: 100,
};

// Responsive breakpoints (px), kept in sync with responsive.css
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1200,
};

// Section identifiers used for scroll/nav state.
export const SECTIONS = {
  HERO: 'hero',
  MULTIVERSE: 'multiverse',
  CHARACTERS: 'characters',
  CHARACTER_DETAIL: 'character-detail',
  UNIVERSES: 'universes',
  COMPARE: 'compare',
  WEB: 'web',
  CTA: 'cta',
};
