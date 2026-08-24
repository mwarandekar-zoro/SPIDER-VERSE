import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { universes } from '../../data/universes';

/**
 * Base lighting rig, now with lighting transitions (section 16
 * item): the key and rim light colors ease toward the active
 * universe's theme colors whenever it changes, tying the whole
 * scene's mood to wherever the user has travelled. Defaults back
 * to the signature void colors when no universe is active.
 *
 * `previewUniverseId` is the lighter-weight sibling of
 * `activeUniverseId`: activeUniverseId only changes after a full
 * "Explore Universe" transition commits (Environment's city cubes
 * are gated on it too), but selecting a character in the explorer —
 * without leaving the multiverse view — should still tint the
 * lighting toward that character's suit colors. A fully active
 * universe always wins if both are set.
 */
export default function Lighting({ activeUniverseId = null, previewUniverseId = null }) {
  const keyLightRef = useRef();
  const rimLightRef = useRef();

  const effectiveUniverseId = activeUniverseId ?? previewUniverseId;

  useEffect(() => {
    const universe = effectiveUniverseId
      ? universes.find((u) => u.id === effectiveUniverseId)
      : null;
    const keyColor = new THREE.Color(universe ? universe.theme.primary : '#b026ff');
    const rimColor = new THREE.Color(universe ? universe.theme.secondary : '#00f0ff');

    if (keyLightRef.current) {
      gsap.to(keyLightRef.current.color, {
        r: keyColor.r,
        g: keyColor.g,
        b: keyColor.b,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    }
    if (rimLightRef.current) {
      gsap.to(rimLightRef.current.color, {
        r: rimColor.r,
        g: rimColor.g,
        b: rimColor.b,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    }
  }, [effectiveUniverseId]);

  return (
    <>
      {/* Low ambient so the void reads as dim, not lit like a product shot */}
      <ambientLight intensity={0.25} color="#4a3d66" />

      {/* Key light: eases toward the active universe's primary color */}
      <directionalLight ref={keyLightRef} position={[4, 6, 5]} intensity={0.8} color="#b026ff" />

      {/* Rim/fill light: eases toward the active universe's secondary color */}
      <pointLight ref={rimLightRef} position={[-6, -2, -4]} intensity={0.6} color="#00f0ff" distance={20} />
    </>
  );
}
