import { useEffect } from 'react';

// Must match the default values in globals.css :root so there's no
// flash/mismatch before this hook ever runs.
const DEFAULT_PRIMARY = '#b026ff';
const DEFAULT_SECONDARY = '#00f0ff';

/**
 * Pushes a universe's theme colors onto :root as CSS custom
 * properties, so EVERY consumer of --universe-primary /
 * --universe-secondary across the whole app (body background,
 * nav, buttons, focus rings, profile panel) shifts together the
 * moment a Spider-Person is selected — not just the one component
 * that happens to read character.universe.theme locally.
 *
 * Pass `null`/`undefined` theme to release back to the default
 * "void between universes" palette (e.g. when a profile is closed).
 */
export function useUniverseTheme(theme) {
  useEffect(() => {
    const root = document.documentElement;
    const primary = theme?.primary ?? DEFAULT_PRIMARY;
    const secondary = theme?.secondary ?? DEFAULT_SECONDARY;

    root.style.setProperty('--universe-primary', primary);
    root.style.setProperty('--universe-secondary', secondary);

    return () => {
      // Runs before every re-run of this effect (including when theme
      // changes to a different universe), so this reset is immediately
      // followed by the next selection's own setProperty call in the
      // same flush — the only case where the reset "sticks" is when
      // theme genuinely goes back to null (profile closed).
      root.style.setProperty('--universe-primary', DEFAULT_PRIMARY);
      root.style.setProperty('--universe-secondary', DEFAULT_SECONDARY);
    };
  }, [theme?.primary, theme?.secondary]);
}
