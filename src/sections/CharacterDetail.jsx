import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import CharacterProfile from '../components/Character/CharacterProfile';

/**
 * Section 20/10 (phase goal): full character detail experience.
 * Renders nothing when no character is selected, so it doesn't
 * take up scroll space until it's relevant.
 */
export default function CharacterDetail({
  selectedCharacterId,
  onSelectCharacter,
  onExploreUniverse,
  onCompare,
  onClose,
}) {
  useEffect(() => {
    if (selectedCharacterId) {
      // Small timeout or requestAnimationFrame ensures layout has finished calculation
      const element = document.getElementById('character-detail');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedCharacterId]);

  if (!selectedCharacterId) return null;

  return (
    <section
      id="character-detail"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(3rem, 8vw, 5rem) var(--edge-padding)',
      }}
    >
      <AnimatePresence mode="wait">
        <CharacterProfile
          characterId={selectedCharacterId}
          onSelectCharacter={onSelectCharacter}
          onExploreUniverse={onExploreUniverse}
          onCompare={onCompare}
          onClose={onClose}
        />
      </AnimatePresence>
    </section>
  );
}

