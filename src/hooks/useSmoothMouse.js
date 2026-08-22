import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useMousePosition } from './useMousePosition';
import { MOUSE_LERP_FACTOR } from '../utils/constants';
import { lerp } from '../utils/math';

/**
 * Smooths raw mouse input toward a "current" position using lerp,
 * per the spec's rule: never directly teleport objects to cursor
 * positions. Consume `smoothMouse.current.{x,y}` inside useFrame
 * in any 3D component that should react to the cursor.
 *
 * @param {number} lerpFactor - override the default smoothing speed
 */
export function useSmoothMouse(lerpFactor = MOUSE_LERP_FACTOR) {
  const targetMouse = useMousePosition();
  const smoothMouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    smoothMouse.current.x = lerp(smoothMouse.current.x, targetMouse.current.x, lerpFactor);
    smoothMouse.current.y = lerp(smoothMouse.current.y, targetMouse.current.y, lerpFactor);
  });

  return smoothMouse;
}
