/**
 * UniverseOverlay — full-screen canvas effects for each aesthetic.
 *
 * Mounts a fixed canvas (z-index 9800) and uses rAF to render
 * aesthetic-specific effects that CSS alone can't produce:
 *
 *  punk    → heavy grain + periodic RGB glitch flashes
 *  cartoon → animated halftone dots + impact speed-lines on mount
 *  noir    → slow film grain + dark radial vignette
 *  hud     → scanlines + corner HUD brackets + LYLA system text
 *  india   → warm gold floating dust particles + mandala corner
 *
 * Renders nothing (and returns null) for "default" or reduced motion.
 */
import { useEffect, useRef } from 'react';

/* ── Helpers ── */
function lerp(a, b, t) { return a + (b - a) * t; }
function rand(min, max) { return Math.random() * (max - min) + min; }

/* ── Grain texture (shared between punk & noir) ── */
function drawGrain(ctx, w, h, intensity, tinted = false) {
  const imageData = ctx.createImageData(w, h);
  const d = imageData.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = (Math.random() * 2 - 1) * intensity * 255;
    d[i]     = tinted ? v * 0.6 : v;   // R
    d[i + 1] = tinted ? v * 0.4 : v;   // G
    d[i + 2] = tinted ? v * 0.2 : v;   // B
    d[i + 3] = Math.abs(v) * 0.9;       // A
  }
  ctx.putImageData(imageData, 0, 0);
}

/* ── PUNK renderer ── */
function renderPunk(ctx, w, h, frame) {
  ctx.clearRect(0, 0, w, h);

  // Heavy grain
  drawGrain(ctx, w, h, 0.11);

  // Periodic RGB horizontal glitch bars
  if (frame % 18 === 0 && Math.random() < 0.6) {
    const numBars = Math.floor(rand(1, 4));
    for (let b = 0; b < numBars; b++) {
      const y   = rand(0, h);
      const bH  = rand(2, 12);
      const off = rand(-30, 30);
      ctx.save();
      ctx.globalAlpha = rand(0.1, 0.35);
      ctx.fillStyle = Math.random() < 0.5 ? '#ff0033' : '#00eeff';
      ctx.fillRect(off, y, w, bH);
      ctx.restore();
    }
  }

  // Occasional full-frame channel-split flash
  if (frame % 55 === 0 && Math.random() < 0.4) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#ff0033';
    ctx.fillRect(3, 0, w, h);
    ctx.globalAlpha = 0.10;
    ctx.fillStyle = '#0033ff';
    ctx.fillRect(-3, 0, w, h);
    ctx.restore();
  }
}

/* ── NOIR renderer ── */
function renderNoir(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);

  // Slow, subtle grain
  drawGrain(ctx, w, h, 0.06);

  // Heavy radial vignette
  const vx = w / 2, vy = h / 2;
  const rad = Math.max(w, h) * 0.7;
  const vignette = ctx.createRadialGradient(vx, vy, rad * 0.35, vx, vy, rad);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.72)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
}

/* ── HUD renderer ── */
function renderHUD(ctx, w, h, frame, hudState) {
  ctx.clearRect(0, 0, w, h);

  // Scanlines (drawn lightly — CSS also has them but canvas ones pulse)
  ctx.save();
  for (let y = 0; y < h; y += 3) {
    ctx.globalAlpha = 0.045 + Math.sin(frame * 0.03 + y * 0.01) * 0.015;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, y, w, 1);
  }
  ctx.restore();

  // Corner HUD brackets
  const bSize = 22, bW = 1.5, pad = 16;
  ctx.save();
  ctx.strokeStyle = 'rgba(0,240,255,0.55)';
  ctx.lineWidth = bW;
  ctx.shadowColor = '#00f0ff';
  ctx.shadowBlur = 6;
  const corners = [
    [pad,      pad,       1,  1],
    [w - pad,  pad,      -1,  1],
    [pad,      h - pad,   1, -1],
    [w - pad,  h - pad,  -1, -1],
  ];
  for (const [cx, cy, dx, dy] of corners) {
    ctx.beginPath();
    ctx.moveTo(cx + dx * bSize, cy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx, cy + dy * bSize);
    ctx.stroke();
  }
  ctx.restore();

  // LYLA system text flicker (top-right)
  if (Math.floor(frame / 40) % 3 !== 1) {
    const lines = [
      `SYS: SPIDER-SOCIETY v2099.${(frame % 9999).toString().padStart(4, '0')}`,
      `NET: MULTIVERSE UPLINK ACTIVE`,
      `TIME BREACH INDEX: ${(Math.sin(frame * 0.02) * 50 + 50).toFixed(1)}%`,
    ];
    ctx.save();
    ctx.font = '9px "Share Tech Mono", monospace';
    ctx.fillStyle = `rgba(0,240,255,${0.35 + Math.sin(frame * 0.04) * 0.1})`;
    ctx.textAlign = 'right';
    lines.forEach((l, i) => ctx.fillText(l, w - 20, 22 + i * 14));
    ctx.restore();
  }

  // Horizontal data sweep line
  const sweepY = ((frame * 1.2) % h);
  const sweepGrad = ctx.createLinearGradient(0, sweepY - 2, 0, sweepY + 2);
  sweepGrad.addColorStop(0, 'transparent');
  sweepGrad.addColorStop(0.5, 'rgba(0,240,255,0.07)');
  sweepGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = sweepGrad;
  ctx.fillRect(0, sweepY - 2, w, 4);
}

