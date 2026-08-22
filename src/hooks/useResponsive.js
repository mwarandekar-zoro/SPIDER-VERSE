import { useEffect, useState } from 'react';
import { BREAKPOINTS } from '../utils/constants';
import { isTouchDevice, prefersReducedMotion } from '../utils/deviceQuality';

/**
 * Tracks viewport/device state that UI and 3D components need to
 * branch on (e.g. disable the custom cursor on touch devices).
 * Deliberately low-frequency — resize/orientation events only,
 * never per-frame — so it's safe to hold as React state.
 */
export function useResponsive() {
  const [state, setState] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    isMobile: typeof window !== 'undefined' ? window.innerWidth <= BREAKPOINTS.mobile : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth <= BREAKPOINTS.tablet : false,
    isTouch: isTouchDevice(),
    reducedMotion: prefersReducedMotion(),
  }));

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setState((prev) => ({
        ...prev,
        width,
        isMobile: width <= BREAKPOINTS.mobile,
        isTablet: width <= BREAKPOINTS.tablet,
      }));
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    function handleMotionChange(event) {
      setState((prev) => ({ ...prev, reducedMotion: event.matches }));
    }

    window.addEventListener('resize', handleResize);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return state;
}
