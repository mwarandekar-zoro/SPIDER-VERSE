/**
 * WebStrandCanvas — draws thin animated silk lines from the cursor
 * to nearby interactive elements, like you're shooting webs at them.
 *
 * Mounts a full-page canvas as a fixed overlay (z-index 9990) and
 * uses requestAnimationFrame + DOM queries to find buttons/links
 * within `attractRadius` pixels. Runs entirely in vanilla JS — no
 * React re-renders per frame.
 */
import { useEffect, useRef } from 'react';

const ATTRACT_RADIUS = 200;   // px — how far a strand extends
const MAX_STRANDS = 6;        // cap to avoid too much visual noise
const STRAND_ALPHA = 0.35;    // opacity of strands

export default function WebStrandCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let mouse = { x: -9999, y: -9999 };
    let raf;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function onMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    window.addEventListener('mousemove', onMove, { passive: true });

    function getInteractiveEls() {
      return Array.from(
        document.querySelectorAll('button, a, [role="button"], .magnetic-target')
      );
    }

    function getCenter(el) {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const primary = getComputedStyle(document.documentElement)
        .getPropertyValue('--universe-primary').trim() || '#b026ff';

      const els = getInteractiveEls();

      // Sort by distance, take closest MAX_STRANDS
      const nearby = els
        .map(el => {
          const c = getCenter(el);
          const dx = mouse.x - c.x;
          const dy = mouse.y - c.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return { el, c, dist };
        })
        .filter(({ dist }) => dist < ATTRACT_RADIUS)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, MAX_STRANDS);

      for (const { c, dist } of nearby) {
        const force = 1 - dist / ATTRACT_RADIUS;   // 0..1
        const alpha = STRAND_ALPHA * force;

        // Slight curve: control point midway, pulled perpendicular
        const mx = (mouse.x + c.x) / 2 + (c.y - mouse.y) * 0.12 * force;
        const my = (mouse.y + c.y) / 2 + (mouse.x - c.x) * 0.12 * force;

        const grad = ctx.createLinearGradient(mouse.x, mouse.y, c.x, c.y);
        grad.addColorStop(0, primary + '00');
        grad.addColorStop(0.4, primary + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
        grad.addColorStop(1, primary + '44');

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.9 + force * 1.2;
        ctx.shadowColor = primary;
        ctx.shadowBlur = 6 * force;
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.quadraticCurveTo(mx, my, c.x, c.y);
        ctx.stroke();

        // Droplet at target end
        ctx.beginPath();
        ctx.arc(c.x, c.y, 2.5 * force, 0, Math.PI * 2);
        ctx.fillStyle = primary;
        ctx.globalAlpha = alpha * 1.5;
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9990,
      }}
    />
  );
}
