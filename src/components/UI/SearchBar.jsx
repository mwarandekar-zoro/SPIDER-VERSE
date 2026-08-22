export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        border: '1px solid rgba(242, 240, 234, 0.15)',
        borderRadius: 'var(--radius-md)',
        padding: '0.65rem 1rem',
        background: 'rgba(21, 18, 30, 0.6)',
        maxWidth: '360px',
        width: '100%',
      }}
    >
      <span aria-hidden="true" style={{ color: 'var(--color-muted)' }}>
        ⌕
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--color-web)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
        }}
      />
    </div>
  );
}
