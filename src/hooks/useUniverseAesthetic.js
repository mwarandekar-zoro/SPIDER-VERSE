/**
 * useUniverseAesthetic — maps a selected character ID to a named
 * aesthetic mode, then writes it as `data-aesthetic="<mode>"` on
 * `<html>` so CSS selectors cascade globally with zero per-component
 * changes. Returns the active aesthetic string for imperative use
 * (e.g. UniverseOverlay).
 *
 * Aesthetic map:
 *   hobie-brown       → "punk"    (Earth-138: glitch, grain, zine)
 *   peter-porker      → "cartoon" (Earth-8311: halftone, bouncy)
 *   spider-man-noir   → "noir"    (Earth-90214: B&W, vignette, grain)
 *   miguel-ohara      → "hud"     (Earth-928: scanlines, hologram)
 *   pavitr-prabhakar  → "india"   (Earth-50101: gold particles, rangoli)
 *   everything else   → "default" (void palette, no overlay)
 */
import { useEffect } from 'react';

const AESTHETIC_MAP = {
  'hobie-brown':      'punk',
  'peter-porker':     'cartoon',
  'spider-man-noir':  'noir',
  'miguel-ohara':     'hud',
  'pavitr-prabhakar': 'india',
};

export function useUniverseAesthetic(characterId) {
  const aesthetic = AESTHETIC_MAP[characterId] ?? 'default';

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-aesthetic', aesthetic);
    return () => {
      // Reset only if this is the last one (next mount will immediately re-set)
      root.setAttribute('data-aesthetic', 'default');
    };
  }, [aesthetic]);

  return aesthetic;
}
