import { Suspense, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Camera from './Camera';
import Lighting from './Lighting';
import PlaceholderCore from './PlaceholderCore';
import Particles from './Particles';
import WebSystem from './WebSystem';
import UniverseNode from './UniverseNode';
import Environment from './Environment';
import TransitionController from './TransitionController';
import FloatingObjects from './FloatingObjects';
import Nebula from './Nebula';
import { universes } from '../../data/universes';
import { CAMERA_DEFAULTS, QUALITY_SETTINGS } from '../../utils/constants';
import { scaledPosition } from '../../utils/mapLayout';

/**
 * Faint static lines connecting each universe node back to the
 * central hub, echoing the ASCII multiverse-map diagram in the
 * spec (section 14). Geometry is computed once with useMemo since
 * node positions don't change — no need for per-frame updates here.
 * Uses scaledPosition() so lines always meet the (visually spread
 * wider) rendered node position, not the raw data value.
 */
function NodeConnections() {
  const lines = useMemo(
    () =>
      universes.map((u) => [
        new THREE.Vector3(0, 0, -2),
        new THREE.Vector3(...scaledPosition(u.position)),
      ]),
    []
  );

  return (
    <group>
      {lines.map((points, i) => (
        <line key={i}>
          <bufferGeometry onUpdate={(geo) => geo.setFromPoints(points)} />
          <lineBasicMaterial color="#8f7fb0" transparent opacity={0.35} />
        </line>
      ))}
    </group>
  );
}

/**
 * The single persistent <Canvas>. Mounted once at the App root and
 * kept behind the scrolling content (see .canvas-layer in globals.css)
 * so 3D state survives section changes instead of remounting.
 *
 * Nebula, a denser reactive Particles field, and a wider map spread
 * (via scaledPosition) give the void real visual presence instead
 * of reading as mostly empty black — the "crazy multiverse"
 * background the map alone couldn't deliver by itself.
 */
export default function MultiverseScene({
  quality = 'high',
  hoveredUniverseId = null,
  selectedUniverseId = null,
  onHoverUniverse,
  onSelectUniverse,
  activeUniverseId = null,
  isTransitioning = false,
  targetUniverseId = null,
  overlayEl = null,
  onTransitionMidpoint,
  onTransitionComplete,
}) {
  const settings = QUALITY_SETTINGS[quality] ?? QUALITY_SETTINGS.high;
  const progressRef = useRef({ active: false, progress: 0 });

  return (
    <Canvas
      className="canvas-layer"
      dpr={settings.dpr}
      camera={{ position: CAMERA_DEFAULTS.position, fov: CAMERA_DEFAULTS.fov }}
      gl={{ antialias: true, alpha: false }}
    >
      <Camera transitionRef={progressRef} />
      <Lighting activeUniverseId={activeUniverseId} />
      <Environment activeUniverseId={activeUniverseId} />

      <Suspense fallback={null}>
        <Nebula />
        <PlaceholderCore />
        <Particles quality={quality} />
        <WebSystem quality={quality} />
        <FloatingObjects quality={quality} />
        <NodeConnections />

        {universes.map((universe) => (
          <UniverseNode
            key={universe.id}
            universe={{ ...universe, position: scaledPosition(universe.position) }}
            isHovered={hoveredUniverseId === universe.id}
            isSelected={selectedUniverseId === universe.id}
            onHover={onHoverUniverse}
            onSelect={onSelectUniverse}
          />
        ))}

        <TransitionController
          isTransitioning={isTransitioning}
          targetUniverseId={targetUniverseId}
          overlayEl={overlayEl}
          progressRef={progressRef}
          onMidpoint={onTransitionMidpoint}
          onComplete={onTransitionComplete}
        />
      </Suspense>
    </Canvas>
  );
}
