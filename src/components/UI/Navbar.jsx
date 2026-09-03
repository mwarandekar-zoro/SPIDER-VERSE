import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../Cursor/CursorContext';

const LINKS = [
  { href: '#multiverse', label: 'Explore' },
  { href: '#characters', label: 'Characters' },
  { href: '#compare', label: 'Compare' },
];

export default function Navbar({ onLogoFrenzy, onTriggerChaos }) {
  const { setCursor } = useCursor();
  const clickTimes = useRef([]);

  function handleLogoClick(e) {
    const now = Date.now();
    // Filter clicks in last 1.8s
    clickTimes.current = [...clickTimes.current.filter((t) => now - t < 1800), now];

    // If clicking fast, prevent default navigation
    if (clickTimes.current.length > 1) {
      e.preventDefault();
    }

    if (clickTimes.current.length >= 3) {
      clickTimes.current = [];
      e.preventDefault();
      onLogoFrenzy?.();
    }
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.1rem var(--edge-padding)',
        background: 'linear-gradient(to bottom, rgba(8,7,12,0.85), transparent)',
        pointerEvents: 'none',
      }}
    >
      <a
        href="#hero"
        onClick={handleLogoClick}
        title="5 quick clicks = Multiverse Glitch Frenzy!"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.95rem',
          letterSpacing: '0.02em',
          color: 'var(--color-web)',
          textShadow: '0 0 14px color-mix(in srgb, var(--universe-primary) 55%, transparent)',
          pointerEvents: 'auto',
          transition: 'text-shadow 1.1s var(--ease-signature)',
        }}
        onPointerEnter={() => setCursor('button', 'GLITCH')}
        onPointerLeave={() => setCursor('default')}
      >
        SPIDER-VERSE
      </a>

      <ul style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', listStyle: 'none', flexWrap: 'wrap', pointerEvents: 'auto' }}>
        {LINKS.map((link) => (
          <li key={link.href}>
            <motion.a
              href={link.href}
              className="eyebrow"
              whileHover={{ scale: 1.1, color: '#ffffff', textShadow: '0 0 10px var(--universe-primary)' }}
              transition={{ duration: 0.2 }}
              style={{ color: 'var(--color-web-dim)', display: 'inline-block' }}
              onPointerEnter={() => setCursor('button', '→')}
              onPointerLeave={() => setCursor('default')}
            >
              {link.label}
            </motion.a>
          </li>
        ))}

        <li>
          <motion.button
            onClick={onTriggerChaos}
            title="Trigger Spider-Verse Chaos Mode (or press ↑↑↓↓←→←→BA or type 'spider')"
            whileHover={{ scale: 1.12, boxShadow: '0 0 20px rgba(255,0,85,0.85), 0 0 35px var(--universe-primary)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              border: '1px solid var(--universe-primary)',
              background: 'rgba(255,0,85,0.2)',
              color: '#fff',
              fontSize: '0.65rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.08em',
              boxShadow: '0 0 10px rgba(255,0,85,0.4)',
              transition: 'all 0.25s ease',
            }}
            onPointerEnter={() => setCursor('button', 'CHAOS')}
            onPointerLeave={() => setCursor('default')}
          >
            CHAOS 💥
          </motion.button>
        </li>
      </ul>
    </nav>
  );
}
