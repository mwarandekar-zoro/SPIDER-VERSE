import { memo, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCharacter } from '../../hooks/useCharacter';
import { useCursor } from '../Cursor/CursorContext';

/**
 * Section 19: 3D tilt, hover glow, power preview, click-to-open.
 * The tilt is computed from local pointer position within the card
 * (not the global cursor hooks used by the 3D layer) since this is
 * a DOM element, not a Three.js object.
 *
 * Wrapped in React.memo (section 36) — the explorer grid renders
 * several of these, and most re-render triggers elsewhere in the
 * app (filters, hover on other cards) have nothing to do with any
 * given card as long as its own props stay the same.
 */
function CharacterCard({ characterId, onSelect }) {
  const character = useCharacter(characterId);
  const cardRef = useRef(null);
  const { setCursor } = useCursor();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
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

  const theme = character.universe?.theme?.primary ?? '#b026ff';
  const previewPowers = character.powers?.slice(0, 2) ?? [];

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
        perspective: 800,
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="character-card"
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3 / 4',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: `1px solid ${theme}55`,
          background: `linear-gradient(160deg, ${theme}33, var(--color-surface) 70%)`,
          padding: '1.1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          textAlign: 'left',
        }}
      >
        <span
          className="eyebrow"
          style={{ color: theme, marginBottom: '0.4rem' }}
        >
          {character.universe?.name}
        </span>
        <h3 style={{ fontSize: '1.15rem', color: 'var(--color-web)' }}>
          {character.name}
        </h3>
        <p style={{ fontSize: 'var(--fs-small)', color: 'var(--color-web-dim)', marginTop: '0.2rem' }}>
          {character.alias}
        </p>

        {previewPowers.length > 0 && (
          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.7rem', flexWrap: 'wrap' }}>
            {previewPowers.map((power) => (
              <span
                key={power.id}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--color-web-dim)',
                  border: '1px solid rgba(242,240,234,0.15)',
                  borderRadius: '999px',
                  padding: '0.2rem 0.55rem',
                }}
              >
                {power.icon} {power.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.button>
  );
}

export default memo(CharacterCard);
