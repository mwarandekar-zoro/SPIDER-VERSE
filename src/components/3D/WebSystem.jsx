import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSmoothMouse } from '../../hooks/useSmoothMouse';
import { useResponsive } from '../../hooks/useResponsive';

const SEGMENTS = 24;
const STRAND_COUNT_BY_QUALITY = { low: 4, medium: 7, high: 10 };

/**
 * The signature web effect (section 28). Built from real Three.js
 * curves + line geometry — not a flat CSS web — so it can live in
 * the same depth-aware scene as everything else and react to the
 * cursor in 3D space.
 *
 * Strand count scales with quality tier (section 36/37). Ambient
 * drift and cursor lean are skipped under prefers-reduced-motion
 * (section 38) — the web still renders, it just holds still.
 */
export default function WebSystem({ quality = 'high' }) {
  const groupRef = useRef();
  const lineRefs = useRef([]);
  const smoothMouse = useSmoothMouse();
  const { reducedMotion } = useResponsive();
  const strandCount = STRAND_COUNT_BY_QUALITY[quality] ?? 10;

  const strands = useMemo(() => {
    return Array.from({ length: strandCount }, (_, i) => {
      const angle = (i / strandCount) * Math.PI * 2;
      const radius = 6 + Math.random() * 2.5;
      const start = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.6,
        -6 - Math.random() * 4
      );
      const end = new THREE.Vector3(0, 0, -3);
      return { start, end, angle };
    });
  }, [strandCount]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    strands.forEach((strand, i) => {
      const line = lineRefs.current[i];
      if (!line) return;

      const drift = reducedMotion ? 0 : Math.sin(t * 0.4 + strand.angle) * 0.4;
      const cursorX = reducedMotion ? 0 : smoothMouse.current.x * 1.5;
      const cursorY = reducedMotion ? 0 : smoothMouse.current.y * 1.5;

      const control = new THREE.Vector3(
        (strand.start.x + strand.end.x) / 2 + cursorX,
        (strand.start.y + strand.end.y) / 2 + cursorY + drift,
        (strand.start.z + strand.end.z) / 2
      );

      const curve = new THREE.QuadraticBezierCurve3(strand.start, control, strand.end);
      const points = curve.getPoints(SEGMENTS);
      line.geometry.setFromPoints(points);
    });

    groupRef.current.rotation.y = reducedMotion ? 0 : smoothMouse.current.x * 0.05;
  });

  return (
    <group ref={groupRef}>
      {strands.map((strand, i) => (
        <line key={i} ref={(el) => (lineRefs.current[i] = el)}>
          <bufferGeometry />
          <lineBasicMaterial color="#7c2ecf" transparent opacity={0.35} />
        </line>
      ))}
    </group>
  );
}
