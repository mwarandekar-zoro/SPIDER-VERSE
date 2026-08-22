import { motion } from 'framer-motion';

const STAT_LABELS = {
  strength: 'Strength',
  speed: 'Speed',
  agility: 'Agility',
  intelligence: 'Intelligence',
};

/**
 * Section 21: animated bars. Explicitly labeled as this
 * experience's own visualization values, not official rankings
 * (also stated once, prominently, in CharacterProfile).
 */
export default function CharacterStats({ stats, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      {Object.entries(stats).map(([key, value]) => (
        <div key={key}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--fs-label)',
              color: 'var(--color-web-dim)',
              marginBottom: '0.3rem',
            }}
          >
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {STAT_LABELS[key] ?? key}
            </span>
            <span>{value}</span>
          </div>
          <div
            style={{
              height: '6px',
              borderRadius: '999px',
              background: 'rgba(242, 240, 234, 0.08)',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${value}%` }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '100%', background: accent, borderRadius: '999px' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
