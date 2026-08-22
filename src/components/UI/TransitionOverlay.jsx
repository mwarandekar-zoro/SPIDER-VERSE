import { forwardRef } from 'react';

/**
 * Opacity is set directly on this DOM node by the GSAP timeline in
 * portalAnimations.js — never through React state — since it needs
 * to update every animation frame during a transition.
 */
const TransitionOverlay = forwardRef(function TransitionOverlay(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000000',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 50,
      }}
    />
  );
});

export default TransitionOverlay;
