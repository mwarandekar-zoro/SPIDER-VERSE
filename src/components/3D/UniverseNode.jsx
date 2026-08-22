import { memo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useCursor } from '../Cursor/CursorContext';
import { useResponsive } from '../../hooks/useResponsive';

/**
 * A single node on the multiverse map (section 14/15). Floats,
 * rotates, glows, and grows on hover; reports hover/click up to
 * the caller rather than owning any app-level state itself, so
 * the 3D layer and UI layer stay loosely coupled (section 5).
 *
 * Wrapped in React.memo (section 36) since 5 of these render in a
 * loop and most re-render triggers (e.g. hovering a character card
 * elsewhere) have nothing to do with any given node.
 */
function UniverseNode({ universe, isHovered, isSelected, onHover, onSelect }) {
  const meshRef = useRef();
  const [localHover, setLocalHover] = useState(false);
  const { setCursor } = useCursor();
  const { reducedMotion } = useResponsive();
  const active = isHovered || localHover;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle float + rotation — skipped under prefers-reduced-motion
    // (section 38), the node still scales on hover/selection either way
    if (!reducedMotion) {
      meshRef.current.position.y =
        universe.position[1] + Math.sin(t * 0.6 + universe.position[0]) * 0.15;
      meshRef.current.rotation.y += 0.004;
      meshRef.current.rotation.x += 0.002;
    }

    const targetScale = isSelected ? 1.35 : active ? 1.2 : 1;
    meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.15);
  });

  function handlePointerOver(event) {
    event.stopPropagation();
    setLocalHover(true);
    onHover?.(universe.id);
    setCursor('universe', 'ENTER');
  }

  function handlePointerOut(event) {
    event.stopPropagation();
    setLocalHover(false);
    onHover?.(null);
    setCursor('default');
  }

  return (
    <group position={universe.position}>
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(universe.id);
        }}
      >
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          color={universe.theme.primary}
          emissive={universe.theme.primary}
          emissiveIntensity={active ? 1.1 : 0.6}
          toneMapped={false}
        />
      </mesh>

      {/* Soft outer glow shell */}
      <mesh scale={2.2}>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshBasicMaterial
          color={universe.theme.primary}
          transparent
          opacity={active ? 0.16 : 0.08}
          depthWrite={false}
        />
      </mesh>

      {active && (
        <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#f2f0ea',
              background: 'rgba(8, 7, 12, 0.85)',
              border: `1px solid ${universe.theme.primary}`,
              borderRadius: '4px',
              padding: '6px 10px',
              whiteSpace: 'nowrap',
              transform: 'translateY(-38px)',
            }}
          >
            {universe.name}
            <div style={{ color: universe.theme.primary, marginTop: '2px' }}>
              {universe.title}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default memo(UniverseNode);
