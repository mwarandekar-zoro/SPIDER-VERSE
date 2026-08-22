import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSmoothMouse } from '../../hooks/useSmoothMouse';
import { PARALLAX_INTENSITY } from '../../utils/constants';
import Glow from '../Effects/Glow';

/**
 * A placeholder primitive (icosahedron "core") standing in for the
 * future character/web-emblem centerpiece, per the spec's
 * placeholder-first strategy (section 44/47):
 *   Sphere / Cube / Torus / Plane -> replaced with real assets later.
 *
 * It rotates continuously and tilts toward the cursor at the
 * "character" parallax intensity, so the wow-factor cursor
 * reaction (section 51) is provable before any real model exists.
 */
export default function PlaceholderCore() {
  const meshRef = useRef();
  const smoothMouse = useSmoothMouse();

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Continuous idle rotation
    meshRef.current.rotation.y += delta * 0.15;

    // Cursor-driven tilt, lerped via useSmoothMouse — never teleported
    const targetTiltX = smoothMouse.current.y * PARALLAX_INTENSITY.character;
    const targetTiltZ = -smoothMouse.current.x * PARALLAX_INTENSITY.character;
    meshRef.current.rotation.x = targetTiltX;
    meshRef.current.rotation.z = targetTiltZ;

    // Subtle position drift so it feels alive, not just spinning in place
    meshRef.current.position.x = smoothMouse.current.x * PARALLAX_INTENSITY.character * 2;
    meshRef.current.position.y = smoothMouse.current.y * PARALLAX_INTENSITY.character * 2;
  });

  return (
    <>
      <Glow color="#b026ff" radius={1.6} scale={1.35} intensity={0.1} />
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial
          color="#b026ff"
          emissive="#7c2ecf"
          emissiveIntensity={0.4}
          wireframe
        />
      </mesh>
    </>
  );
}
