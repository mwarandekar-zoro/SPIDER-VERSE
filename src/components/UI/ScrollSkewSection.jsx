/**
 * ScrollSkewSection — wraps section content and applies a subtle
 * skew + scale based on how fast the user is scrolling, giving a
 * motion-blur-like "warp speed" feel on fast scrolls.
 *
 * Usage:
 *   <ScrollSkewSection>
 *     <YourContent />
 *   </ScrollSkewSection>
 *
 * Runs entirely in rAF — no React state per frame.
 */
import { useRef, useEffect } from 'react';

const MAX_SKEW = 2.2;   // deg
const MAX_SCALE = 0.015; // scale delta
const LERP = 0.08;

export default function ScrollSkewSection({ children, style = {}, className = '' }) {
  const ref = useRef(null);
  const velRef = useRef(0);
  const lastY = useRef(window.scrollY);
  const lastT = useRef(performance.now());
  const current = useRef(0); // current skew
  const raf = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    function onScroll() {
      const now = performance.now();
      const dt = Math.max(now - lastT.current, 1);
      velRef.current = (window.scrollY - lastY.current) / dt;
      lastY.current = window.scrollY;
      lastT.current = now;
    }

    function tick() {
      const targetSkew = Math.max(-MAX_SKEW, Math.min(MAX_SKEW, velRef.current * 12));
      current.current += (targetSkew - current.current) * LERP;

      // Decay velocity gently when not scrolling
      velRef.current *= 0.88;

      const skewDeg = current.current;
      const scaleY = 1 - Math.abs(current.current / MAX_SKEW) * MAX_SCALE;

      el.style.transform = `skewY(${skewDeg}deg) scaleY(${scaleY})`;
      el.style.transformOrigin = 'center top';
      raf.current = requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf.current);
      if (el) el.style.transform = '';
    };
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
