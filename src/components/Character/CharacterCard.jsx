import { memo, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCharacter } from '../../hooks/useCharacter';
import { useCursor } from '../Cursor/CursorContext';

/**
 * Section 19: 3D tilt, hover glow, portrait image, click-to-open.
 * Now shows the character's image as a full bleed background with
 * a suit-colored gradient overlay. Falls back to a gradient if the
 * image file doesn't exist yet.
 *
 * Wrapped in React.memo — the explorer grid renders several of these
 * and most re-render triggers elsewhere have nothing to do with any
 * given card as long as its own props stay the same.
 */
function CharacterCard({ characterId, onSelect }) {
  const character = useCharacter(characterId);
  const cardRef = useRef(null);
  const { setCursor } = useCursor();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 20,
  });

  function handlePointerMove(event) {
    const bounds = cardRef.current.getBoundingClientRect();
    x.set((event.clientX - bounds.left) / bounds.width - 0.5);
    y.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function handlePointerEnter() {
    setCursor('character', 'EXPLORE');
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
    setCursor('default');
  }

  if (!character) return null;

  const primary = character.suitTheme?.primary ?? character.universe?.theme?.primary ?? '#b026ff';
  const secondary = character.suitTheme?.secondary ?? character.universe?.theme?.secondary ?? '#00f0ff';
  const previewPowers = character.powers?.slice(0, 2) ?? [];
  const hasImage = !!character.image;

  return (
    <motion.button
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={() => onSelect(characterId)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 900,
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="character-card"
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3 / 4',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: `1px solid ${primary}55`,
          boxShadow: `0 0 0 0px ${primary}00`,
          background: `linear-gradient(160deg, ${primary}33, var(--color-surface) 70%)`,
        }}
      >
        {/* Character portrait image */}
        {hasImage && (
          <img
            src={character.image}
            alt={character.name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
            }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}

        {/* Suit-color gradient overlay — always present, ensures text legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: hasImage
              ? `linear-gradient(to top, ${secondary}ee 0%, ${primary}44 45%, transparent 100%)`
              : `linear-gradient(160deg, ${primary}55, ${secondary}22 60%, var(--color-void) 100%)`,
          }}
        />

        {/* Glowing corner accent (top-right) in primary suit color */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '80px',
            height: '80px',
            borderRadius: '0 var(--radius-md) 0 100%',
            background: `radial-gradient(circle at top right, ${primary}66, transparent 70%)`,
          }}
        />

        {/* Spider-web pattern overlay (decorative, subtle) */}
        <div
          className="card-web-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: hasImage ? 0.08 : 0.15,
            backgroundImage: `
              repeating-radial-gradient(circle at 50% 10%, transparent 0, transparent 30px, ${primary}22 31px, transparent 32px),
              repeating-linear-gradient(0deg, ${primary}11 0px, transparent 1px, transparent 40px)
            `,
          }}
        />

        {/* Card info — bottom overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1.1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2rem',
          }}
        >
          <span className="eyebrow" style={{ color: primary, marginBottom: '0.2rem', fontSize: '0.7rem' }}>
            {character.universe?.name}
          </span>
          <h3 style={{ fontSize: '1.15rem', color: '#ffffff', textShadow: `0 0 12px ${primary}` }}>
            {character.name}
          </h3>
          <p style={{ fontSize: 'var(--fs-small)', color: 'rgba(255,255,255,0.75)', marginTop: '0.1rem' }}>
            {character.alias}
          </p>

          {previewPowers.length > 0 && (
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              {previewPowers.map((power) => (
                <span
                  key={power.id}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.85)',
                    background: `${primary}33`,
                    border: `1px solid ${primary}55`,
                    borderRadius: '999px',
                    padding: '0.2rem 0.5rem',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {power.icon} {power.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}

export default memo(CharacterCard);
