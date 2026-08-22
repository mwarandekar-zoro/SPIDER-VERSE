import { useEffect, useRef } from 'react';

const TRAIL_COUNT = 3;
const LERP_SPEEDS = [0.22, 0.14, 0.09];

/**
 * A few faint dots trailing the cursor with increasing lag —
 * additive polish alongside CustomCursor's dot/ring. Runs its own
 * rAF loop reading the shared `target` ref (owned by whoever renders
 * this), so it never touches React state either.
 */
export default function CursorTrail({ target }) {
  const dotRefs = useRef([]);
  const positions = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: target.current.x, y: target.current.y }))
  );

  useEffect(() => {
    let frame;
    function loop() {
      positions.current.forEach((pos, i) => {
        const speed = LERP_SPEEDS[i] ?? 0.1;
        const source = i === 0 ? target.current : positions.current[i - 1];
        pos.x += (source.x - pos.x) * speed;
        pos.y += (source.y - pos.y) * speed;
        const el = dotRefs.current[i];
        if (el) el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      });
      frame = requestAnimationFrame(loop);
    }
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <>
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotRefs.current[i] = el)}
          className="custom-cursor-trail-dot"
          style={{ opacity: 1 - i * 0.28 }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
