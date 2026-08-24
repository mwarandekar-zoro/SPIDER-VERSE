import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useSmoothMouse } from '../../hooks/useSmoothMouse';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { PARALLAX_INTENSITY, CAMERA_DEFAULTS } from '../../utils/constants';
import { lerp } from '../../utils/math';

/**
 * Drives the default camera with cursor-reactive parallax (section
 * 12) and scroll-tied depth (section 27) — scrolling reads as
 * travelling deeper into the void rather than a flat page moving
 * behind a static backdrop.
 *
 * When a universe transition is active, portalAnimations.js takes
 * full ownership of camera.position for its duration; this
 * component simply steps aside (via transitionRef.current.active)
 * so the two never fight over the same frame.
 *
 * `focusTrigger` is a lightweight "3D entrance" cue — pass a value
 * that changes whenever a character profile opens (e.g. the
 * character id) and the camera punches in slightly then eases back,
 * on top of whatever the base/scroll/parallax position already is.
 * This never touches transitionRef, so it can run happily alongside
 * ordinary scrolling/parallax — it's purely additive via focusOffset.
 */
export default function Camera({ enabled = true, transitionRef, focusTrigger = null }) {
  const { camera } = useThree();
  const smoothMouse = useSmoothMouse();
  const scrollProgress = useScrollProgress();
  const basePosition = useRef(CAMERA_DEFAULTS.position);
  const focusOffset = useRef({ z: 0 });
  const isFirstRun = useRef(true);

  useEffect(() => {
    // Don't punch in on initial mount — only on an actual selection change.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (focusTrigger == null) return;

    gsap.killTweensOf(focusOffset.current);
    gsap.timeline()
      .to(focusOffset.current, { z: -0.9, duration: 0.35, ease: 'power2.out' })
      .to(focusOffset.current, { z: 0, duration: 0.65, ease: 'elastic.out(1, 0.6)' });
  }, [focusTrigger]);

  useFrame(() => {
    if (!enabled) return;
    if (transitionRef?.current?.active) return; // portal transition owns the camera right now

    const [bx, by, bz] = basePosition.current;
    const intensity = 1.1; // Balanced parallax: clearly visible, smooth, but not excessive

    // Scroll pushes the camera slightly closer as the page progresses
    const scrollZ = lerp(bz, bz - 3, scrollProgress.current);

    camera.position.x = bx + smoothMouse.current.x * intensity;
    camera.position.y = by + smoothMouse.current.y * (intensity * 0.7);
    camera.position.z = scrollZ + focusOffset.current.z;
    camera.lookAt(smoothMouse.current.x * 0.3, smoothMouse.current.y * 0.2, 0);
  });

  return null;
}
