import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSmoothMouse } from '../../hooks/useSmoothMouse';
import { PARALLAX_INTENSITY, QUALITY_SETTINGS } from '../../utils/constants';

/**
 * Ambient particle field sized by quality tier (section 29).
 * Particles drift slowly and shift with the cursor — the void
 * feels inhabited without any expensive geometry.
 * The whole Points object translates (not individual particles)
 * so cursor reaction is a single cheap transform (section 51).
 */
export default function Particles({ quality = 'high' }) {
  const pointsRef = useRef();
  const smoothMouse = useSmoothMouse();
  const count = QUALITY_SETTINGS[quality]?.particleCount ?? 900;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22 - 3;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Ambient drift — was 0.01 (a full rotation every ~10 minutes,
    // effectively imperceptible); bumped up so the field visibly turns.
    pointsRef.current.rotation.y += delta * 0.035;
    pointsRef.current.rotation.x += delta * 0.008;

    // Gentle vertical bob layered on top of the rotation and cursor
    // parallax, so the field breathes even when the cursor is still.
    const bob = Math.sin(state.clock.elapsedTime * 0.2) * 0.4;

    const intensity = 1.2;
    pointsRef.current.position.x = -smoothMouse.current.x * intensity;
    pointsRef.current.position.y = -smoothMouse.current.y * (intensity * 0.7) + bob;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#b8b4c4"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
