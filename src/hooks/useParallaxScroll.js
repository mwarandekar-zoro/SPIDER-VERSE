/**
 * useParallaxScroll — applies multi-layered 3D scroll parallax
 * transforms to background stars and mote elements at varied speeds:
 *  - .stars-far:  0.08x scroll speed (deepest background)
 *  - .stars-near: 0.20x scroll speed (midground layer)
 *  - .mote:       0.35x scroll speed (floating particles)
 *
 * Runs on rAF without React state re-renders.
 */
import { useEffect } from 'react';

export function useParallaxScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId;
    let lastY = -1;

    function tick() {
      const scrollY = window.scrollY;

      if (scrollY !== lastY) {
        lastY = scrollY;

        const starsFar = document.querySelector('.stars-far');
        const starsNear = document.querySelector('.stars-near');
        const motes = document.querySelectorAll('.mote');

        if (starsFar) {
          starsFar.style.transform = `translate3d(0, ${scrollY * 0.08}px, 0)`;
        }
        if (starsNear) {
          starsNear.style.transform = `translate3d(0, ${scrollY * 0.20}px, 0)`;
        }
        if (motes && motes.length > 0) {
          const offset = scrollY * 0.35;
          motes.forEach((mote) => {
            mote.style.transform = `translate3d(0, ${offset}px, 0)`;
          });
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);
}
