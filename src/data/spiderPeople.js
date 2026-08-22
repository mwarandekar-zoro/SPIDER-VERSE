// ============================================================
// SPIDER-PEOPLE DATA
// ------------------------------------------------------------
// Per section 7: character info lives here, never hardcoded into
// UI components. Adding a new Spider-Person later means adding an
// entry here — no component changes required.
//
// Stats are explicitly project-defined visualization values for
// this experience, not canonical/official power rankings.
//
// `image` paths point into /public/images/characters/ — these
// files are NOT included here (real character art can't be
// auto-generated/sourced for you). Drop your own images at these
// exact paths and CharacterCard/CharacterProfile will pick them up.
// Until then, components fall back to the generated color-gradient
// placeholder so nothing breaks with a missing file.
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
  {
    id: 'hobie-brown',
    name: 'Hobie Brown',
    alias: 'Spider-Punk',
    universeId: 'earth-138',
    origin: 'London, Earth-138',
    description:
      'A guitar-wielding anarchist who fights corrupt authority as hard as he fights the Inheritors — rules are just another thing to smash.',
    powerIds: ['spider-sense', 'wall-crawling', 'sonic-blast', 'anti-authority-instinct'],
    stats: { strength: 79, speed: 86, agility: 91, intelligence: 84 },
    model: '/models/characters/hobie.glb',
    image: '/images/characters/hobie.jpg',
  },
  {
    id: 'peter-porker',
    name: 'Peter Porker',
    alias: 'Spider-Ham',
    universeId: 'earth-8311',
    origin: 'Earth-8311',
    description:
      "A cartoon world's answer to Spider-Man, where the laws of physics bend to whatever's funniest — and most useful in a fight.",
    powerIds: ['spider-sense', 'wall-crawling', 'toon-physics', 'slapstick-reflexes'],
    stats: { strength: 70, speed: 82, agility: 93, intelligence: 75 },
    model: '/models/characters/peter-porker.glb',
    image: '/images/characters/peter-porker.jpg',
  },
  {
    id: 'spider-man-noir',
    name: 'Spider-Man Noir',
    alias: 'Spider-Man',
    universeId: 'earth-90214',
    origin: 'New York City, 1933',
    description:
      'A grim, black-and-white detective-hero working a Depression-era New York where the mob is as dangerous as anything from another dimension.',
    powerIds: ['spider-sense', 'wall-crawling', 'detective-instinct', 'shadow-step'],
    stats: { strength: 81, speed: 76, agility: 85, intelligence: 89 },
    model: '/models/characters/noir.glb',
    image: '/images/characters/noir.jpg',
  },
  {
    id: 'takuya-yamashiro',
    name: 'Takuya Yamashiro',
    alias: 'Spider-Man',
    universeId: 'earth-51778',
    origin: 'Japan, Earth-51778',
    description:
      'A motocross racer bonded with an alien power bracelet, commanding a giant robot alongside his own spider-abilities.',
    powerIds: ['spider-sense', 'wall-crawling', 'martial-arts', 'giant-mode'],
    stats: { strength: 88, speed: 84, agility: 87, intelligence: 80 },
    model: '/models/characters/takuya.glb',
    image: '/images/characters/takuya.jpg',
  },
  {
    id: 'cyborg-spider-man',
    name: 'Peter Parker',
    alias: 'Cyborg-Spider-Man',
    universeId: 'earth-15',
    origin: 'Earth-15',
    description:
      "A version of Peter fused with cybernetic enhancements after a battle that nearly killed him — colder, harder, and built for a war he never stopped fighting.",
    powerIds: ['spider-sense', 'wall-crawling', 'cyber-armor', 'systems-override'],
    stats: { strength: 93, speed: 85, agility: 82, intelligence: 91 },
    model: '/models/characters/cyborg.glb',
    image: '/images/characters/cyborg.jpg',
  },
];