/* ── CARTOON renderer ── */
function renderCartoon(ctx, w, h, frame, cartoonState) {
  ctx.clearRect(0, 0, w, h);

  // Speed lines burst from center on first ~60 frames
  if (cartoonState.birth && frame - cartoonState.birth < 50) {
    const age = frame - cartoonState.birth;
    const alpha = Math.max(0, (50 - age) / 50) * 0.25;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = 'rgba(255,200,100,0.8)';
    ctx.lineWidth = 1.2;
    const cx = w / 2, cy = h / 2;
    const numLines = 28;
    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * Math.PI * 2;
      const inner = 80 + age * 8;
      const outer = 300 + age * 12;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
      ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
      ctx.stroke();
    }
    ctx.restore();
  }
}

/* ── INDIA renderer ── */
function renderIndia(ctx, w, h, frame, particles) {
  ctx.clearRect(0, 0, w, h);

  // Update + draw warm gold dust particles
  for (const p of particles) {
    p.y -= p.vy;
    p.x += Math.sin(frame * 0.01 + p.phase) * 0.4;
    p.life -= 0.003;
    if (p.life <= 0 || p.y < -10) {
      p.x    = rand(0, w);
      p.y    = h + rand(0, 20);
      p.life = rand(0.4, 1);
      p.vy   = rand(0.3, 1.1);
      p.r    = rand(1.5, 3.5);
      p.phase = rand(0, Math.PI * 2);
    }

    ctx.save();
    ctx.globalAlpha = p.life * 0.65;
    const hue = rand(35, 50);       // gold to amber
    ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
    ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Subtle mandala ring at bottom-right corner
  const mx = w - 60, my = h - 60;
  const petals = 8;
  ctx.save();
  ctx.globalAlpha = 0.08 + Math.sin(frame * 0.015) * 0.03;
  ctx.strokeStyle = '#ffb300';
  ctx.lineWidth = 0.8;
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2;
    const r = 40;
    ctx.beginPath();
    ctx.arc(
      mx + Math.cos(angle) * 16,
      my + Math.sin(angle) * 16,
      r * 0.45, 0, Math.PI * 2
    );
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(mx, my, 48, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}


/* ── Main component ── */
const INDIA_PARTICLE_COUNT = 80;

export default function UniverseOverlay({ aesthetic }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({});

  useEffect(() => {
    if (!aesthetic || aesthetic === 'default') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    let raf;

    // Per-aesthetic setup
    if (aesthetic === 'india') {
      stateRef.current.particles = Array.from({ length: INDIA_PARTICLE_COUNT }, () => ({
        x: rand(0, canvas.width),
        y: rand(0, canvas.height),
        vy: rand(0.3, 1.1),
        r:  rand(1.5, 3.5),
        life: rand(0, 1),
        phase: rand(0, Math.PI * 2),
      }));
    }
    if (aesthetic === 'cartoon') {
      stateRef.current.birth = frame;
    }
    if (aesthetic === 'hud') {
      stateRef.current.hudState = {};
    }

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-init india particles on resize
      if (aesthetic === 'india') {
        stateRef.current.particles = Array.from({ length: INDIA_PARTICLE_COUNT }, () => ({
          x: rand(0, canvas.width),
          y: rand(0, canvas.height),
          vy: rand(0.3, 1.1),
          r:  rand(1.5, 3.5),
          life: rand(0, 1),
          phase: rand(0, Math.PI * 2),
        }));
      }
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function tick() {
      frame++;
      const w = canvas.width, h = canvas.height;

      switch (aesthetic) {
        case 'punk':    renderPunk(ctx, w, h, frame); break;
        case 'noir':    renderNoir(ctx, w, h); break;
        case 'hud':     renderHUD(ctx, w, h, frame, stateRef.current.hudState); break;
        case 'cartoon': renderCartoon(ctx, w, h, frame, stateRef.current); break;
        case 'india':   renderIndia(ctx, w, h, frame, stateRef.current.particles); break;
        default: ctx.clearRect(0, 0, w, h);
      }

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [aesthetic]);

  if (!aesthetic || aesthetic === 'default') return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9800,
        opacity: aesthetic === 'default' ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    />
  );
}
