import { useCursor } from '../Cursor/CursorContext';

const LINKS = [
  { href: '#multiverse', label: 'Explore' },
  { href: '#characters', label: 'Characters' },
  { href: '#compare', label: 'Compare' },
];

/** Section 48: kept minimal — a wordmark and a few section links.
 * The bar itself has pointer-events: none so it never blocks the
 * 3D scene beneath it; only its own children re-enable pointer events. */
export default function Navbar() {
  const { setCursor } = useCursor();

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
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.95rem',
          letterSpacing: '0.02em',
          color: 'var(--color-web)',
          pointerEvents: 'auto',
        }}
        onPointerEnter={() => setCursor('button', '→')}
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
