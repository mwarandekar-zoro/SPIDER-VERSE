import { motion } from 'framer-motion';
import { useCharacter } from '../../hooks/useCharacter';
import ComparisonStats from './ComparisonStats';

export default function ComparisonPanel({ characterIdA, characterIdB }) {
  const characterA = useCharacter(characterIdA);
  const characterB = useCharacter(characterIdB);

  if (!characterA || !characterB) {
    return (
      <p style={{ color: 'var(--color-muted)', textAlign: 'center' }}>
        Choose two Spider-People above to compare them.
      </p>
    );
  }

  const accentA = characterA.suitTheme?.primary ?? characterA.universe?.theme?.primary ?? '#ff2222';
  const accentB = characterB.suitTheme?.primary ?? characterB.universe?.theme?.primary ?? '#00f0ff';

  return (
    <motion.div
      key={`${characterIdA}-${characterIdB}`}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%', maxWidth: '900px', position: 'relative' }}
    >
      {/* Dramatic VS Fighter Cards Split Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'stretch',
          gap: '1rem',
          marginBottom: '2rem',
          position: 'relative',
        }}
      >
        {/* Left Fighter Card */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: `linear-gradient(135deg, ${accentA}22 0%, rgba(10,10,18,0.9) 100%)`,
            border: `2px solid ${accentA}66`,
            boxShadow: `0 0 30px ${accentA}25`,
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <img
            src={characterA.image}
            alt={characterA.name}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: `2px solid ${accentA}`,
              boxShadow: `0 0 16px ${accentA}`,
            }}
          />
          <div>
            <span className="eyebrow" style={{ color: accentA, fontSize: '0.7rem' }}>
              {characterA.universe?.name}
            </span>
            <h3 style={{ color: '#fff', fontSize: '1.4rem', lineHeight: 1.1 }}>{characterA.name}</h3>
            <div style={{ color: accentA, fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700 }}>
              {characterA.alias}
            </div>
          </div>
        </motion.div>

        {/* Slamming VS Badge */}
        <motion.div
          initial={{ scale: 3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.2 }}
          style={{
            alignSelf: 'center',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontStyle: 'italic',
              fontWeight: 900,
              fontSize: '1.8rem',
              color: '#fff',
              background: 'linear-gradient(135deg, #ff0055, #ffaa00)',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              boxShadow: '0 0 25px rgba(255, 0, 85, 0.8), 0 0 40px rgba(255, 170, 0, 0.5)',
              transform: 'skewX(-10deg)',
              letterSpacing: '0.05em',
            }}
          >
            VS
          </div>
        </motion.div>

        {/* Right Fighter Card */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            background: `linear-gradient(225deg, ${accentB}22 0%, rgba(10,10,18,0.9) 100%)`,
            border: `2px solid ${accentB}66`,
            boxShadow: `0 0 30px ${accentB}25`,
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '1rem',
            textAlign: 'right',
          }}
        >
          <div>
            <span className="eyebrow" style={{ color: accentB, fontSize: '0.7rem' }}>
              {characterB.universe?.name}
            </span>
            <h3 style={{ color: '#fff', fontSize: '1.4rem', lineHeight: 1.1 }}>{characterB.name}</h3>
            <div style={{ color: accentB, fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700 }}>
              {characterB.alias}
            </div>
          </div>
          <img
            src={characterB.image}
            alt={characterB.name}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: `2px solid ${accentB}`,
              boxShadow: `0 0 16px ${accentB}`,
            }}
          />
        </motion.div>
      </div>

      {/* Clashing Stat Bars */}
      <ComparisonStats characterA={characterA} characterB={characterB} />

      <p style={{ color: 'var(--color-muted)', fontSize: 'var(--fs-small)', textAlign: 'center', marginTop: '1.5rem' }}>
        Stats reflect this experience's own visualization values, not official rankings.
      </p>

      {/* Power columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
        <PowerColumn character={characterA} accent={accentA} align="right" />
        <PowerColumn character={characterB} accent={accentB} align="left" />
      </div>
    </motion.div>
  );
}

function PowerColumn({ character, accent, align }) {
  return (
    <ul style={{ listStyle: 'none', textAlign: align, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {character.powers.map((power) => (
        <li
          key={power.id}
          style={{
            color: 'var(--color-web)',
            fontSize: '0.85rem',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '0.4rem 0.8rem',
            borderRadius: '6px',
            borderLeft: align === 'left' ? `3px solid ${accent}` : 'none',
            borderRight: align === 'right' ? `3px solid ${accent}` : 'none',
          }}
        >
          {align === 'left' ? `${power.icon} ${power.name}` : `${power.name} ${power.icon}`}
        </li>
      ))}
    </ul>
  );
}

