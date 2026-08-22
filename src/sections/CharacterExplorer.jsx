import { useMemo, useState } from 'react';
import { spiderPeople } from '../data/spiderPeople';
import { universes } from '../data/universes';
import { powers } from '../data/powers';
import SearchBar from '../components/UI/SearchBar';
import CharacterCard from '../components/Character/CharacterCard';

/**
 * Section 18/19/24/25: browsable character grid with search plus
 * universe and power filters, kept simple per section 25 — chips
 * for universe (single-select), a plain select for power.
 */
export default function CharacterExplorer({ onSelectCharacter }) {
  const [query, setQuery] = useState('');
  const [universeFilter, setUniverseFilter] = useState(null);
  const [powerFilter, setPowerFilter] = useState('');

  const usedPowers = useMemo(() => {
    const ids = new Set();
    spiderPeople.forEach((c) => c.powerIds.forEach((id) => ids.add(id)));
    return powers.filter((p) => ids.has(p.id));
  }, []);

  const filteredIds = useMemo(() => {
    const q = query.trim().toLowerCase();

    return spiderPeople
      .filter((character) => {
        if (universeFilter && character.universeId !== universeFilter) return false;
        if (powerFilter && !character.powerIds.includes(powerFilter)) return false;
        if (!q) return true;

        const universe = universes.find((u) => u.id === character.universeId);
        const haystack = [character.name, character.alias, universe?.name, universe?.title]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      })
      .map((c) => c.id);
  }, [query, universeFilter, powerFilter]);

  return (
    <section
      id="characters"
      style={{
        minHeight: '100vh',
        padding: 'clamp(4rem, 8vw, 6rem) var(--edge-padding)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <span className="eyebrow">Character Explorer</span>
        <h2 style={{ fontSize: 'var(--fs-h1)', color: 'var(--color-web)', marginTop: '0.4rem' }}>
          SPIDER-PEOPLE
        </h2>
      </div>

      <SearchBar value={query} onChange={setQuery} placeholder="Search by name, alias, or universe..." />

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <FilterChip active={!universeFilter} onClick={() => setUniverseFilter(null)}>
          All Universes
        </FilterChip>
        {universes.map((u) => (
          <FilterChip
            key={u.id}
            active={universeFilter === u.id}
            onClick={() => setUniverseFilter(u.id)}
            accent={u.theme.primary}
          >
            {u.name}
          </FilterChip>
        ))}
      </div>

      <select
        value={powerFilter}
        onChange={(e) => setPowerFilter(e.target.value)}
        aria-label="Filter by power"
        style={selectStyle}
      >
        <option value="">All Powers</option>
        {usedPowers.map((p) => (
          <option key={p.id} value={p.id}>
            {p.icon} {p.name}
          </option>
        ))}
      </select>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.25rem',
          width: '100%',
          maxWidth: '1100px',
        }}
      >
        {filteredIds.map((id) => (
          <CharacterCard key={id} characterId={id} onSelect={onSelectCharacter} />
        ))}
      </div>

      {filteredIds.length === 0 && (
        <p style={{ color: 'var(--color-muted)' }}>No Spider-People match these filters.</p>
      )}
    </section>
  );
}

function FilterChip({ active, onClick, children, accent = '#b026ff' }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        padding: '0.4rem 0.9rem',
        borderRadius: '999px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        border: `1px solid ${active ? accent : 'rgba(242,240,234,0.15)'}`,
        color: active ? accent : 'var(--color-web-dim)',
        background: active ? `${accent}1a` : 'transparent',
      }}
    >
      {children}
    </button>
  );
}

const selectStyle = {
  background: 'rgba(21, 18, 30, 0.6)',
  border: '1px solid rgba(242, 240, 234, 0.15)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--color-web)',
  padding: '0.55rem 0.9rem',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8rem',
};
