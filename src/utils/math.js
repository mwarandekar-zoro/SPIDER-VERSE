// ============================================================
// MATH UTILITIES
// ============================================================

/** Linear interpolation. t=0 -> a, t=1 -> b. */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/** Clamp a value between min and max. */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another. */
export function mapRange(value, inMin, inMax, outMin, outMax) {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}

/** Normalize a pixel coordinate to the -1..1 range used by the cursor engine. */
export function normalizePointer(value, size) {
  return (value / size) * 2 - 1;
}
