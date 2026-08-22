import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import Portal from './Portal';
import { buildUniverseTransition } from '../../animations/portalAnimations';
import { universes } from '../../data/universes';
import { scaledPosition } from '../../utils/mapLayout';

/**
 * Starts the universe-entry cinematic (Phase 11) whenever
 * isTransitioning flips true, and renders the portal at the
 * target universe's map position for the duration of the effect.
 * Owns none of the app-level state itself — reports back through
 * onMidpoint (fired at the blackout peak, when Environment should
 * swap) and onComplete (transition finished).
 */
export default function TransitionController({
  isTransitioning,
  targetUniverseId,
  overlayEl,
  progressRef,
  onMidpoint,
  onComplete,
}) {
  const { camera } = useThree();
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!isTransitioning || !targetUniverseId) return undefined;

    const target = universes.find((u) => u.id === targetUniverseId);
    if (!target) return undefined;

    timelineRef.current = buildUniverseTransition({
      camera,
      overlayEl,
      portalPosition: scaledPosition(target.position),
      progressRef,
      onMidpoint,
      onComplete,
    });

    return () => {
      timelineRef.current?.kill();
    };
    // Re-run only when a transition actually starts/targets change —
    // camera/progressRef/callbacks are stable across the app's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTransitioning, targetUniverseId]);

  const target = targetUniverseId ? universes.find((u) => u.id === targetUniverseId) : null;
  if (!target) return null;

  return (
    <Portal position={scaledPosition(target.position)} color={target.theme.primary} progressRef={progressRef} />
  );
}
