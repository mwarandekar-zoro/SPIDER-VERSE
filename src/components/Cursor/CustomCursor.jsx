import { useEffect, useRef, useCallback } from 'react';
import { useCursor } from './CursorContext';
import { animateCursorVariant } from '../../animations/cursorAnimations';
import { useResponsive } from '../../hooks/useResponsive';
import { playSound } from '../../utils/audio';
import CursorTrail from './CursorTrail';

const VARIANT_LABELS = {
  default: '',
  character: 'EXPLORE',
  universe: 'ENTER',
  button: '→',
};

// ─────────────────────────────────────────────────────────────
// Upgraded Web-shoot particle burst & dynamic silk thread on click.
// Spawns radiating web strands, expanding shockwave rings,
// and glowing web-fluid droplets in the active suit primary color.
// Always plays the web-shooting THWIP sound effect on click!
// ─────────────────────────────────────────────────────────────
function useClickBurst(canvasRef, targetRef) {
  const particles = useRef([]);
  const rings = useRef([]);
  const frameRef = useRef(null);
  const isRunning = useRef(false);

  const spawnBurst = useCallback((x, y) => {
    // Play web shooter THWIP sound effect on every click
    playSound('web', { volume: 0.45 });

    const primary = getComputedStyle(document.documentElement)
      .getPropertyValue('--universe-primary').trim() || '#b026ff';
    const secondary = getComputedStyle(document.documentElement)
      .getPropertyValue('--universe-secondary').trim() || '#00f0ff';

    // Expanding shockwave web ring
    rings.current.push({
      x, y,
      radius: 4,
      maxRadius: 42 + Math.random() * 15,
      life: 1.0,
      decay: 0.04,
      color: primary,
    });

    // 12 radiating web rays + droplets
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (i * Math.PI * 2) / count + (Math.random() - 0.5) * 0.25;
      const speed = 4 + Math.random() * 5;
      const length = 20 + Math.random() * 30;
      particles.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length,
        life: 1.0,
        decay: 0.035 + Math.random() * 0.02,
        color: i % 2 === 0 ? primary : secondary,
        width: 1.5 + Math.random() * 1.5,
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

    // Update & draw shockwave rings
    rings.current = rings.current.filter((r) => r.life > 0);
    for (const r of rings.current) {
      ctx.save();
      ctx.globalAlpha = r.life * 0.8;
      ctx.strokeStyle = r.color;
      ctx.lineWidth = 1.8 * r.life;
      ctx.shadowColor = r.color;
      ctx.shadowBlur = 10 * r.life;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      r.radius += (r.maxRadius - r.radius) * 0.18;
      r.life -= r.decay;
    }

    // Update & draw web strands
    particles.current = particles.current.filter((p) => p.life > 0);
    for (const p of particles.current) {
      ctx.save();
      ctx.globalAlpha = p.life * 0.9;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = p.width * p.life;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10 * p.life;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.vx * (p.length / 5), p.y + p.vy * (p.length / 5));
      ctx.stroke();

      // Web fluid droplet dot at head
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x + p.vx * (p.length / 5), p.y + p.vy * (p.length / 5), p.width * p.life * 0.9, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.88;
      p.vy *= 0.88;
      p.life -= p.decay;
    }

    if (particles.current.length > 0 || rings.current.length > 0) {
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
  useClickBurst(burstCanvasRef, target);

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

      spiderPos.current.x += (target.current.x - spiderPos.current.x) * 0.38;
      spiderPos.current.y += (target.current.y - spiderPos.current.y) * 0.38;

      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.18;

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
  const isInteractive = variant !== 'default';

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

      {/* Custom Spider Cursor with Spider-Sense Warning Arcs */}
      <div ref={spiderRef} className="custom-cursor-spider" aria-hidden="true">
        {/* Spider-Sense Warning Arcs (triggers on hover of interactive targets) */}
        <div className={`custom-cursor-spider-sense ${isInteractive ? 'active' : ''}`}>
          <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
            <path d="M 2 8 Q 11 0 20 8" stroke="#ffe600" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
            <path d="M 5 9 Q 11 3 17 9" stroke="#ff2222" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
          </svg>
        </div>

        {/* Upgraded Spider SVG with glowing Spider-Lenses */}
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          {/* Main Abdomen */}
          <ellipse cx="15" cy="18" rx="4" ry="5.2" fill="var(--universe-primary)" />
          {/* Cephalothorax (Head) */}
          <circle cx="15" cy="10" r="3" fill="var(--universe-primary)" />
          
          {/* Glowing Spider-Man Eye Lenses */}
          <ellipse cx="13.8" cy="9.5" rx="0.9" ry="1.4" fill="#ffffff" transform="rotate(-15 13.8 9.5)" />
          <ellipse cx="16.2" cy="9.5" rx="0.9" ry="1.4" fill="#ffffff" transform="rotate(15 16.2 9.5)" />

          {/* 8 Articulated Spider Legs */}
          <g stroke="var(--universe-primary)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 14 Q6 10 3 6" />
            <path d="M12 16.5 Q5 15 2 12" />
            <path d="M12 19.5 Q6 21 3 24" />
            <path d="M12 21 Q7 25 4 28" />

            <path d="M18 14 Q24 10 27 6" />
            <path d="M18 16.5 Q25 15 28 12" />
            <path d="M18 19.5 Q24 21 27 24" />
            <path d="M18 21 Q23 25 26 28" />
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
