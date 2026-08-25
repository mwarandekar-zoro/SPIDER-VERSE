import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// Multiverse Timeline / Relationship Tree
// Shows how Spider-Verse factions relate to each other.
// Three columns: Inheritors → Spider-Society ← Independent.
// Connected with animated SVG lines.
// ─────────────────────────────────────────────────────────────

const FACTIONS = {
  inheritors: {
    label: 'INHERITORS',
    color: '#ff2020',
    description: 'Ancient predators feeding on the life-force of Spider-People across the web of life and destiny.',
    members: ['Morlun', 'Solus', 'Verna', 'Bora', 'Daemos'],
  },
  spiderSociety: {
    label: 'SPIDER-SOCIETY',
    color: '#00f0ff',
    description: 'Miguel O\'Hara\'s multiverse task force — organized to protect the web of life and stop canon events from breaking.',
    members: ['Miguel O\'Hara', 'Gwen Stacy', 'Jessica Drew', 'Hobie Brown', 'Pavítr Prabhakar'],
  },
  independent: {
    label: 'INDEPENDENT',
    color: '#ff9d2f',
    description: 'Spider-People who operate alone, forging their own path through the multiverse outside any organized faction.',
    members: ['Miles Morales', 'Peter B. Parker', 'Spider-Man Noir', 'Takuya Yamashiro', 'Peter Porker'],
  },
};

const TIMELINE_EVENTS = [
  { year: '1933', event: 'Earth-90214', desc: 'Spider-Man Noir becomes active in Depression-era New York.', color: '#c9c9c9' },
  { year: '1978', event: 'Earth-51778', desc: 'Takuya Yamashiro bonds with the Spider-Bracelet and calls Leopardon for the first time.', color: '#ff2e2e' },
  { year: '2000s', event: 'Earth-616', desc: 'Peter B. Parker reaches his prime — then keeps going well past it.', color: '#e50914' },
  { year: '2014', event: 'Earth-8311', desc: 'Spider-Ham prevents Loomworld from unraveling the Toonverse.', color: '#ff7a00' },
  { year: '2018', event: 'Earth-1610', desc: 'Miles Morales is bitten and inherits the Spider-Man mantle.', color: '#ff3b3b' },
  { year: '2023', event: 'Earth-65', desc: 'Gwen Stacy joins the Spider-Society under Miguel O\'Hara.', color: '#ff5fd1' },
  { year: '2023', event: 'Earth-50101', desc: 'Pavitr Prabhakar defends Mumbattan from Spot\'s rift collapse.', color: '#ff9d2f' },
  { year: '2099', event: 'Earth-928', desc: 'Miguel O\'Hara founds the Spider-Society from Nueva York.', color: '#00f0ff' },
];

function FactionCard({ faction, data, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        flex: '1 1 260px',
        padding: '1.25rem',
        borderRadius: 'var(--radius-md)',
        background: `linear-gradient(145deg, ${data.color}18, rgba(8,7,12,0.9))`,
        border: `1px solid ${data.color}44`,
        boxShadow: `0 0 24px ${data.color}22`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent */}
      <div style={{ height: '2px', background: `linear-gradient(90deg, ${data.color}, transparent)`, marginBottom: '1rem' }} />

      <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.15em', color: data.color, marginBottom: '0.5rem' }}>
        {data.label}
      </h3>
      <p style={{ fontSize: '0.82rem', color: 'var(--color-web-dim)', lineHeight: 1.55, marginBottom: '1rem' }}>
        {data.description}
      </p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {data.members.map((m) => (
          <li key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-web-dim)' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: data.color, flexShrink: 0, boxShadow: `0 0 6px ${data.color}` }} />
            {m}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function TimelineEvent({ event, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
      {/* Timeline spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: event.color,
            boxShadow: `0 0 10px ${event.color}`,
            flexShrink: 0,
            marginTop: '0.25rem',
          }}
        />
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 + 0.1 }}
            style={{ width: '1px', height: '60px', background: `linear-gradient(to bottom, ${event.color}66, transparent)`, transformOrigin: 'top' }}
          />
        )}
      </div>

      {/* Event content */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08 + 0.05 }}
        style={{ paddingBottom: isLast ? 0 : '1rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: event.color, fontWeight: 700 }}>{event.year}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.1rem 0.5rem', borderRadius: '999px', border: `1px solid ${event.color}33` }}>{event.event}</span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-web-dim)', lineHeight: 1.5, margin: 0 }}>{event.desc}</p>
      </motion.div>
    </div>
  );
}

export default function UniverseTimeline() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section
      id="timeline"
      style={{
        padding: 'clamp(4rem, 8vh, 7rem) var(--edge-padding)',
        maxWidth: '1100px',
        margin: '0 auto',
        zIndex: 1,
        position: 'relative',
      }}
    >
      {/* ── Header ── */}
      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
          MULTIVERSE RELATIONSHIPS
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: 'var(--fs-h2)', color: 'var(--color-web)', margin: '0.5rem 0 0.75rem' }}
        >
          Factions & The Web of Life
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ color: 'var(--color-web-dim)', maxWidth: '50ch', margin: '0 auto', fontSize: '0.9rem' }}
        >
          Three groups. One web. Every Spider-Person is a thread.
        </motion.p>
      </div>

      {/* ── Faction Cards ── */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
        {Object.entries(FACTIONS).map(([key, data], i) => (
          <FactionCard key={key} faction={key} data={data} delay={i * 0.12} />
        ))}
      </div>

      {/* ── Timeline divider ── */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="eyebrow">ACROSS TIME</span>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: 'var(--fs-h2)', color: 'var(--color-web)', marginTop: '0.5rem' }}
        >
          Key Moments in the Multiverse
        </motion.h3>
      </div>

      {/* ── Timeline Events ── */}
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {TIMELINE_EVENTS.map((event, i) => (
          <TimelineEvent key={i} event={event} index={i} isLast={i === TIMELINE_EVENTS.length - 1} />
        ))}
      </div>
    </section>
  );
}
