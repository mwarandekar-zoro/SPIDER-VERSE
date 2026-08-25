import { useEffect, useRef, useCallback } from 'react';
import { useCursor } from './CursorContext';
import { animateCursorVariant } from '../../animations/cursorAnimations';
import { useResponsive } from '../../hooks/useResponsive';
import CursorTrail from './CursorTrail';

const VARIANT_LABELS = {
  default: '',
  character: 'EXPLORE',
  universe: 'ENTER',
  button: '→',
};

// ─────────────────────────────────────────────────────────────
// Web-shoot particle burst on click.
// Spawns 8 thin rays radiating outward from the click point,
// each quickly fading and scaling out — like firing a web.
// All done in vanilla JS on a single <canvas> overlay so it
// NEVER touches React state (no re-renders per particle).
// ─────────────────────────────────────────────────────────────
function useClickBurst(canvasRef) {
  const particles = useRef([]);
  const frameRef = useRef(null);
  const isRunning = useRef(false);

  const spawnBurst = useCallback((x, y) => {
    const primary = getComputedStyle(document.documentElement)
      .getPropertyValue('--universe-primary').trim() || '#b026ff';

    // 8 rays, spread in a full circle + 2 arc strands
    const count = 10;
    for (let i = 0; i < count; i++) {
      const angle = (i * Math.PI * 2) / count + (Math.random() - 0.5) * 0.3;
      const speed = 3.5 + Math.random() * 4;
      const length = 18 + Math.random() * 28;
      particles.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length,
        life: 1.0,
        decay: 0.04 + Math.random() * 0.02,
        color: primary,
        width: 1.5 + Math.random(),
      });
    }

    if (!isRunning.current) {
      isRunning.current = true;
      loop();
    }
  }, []);

  function loop() {
    const canvas = canvasRef.current;
    if (!canvas) { isRunning.current = false; return; }
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current = particles.current.filter((p) => p.life > 0);

    for (const p of particles.current) {
      ctx.save();
      ctx.globalAlpha = p.life * 0.9;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = p.width * p.life;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8 * p.life;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.vx * (p.length / 5), p.y + p.vy * (p.length / 5));
      ctx.stroke();
      ctx.restore();

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.88;
      p.vy *= 0.88;
      p.life -= p.decay;
    }

    if (particles.current.length > 0) {
      frameRef.current = requestAnimationFrame(loop);
    } else {
      isRunning.current = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function handleClick(e) {
      spawnBurst(e.clientX, e.clientY);
    }
    window.addEventListener('pointerdown', handleClick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', handleClick);
      cancelAnimationFrame(frameRef.current);
    };
  }, [spawnBurst, canvasRef]);
}

/**
 * Section 13: a small spider crawls with the cursor, orienting
 * toward whatever direction it's moving; an expanded ring + label
 * appears on hover of interactive elements. Tracks raw pointer
 * position itself (not the normalized -1..1 hooks used by the 3D
 * layer) and smooths it with a manual requestAnimationFrame loop,
 * writing straight to DOM transforms — this updates every frame, so
 * it must never go through React state (section 34).
 *
 * Phase 7: on every click, fires a web-shoot particle burst from
 * the cursor position via a canvas overlay (no React state).
 *
 * Only ever mounted on desktop (see App.jsx) — never rendered on
 * touch devices, per section 13.
 */
export default function CustomCursor() {
  const { variant, label } = useCursor();
  const { reducedMotion } = useResponsive();

  const target = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const spiderPos = useRef({ ...target.current });
  const ringPos = useRef({ ...target.current });
  const angleRef = useRef(0);

  const spiderRef = useRef(null);
  const ringWrapperRef = useRef(null);
  const ringInnerRef = useRef(null);
  const burstCanvasRef = useRef(null);

  // Web-shoot burst canvas
  useClickBurst(burstCanvasRef);

  useEffect(() => {
    document.body.classList.add('custom-cursor-active');
    return () => document.body.classList.remove('custom-cursor-active');
  }, []);

  useEffect(() => {
    function handleMove(e) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    }
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  useEffect(() => {
    let frame;
    function loop() {
      const prevX = spiderPos.current.x;
      const prevY = spiderPos.current.y;

      spiderPos.current.x += (target.current.x - spiderPos.current.x) * 0.35;
      spiderPos.current.y += (target.current.y - spiderPos.current.y) * 0.35;

      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.16;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.16;

      const dx = spiderPos.current.x - prevX;
      const dy = spiderPos.current.y - prevY;
      if (dx * dx + dy * dy > 0.4) {
        angleRef.current = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      }

      if (spiderRef.current) {
        spiderRef.current.style.transform = `translate3d(${spiderPos.current.x}px, ${spiderPos.current.y}px, 0) rotate(${angleRef.current}deg)`;
      }
      if (ringWrapperRef.current) {
        ringWrapperRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      frame = requestAnimationFrame(loop);
    }
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    animateCursorVariant(ringInnerRef.current, variant);
  }, [variant]);

  const displayLabel = label || VARIANT_LABELS[variant] || '';

  return (
    <>
      {/* Web-shoot particle burst canvas */}
      <canvas
        ref={burstCanvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />

      {!reducedMotion && <CursorTrail target={target} />}

      <div ref={spiderRef} className="custom-cursor-spider" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <ellipse cx="13" cy="15" rx="3.2" ry="4.2" fill="var(--color-rift)" />
          <circle cx="13" cy="8.5" r="2.3" fill="var(--color-rift)" />
          <g stroke="var(--color-rift)" strokeWidth="1.1" strokeLinecap="round">
            <path d="M10.5 12 L3 8" />
            <path d="M10.5 14 L2 13" />
            <path d="M10.5 16.5 L3 18" />
            <path d="M10.5 18.5 L4.5 22.5" />
            <path d="M15.5 12 L23 8" />
            <path d="M15.5 14 L24 13" />
            <path d="M15.5 16.5 L23 18" />
            <path d="M15.5 18.5 L21.5 22.5" />
          </g>
        </svg>
      </div>

      <div ref={ringWrapperRef} className="custom-cursor-ring-wrapper" aria-hidden="true">
        <div ref={ringInnerRef} className="custom-cursor-ring">
          {displayLabel && <span className="custom-cursor-label">{displayLabel}</span>}
        </div>
      </div>
    </>
  );
}
