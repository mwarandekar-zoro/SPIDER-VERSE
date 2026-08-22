import { useEffect, useMemo, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { universes } from '../../data/universes';

const VOID_COLOR = '#08070c';

/**
 * Renders the active universe's placeholder "city" (section 44:
 * City = cubes, replaced with real environment models later) and
 * controls scene fog to give each universe a distinct atmosphere
 * (section 17). Only appears after a transition commits the swap
 * — which happens at the transition's blackout midpoint, so the
 * change itself is never visible.
 */
export default function Environment({ activeUniverseId }) {
  const { scene } = useThree();
  const groupRef = useRef();

  const universe = activeUniverseId ? universes.find((u) => u.id === activeUniverseId) : null;

  useEffect(() => {
    const fogColor = new THREE.Color(universe ? universe.theme.primary : VOID_COLOR);
    if (universe) fogColor.lerp(new THREE.Color('#000000'), 0.65); // keep it moody, not neon-bright
    scene.fog = new THREE.Fog(fogColor, universe ? 6 : 8, universe ? 26 : 22);
    scene.background = new THREE.Color(VOID_COLOR); // canvas clear color always stays void-black
  }, [activeUniverseId, scene, universe]);

  const cubes = useMemo(() => {
    if (!universe) return [];
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 5 + (i % 3);
      return {
        position: [Math.cos(angle) * radius, -1.5 + (i % 3) * 0.6, Math.sin(angle) * radius - 4],
        color: i % 2 === 0 ? universe.theme.primary : universe.theme.secondary,
        height: 1 + (i % 3),
        scale: 0.6 + (i % 3) * 0.3,
      };
    });
  }, [universe]);

  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.02;
  });

  if (!universe) return null;

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position} scale={cube.scale}>
          <boxGeometry args={[1, cube.height, 1]} />
          <meshStandardMaterial color={cube.color} emissive={cube.color} emissiveIntensity={0.25} />
        </mesh>
      ))}
    </group>
  );
}
