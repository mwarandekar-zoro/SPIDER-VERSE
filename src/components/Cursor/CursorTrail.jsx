import { useEffect, useRef } from 'react';

const TRAIL_COUNT = 4;
const LERP_SPEEDS = [0.28, 0.18, 0.12, 0.08];

/**
 * Enhanced CursorTrail: draws a glowing, organic spider-web silk line connecting
 * the cursor target to trailing dots using a zero-rerender <canvas> overlay.
 * Dynamic suit primary color reactive!
 */
export default function CursorTrail({ target }) {
  const canvasRef = useRef(null);
  const dotRefs = useRef([]);
  const positions = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: target.current.x, y: target.current.y }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let frame;
    function loop() {
      const primary = getComputedStyle(document.documentElement)
        .getPropertyValue('--universe-primary').trim() || '#b026ff';

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update positions
      positions.current.forEach((pos, i) => {
        const speed = LERP_SPEEDS[i] ?? 0.1;
        const source = i === 0 ? target.current : positions.current[i - 1];
        pos.x += (source.x - pos.x) * speed;
        pos.y += (source.y - pos.y) * speed;

        const el = dotRefs.current[i];
        if (el) el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      });

      // Draw web silk thread connecting cursor target to trail dots
      ctx.save();
      ctx.strokeStyle = primary;
      ctx.shadowColor = primary;
      ctx.shadowBlur = 8;
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.45;
      ctx.beginPath();
      ctx.moveTo(target.current.x, target.current.y);

      positions.current.forEach((pos) => {
        ctx.lineTo(pos.x, pos.y);
      });
      ctx.stroke();
      ctx.restore();

      frame = requestAnimationFrame(loop);
    }
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <>
      {/* Web Silk Thread Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9996,
        }}
      />

      {/* Trailing Dots */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotRefs.current[i] = el)}
          className="custom-cursor-trail-dot"
          style={{ opacity: 1 - i * 0.22, transform: `scale(${1 - i * 0.15})` }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
