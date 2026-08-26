import { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import MultiverseScene from './components/3D/MultiverseScene';
import TransitionOverlay from './components/UI/TransitionOverlay';
import SoundToggle from './components/UI/SoundToggle';
import QualityToggle from './components/UI/QualityToggle';
import Navbar from './components/UI/Navbar';
import LoadingScreen from './components/UI/LoadingScreen';
import IdleManager from './components/UI/IdleManager';
import { CursorProvider } from './components/Cursor/CursorContext';
import CustomCursor from './components/Cursor/CustomCursor';
import Hero from './sections/Hero';
import Multiverse from './sections/Multiverse';
import LoreIntro from './sections/LoreIntro';
import PowersLeaderboard from './sections/PowersLeaderboard';
import UniverseTimeline from './sections/UniverseTimeline';
import Footer from './sections/Footer';
import { detectDefaultQuality } from './utils/deviceQuality';
import { useResponsive } from './hooks/useResponsive';
import { useCharacter } from './hooks/useCharacter';
import { useUniverseTheme } from './hooks/useUniverseTheme';
import { spiderPeople } from './data/spiderPeople';
import { universes } from './data/universes';
import { playSound, stopSound, speakVoice } from './utils/audio';

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

  // When a Spider-Person is selected, push their SUIT colors onto the
  // whole document (via useUniverseTheme) so every --universe-primary /
  // --universe-secondary consumer (nav, buttons, glows, card borders)
  // shifts to match their specific suit — Miles = red/black, Gwen = pink,
  // 2099 = electric blue, etc. Falls back to universe theme if no suitTheme.
  const selectedCharacter = useCharacter(selectedCharacterId);
  const activeTheme = selectedCharacter?.suitTheme ?? selectedCharacter?.universe?.theme ?? null;
  useUniverseTheme(activeTheme);

  // Global button & interactive element click listener — fires synthesized
  // web-shooting "THWIP!" SFX whenever any button or link is clicked
  useEffect(() => {
    function handleGlobalButtonClick(e) {
      const target = e.target.closest('button, a, [role="button"], input, select');
      if (target && soundEnabled) {
        playSound('web', { volume: 0.5 });
      }
    }

    window.addEventListener('pointerdown', handleGlobalButtonClick);
    return () => window.removeEventListener('pointerdown', handleGlobalButtonClick);
  }, [soundEnabled]);

  // Fixed (not re-randomized on every render) set of floating motes —
  // varied positions/sizes/timings so the field reads as organic
  // rather than a repeating pattern. A few use the current universe
  // accent color (subtle nod to the reactive theme system), most
  // stay neutral so the effect doesn't turn into a color wash.
  const motes = useMemo(
    () => [
      { id: 1, x: 8, y: 15, size: 5, duration: 14, delay: 0, driftX: 30, driftY: -70, usesAccent: true },
      { id: 2, x: 22, y: 60, size: 4, duration: 11, delay: 1.5, driftX: -20, driftY: -55, usesAccent: false },
      { id: 3, x: 35, y: 25, size: 6, duration: 16, delay: 3, driftX: 25, driftY: -80, usesAccent: false },
      { id: 4, x: 48, y: 75, size: 4, duration: 13, delay: 0.8, driftX: -35, driftY: -60, usesAccent: true },
      { id: 5, x: 60, y: 40, size: 5, duration: 15, delay: 4.2, driftX: 15, driftY: -75, usesAccent: false },
      { id: 6, x: 72, y: 18, size: 4, duration: 12, delay: 2.1, driftX: -25, driftY: -50, usesAccent: false },
      { id: 7, x: 85, y: 55, size: 6, duration: 17, delay: 0.4, driftX: 20, driftY: -85, usesAccent: true },
      { id: 8, x: 15, y: 85, size: 4, duration: 10, delay: 3.6, driftX: -15, driftY: -45, usesAccent: false },
      { id: 9, x: 90, y: 80, size: 5, duration: 14, delay: 1.2, driftX: -30, driftY: -65, usesAccent: false },
      { id: 10, x: 5, y: 45, size: 4, duration: 13, delay: 5, driftX: 18, driftY: -55, usesAccent: false },
      { id: 11, x: 55, y: 8, size: 5, duration: 16, delay: 2.8, driftX: -20, driftY: -70, usesAccent: true },
      { id: 12, x: 40, y: 92, size: 4, duration: 11, delay: 0.2, driftX: 22, driftY: -50, usesAccent: false },
    ],
    []
  );

  const handleSelectCharacter = useCallback(
    (characterId) => {
      setSelectedCharacterId(characterId);
      if (soundEnabled && characterId) {
        playSound('web', { volume: 0.5 });
        const char = spiderPeople.find((c) => c.id === characterId);
        if (char) {
          speakVoice(`${char.name}, ${char.alias}`);
        }
      }
    },
    [soundEnabled]
  );

  const handleEnterUniverse = useCallback(
    (id) => {
      if (isTransitioning || id === activeUniverseId) return;
      setTargetUniverseId(id);
      setIsTransitioning(true);
      setSelectedUniverseId(id);
      if (soundEnabled) {
        playSound('portal', { volume: 0.5 });
        const uni = universes.find((u) => u.id === id);
        if (uni) {
          speakVoice(`Entering ${uni.name}, ${uni.title}`);
        }
      }
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
      if (next) {
        playSound('ambience', { volume: 0.25, loop: true });
      } else {
        stopSound('ambience');
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      }
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
        previewUniverseId={selectedCharacter?.universe?.id ?? null}
        focusTrigger={selectedCharacterId}
        selectedCharacterSuitTheme={selectedCharacter?.suitTheme ?? null}
        isTransitioning={isTransitioning}
        targetUniverseId={targetUniverseId}
        overlayEl={overlayRef.current}
        onTransitionMidpoint={handleTransitionMidpoint}
        onTransitionComplete={handleTransitionComplete}
      />

      {/* Ambient reactive background — see globals.css. MultiverseScene's
          canvas paints a fully opaque clear-color across the whole
          viewport at z-index 0, so this has to render AFTER it in the
          DOM (same z-index, later wins the stacking order) to actually
          be visible — sitting between the 3D layer and the UI content
          layer (z-index 1) rather than fighting either one. */}
      {/* Animated background: two drifting starfield layers plus a
          handful of individually-floating glowing motes (see
          globals.css). MultiverseScene's canvas clears to an opaque
          color across the whole viewport every frame, so — same as
          before — this has to render AFTER it in the DOM to actually
          be visible on top of it, rather than hidden behind it. */}
      <div className="stars-far" aria-hidden="true" />
      <div className="stars-near" aria-hidden="true" />
      {motes.map((mote) => (
        <span
          key={mote.id}
          className="mote"
          aria-hidden="true"
          style={{
            '--mote-x': `${mote.x}%`,
            '--mote-y': `${mote.y}%`,
            '--mote-size': `${mote.size}px`,
            '--mote-duration': `${mote.duration}s`,
            '--mote-delay': `${mote.delay}s`,
            '--mote-drift-x': `${mote.driftX}px`,
            '--mote-drift-y': `${mote.driftY}px`,
            '--mote-color': mote.usesAccent ? 'var(--universe-primary)' : 'var(--color-web-dim)',
          }}
        />
      ))}

      <Navbar />
      {!isTouch && <CustomCursor />}
      <SoundToggle enabled={soundEnabled} onToggle={handleToggleSound} />
      <QualityToggle quality={quality} onChange={setQuality} />
      <IdleManager />

      <main className="content-layer">
        <Hero onSelectCharacter={handleSelectCharacter} />
        <LoreIntro />
        <Multiverse
          hoveredUniverseId={hoveredUniverseId}
          selectedUniverseId={selectedUniverseId}
          onSelectUniverse={handleEnterUniverse}
        />
        <PowersLeaderboard />
        <UniverseTimeline />
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
        <Footer />
      </main>
    </CursorProvider>
  );
}
