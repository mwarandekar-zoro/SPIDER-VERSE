import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSmoothMouse } from '../../hooks/useSmoothMouse';
import { useResponsive } from '../../hooks/useResponsive';

const OBJECT_COUNT_BY_QUALITY = { low: 3, medium: 5, high: 7 };

/**
 * Small ambient shapes drifting at varied depths (section 30),
 * each reacting to the cursor with its own intensity (section 31:
 * different depth layers move at different parallax speeds).
 * Count scales with quality tier; rotation and cursor parallax are
 * skipped under prefers-reduced-motion (section 38).
 */
export default function FloatingObjects({ quality = 'high' }) {
  const smoothMouse = useSmoothMouse();
  const { reducedMotion } = useResponsive();
  const meshRefs = useRef([]);
  const objectCount = OBJECT_COUNT_BY_QUALITY[quality] ?? 7;

  const objects = useMemo(
    () =>
      Array.from({ length: objectCount }, () => ({
        position: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8,
          -2 - Math.random() * 10,
        ],
        rotationSpeed: 0.1 + Math.random() * 0.2,
        depthFactor: 0.3 + Math.random() * 0.7, // higher = closer = reacts more to cursor
        scale: 0.15 + Math.random() * 0.25,
      })),
    [objectCount]
  );

  useFrame((state, delta) => {
    objects.forEach((obj, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      if (!reducedMotion) {
        mesh.rotation.x += delta * obj.rotationSpeed;
        mesh.rotation.y += delta * obj.rotationSpeed * 0.7;
      }

      const parallax = reducedMotion ? 0 : obj.depthFactor * 2.0;
      mesh.position.x = obj.position[0] + smoothMouse.current.x * parallax;
      mesh.position.y = obj.position[1] + smoothMouse.current.y * (parallax * 0.7);
    });
  });

  return (
    <group>
      {objects.map((obj, i) => (
        <mesh
          key={i}
          ref={(el) => (meshRefs.current[i] = el)}
          position={obj.position}
          scale={obj.scale}
        >
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#7c2ecf" emissive="#7c2ecf" emissiveIntensity={0.3} wireframe />
        </mesh>
      ))}
    </group>
  );
}
