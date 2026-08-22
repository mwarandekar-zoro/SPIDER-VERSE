import { useEffect, useRef } from 'react';

/**
 * Tracks raw pointer position and exposes it as a ref, normalized
 * to the -1 -> 0 -> +1 range described in the cursor-system spec.
 * Uses a ref (not state) because this updates at pointer-event
 * frequency and must never trigger a React re-render.
 */
export function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handlePointerMove(event) {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -((event.clientY / window.innerHeight) * 2 - 1);
      mouse.current.x = x;
      mouse.current.y = y;
    }

    // Touch fallback: treat a moving touch like pointer movement so
    // parallax still has a signal on mobile without a real cursor.
    function handleTouchMove(event) {
      const touch = event.touches[0];
      if (!touch) return;
      const x = (touch.clientX / window.innerWidth) * 2 - 1;
      const y = -((touch.clientY / window.innerHeight) * 2 - 1);
      mouse.current.x = x;
      mouse.current.y = y;
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return mouse;
}
