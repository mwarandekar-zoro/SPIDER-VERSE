import { motion } from 'framer-motion';

/** Section 22: powers displayed as animated cards. */
export default function CharacterPowers({ powers, accent }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '0.75rem',
      }}
    >
      {powers.map((power, i) => (
        <motion.div
          key={power.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          style={{
            border: `1px solid ${accent}40`,
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem',
            background: 'rgba(21, 18, 30, 0.5)',
          }}
        >
          <div style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>{power.icon}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-web)', fontWeight: 600 }}>
            {power.name}
          </div>
          <div style={{ fontSize: 'var(--fs-small)', color: 'var(--color-web-dim)', marginTop: '0.25rem' }}>
            {power.description}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
