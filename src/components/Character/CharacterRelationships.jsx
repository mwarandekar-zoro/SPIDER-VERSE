/** Section 23: kept simple for v1 — a labeled list, not a graph viz. */
export default function CharacterRelationships({ relationships, onSelectCharacter }) {
  if (!relationships.length) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {relationships.map(({ type, character }) => (
        <button
          key={character.id}
          onClick={() => onSelectCharacter(character.id)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.6rem 0.8rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(242, 240, 234, 0.1)',
            background: 'rgba(21, 18, 30, 0.4)',
            textAlign: 'left',
          }}
        >
          <span style={{ color: 'var(--color-web)', fontSize: '0.875rem' }}>
            {character.name}
          </span>
          <span
            className="eyebrow"
            style={{ fontSize: '0.7rem' }}
          >
            {type}
          </span>
        </button>
      ))}
    </div>
  );
}
