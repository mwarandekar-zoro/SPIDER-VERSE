import { useMemo } from 'react';
import { spiderPeople } from '../data/spiderPeople';
import { powers } from '../data/powers';
import { universes } from '../data/universes';
import { relationships } from '../data/relationships';

/**
 * Resolves a character id into a fully joined record: the base
 * character fields, its powers looked up from powers.js, its
 * universe looked up from universes.js, and its relationship edges
 * with the related character's name attached. Components consume
 * this instead of reaching into raw data files themselves.
 */
export function useCharacter(characterId) {
  return useMemo(() => {
    if (!characterId) return null;

    const character = spiderPeople.find((c) => c.id === characterId);
    if (!character) return null;

    const resolvedPowers = character.powerIds
      .map((id) => powers.find((p) => p.id === id))
      .filter(Boolean);

    const universe = universes.find((u) => u.id === character.universeId) ?? null;

    const resolvedRelationships = relationships
      .filter((r) => r.characterId === characterId)
      .map((r) => ({
        type: r.type,
        character: spiderPeople.find((c) => c.id === r.relatedId) ?? null,
      }))
      .filter((r) => r.character);

    return {
      ...character,
      powers: resolvedPowers,
      universe,
      relationships: resolvedRelationships,
    };
  }, [characterId]);
}
