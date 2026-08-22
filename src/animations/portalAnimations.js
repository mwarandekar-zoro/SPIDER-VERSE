import gsap from 'gsap';
import { CAMERA_DEFAULTS } from '../utils/constants';

/**
 * Builds the GSAP timeline for entering a universe node.
 * Drives camera zooming, screen overlay opacity, and portal scaling in lockstep.
 *
 * @param {Object} params
 * @param {THREE.Camera} params.camera - Three.js camera object
 * @param {HTMLElement} params.overlayEl - Blackout overlay DOM element
 * @param {Array<number>} params.portalPosition - [x, y, z] of the portal node
 * @param {React.MutableRefObject} params.progressRef - Ref for sharing transition progress with shaders/portal
 * @param {Function} params.onMidpoint - Callback when screen is fully black (safe to swap environments)
 * @param {Function} params.onComplete - Callback when cinematic ends
 * @returns {gsap.core.Timeline} GSAP Timeline instance
 */
export function buildUniverseTransition({
  camera,
  overlayEl,
  portalPosition,
  progressRef,
  onMidpoint,
  onComplete,
}) {
  const tl = gsap.timeline({
    onComplete: () => {
      if (progressRef?.current) {
        progressRef.current.active = false;
        progressRef.current.progress = 0;
      }
      if (overlayEl) {
        overlayEl.style.pointerEvents = 'none';
      }
      onComplete?.();
    },
  });

  // Set initial transition flags
  if (progressRef?.current) {
    progressRef.current.active = true;
    progressRef.current.progress = 0;
  }
  if (overlayEl) {
    overlayEl.style.pointerEvents = 'auto';
  }

  const phaseDuration = 1.2;

  // --- Phase 1: Zoom into the portal and blackout ---
  tl.to(
    camera.position,
    {
      x: portalPosition[0],
      y: portalPosition[1],
      z: portalPosition[2] + 0.3, // Move camera slightly in front of portal
      duration: phaseDuration,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.lookAt(portalPosition[0], portalPosition[1], portalPosition[2]);
      },
    },
    0
  );

  if (overlayEl) {
    tl.to(
      overlayEl,
      {
        opacity: 1,
        duration: phaseDuration,
        ease: 'power2.inOut',
      },
      0
    );
  }

  // Drive portal scaling factor (0 -> 1 -> 0 shape handled by Portal.jsx shader/render logic)
  if (progressRef?.current) {
    tl.to(
      progressRef.current,
      {
        progress: 1,
        duration: phaseDuration * 2,
        ease: 'none',
      },
      0
    );
  }

  // --- Midpoint Transition Commit ---
  tl.add(() => {
    onMidpoint?.();
    // Instantly reset camera position to frame the new universe from afar
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);
  }, phaseDuration);

  // --- Phase 2: Fade overlay back out and zoom camera into new default position ---
  tl.to(
    camera.position,
    {
      x: CAMERA_DEFAULTS.position[0],
      y: CAMERA_DEFAULTS.position[1],
      z: CAMERA_DEFAULTS.position[2],
      duration: phaseDuration,
      ease: 'power2.out',
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
      },
    },
    phaseDuration
  );

  if (overlayEl) {
    tl.to(
      overlayEl,
      {
        opacity: 0,
        duration: phaseDuration,
        ease: 'power2.out',
      },
      phaseDuration
    );
  }

  return tl;
}
