import { useEffect, useRef } from 'react';
import { initHeroScrollFade } from '../animations/scrollAnimations';

/**
 * Minimal Hero content — the full particle/web-backed hero (section
 * 10) arrives once those systems are polish-passed. This phase adds
 * the scroll-driven fade (section 27): the hero fades and lifts out
 * as the user scrolls past it, so the multiverse map feels revealed
 * rather than just sitting underneath a static title.
 */
export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const cleanup = initHeroScrollFade(heroRef.current);
    return cleanup;
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--edge-padding)',
        gap: '1.25rem',
      }}
    >
      <span className="eyebrow">EXPLORE THE MULTIVERSE</span>
      <h1 style={{ fontSize: 'var(--fs-hero)', color: 'var(--color-web)' }}>
        SPIDER-VERSE
      </h1>
      <p style={{ color: 'var(--color-web-dim)', maxWidth: '32ch' }}>
        Move your cursor. The multiverse is already reacting.
      </p>
    </section>
  );
}
