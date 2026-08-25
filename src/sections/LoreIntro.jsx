import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// Lore Intro — short blurb between Hero and Multiverse
// Three punchy sentences; each word drops in staggered.
// A faint horizontal divider line crawls in from both sides.
// ─────────────────────────────────────────────────────────────

const PARAGRAPHS = [
  'Across infinite dimensions, every choice births a new reality. Some timelines made Peter Parker the Spider-Man. Others gave the mask to Miles Morales, Gwen Stacy, Miguel O\'Hara — and countless more.',
  'The Spider-Verse isn\'t a single story. It\'s the same story, told ten thousand ways, echoing across spacetime — each version as real and as vital as the last.',
  'This is where they all live. Explore the map. Meet the Spider-People. Find your universe.',
];

function AnimatedParagraph({ text, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        color: 'var(--color-web-dim)',
        fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
        lineHeight: 1.7,
        maxWidth: '65ch',
        margin: '0 auto',
      }}
    >
      {text}
    </motion.p>
  );
}

export default function LoreIntro() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: '-60px' });

  return (
    <section
      id="lore"
      style={{
        position: 'relative',
        padding: 'clamp(4rem, 8vh, 7rem) var(--edge-padding)',
        textAlign: 'center',
        zIndex: 1,
      }}
    >
      {/* ── Header ── */}
      <motion.span
        className="eyebrow"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        WHAT IS THE SPIDER-VERSE?
      </motion.span>

      {/* ── Expanding divider line ── */}
      <div ref={lineRef} style={{ position: 'relative', height: '2px', margin: '1.5rem auto', maxWidth: '500px', overflow: 'visible' }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={lineInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            transformOrigin: 'center',
            background: 'linear-gradient(90deg, transparent, var(--universe-primary), var(--universe-secondary), transparent)',
            boxShadow: '0 0 12px var(--universe-primary)',
          }}
        />
      </div>

      {/* ── Paragraphs ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginTop: '1rem',
        }}
      >
        {PARAGRAPHS.map((p, i) => (
          <AnimatedParagraph key={i} text={p} delay={i * 0.15} />
        ))}
      </div>

      {/* ── Decorative corner spider emblems ── */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '60px',
          opacity: 0.12,
          pointerEvents: 'none',
        }}
      >
        {/* Eight legs radiating */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 360) / 8;
          const rad = (angle * Math.PI) / 180;
          const x2 = 50 + Math.cos(rad) * 44;
          const y2 = 50 + Math.sin(rad) * 44;
          return <line key={i} x1="50" y1="50" x2={x2} y2={y2} stroke="var(--universe-primary)" strokeWidth="2" />;
        })}
        <circle cx="50" cy="50" r="7" fill="var(--universe-primary)" />
      </svg>
    </section>
  );
}
