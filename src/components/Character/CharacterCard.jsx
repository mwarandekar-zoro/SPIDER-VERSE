import { memo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCharacter } from '../../hooks/useCharacter';
import { useCursor } from '../Cursor/CursorContext';

/**
 * Section 19: 3D tilt, hover glow, portrait image, click-to-open.
 * Shows the character's image as a full bleed background when available.
 * Falls back to a rich animated suit-themed visual art card when no image exists.
 *
 * Wrapped in React.memo — the explorer grid renders several of these
 * and most re-render triggers elsewhere have nothing to do with any
 * given card.
 */
function CharacterCard({ characterId, onSelect }) {
  const character = useCharacter(characterId);
  const cardRef = useRef(null);
  const { setCursor } = useCursor();
  const [imageError, setImageError] = useState(false);
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
  const accent = character.suitTheme?.accent ?? primary;
  const previewPowers = character.powers?.slice(0, 2) ?? [];
  const showImage = character.image && !imageError;

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
          background: `linear-gradient(160deg, ${primary}22, var(--color-void) 70%)`,
        }}
      >
        {/* --- REAL IMAGE (if available) --- */}
        {showImage && (
          <img
            src={character.image}
            alt={character.name}
            onError={() => setImageError(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
            }}
          />
        )}

        {/* --- GENERATIVE ART CARD (when no image) --- */}
        {!showImage && (
          <>
            {/* Animated radial glow burst */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse at 50% 35%, ${primary}55 0%, ${secondary}22 45%, transparent 75%)`,
              }}
            />
            {/* Web ring pattern */}
            <svg
              viewBox="0 0 300 400"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: 0.3,
              }}
              aria-hidden="true"
            >
              {/* Radial strands from top center */}
              {Array.from({ length: 10 }, (_, i) => {
                const angle = (i / 9) * Math.PI;
                const x2 = 150 + Math.cos(angle - Math.PI / 2) * 280;
                const y2 = 20 + Math.sin(angle - Math.PI / 2) * 380;
                return (
                  <line key={i} x1="150" y1="20" x2={x2} y2={y2}
                    stroke={primary} strokeWidth="1" />
                );
              })}
              {/* Concentric arcs */}
              {[60, 110, 165, 225, 290].map((r, i) => (
                <ellipse key={i} cx="150" cy="20" rx={r} ry={r * 0.65}
                  stroke={i % 2 === 0 ? primary : secondary}
                  strokeWidth="1" fill="none" />
              ))}
            </svg>
            {/* Floating suit-color particles */}
            {Array.from({ length: 6 }, (_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20 - i * 5, 0],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  duration: 3 + i * 0.6,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  width: `${4 + (i % 3) * 3}px`,
                  height: `${4 + (i % 3) * 3}px`,
                  borderRadius: '50%',
                  background: i % 2 === 0 ? primary : secondary,
                  left: `${15 + i * 14}%`,
                  top: `${20 + (i % 3) * 18}%`,
                  boxShadow: `0 0 8px ${i % 2 === 0 ? primary : secondary}`,
                }}
              />
            ))}
            {/* Large spider emblem (stylized "S" web) */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -60%)',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                border: `2px solid ${primary}55`,
                background: `radial-gradient(circle, ${primary}22, transparent)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{
                fontSize: '36px',
                filter: `drop-shadow(0 0 12px ${primary})`,
              }}>🕷️</span>
            </div>
          </>
        )}

        {/* Suit-color gradient overlay — always present for text legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: showImage
              ? `linear-gradient(to top, ${secondary}ee 0%, ${primary}44 45%, transparent 100%)`
              : `linear-gradient(to top, var(--color-void) 0%, transparent 60%)`,
          }}
        />

        {/* Glowing corner accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '80px',
            height: '80px',
            borderRadius: '0 var(--radius-md) 0 100%',
            background: `radial-gradient(circle at top right, ${primary}55, transparent 70%)`,
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
          <span
            className="eyebrow"
            style={{ color: primary, marginBottom: '0.2rem', fontSize: '0.7rem' }}
          >
            {character.universe?.name}
          </span>
          <h3
            style={{
              fontSize: '1.15rem',
              color: '#ffffff',
              textShadow: `0 0 12px ${primary}`,
            }}
          >
            {character.name}
          </h3>
          <p
            style={{
              fontSize: 'var(--fs-small)',
              color: 'rgba(255,255,255,0.75)',
              marginTop: '0.1rem',
            }}
          >
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
