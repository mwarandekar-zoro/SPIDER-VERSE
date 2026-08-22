import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
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
 */
export default function Camera({ enabled = true, transitionRef }) {
  const { camera } = useThree();
  const smoothMouse = useSmoothMouse();
  const scrollProgress = useScrollProgress();
  const basePosition = useRef(CAMERA_DEFAULTS.position);

  useFrame(() => {
    if (!enabled) return;
    if (transitionRef?.current?.active) return; // portal transition owns the camera right now

    const [bx, by, bz] = basePosition.current;
    const intensity = PARALLAX_INTENSITY.background * 20;

    // Scroll pushes the camera slightly closer as the page progresses
    const scrollZ = lerp(bz, bz - 3, scrollProgress.current);

    camera.position.x = bx + smoothMouse.current.x * intensity;
    camera.position.y = by + smoothMouse.current.y * intensity;
    camera.position.z = scrollZ;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
