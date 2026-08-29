/**
 * useMagneticElement — makes a DOM element subtly pull toward
 * the cursor when the pointer is nearby, snap back on leave.
 *
 * @param {number} strength  How far the element shifts (px)
 * @param {number} radius    How close cursor must be to activate (px)
 * @returns ref to attach to the target element
 */
import { useRef, useEffect } from 'react';

export function useMagneticElement({ strength = 0.3, radius = 80 } = {}) {
  const ref = useRef(null);
  const raf = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function handleMove(e) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const force = (1 - dist / radius);
        target.current.x = dx * force * strength;
        target.current.y = dy * force * strength;
      } else {
        target.current.x = 0;
        target.current.y = 0;
      }
    }

    function handleLeave() {
      target.current.x = 0;
      target.current.y = 0;
    }

    function tick() {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12);
      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      raf.current = requestAnimationFrame(tick);
    }

    window.addEventListener('mousemove', handleMove, { passive: true });
    el.addEventListener('mouseleave', handleLeave, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(raf.current);
      el.style.transform = '';
    };
  }, [strength, radius]);

  return ref;
}

/**
 * useScrollVelocity — returns the current scroll velocity so
 * sections can scale/skew/blur based on how fast you're scrolling.
 */
export function useScrollVelocity() {
  const velocity = useRef(0);
  const lastY = useRef(window.scrollY);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    function onScroll() {
      const now = performance.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        velocity.current = (window.scrollY - lastY.current) / dt;
        lastY.current = window.scrollY;
        lastTime.current = now;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return velocity;
}
