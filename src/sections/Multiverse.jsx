import { universes } from '../data/universes';

/**
 * Content-layer overlay for the multiverse map section. The actual
 * interactive 3D nodes render in the canvas layer behind this.
 *
 * The button row below the heading serves two real purposes, not
 * just one: it's a keyboard/screen-reader-accessible way to enter a
 * universe (WebGL objects aren't natively focusable, so the 3D map
 * alone can't satisfy keyboard navigation — section 38), and it
 * gives mobile users a reliable tap target instead of aiming for a
 * small sphere in a 3D scene (section 35).
 */
export default function Multiverse({ hoveredUniverseId, selectedUniverseId, onSelectUniverse }) {
  const activeId = hoveredUniverseId || selectedUniverseId;
  const active = activeId ? universes.find((u) => u.id === activeId) : null;

  return (
    <section
      id="multiverse"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--edge-padding)',
        gap: '1rem',
        pointerEvents: 'none',
      }}
    >
      <span className="eyebrow">THE MULTIVERSE MAP</span>
      <h2 style={{ fontSize: 'var(--fs-h1)', color: 'var(--color-web)' }}>
        {active?.name ?? 'Hover a node'}
      </h2>
      <p style={{ color: 'var(--color-web-dim)', minHeight: '1.5em' }}>
        {active?.title ?? 'Every glowing point is a universe. Click one to enter.'}
      </p>

      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '0.75rem',
          pointerEvents: 'auto',
        }}
      >
        {universes.map((u) => (
          <button
            key={u.id}
            onClick={() => onSelectUniverse?.(u.id)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              border: `1px solid ${u.theme.primary}55`,
              color: u.theme.primary,
              background: 'rgba(21, 18, 30, 0.5)',
            }}
          >
            {u.name}
          </button>
        ))}
      </div>
    </section>
  );
}
