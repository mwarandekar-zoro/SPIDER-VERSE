import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Placeholder portal (torus, per section 47's placeholder strategy)
 * marking the destination universe during a transition. Reads its
 * scale directly from progressRef — the same ref the GSAP timeline
 * in portalAnimations.js writes to — so it never needs its own
 * React state or a duplicate animation driver.
 */
export default function Portal({ position, color = '#b026ff', progressRef }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (!meshRef.current || !progressRef?.current) return;
    const { active, progress } = progressRef.current;

    meshRef.current.rotation.z += delta * (active ? 1.4 : 0.2);

    const travel = Math.sin(Math.min(progress, 1) * Math.PI);
    const scale = active ? 0.6 + travel * 2.4 : 0.001;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1, 0.12, 16, 48]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} toneMapped={false} />
    </mesh>
  );
}
