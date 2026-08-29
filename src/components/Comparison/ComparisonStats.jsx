import { motion } from 'framer-motion';

const STAT_LABELS = { strength: 'Strength', speed: 'Speed', agility: 'Agility', intelligence: 'Intelligence' };

export default function ComparisonStats({ characterA, characterB }) {
  const keys = Object.keys(characterA.stats);

  const colorA = characterA.suitTheme?.primary ?? characterA.universe?.theme?.primary ?? '#ff2222';
  const colorB = characterB.suitTheme?.primary ?? characterB.universe?.theme?.primary ?? '#00f0ff';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {keys.map((key) => {
        const valA = characterA.stats[key] ?? 0;
        const valB = characterB.stats[key] ?? 0;
        const winnerA = valA > valB;
        const winnerB = valB > valA;

        return (
          <div key={key}>
            <div
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--fs-label)',
                color: 'var(--color-web)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.4rem',
                fontWeight: 700,
              }}
            >
              {STAT_LABELS[key] ?? key}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
                gap: '0.8rem',
              }}
            >
              <BarTrack value={valA} color={colorA} align="right" isWinner={winnerA} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#fff',
                  fontWeight: 700,
                  minWidth: '4.5rem',
                  textAlign: 'center',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <span style={{ color: winnerA ? colorA : 'inherit' }}>{valA}</span> /{' '}
                <span style={{ color: winnerB ? colorB : 'inherit' }}>{valB}</span>
              </span>
              <BarTrack value={valB} color={colorB} align="left" isWinner={winnerB} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BarTrack({ value, color, align, isWinner }) {
  return (
    <div
      style={{
        width: '100%',
        height: '10px',
        borderRadius: '999px',
        background: 'rgba(255, 255, 255, 0.06)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: align === 'right' ? 'row-reverse' : 'row',
        boxShadow: isWinner ? `0 0 12px ${color}` : 'none',
        border: isWinner ? `1px solid ${color}` : '1px solid transparent',
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: '100%',
          background: isWinner
            ? `linear-gradient(90deg, ${color}, #ffffff)`
            : color,
          borderRadius: '999px',
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    </div>
  );
}

