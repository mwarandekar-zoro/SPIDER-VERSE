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

  const accentA = characterA.universe?.theme?.primary ?? '#b026ff';
  const accentB = characterB.universe?.theme?.primary ?? '#00f0ff';

  return (
    <motion.div
      key={`${characterIdA}-${characterIdB}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', maxWidth: '820px' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <NameBlock character={characterA} accent={accentA} align="right" />
        <span className="eyebrow" style={{ fontSize: '1rem' }}>
          VS
        </span>
        <NameBlock character={characterB} accent={accentB} align="left" />
      </div>

      <ComparisonStats characterA={characterA} characterB={characterB} />

      <p style={{ color: 'var(--color-muted)', fontSize: 'var(--fs-small)', textAlign: 'center', marginTop: '1rem' }}>
        Stats reflect this experience's own visualization values, not official rankings.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
        <PowerColumn character={characterA} align="right" />
        <PowerColumn character={characterB} align="left" />
      </div>
    </motion.div>
  );
}

function NameBlock({ character, accent, align }) {
  return (
    <div style={{ textAlign: align }}>
      <div className="eyebrow" style={{ color: accent }}>
        {character.universe?.name}
      </div>
      <h3 style={{ color: 'var(--color-web)', fontSize: '1.3rem' }}>{character.name}</h3>
      <div style={{ color: accent, fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
        {character.alias}
      </div>
    </div>
  );
}

function PowerColumn({ character, align }) {
  return (
    <ul style={{ listStyle: 'none', textAlign: align, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      {character.powers.map((power) => (
        <li key={power.id} style={{ color: 'var(--color-web-dim)', fontSize: '0.85rem' }}>
          {align === 'left' ? `${power.icon} ${power.name}` : `${power.name} ${power.icon}`}
        </li>
      ))}
    </ul>
  );
}
