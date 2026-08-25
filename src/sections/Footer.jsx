import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// Footer — Credits, GitHub, Tech Stack, Fun badge
// ─────────────────────────────────────────────────────────────

const TECH_STACK = [
  { label: 'React 19',       color: '#61dafb' },
  { label: 'Vite 8',         color: '#a259ff' },
  { label: 'Three.js',       color: '#00ff88' },
  { label: 'Framer Motion',  color: '#ff4de7' },
  { label: 'R3F',            color: '#ff7043' },
];

function TechBadge({ label, color }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding: '0.25rem 0.7rem',
        borderRadius: '999px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        fontWeight: 600,
        color,
        background: `${color}18`,
        border: `1px solid ${color}44`,
        letterSpacing: '0.04em',
      }}
    >
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }} />
      {label}
    </span>
  );
}

function SpiderWebSVG() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
      {/* Radial strands from center */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 360) / 12;
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1="100" y1="100"
            x2={100 + Math.cos(rad) * 95}
            y2={100 + Math.sin(rad) * 95}
            stroke="var(--universe-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.3"
          />
        );
      })}
      {/* Concentric web rings */}
      {[20, 40, 60, 80].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="var(--universe-primary)" strokeWidth="0.6" strokeOpacity="0.25" />
      ))}
      <circle cx="100" cy="100" r="5" fill="var(--universe-primary)" fillOpacity="0.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        position: 'relative',
        padding: 'clamp(3rem, 6vh, 5rem) var(--edge-padding) 2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Background web */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-40px',
          right: '-40px',
          width: '220px',
          height: '220px',
          opacity: 0.08,
          pointerEvents: 'none',
        }}
      >
        <SpiderWebSVG />
      </div>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-40px',
          left: '-40px',
          width: '180px',
          height: '180px',
          opacity: 0.06,
          pointerEvents: 'none',
        }}
      >
        <SpiderWebSVG />
      </div>

      {/* Spider-Verse Logo / Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="eyebrow" style={{ marginBottom: '0.5rem', display: 'block' }}>
          🕷️ SPIDER-VERSE EXPLORER
        </span>
        <p style={{ color: 'var(--color-web-dim)', fontSize: '0.85rem', maxWidth: '45ch', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
          A fan-made interactive multiverse explorer celebrating the Spider-Verse films and comics. All characters and universes belong to Marvel.
        </p>
      </motion.div>

      {/* Tech Stack Badges */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.75rem' }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--color-muted)', alignSelf: 'center', marginRight: '0.25rem' }}>
          Built with
        </span>
        {TECH_STACK.map((tech) => (
          <TechBadge key={tech.label} {...tech} />
        ))}
      </motion.div>

      {/* Links Row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}
      >
        <a
          href="https://github.com/mwarandekar-zoro/SPIDER-VERSE"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'var(--universe-primary)',
            textDecoration: 'none',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            border: '1px solid var(--universe-primary)55',
            background: 'var(--universe-primary)11',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--universe-primary)22'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--universe-primary)11'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          View on GitHub
        </a>

        <a
          href="#hero"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'var(--color-muted)',
            textDecoration: 'none',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-web)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted)'}
        >
          ↑ Back to Top
        </a>
      </motion.div>

      {/* "Built with" Claude badge */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: '#d97757',
            background: '#d9775718',
            border: '1px solid #d9775744',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            letterSpacing: '0.04em',
          }}
        >
          ✦ Built with Claude (Anthropic)
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: '#4285f4',
            background: '#4285f418',
            border: '1px solid #4285f444',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            letterSpacing: '0.04em',
          }}
        >
          ✦ Powered by Antigravity IDE
        </span>
      </motion.div>

      {/* Copyright */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--color-muted)',
          letterSpacing: '0.04em',
          opacity: 0.5,
        }}
      >
        © {new Date().getFullYear()} Spider-Verse Explorer · Fan project · Marvel characters © Marvel Entertainment
      </motion.p>
    </footer>
  );
}
