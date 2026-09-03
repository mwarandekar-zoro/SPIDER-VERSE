import React, { Component, Suspense, useMemo, useRef } from 'react';
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
import SpiderWebBurst from './SpiderWebBurst';
import { universes } from '../../data/universes';
import { CAMERA_DEFAULTS, QUALITY_SETTINGS } from '../../utils/constants';
import { scaledPosition } from '../../utils/mapLayout';

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.warn('WebGL / R3F Canvas Error caught gracefully:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          className="canvas-layer"
          style={{
            background: 'radial-gradient(ellipse at center, #15121e 0%, #08070c 100%)',
            pointerEvents: 'none',
          }}
        />
      );
    }
    return this.props.children;
  }
}

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
 */
export default function MultiverseScene(props) {
  const {
    quality = 'high',
    hoveredUniverseId = null,
    selectedUniverseId = null,
    onHoverUniverse,
    onSelectUniverse,
    activeUniverseId = null,
    previewUniverseId = null,
    focusTrigger = null,
    selectedCharacterSuitTheme = null,
    isTransitioning = false,
    targetUniverseId = null,
    overlayEl = null,
    onTransitionMidpoint,
    onTransitionComplete,
  } = props;

  const settings = QUALITY_SETTINGS[quality] ?? QUALITY_SETTINGS.high;
  const progressRef = useRef({ active: false, progress: 0 });

  return (
    <WebGLErrorBoundary>
      <Canvas
        className="canvas-layer"
        dpr={settings.dpr}
        camera={{ position: CAMERA_DEFAULTS.position, fov: CAMERA_DEFAULTS.fov }}
        gl={{ antialias: true, alpha: false }}
      >
        <Camera transitionRef={progressRef} focusTrigger={focusTrigger} />
        <Lighting activeUniverseId={activeUniverseId} previewUniverseId={previewUniverseId} />
        <Environment activeUniverseId={activeUniverseId} />

        <Suspense fallback={null}>
          <SpiderWebBurst suitTheme={selectedCharacterSuitTheme} trigger={focusTrigger} />
          <PlaceholderCore suitTheme={selectedCharacterSuitTheme} />
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
    </WebGLErrorBoundary>
  );
}
