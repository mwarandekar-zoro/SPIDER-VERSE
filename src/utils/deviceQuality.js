import { QUALITY_LEVELS, BREAKPOINTS } from './constants';

/**
 * Picks a starting quality tier from coarse device signals.
 * This is a heuristic default — the user-facing quality control
 * (added in the performance phase) can always override it.
 */
export function detectDefaultQuality() {
  if (typeof window === 'undefined') return QUALITY_LEVELS.MEDIUM;

  const isSmallScreen = window.innerWidth <= BREAKPOINTS.tablet;
  const cores = navigator.hardwareConcurrency || 4;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isReducedMotion) return QUALITY_LEVELS.LOW;
  if (isSmallScreen || cores <= 4) return QUALITY_LEVELS.MEDIUM;
  return QUALITY_LEVELS.HIGH;
}

export function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
