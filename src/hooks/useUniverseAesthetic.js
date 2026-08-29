/**
 * useUniverseAesthetic — maps every character ID to a named aesthetic
 * mode, writes it as `data-aesthetic="<mode>"` on `<html>` so CSS
 * selectors cascade globally. Returns the name for UniverseOverlay.
 *
 * Full aesthetic map (20 characters):
 *
 *  ORIGINAL 5
 *  hobie-brown       → "punk"       (Earth-138:   glitch, grain, zine)
 *  peter-porker      → "cartoon"    (Earth-8311:  halftone, bouncy)
 *  spider-man-noir   → "noir"       (Earth-90214: B&W, vignette, grain)
 *  miguel-ohara      → "hud"        (Earth-928:   scanlines, hologram)
 *  pavitr-prabhakar  → "india"      (Earth-50101: gold particles, rangoli)
 *
 *  ALL OTHERS
 *  miles-morales     → "brooklyn"   (Earth-1610:  graffiti neon, spray art)
 *  gwen-stacy        → "ghostspider"(Earth-65:    pastel ballet, petals)
 *  peter-b-parker    → "dadspider"  (Earth-616:   worn warm nostalgia)
 *  jessica-drew      → "spycraft"   (Earth-616:   tactical grid, agent)
 *  cindy-moon        → "silk"       (Earth-616:   organic thread lines)
 *  ben-reilly        → "scarlet"    (Earth-616:   grunge scarlet hoodie)
 *  kaine-parker      → "haunted"    (Earth-616:   dark crimson, cursed)
 *  web-slinger       → "wildwest"   (Earth-31913: sepia dust, frontier)
 *  mayday-parker     → "retro"      (Earth-982:   90s bright sparkles)
 *  superior-spider-man → "superior" (Earth-616:   cold purple tech)
 *  margo-kess        → "cyber"      (Earth-22191: matrix rain, digital)
 *  spider-rex        → "prehistoric"(Earth-66:    jungle embers, primal)
 *  takuya-yamashiro  → "tokusatsu"  (Earth-51778: speed lines, kanji)
 *  cyborg-spider-man → "cybernetic" (Earth-15:    circuit traces, tears)
 *  anya-corazon      → "mystic"     (Earth-616:   arcane orbs, sigils)
 */
import { useEffect } from 'react';

const AESTHETIC_MAP = {
  /* Original 5 */
  'hobie-brown':          'punk',
  'peter-porker':         'cartoon',
  'spider-man-noir':      'noir',
  'miguel-ohara':         'hud',
  'pavitr-prabhakar':     'india',
  /* All others */
  'miles-morales':        'brooklyn',
  'gwen-stacy':           'ghostspider',
  'peter-b-parker':       'dadspider',
  'jessica-drew':         'spycraft',
  'cindy-moon':           'silk',
  'ben-reilly':           'scarlet',
  'kaine-parker':         'haunted',
  'web-slinger':          'wildwest',
  'mayday-parker':        'retro',
  'superior-spider-man':  'superior',
  'margo-kess':           'cyber',
  'spider-rex':           'prehistoric',
  'takuya-yamashiro':     'tokusatsu',
  'cyborg-spider-man':    'cybernetic',
  'anya-corazon':         'mystic',
};

export function useUniverseAesthetic(characterId) {
  const aesthetic = AESTHETIC_MAP[characterId] ?? 'default';

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-aesthetic', aesthetic);
    return () => {
      root.setAttribute('data-aesthetic', 'default');
    };
  }, [aesthetic]);

  return aesthetic;
}
