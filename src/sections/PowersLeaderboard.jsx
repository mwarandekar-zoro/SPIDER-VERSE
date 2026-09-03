import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { spiderPeople } from '../data/spiderPeople';
import TextScramble from '../components/UI/TextScramble';
import ScrollSkewSection from '../components/UI/ScrollSkewSection';

// ─────────────────────────────────────────────────────────────
// Powers Leaderboard
// Ranks all 10 Spider-People by a selectable stat.
// Animated bar race on tab switch + scroll-triggered entrance.
// ─────────────────────────────────────────────────────────────

const STATS = [
  { key: 'strength', label: 'Strength', icon: '💪' },
  { key: 'speed',    label: 'Speed',    icon: '⚡' },
  { key: 'agility',  label: 'Agility',  icon: '🕷️' },
  { key: 'intelligence', label: 'Intelligence', icon: '🧠' },
];

function LeaderboardRow({ character, rank, value, max, index, activeStat }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-40px' });
  const pct = Math.round((value / max) * 100);
  const primary = character.suitTheme?.primary ?? '#b026ff';

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      whileHover={{
        x: 6,
        scale: 1.015,
        backgroundColor: `${primary}22`,
        borderColor: primary,
        boxShadow: `0 0 20px ${primary}33`,
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        display: 'grid',
        gridTemplateColumns: '2rem 50px 1fr auto',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.6rem 0.9rem',
        borderRadius: 'var(--radius-sm)',
        background: rank === 1 ? `${primary}18` : 'rgba(255,255,255,0.025)',
        border: rank === 1 ? `1px solid ${primary}44` : '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Rank Medal / Number */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          color: rank <= 3 ? primary : 'var(--color-muted)',
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        {rank <= 3 ? medals[rank - 1] : `#${rank}`}
      </span>

      {/* Character Thumbnail */}
      <div
        style={{
          width: '42px',
          height: '50px',
          borderRadius: '4px',
          overflow: 'hidden',
          border: `1px solid ${primary}44`,
          flexShrink: 0,
        }}
      >
        {character.image ? (
          <img
            src={character.image}
            alt={character.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', background: `${primary}22` }}>🕷️</div>
        )}
      </div>

      {/* Name + Bar */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: rank === 1 ? '#fff' : 'var(--color-web-dim)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {character.name}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: primary, marginLeft: '0.5rem', flexShrink: 0 }}>
            {value}
          </span>
        </div>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.07)', borderRadius: '999px', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${pct}%` } : { width: 0 }}
            transition={{ duration: 0.7, delay: index * 0.06 + 0.1, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${primary}cc, ${primary})`,
              boxShadow: rank === 1 ? `0 0 10px ${primary}` : 'none',
            }}
          />
        </div>
      </div>

      {/* Universe badge */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        color: 'var(--color-muted)',
        whiteSpace: 'nowrap',
      }}>
        {character.universeId?.toUpperCase()}
      </span>
    </motion.div>
  );
}

export default function PowersLeaderboard() {
  const [activeStat, setActiveStat] = useState('strength');
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  const sorted = [...spiderPeople].sort((a, b) => (b.stats?.[activeStat] ?? 0) - (a.stats?.[activeStat] ?? 0));
  const max = sorted[0]?.stats?.[activeStat] ?? 100;
  const statInfo = STATS.find((s) => s.key === activeStat);

  return (
    <ScrollSkewSection>
    <section
      id="leaderboard"
      style={{
        padding: 'clamp(4rem, 8vh, 7rem) var(--edge-padding)',
        maxWidth: '900px',
        margin: '0 auto',
        zIndex: 1,
        position: 'relative',
      }}
    >
      {/* ── Header ── */}
      <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <TextScramble
          text="POWERS LEADERBOARD"
          as="span"
          className="eyebrow scramble-heading"
          speed={30}
          delay={100}
        />
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: 'var(--fs-h2)', color: 'var(--color-web)', margin: '0.5rem 0 1rem' }}
        >
          Who's the most {statInfo?.label.toLowerCase()}?
        </motion.h2>

        {/* ── Stat Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {STATS.map((stat) => {
            const isActive = stat.key === activeStat;
            return (
              <motion.button
                key={stat.key}
                onClick={() => setActiveStat(stat.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 700 : 500,
                  border: `1px solid ${isActive ? 'var(--universe-primary)' : 'rgba(255,255,255,0.15)'}`,
                  color: isActive ? '#fff' : 'var(--color-muted)',
                  background: isActive ? 'var(--universe-primary)' : 'rgba(255,255,255,0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 0 16px var(--universe-primary)55' : 'none',
                }}
              >
                {stat.icon} {stat.label}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* ── Leaderboard Rows ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {sorted.map((char, idx) => (
          <LeaderboardRow
            key={char.id}
            character={char}
            rank={idx + 1}
            value={char.stats?.[activeStat] ?? 0}
            max={max}
            index={idx}
            activeStat={activeStat}
          />
        ))}
      </div>

      {/* ── Teaser line to Comparison section ── */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'var(--color-muted)',
        }}
      >
        Want a side-by-side? Head to the{' '}
        <a href="#compare" style={{ color: 'var(--universe-primary)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          Compare section ↓
        </a>
      </motion.p>
    </section>
    </ScrollSkewSection>
  );
}

