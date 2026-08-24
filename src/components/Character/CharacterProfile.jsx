import { motion } from 'framer-motion';
import { useCharacter } from '../../hooks/useCharacter';
import CharacterStats from './CharacterStats';
import CharacterPowers from './CharacterPowers';
import CharacterRelationships from './CharacterRelationships';
import Button from '../UI/Button';

/**
 * Section 20 layout: full character detail view with large portrait,
 * suit-themed UI shift, and entrance animation.
 *
 * Two-part entrance: portal-burst glow flash (in character's suit
 * primary color) + panel sliding up. Both re-trigger when switching
 * characters so every selection feels like a fresh dimensional arrival.
 */
export default function CharacterProfile({
  characterId,
  onSelectCharacter,
  onExploreUniverse,
  onCompare,
  onClose,
}) {
  const character = useCharacter(characterId);
  if (!character) return null;

  const primary = character.suitTheme?.primary ?? character.universe?.theme?.primary ?? '#b026ff';
  const secondary = character.suitTheme?.secondary ?? character.universe?.theme?.secondary ?? '#00f0ff';
  const accent = character.suitTheme?.accent ?? primary;
  const hasImage = !!character.image;

  return (
    <motion.div
      key={characterId}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto',
        background: `linear-gradient(135deg, ${primary}15 0%, rgba(15,13,23,0.95) 40%, ${secondary}10 100%)`,
        border: `1px solid ${primary}55`,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        boxShadow: `0 0 60px ${primary}22, 0 0 120px ${secondary}11`,
      }}
    >
      {/* Suit-burst: cinematic radial flash in the character's primary color */}
      <motion.div
        key={`burst-${characterId}`}
        aria-hidden="true"
        initial={{ opacity: 0.8, scale: 0.3, rotate: 0 }}
        animate={{ opacity: 0, scale: 2.0, rotate: 30 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 30% 50%, ${primary}55, ${secondary}22, transparent 70%)`,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Top border accent line in suit primary */}
      <div
        aria-hidden="true"
        style={{
          height: '3px',
          background: `linear-gradient(90deg, ${primary}, ${secondary}, ${primary})`,
          boxShadow: `0 0 12px ${primary}`,
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: hasImage ? '280px 1fr' : '1fr',
          gap: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Portrait column */}
        {hasImage && (
          <div style={{ position: 'relative', minHeight: '400px' }}>
            <img
              src={character.image}
              alt={character.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block',
              }}
              onError={(e) => { e.target.parentElement.style.display = 'none'; }}
            />
            {/* Gradient fade to content panel */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to right, transparent 50%, rgba(15,13,23,0.95) 100%),
                             linear-gradient(to top, ${secondary}cc 0%, transparent 60%)`,
              }}
            />
            {/* Suit color tint layer */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(160deg, ${primary}22, transparent 60%)`,
                mixBlendMode: 'screen',
              }}
            />
          </div>
        )}

        {/* Info column */}
        <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          <button
            onClick={onClose}
            aria-label="Close character profile"
            style={{
              float: 'right',
              color: primary,
              fontSize: '1.25rem',
              opacity: 0.7,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.opacity = 1)}
            onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
          >
            ✕
          </button>

          {/* Universe tag */}
          <span
            className="eyebrow"
            style={{
              color: primary,
              background: `${primary}22`,
              border: `1px solid ${primary}44`,
              borderRadius: '999px',
              padding: '0.25rem 0.75rem',
              fontSize: '0.7rem',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {character.universe?.name}
          </span>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: '#ffffff',
              marginTop: '0.2rem',
              lineHeight: 1,
              textShadow: `0 0 24px ${primary}88`,
            }}
          >
            {character.name}
          </h2>
          <p
            style={{
              color: accent,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              marginTop: '0.3rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {character.alias}
          </p>

          <div
            style={{
              height: '1px',
              background: `linear-gradient(90deg, ${primary}44, transparent)`,
              margin: '1.25rem 0',
            }}
          />

          <p
            style={{
              color: 'var(--color-web-dim)',
              lineHeight: 1.65,
              fontSize: '0.95rem',
            }}
          >
            {character.description}
          </p>
          <p
            style={{
              color: 'var(--color-muted)',
              fontSize: 'var(--fs-small)',
              marginTop: '0.5rem',
            }}
          >
            Origin: <span style={{ color: primary }}>{character.origin}</span>
          </p>

          <div
            style={{
              height: '1px',
              background: `linear-gradient(90deg, ${primary}44, transparent)`,
              margin: '1.25rem 0',
            }}
          />

          <h3 style={sectionHeadingStyle(primary)}>Powers</h3>
          <CharacterPowers powers={character.powers} accent={primary} />

          <div
            style={{
              height: '1px',
              background: `linear-gradient(90deg, ${primary}44, transparent)`,
              margin: '1.25rem 0',
            }}
          />

          <h3 style={sectionHeadingStyle(primary)}>Combat Stats</h3>
          <p style={{ color: 'var(--color-muted)', fontSize: 'var(--fs-small)', marginBottom: '0.75rem' }}>
            Experience-specific visualization values.
          </p>
          <CharacterStats stats={character.stats} accent={primary} />

          {character.relationships.length > 0 && (
            <>
              <div
                style={{
                  height: '1px',
                  background: `linear-gradient(90deg, ${primary}44, transparent)`,
                  margin: '1.25rem 0',
                }}
              />
              <h3 style={sectionHeadingStyle(primary)}>Relationships</h3>
              <CharacterRelationships
                relationships={character.relationships}
                onSelectCharacter={onSelectCharacter}
              />
            </>
          )}

          <div
            style={{
              height: '1px',
              background: `linear-gradient(90deg, ${primary}44, transparent)`,
              margin: '1.25rem 0',
            }}
          />

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button
              onClick={() => onExploreUniverse(character.universe?.id)}
              style={{
                padding: '0.7rem 1.4rem',
                borderRadius: '999px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background: primary,
                color: '#08070c',
                boxShadow: `0 0 16px ${primary}66`,
              }}
            >
              Explore Universe →
            </Button>
            <Button
              onClick={() => onCompare(character.id)}
              style={{
                padding: '0.7rem 1.4rem',
                borderRadius: '999px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background: 'transparent',
                color: primary,
                border: `1px solid ${primary}`,
              }}
            >
              Compare
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function sectionHeadingStyle(primary) {
  return {
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: primary,
    marginBottom: '0.75rem',
  };
}
