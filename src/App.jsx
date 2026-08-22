import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import MultiverseScene from './components/3D/MultiverseScene';
import TransitionOverlay from './components/UI/TransitionOverlay';
import SoundToggle from './components/UI/SoundToggle';
import QualityToggle from './components/UI/QualityToggle';
import Navbar from './components/UI/Navbar';
import LoadingScreen from './components/UI/LoadingScreen';
import { CursorProvider } from './components/Cursor/CursorContext';
import CustomCursor from './components/Cursor/CustomCursor';
import Hero from './sections/Hero';
import Multiverse from './sections/Multiverse';
import { detectDefaultQuality } from './utils/deviceQuality';
import { useResponsive } from './hooks/useResponsive';
import { playSound, stopSound } from './utils/audio';

// Below-the-fold sections are code-split (section 19: performance /
// bundle size) — none of them are needed for the first paint of the
// hero + multiverse map, so there's no reason to ship their JS upfront.
const CharacterExplorer = lazy(() => import('./sections/CharacterExplorer'));
const CharacterDetail = lazy(() => import('./sections/CharacterDetail'));
const Comparison = lazy(() => import('./sections/Comparison'));

function SectionFallback() {
  return (
    <div
      style={{
        minHeight: '30vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-muted)',
      }}
    >
      <span className="eyebrow">Loading…</span>
    </div>
  );
}

export default function App() {
  const [quality, setQuality] = useState('high');
  const { isTouch, reducedMotion } = useResponsive();
  const [isLoading, setIsLoading] = useState(true);

  const [hoveredUniverseId, setHoveredUniverseId] = useState(null);
  const [selectedUniverseId, setSelectedUniverseId] = useState(null);

  const [activeUniverseId, setActiveUniverseId] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetUniverseId, setTargetUniverseId] = useState(null);
  const overlayRef = useRef(null);

  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [comparisonCharacters, setComparisonCharacters] = useState([]);

  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    setQuality(detectDefaultQuality());
  }, []);

  const handleSelectCharacter = useCallback((characterId) => {
    setSelectedCharacterId(characterId);
  }, []);

  const handleEnterUniverse = useCallback(
    (id) => {
      if (isTransitioning || id === activeUniverseId) return;
      setTargetUniverseId(id);
      setIsTransitioning(true);
      setSelectedUniverseId(id);
      if (soundEnabled) playSound('portal', { volume: 0.4 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [isTransitioning, activeUniverseId, soundEnabled]
  );

  const handleTransitionMidpoint = useCallback(() => {
    setActiveUniverseId(targetUniverseId);
  }, [targetUniverseId]);

  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  const handleCompare = useCallback((characterId) => {
    setComparisonCharacters((prev) => {
      if (prev.includes(characterId)) return prev;
      return [...prev, characterId].slice(-2);
    });
  }, []);

  function handleToggleSound() {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) playSound('ambience', { volume: 0.25, loop: true });
      else stopSound('ambience');
      return next;
    });
  }

  return (
    <CursorProvider>
      <a href="#characters" className="skip-link">
        Skip to character explorer
      </a>

      {isLoading && (
        <LoadingScreen skipAnimation={reducedMotion} onComplete={() => setIsLoading(false)} />
      )}

      <TransitionOverlay ref={overlayRef} />

      <MultiverseScene
        quality={quality}
        hoveredUniverseId={hoveredUniverseId}
        selectedUniverseId={selectedUniverseId}
        onHoverUniverse={setHoveredUniverseId}
        onSelectUniverse={handleEnterUniverse}
        activeUniverseId={activeUniverseId}
        isTransitioning={isTransitioning}
        targetUniverseId={targetUniverseId}
        overlayEl={overlayRef.current}
        onTransitionMidpoint={handleTransitionMidpoint}
        onTransitionComplete={handleTransitionComplete}
      />

      <Navbar />
      {!isTouch && <CustomCursor />}
      <SoundToggle enabled={soundEnabled} onToggle={handleToggleSound} />
      <QualityToggle quality={quality} onChange={setQuality} />

      <main className="content-layer">
        <Hero />
        <Multiverse
          hoveredUniverseId={hoveredUniverseId}
          selectedUniverseId={selectedUniverseId}
          onSelectUniverse={handleEnterUniverse}
        />
        <Suspense fallback={<SectionFallback />}>
          <CharacterExplorer onSelectCharacter={handleSelectCharacter} />
          <CharacterDetail
            selectedCharacterId={selectedCharacterId}
            onSelectCharacter={handleSelectCharacter}
            onExploreUniverse={handleEnterUniverse}
            onCompare={handleCompare}
            onClose={() => setSelectedCharacterId(null)}
          />
          <Comparison
            comparisonCharacters={comparisonCharacters}
            onChangeComparison={setComparisonCharacters}
          />
        </Suspense>
      </main>
    </CursorProvider>
  );
}
