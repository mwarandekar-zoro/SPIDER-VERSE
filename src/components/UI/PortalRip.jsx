/**
 * PortalRip — "Comic Panel Rip" screen tear entrance animation.
 *
 * When `triggerKey` changes (e.g. user selects a character/universe),
 * two diagonal halves of the screen split apart like a comic panel rip,
 * exposing a dimensional rift in `primaryColor`, then seal shut in 1.1s.
 */
import { useEffect, useState, useRef } from 'react';

export default function PortalRip({ triggerKey, primaryColor = '#b026ff' }) {
  const [active, setActive] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (!triggerKey) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setActive(true);
    setAnimKey((prev) => prev + 1);

    const timer = setTimeout(() => {
      setActive(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, [triggerKey]);

  if (!active) return null;

  return (
    <div
      key={animKey}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9995,
        overflow: 'hidden',
      }}
    >
      {/* Dimensional energy back-glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${primaryColor} 0%, rgba(0,0,0,0.95) 75%)`,
          boxShadow: `inset 0 0 100px ${primaryColor}`,
          animation: 'rip-bg-flash 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      />

      {/* Top diagonal panel */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-void, #08070c)',
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 65%)',
          borderBottom: `3px solid ${primaryColor}`,
          filter: `drop-shadow(0 0 15px ${primaryColor})`,
          animation: 'rip-slide-top 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      />

      {/* Bottom diagonal panel */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-void, #08070c)',
          clipPath: 'polygon(0 65%, 100% 45%, 100% 100%, 0 100%)',
          borderTop: `3px solid ${primaryColor}`,
          filter: `drop-shadow(0 0 15px ${primaryColor})`,
          animation: 'rip-slide-bottom 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      />

      <style>{`
        @keyframes rip-slide-top {
          0%   { transform: translate(0, 0); }
          35%  { transform: translate(-30px, -60px); }
          70%  { transform: translate(-10px, -20px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes rip-slide-bottom {
          0%   { transform: translate(0, 0); }
          35%  { transform: translate(30px, 60px); }
          70%  { transform: translate(10px, 20px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes rip-bg-flash {
          0%   { opacity: 0; }
          30%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
