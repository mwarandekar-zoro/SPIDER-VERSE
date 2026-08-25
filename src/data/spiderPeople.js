// ============================================================
// SPIDER-PEOPLE DATA
// ------------------------------------------------------------
// Per section 7: character info lives here, never hardcoded into
// UI components. Adding a new Spider-Person later means adding an
// entry here — no component changes required.
//
// `suitTheme` drives the whole-app color shift when a character
// is selected.
//
// `image` paths point to face/suit images in /public/images/characters/
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
    suitTheme: { primary: '#ff2222', secondary: '#111111', accent: '#ff6666' },
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
    suitTheme: { primary: '#ff6fd8', secondary: '#e0d0ff', accent: '#ffffff' },
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
    suitTheme: { primary: '#003cff', secondary: '#ff2020', accent: '#00aaff' },
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
    suitTheme: { primary: '#ff9500', secondary: '#2222cc', accent: '#ffcc00' },
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
    suitTheme: { primary: '#cc3300', secondary: '#0033cc', accent: '#ff4422' },
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
    suitTheme: { primary: '#ffdd00', secondary: '#111111', accent: '#ff4400' },
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
    suitTheme: { primary: '#ff6644', secondary: '#ffffff', accent: '#ffaa00' },
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
    suitTheme: { primary: '#aaaaaa', secondary: '#333333', accent: '#ffffff' },
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
    suitTheme: { primary: '#cc0000', secondary: '#ffffff', accent: '#ff4444' },
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
    suitTheme: { primary: '#00ccff', secondary: '#cc0000', accent: '#44eeff' },
  },
];
