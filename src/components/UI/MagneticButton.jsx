/**
 * MagneticButton — a button / wrapper that subtly pulls toward
 * the cursor when it hovers nearby, snapping back on leave.
 *
 * Usage:
 *   <MagneticButton strength={0.35} radius={90}>
 *     <button ...>Click me</button>
 *   </MagneticButton>
 */
import { useMagneticElement } from '../../hooks/useMotion';

export default function MagneticButton({
  children,
  strength = 0.35,
  radius = 90,
  style = {},
  className = '',
}) {
  const ref = useMagneticElement({ strength, radius });

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-block', ...style }}
    >
      {children}
    </span>
  );
}
