const LEVELS = ['low', 'medium', 'high'];

/** Section 37: lets the user override the auto-detected quality
 * tier from utils/deviceQuality.js. */
export default function QualityToggle({ quality, onChange }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        right: '5rem',
        zIndex: 40,
        display: 'flex',
        gap: '0.25rem',
        background: 'rgba(21, 18, 30, 0.7)',
        border: '1px solid rgba(242, 240, 234, 0.2)',
        borderRadius: '999px',
        padding: '0.3rem',
        backdropFilter: 'blur(6px)',
      }}
    >
      {LEVELS.map((level) => (
        <button
          key={level}
          onClick={() => onChange(level)}
          aria-pressed={quality === level}
          aria-label={`${level} quality`}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            fontSize: '0.65rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            color: quality === level ? '#08070c' : 'var(--color-web-dim)',
            background: quality === level ? 'var(--color-rift)' : 'transparent',
          }}
        >
          {level[0].toUpperCase()}
        </button>
      ))}
    </div>
  );
}
