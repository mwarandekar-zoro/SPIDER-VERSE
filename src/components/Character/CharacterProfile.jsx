import { motion } from 'framer-motion';
import { useCharacter } from '../../hooks/useCharacter';
import CharacterStats from './CharacterStats';
import CharacterPowers from './CharacterPowers';
import CharacterRelationships from './CharacterRelationships';
import Button from '../UI/Button';

/**
 * Section 20 layout: about / powers / stats / universe / actions.
 *
 * Entrance is now a two-part effect: a wide "portal-burst" glow
 * (see .portal-burst in globals.css) that flashes in behind the
 * panel and quickly settles, plus the panel itself sliding/fading
 * up on top of it. Both are keyed by characterId so switching
 * straight from one character to another (via Relationships) replays
 * the burst instead of just cross-fading text.
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

  const accent = character.universe?.theme?.primary ?? '#b026ff';

  return (
    <motion.div
      key={characterId}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        maxWidth: '720px',
        width: '100%',
        margin: '0 auto',
        background: 'rgba(15, 13, 23, 0.75)',
        border: `1px solid ${accent}40`,
        borderRadius: 'var(--radius-md)',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        textAlign: 'left',
        backdropFilter: 'blur(6px)',
      }}
    >
      {/* Portal-burst: quick radial flash in this character's own
          suit colors, behind the panel (z-index -1 via .portal-burst),
          scaling down and fading out over ~0.9s. Purely decorative
          (aria-hidden) — the panel content below is what's announced. */}
      <motion.div
        key={`burst-${characterId}`}
        className="portal-burst"
        aria-hidden="true"
        initial={{ opacity: 0.9, scale: 0.4, rotate: 0 }}
        animate={{ opacity: 0, scale: 1.4, rotate: 25 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />

      <button
        onClick={onClose}
        aria-label="Close character profile"
        style={{ float: 'right', color: 'var(--color-muted)', fontSize: '1.25rem' }}
      >
        ✕
      </button>

      <span className="eyebrow" style={{ color: accent }}>
        {character.universe?.name}
      </span>
      <h2 style={{ fontSize: 'var(--fs-h1)', color: 'var(--color-web)', marginTop: '0.3rem' }}>
        {character.name}
      </h2>
      <p style={{ color: accent, fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
        {character.alias}
      </p>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(242,240,234,0.1)', margin: '1.5rem 0' }} />

      <h3 style={sectionHeadingStyle}>About</h3>
      <p style={{ color: 'var(--color-web-dim)', lineHeight: 1.6 }}>{character.description}</p>
      <p style={{ color: 'var(--color-muted)', fontSize: 'var(--fs-small)', marginTop: '0.5rem' }}>
        Origin: {character.origin}
      </p>

      <hr style={dividerStyle} />

      <h3 style={sectionHeadingStyle}>Powers</h3>
      <CharacterPowers powers={character.powers} accent={accent} />

      <hr style={dividerStyle} />

      <h3 style={sectionHeadingStyle}>Stats</h3>
      <p style={{ color: 'var(--color-muted)', fontSize: 'var(--fs-small)', marginBottom: '0.75rem' }}>
        Visualization values for this experience — not official rankings.
      </p>
      <CharacterStats stats={character.stats} accent={accent} />

      {character.relationships.length > 0 && (
        <>
          <hr style={dividerStyle} />
          <h3 style={sectionHeadingStyle}>Relationships</h3>
          <CharacterRelationships
            relationships={character.relationships}
            onSelectCharacter={onSelectCharacter}
          />
        </>
      )}

      <hr style={dividerStyle} />

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button
          onClick={() => onExploreUniverse(character.universe?.id)}
          style={{ ...actionButtonStyle, background: accent, color: '#08070c' }}
        >
          Explore Universe →
        </Button>
        <Button
          onClick={() => onCompare(character.id)}
          style={{ ...actionButtonStyle, background: 'transparent', color: accent, border: `1px solid ${accent}` }}
        >
          Compare
        </Button>
      </div>
    </motion.div>
  );
}

const sectionHeadingStyle = {
  fontSize: '0.95rem',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--color-web)',
  marginBottom: '0.75rem',
};

const dividerStyle = {
  border: 'none',
  borderTop: '1px solid rgba(242,240,234,0.1)',
  margin: '1.5rem 0',
};

const actionButtonStyle = {
  padding: '0.7rem 1.4rem',
  borderRadius: '999px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8rem',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};
