import { useEffect, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

const RING_COUNT = 5;
const STRANDS_PER_RING = 8;

/**
 * Cinematic web-burst entrance animation triggered when a Spider-Person
 * is selected. Fires concentric expanding web rings in that character's
 * suit colors, then fades out. Purely decorative — renders for ~1.4s
 * then becomes invisible until the next selection.
 */
export default function SpiderWebBurst({ suitTheme, trigger }) {
  const groupRef = useRef();
  const progressRef = useRef({ scale: 0, opacity: 0 });
  const activeRef = useRef(false);
  const lineRefs = useRef([]);

  const primaryColor = suitTheme?.primary ?? '#b026ff';
  const secondaryColor = suitTheme?.secondary ?? '#00f0ff';

  // Build ring geometries — concentric web rings with radial strands
  const rings = useMemo(() => {
    return Array.from({ length: RING_COUNT }, (_, ri) => ({
      radius: 0.6 + ri * 0.8,
      delay: ri * 0.08,
      color: ri % 2 === 0 ? primaryColor : secondaryColor,
    }));
  }, [primaryColor, secondaryColor]);

  // Trigger animation every time trigger value changes (character selected)
  useEffect(() => {
    if (!trigger) return;
    if (!groupRef.current) return;

    activeRef.current = true;
    progressRef.current.scale = 0;
    progressRef.current.opacity = 0;

    // Kill any running tween first
    gsap.killTweensOf(progressRef.current);

    // Phase 1: burst outward with overshoot
    gsap.timeline()
      .to(progressRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: 'power3.out',
      })
      // Phase 2: hold for a beat
      .to(progressRef.current, {
        scale: 1.3,
        duration: 0.4,
        ease: 'power1.inOut',
      })
      // Phase 3: fade out
      .to(progressRef.current, {
        opacity: 0,
        duration: 0.65,
        ease: 'power2.in',
        onComplete: () => {
          activeRef.current = false;
        },
      });
  }, [trigger]);

  useFrame(() => {
    if (!groupRef.current) return;

    const s = progressRef.current.scale;
    const o = progressRef.current.opacity;
    groupRef.current.scale.setScalar(s);

    lineRefs.current.forEach((line) => {
      if (line?.material) {
        line.material.opacity = o;
      }
    });
  });

  return (
    <group ref={groupRef} scale={0} position={[0, 0, -1]}>
      {rings.map((ring, ri) =>
        Array.from({ length: STRANDS_PER_RING }, (_, si) => {
          const angle = (si / STRANDS_PER_RING) * Math.PI * 2;
          const inner = 0;
          const outer = ring.radius;
          const pts = [
            new THREE.Vector3(Math.cos(angle) * inner, Math.sin(angle) * inner, 0),
            new THREE.Vector3(Math.cos(angle) * outer, Math.sin(angle) * outer, 0),
          ];
          const idx = ri * STRANDS_PER_RING + si;

          return (
            <line
              key={`${ri}-${si}`}
              ref={(el) => (lineRefs.current[idx] = el)}
            >
              <bufferGeometry onUpdate={(geo) => geo.setFromPoints(pts)} />
              <lineBasicMaterial
                color={ring.color}
                transparent
                opacity={0}
                depthWrite={false}
              />
            </line>
          );
        })
      )}
      {/* Concentric ring circles */}
      {rings.map((ring, ri) => {
        const pts = Array.from({ length: 65 }, (_, i) => {
          const a = (i / 64) * Math.PI * 2;
          return new THREE.Vector3(Math.cos(a) * ring.radius, Math.sin(a) * ring.radius, 0);
        });
        const idx = RING_COUNT * STRANDS_PER_RING + ri;

        return (
          <line key={`circle-${ri}`} ref={(el) => (lineRefs.current[idx] = el)}>
            <bufferGeometry onUpdate={(geo) => geo.setFromPoints(pts)} />
            <lineBasicMaterial
              color={ring.color}
              transparent
              opacity={0}
              depthWrite={false}
            />
          </line>
        );
      })}
    </group>
  );
}
