import { motion } from 'framer-motion';

const STAT_LABELS = { strength: 'Strength', speed: 'Speed', agility: 'Agility', intelligence: 'Intelligence' };

export default function ComparisonStats({ characterA, characterB }) {
  const keys = Object.keys(characterA.stats);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      {keys.map((key) => (
        <div key={key}>
          <div
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--fs-label)',
              color: 'var(--color-web-dim)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.35rem',
            }}
          >
            {STAT_LABELS[key] ?? key}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <BarTrack value={characterA.stats[key]} color={characterA.universe?.theme?.primary} align="right" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--color-muted)',
                minWidth: '3.5rem',
                textAlign: 'center',
              }}
            >
              {characterA.stats[key]} / {characterB.stats[key]}
            </span>
            <BarTrack value={characterB.stats[key]} color={characterB.universe?.theme?.primary} align="left" />
          </div>
        </div>
      ))}
    </div>
  );
}

function BarTrack({ value, color, align }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '160px',
        height: '6px',
        borderRadius: '999px',
        background: 'rgba(242, 240, 234, 0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: align === 'right' ? 'row-reverse' : 'row',
        marginLeft: align === 'right' ? 'auto' : 0,
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: '100%', background: color ?? '#b026ff', borderRadius: '999px' }}
      />
    </div>
  );
}
