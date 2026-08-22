import { spiderPeople } from '../../data/spiderPeople';

/** Section 26: pick two characters to compare. Kept as plain native
 * selects for accessibility and simplicity — no custom dropdown UI
 * needed for two choices. */
export default function ComparisonSelector({ characterIds, onChange }) {
  function handleChange(index, value) {
    const next = [...characterIds];
    next[index] = value || null;
    onChange(next);
  }

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      {[0, 1].map((index) => (
        <select
          key={index}
          value={characterIds[index] ?? ''}
          onChange={(e) => handleChange(index, e.target.value)}
          aria-label={`Select Spider-Person ${index + 1}`}
          style={selectStyle}
        >
          <option value="">Select a Spider-Person...</option>
          {spiderPeople.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}

const selectStyle = {
  background: 'rgba(21, 18, 30, 0.6)',
  border: '1px solid rgba(242, 240, 234, 0.15)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--color-web)',
  padding: '0.65rem 1rem',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.85rem',
  minWidth: '220px',
};
