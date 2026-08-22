/**
 * The raw x/y/z values in data/universes.js are kept as clean,
 * readable numbers for the data file itself. This multiplier
 * spreads them wider for the actual 3D map so the multiverse reads
 * as a real, present layout rather than a small huddled cluster —
 * applied consistently everywhere a node position is rendered or
 * targeted, so the map, its connection lines, and the transition
 * portal never disagree about where a node actually is.
 */
export const MAP_SPREAD = 1.7;

export function scaledPosition(position) {
  return position.map((v) => v * MAP_SPREAD);
}
