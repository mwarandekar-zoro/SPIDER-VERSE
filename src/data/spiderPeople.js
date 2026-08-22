// ============================================================
// SPIDER-PEOPLE DATA
// ------------------------------------------------------------
// Per section 7: character info lives here, never hardcoded into
// UI components. Adding a new Spider-Person later means adding an
// entry here — no component changes required.
//
// Stats are explicitly project-defined visualization values for
// this experience, not canonical/official power rankings.
// ============================================================

export const spiderPeople = [
  {
    id: 'miles-morales',
    name: 'Miles Morales',
    alias: 'Spider-Man',
    universeId: 'earth-1610',
    origin: 'Brooklyn, New York',
    description:
      'A young Spider-Man balancing school, family, and a second chance at heroism he never expected to inherit.',
    powerIds: ['spider-sense', 'wall-crawling', 'venom-blast', 'camouflage'],
    stats: { strength: 85, speed: 90, agility: 95, intelligence: 90 },
    model: '/models/characters/miles.glb',
    image: '/images/characters/miles.jpg',
  },
  {
    id: 'gwen-stacy',
    name: 'Gwen Stacy',
    alias: 'Spider-Woman',
    universeId: 'earth-65',
    origin: 'Earth-65, New York',
    description:
      'A drummer and hero moving between the beat of her band and the rhythm of a city that needs saving.',
    powerIds: ['spider-sense', 'wall-crawling', 'enhanced-agility', 'web-shooting'],
    stats: { strength: 78, speed: 92, agility: 97, intelligence: 85 },
    model: '/models/characters/gwen.glb',
    image: '/images/characters/gwen.jpg',
  },
  {
    id: 'miguel-ohara',
    name: "Miguel O'Hara",
    alias: 'Spider-Man 2099',
    universeId: 'earth-928',
    origin: 'Nueva York, 2099',
    description:
      'A geneticist-turned-hero leading a society of Spider-People across the multiverse, carrying its weight alone.',
    powerIds: ['spider-sense', 'wall-crawling', 'fangs-claws', 'neural-interface'],
    stats: { strength: 90, speed: 88, agility: 89, intelligence: 96 },
    model: '/models/characters/miguel.glb',
    image: '/images/characters/miguel.jpg',
  },
  {
    id: 'pavitr-prabhakar',
    name: 'Pavitr Prabhakar',
    alias: 'Spider-Man India',
    universeId: 'earth-50101',
    origin: 'Mumbattan',
    description:
      'A spirited hero whose acrobatics and heart make him one of the most beloved Spider-People across the multiverse.',
    powerIds: ['spider-sense', 'wall-crawling', 'web-shooting', 'yoga-agility'],
    stats: { strength: 80, speed: 87, agility: 96, intelligence: 82 },
    model: '/models/characters/pavitr.glb',
    image: '/images/characters/pavitr.jpg',
  },
  {
    id: 'peter-b-parker',
    name: 'Peter B. Parker',
    alias: 'Spider-Man',
    universeId: 'earth-616',
    origin: 'New York City',
    description:
      'An older, wearier Spider-Man rediscovering why he put on the mask in the first place.',
    powerIds: ['spider-sense', 'wall-crawling', 'web-shooting', 'improvised-tech'],
    stats: { strength: 83, speed: 80, agility: 84, intelligence: 88 },
    model: '/models/characters/peter.glb',
    image: '/images/characters/peter.jpg',
  },
];
