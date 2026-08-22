import { useEffect, useRef } from 'react';

/**
 * Overall page scroll progress, 0 (top) -> 1 (bottom), held in a
 * ref so continuous consumers (like Camera's useFrame) never
 * trigger a React re-render just from scrolling.
 */
export function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progress;
}
