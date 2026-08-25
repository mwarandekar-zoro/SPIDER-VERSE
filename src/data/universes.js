// ============================================================
// UNIVERSE DATA
// ------------------------------------------------------------
// Full dataset per section 8 of the spec.
// Includes position, theme, description, atmosphere, characterIds,
// and stat metrics (danger, tech, tone) for the Multiverse Map.
// ============================================================

export const universes = [
  {
    id: 'earth-1610',
    name: 'Earth-1610',
    title: 'Ultimate Universe',
    description:
      'A Brooklyn-rooted reality where a second Spider-Man rose after Peter Parker’s death, carrying the mantle into a new generation.',
    characterIds: ['miles-morales'],
    position: [-3.2, 0.6, -1],
    environment: '/models/environments/brooklyn.glb',
    theme: { primary: '#ff3b3b', secondary: '#1e90ff' },
    atmosphere: 'Graffiti-lined streets, dusk skyline, red and blue neon bleeding into fog.',
    stats: { danger: 75, tech: 65, tone: 'Heroic / Modern' },
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
    stats: { danger: 60, tech: 55, tone: 'Vibrant / Pastel' },
  },
  {
    id: 'earth-928',
    name: 'Earth-928',
    title: '2099 Alliance',
    description:
      'A high-tech future ruled by corporations, where Miguel O’Hara leads the Spider-Society from a holographic command hub.',
    characterIds: ['miguel-ohara'],
    position: [0, 2.4, -2.6],
    environment: '/models/environments/earth928.glb',
    theme: { primary: '#00f0ff', secondary: '#0a4d68' },
    atmosphere: 'Chrome towers, holographic UI panels, cold cyan light.',
    stats: { danger: 90, tech: 100, tone: 'Cyberpunk HUD' },
  },
  {
    id: 'earth-50101',
    name: 'Earth-50101',
    title: 'Mumbattan',
    description:
      'A fusion of Mumbai and Manhattan, home to Pavitr Prabhakar’s vibrant, mythologically-inflected Spider-Man.',
    characterIds: ['pavitr-prabhakar'],
    position: [-1.6, -1.8, -1.8],
    environment: '/models/environments/earth50101.glb',
    theme: { primary: '#ff9d2f', secondary: '#e50914' },
    atmosphere: 'Warm gold light, comic-panel linework, marketplace energy.',
    stats: { danger: 70, tech: 60, tone: 'Mythic / Energetic' },
  },
  {
    id: 'earth-616',
    name: 'Earth-616',
    title: 'Prime Universe',
    description:
      'The original reality — home to Peter B. Parker, older and wearier, but still swinging.',
    characterIds: ['peter-b-parker'],
    position: [1.8, -1.6, -2.2],
    environment: '/models/environments/earth616.glb',
    theme: { primary: '#e50914', secondary: '#1e90ff' },
    atmosphere: 'Familiar Manhattan skyline, muted and a little worn around the edges.',
    stats: { danger: 80, tech: 75, tone: 'Classic Comic' },
  },
  {
    id: 'earth-138',
    name: 'Earth-138',
    title: 'Punk Rock Dimension',
    description:
      'A reality under an authoritarian crackdown, where Hobie Brown’s Spider-Punk fights the system with feedback and fury.',
    characterIds: ['hobie-brown'],
    position: [4.6, -0.6, -1.6],
    environment: '/models/environments/earth138.glb',
    theme: { primary: '#ffe600', secondary: '#101010' },
    atmosphere: 'Torn concert posters, distorted amp static, spray-paint yellow-on-black.',
    stats: { danger: 85, tech: 50, tone: 'Anarchic / Raw' },
  },
  {
    id: 'earth-8311',
    name: 'Earth-8311',
    title: 'Toonverse',
    description:
      'A cartoon reality of squash-and-stretch logic, where Peter Porker swings between gag physics and genuine heart.',
    characterIds: ['peter-porker'],
    position: [-4.4, 1.6, -2],
    environment: '/models/environments/earth8311.glb',
    theme: { primary: '#ff7a00', secondary: '#ffd400' },
    atmosphere: 'Bright flat colors, bouncy line-art, exaggerated motion trails.',
    stats: { danger: 35, tech: 40, tone: 'Slapstick Gag' },
  },
  {
    id: 'earth-90214',
    name: 'Earth-90214',
    title: 'Noir City',
    description:
      'A Depression-era New York rendered almost entirely in shadow, where this Spider-Man works cases the police won’t touch.',
    characterIds: ['spider-man-noir'],
    position: [3.8, 2.2, -2.4],
    environment: '/models/environments/earth90214.glb',
    theme: { primary: '#c9c9c9', secondary: '#1a1a1a' },
    atmosphere: 'Rain-slicked streets, harsh streetlamp contrast, drifting cigarette smoke.',
    stats: { danger: 92, tech: 30, tone: 'Gritty Noir' },
  },
  {
    id: 'earth-51778',
    name: 'Earth-51778',
    title: 'Nikko Prefecture',
    description:
      'A reality where an alien bracelet grants spider-abilities and command of a colossal robot, Leopardon, to defend the Earth.',
    characterIds: ['takuya-yamashiro'],
    position: [-2.4, -2.6, -1.4],
    environment: '/models/environments/earth51778.glb',
    theme: { primary: '#ff2e2e', secondary: '#2e2eff' },
    atmosphere: 'Chrome and neon tokusatsu skyline, roaring engines, giant-scale silhouettes.',
    stats: { danger: 88, tech: 95, tone: 'Tokusatsu Mecha' },
  },
  {
    id: 'earth-15',
    name: 'Earth-15',
    title: 'Wartorn Dimension',
    description:
      'A battle-scarred reality where Peter survived only by becoming something harder — part man, part machine.',
    characterIds: ['cyborg-spider-man'],
    position: [0.6, 3.2, -1.8],
    environment: '/models/environments/earth15.glb',
    theme: { primary: '#5b6b7a', secondary: '#ff2d2d' },
    atmosphere: 'Rust and static, exposed circuitry glow, a city still smoking from the last fight.',
    stats: { danger: 98, tech: 90, tone: 'Post-Apocalyptic' },
  },
];
