import { useRef } from 'react';
import { useCursor } from '../Cursor/CursorContext';

const LINKS = [
  { href: '#multiverse', label: 'Explore' },
  { href: '#characters', label: 'Characters' },
  { href: '#compare', label: 'Compare' },
];

export default function Navbar({ onLogoFrenzy }) {
  const { setCursor } = useCursor();
  const clickTimes = useRef([]);

  function handleLogoClick(e) {
    const now = Date.now();
    clickTimes.current = [...clickTimes.current.filter((t) => now - t < 1500), now];

    if (clickTimes.current.length >= 5) {
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

      <ul style={{ display: 'flex', gap: '1.4rem', listStyle: 'none', flexWrap: 'wrap', pointerEvents: 'auto' }}>
        {LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="eyebrow"
              style={{ color: 'var(--color-web-dim)' }}
              onPointerEnter={() => setCursor('button', '→')}
              onPointerLeave={() => setCursor('default')}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
