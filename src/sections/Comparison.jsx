import ComparisonSelector from '../components/Comparison/ComparisonSelector';
import ComparisonPanel from '../components/Comparison/ComparisonPanel';

export default function Comparison({ comparisonCharacters, onChangeComparison }) {
  const [idA, idB] = comparisonCharacters;

  return (
    <section
      id="compare"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        padding: 'clamp(3rem, 8vw, 5rem) var(--edge-padding)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <span className="eyebrow">Compare Spider-People</span>
        <h2 style={{ fontSize: 'var(--fs-h1)', color: 'var(--color-web)', marginTop: '0.4rem' }}>
          WHO STANDS OUT?
        </h2>
      </div>

      <ComparisonSelector characterIds={comparisonCharacters} onChange={onChangeComparison} />

      <ComparisonPanel characterIdA={idA} characterIdB={idB} />
    </section>
  );
}
