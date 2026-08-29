import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSmoothMouse } from '../../hooks/useSmoothMouse';
import { PARALLAX_INTENSITY } from '../../utils/constants';
import Glow from '../Effects/Glow';

const DEFAULT_PRIMARY = new THREE.Color('#b026ff');
const DEFAULT_SECONDARY = new THREE.Color('#00f0ff');

export default function PlaceholderCore({ suitTheme }) {
  const meshRef = useRef();
  const innerRef = useRef();
  const shockwaveRef = useRef();
  const materialRef = useRef();
  const smoothMouse = useSmoothMouse();

  const targetColor = useRef(DEFAULT_PRIMARY.clone());
  const currentColor = useRef(DEFAULT_PRIMARY.clone());
  const targetEmissive = useRef(DEFAULT_SECONDARY.clone());
  const currentEmissive = useRef(DEFAULT_SECONDARY.clone());

  const morphSpeed = useRef(0.15);
  const shockwaveScale = useRef(1);
  const shockwaveAlpha = useRef(0);

  // Trigger suit-morph animation on suitTheme change
  useEffect(() => {
    const primaryStr = suitTheme?.primary ?? '#b026ff';
    const secondaryStr = suitTheme?.secondary ?? '#00f0ff';

    targetColor.current.set(primaryStr);
    targetEmissive.current.set(secondaryStr);

    // Burst speed burst for liquid-metal morph feeling
    morphSpeed.current = 1.2;

    // Trigger shockwave expansion
    shockwaveScale.current = 1;
    shockwaveAlpha.current = 0.6;
  }, [suitTheme?.primary, suitTheme?.secondary]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Smoothly settle morphSpeed back to idle rate
    morphSpeed.current = THREE.MathUtils.lerp(morphSpeed.current, 0.15, 0.05);

    // Continuous rotation scaled by morph speed
    meshRef.current.rotation.y += delta * morphSpeed.current;
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * (morphSpeed.current * 1.5);
      innerRef.current.rotation.x += delta * 0.4;
    }

    // Cursor-driven tilt
    const targetTiltX = smoothMouse.current.y * PARALLAX_INTENSITY.character;
    const targetTiltZ = -smoothMouse.current.x * PARALLAX_INTENSITY.character;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetTiltX, 0.1);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetTiltZ, 0.1);

    meshRef.current.position.x = smoothMouse.current.x * PARALLAX_INTENSITY.character * 2;
    meshRef.current.position.y = smoothMouse.current.y * PARALLAX_INTENSITY.character * 2;

    // Smooth color lerp
    currentColor.current.lerp(targetColor.current, 0.08);
    currentEmissive.current.lerp(targetEmissive.current, 0.08);

    if (materialRef.current) {
      materialRef.current.color.copy(currentColor.current);
      materialRef.current.emissive.copy(currentEmissive.current);
    }

    // Shockwave expansion animation
    if (shockwaveRef.current && shockwaveAlpha.current > 0.01) {
      shockwaveScale.current += delta * 4.5;
      shockwaveAlpha.current = THREE.MathUtils.lerp(shockwaveAlpha.current, 0, 0.06);
      shockwaveRef.current.scale.setScalar(shockwaveScale.current);
      shockwaveRef.current.material.opacity = shockwaveAlpha.current;
      shockwaveRef.current.material.color.copy(currentColor.current);
    }
  });

  const currentColorHex = suitTheme?.primary ?? '#b026ff';

  return (
    <>
      <Glow color={currentColorHex} radius={1.8} scale={1.4} intensity={0.15} />

      {/* Main outer morph core */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#b026ff"
          emissive="#7c2ecf"
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>

      {/* Counter-rotating inner core */}
      <mesh ref={innerRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial
          color={currentColorHex}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Suit-Morph Shockwave Expansion Ring */}
      <mesh ref={shockwaveRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial
          color={currentColorHex}
          transparent
          opacity={0}
          wireframe
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

