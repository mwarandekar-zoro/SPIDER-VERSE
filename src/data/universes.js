// ============================================================
// UNIVERSE DATA
// ------------------------------------------------------------
// Full dataset per section 8 of the spec. The 3D multiverse map
// (Phase 6) only ever needed position/theme; everything else here
// is consumed by the Universe Explorer / character profile screens
// added in this phase, without touching how the map renders.
// ============================================================

export const universes = [
  {
    id: 'earth-1610',
    name: 'Earth-1610',
    title: 'Ultimate Universe',
    description:
      'A Brooklyn-rooted reality where a second Spider-Man rose after Peter Parker\u2019s death, carrying the mantle into a new generation.',
    characterIds: ['miles-morales'],
    position: [-3.2, 0.6, -1],
    environment: '/models/environments/brooklyn.glb',
    theme: { primary: '#ff3b3b', secondary: '#1e90ff' },
    atmosphere: 'Graffiti-lined streets, dusk skyline, red and blue neon bleeding into fog.',
  },
  {
    id: 'earth-65',
    name: 'Earth-65',
    title: "Gwen's Dimension",
    description:
      'A reality painted in watercolor and motion-trail light, where Gwen Stacy became the Spider-Woman of her world.',
    characterIds: ['gwen-stacy'],
    position: [3.2, 0.9, -1.4],
    environment: '/models/environments/earth65.glb',
    theme: { primary: '#ff5fd1', secondary: '#a259ff' },
    atmosphere: 'Splashes of pink and violet pigment, drumbeats, ink-bloom transitions.',
  },
  {
    id: 'earth-928',
    name: 'Earth-928',
    title: '2099 Alliance',
    description:
      'A high-tech future ruled by corporations, where Miguel O\u2019Hara leads the Spider-Society from a holographic command hub.',
    characterIds: ['miguel-ohara'],
    position: [0, 2.4, -2.6],
    environment: '/models/environments/earth928.glb',
    theme: { primary: '#00f0ff', secondary: '#0a4d68' },
    atmosphere: 'Chrome towers, holographic UI panels, cold cyan light.',
  },
  {
    id: 'earth-50101',
    name: 'Earth-50101',
    title: 'Mumbattan',
    description:
      'A fusion of Mumbai and Manhattan, home to Pavitr Prabhakar\u2019s vibrant, mythologically-inflected Spider-Man.',
    characterIds: ['pavitr-prabhakar'],
    position: [-1.6, -1.8, -1.8],
    environment: '/models/environments/earth50101.glb',
    theme: { primary: '#ff9d2f', secondary: '#e50914' },
    atmosphere: 'Warm gold light, comic-panel linework, marketplace energy.',
  },
  {
    id: 'earth-616',
    name: 'Earth-616',
    title: 'Prime Universe',
    description:
      'The original reality \u2014 home to Peter B. Parker, older and wearier, but still swinging.',
    characterIds: ['peter-b-parker'],
    position: [1.8, -1.6, -2.2],
    environment: '/models/environments/earth616.glb',
    theme: { primary: '#e50914', secondary: '#1e90ff' },
    atmosphere: 'Familiar Manhattan skyline, muted and a little worn around the edges.',
  },
];
