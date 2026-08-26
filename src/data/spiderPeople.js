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
    comic: {
      title: 'Miles Morales — Marvel Official',
      url: 'https://www.marvel.com/characters/spider-man-miles-morales',
    },
    movies: [
      {
        title: 'Spider-Man: Into the Spider-Verse (2018)',
        url: 'https://www.sonypictures.com/movies/spidermanintothespiderverse',
      },
      {
        title: 'Spider-Man: Across the Spider-Verse (2023)',
        url: 'https://www.sonypictures.com/movies/spidermanacrossthespiderverse',
      },
      {
        title: 'Spider-Man: Beyond the Spider-Verse (June 18, 2027)',
        url: 'https://www.sonypicturesanimation.com/projects/films/spider-man-beyond-spider-verse',
      },
    ],
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
    comic: {
      title: 'Ghost-Spider (Gwen Stacy) — Marvel Official',
      url: 'https://www.marvel.com/characters/ghost-spider-gwen-stacy',
    },
    movies: [
      {
        title: 'Spider-Man: Into the Spider-Verse (2018)',
        url: 'https://www.sonypictures.com/movies/spidermanintothespiderverse',
      },
      {
        title: 'Spider-Man: Across the Spider-Verse (2023)',
        url: 'https://www.sonypictures.com/movies/spidermanacrossthespiderverse',
      },
      {
        title: 'Spider-Man: Beyond the Spider-Verse (Upcoming)',
        url: 'https://www.sonypicturesanimation.com/projects/films/spider-man-beyond-spider-verse',
      },
    ],
  },
  {
    id: 'miguel-ohara',
    name: "Miguel O'Hara",
    alias: 'Spider-Man 2099',
    universeId: 'earth-928',
    origin: 'Nueva York, 2099',
    description:
      'A geneticist-turned-hero leading a society of Spider-People across the multiverse with his AI companion Lyla.',
    powerIds: ['spider-sense', 'wall-crawling', 'fangs-claws', 'neural-interface'],
    stats: { strength: 90, speed: 88, agility: 89, intelligence: 96 },
    model: '/models/characters/miguel.glb',
    image: '/images/characters/miguel.jpg',
    suitTheme: { primary: '#003cff', secondary: '#ff2020', accent: '#00aaff' },
    comic: {
      title: "Spider-Man 2099 (Miguel O'Hara) — Marvel Official",
      url: 'https://www.marvel.com/characters/spider-man-2099-miguel-o-hara',
    },
    movies: [
      {
        title: 'Spider-Man: Across the Spider-Verse (2023)',
        url: 'https://www.sonypictures.com/movies/spidermanacrossthespiderverse',
      },
      {
        title: 'Spider-Man: Beyond the Spider-Verse (Upcoming)',
        url: 'https://www.sonypicturesanimation.com/projects/films/spider-man-beyond-spider-verse',
      },
    ],
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
    comic: {
      title: 'Meet Pavitr Prabhakar (Spider-Man India)',
      url: 'https://www.marvel.com/articles/comics/meet-pavitr-prabhakar-aka-spider-man-india',
    },
    movies: [
      {
        title: 'Spider-Man: Across the Spider-Verse (2023)',
        url: 'https://www.sonypictures.com/movies/spidermanacrossthespiderverse',
      },
      {
        title: 'Spider-Man: Beyond the Spider-Verse (Upcoming)',
        url: 'https://www.sonypicturesanimation.com/projects/films/spider-man-beyond-spider-verse',
      },
    ],
    video: {
      title: 'Sony Pictures India — Official Pavitr Prabhakar Featurette',
      url: 'https://www.youtube.com/results?search_query=Sony+Pictures+India+Pavitr+Prabhakar+Spider-Man',
    },
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
    comic: {
      title: 'Peter Parker (Spider-Man) — Marvel Official',
      url: 'https://www.marvel.com/characters/spider-man-peter-parker',
    },
    movies: [
      {
        title: 'Spider-Man: Into the Spider-Verse (2018)',
        url: 'https://www.sonypictures.com/movies/spidermanintothespiderverse',
      },
      {
        title: 'Spider-Man: Across the Spider-Verse (2023)',
        url: 'https://www.sonypictures.com/movies/spidermanacrossthespiderverse',
      },
      {
        title: 'Spider-Man: Beyond the Spider-Verse (Upcoming)',
        url: 'https://www.sonypicturesanimation.com/projects/films/spider-man-beyond-spider-verse',
      },
    ],
  },
  {
    id: 'jessica-drew',
    name: 'Jessica Drew',
    alias: 'Spider-Woman',
    universeId: 'earth-616',
    origin: 'London, Earth-616',
    description:
      'A skilled agent, private investigator, and original Spider-Woman who harnesses bio-electric venom blasts and glides above the city.',
    powerIds: ['spider-sense', 'wall-crawling', 'venom-blast', 'bio-gliding'],
    stats: { strength: 86, speed: 88, agility: 92, intelligence: 91 },
    model: '/models/characters/jessica.glb',
    image: '/images/characters/jessica.jpg',
    suitTheme: { primary: '#e63946', secondary: '#ffb703', accent: '#ffffff' },
    comic: {
      title: 'Spider-Woman — Marvel Comics Database',
      url: 'https://www.marvel.com/comics/characters/1009608/spider-woman_jessica_drew',
    },
    movies: [
      {
        title: 'Spider-Man: Across the Spider-Verse (2023)',
        url: 'https://www.sonypictures.com/movies/spidermanacrossthespiderverse',
      },
      {
        title: 'Spider-Man: Beyond the Spider-Verse (Upcoming)',
        url: 'https://www.sonypicturesanimation.com/projects/films/spider-man-beyond-spider-verse',
      },
    ],
    video: {
      title: 'Marvel 101 — Jessica Drew / Spider-Woman Video',
      url: 'https://www.marvel.com/characters/spider-woman-jessica-drew',
    },
  },
  {
    id: 'cindy-moon',
    name: 'Cindy Moon',
    alias: 'Silk',
    universeId: 'earth-616',
    origin: 'Queens, New York',
    description:
      'Bitten by the same radioactive spider as Peter Parker, Silk possesses organic fingertip webbing, eidetic memory, and a Silk-Sense faster than light.',
    powerIds: ['silk-sense', 'wall-crawling', 'organic-webbing', 'enhanced-agility'],
    stats: { strength: 82, speed: 96, agility: 98, intelligence: 89 },
    model: '/models/characters/silk.glb',
    image: '/images/characters/silk.jpg',
    suitTheme: { primary: '#f8f9fa', secondary: '#e63946', accent: '#457b9d' },
    comic: {
      title: 'Silk — Marvel Comic Reading Guide',
      url: 'https://www.marvel.com/comics/guides/1885/silk',
    },
  },
  {
    id: 'ben-reilly',
    name: 'Ben Reilly',
    alias: 'Scarlet Spider',
    universeId: 'earth-616',
    origin: 'New York City',
    description:
      'A genetic clone of Peter Parker who carved out his own identity as the Scarlet Spider, wearing his iconic blue hoodie over a crimson suit.',
    powerIds: ['spider-sense', 'wall-crawling', 'impact-webbing', 'enhanced-agility'],
    stats: { strength: 84, speed: 88, agility: 91, intelligence: 86 },
    model: '/models/characters/ben.glb',
    image: '/images/characters/ben.jpg',
    suitTheme: { primary: '#e63946', secondary: '#1d3557', accent: '#457b9d' },
    comic: {
      title: 'Ben Reilly — Scarlet Spider Marvel Reading Guide',
      url: 'https://www.marvel.com/comics/guides/720/scarlet-spider-ben',
    },
  },
  {
    id: 'kaine-parker',
    name: 'Kaine Parker',
    alias: 'Scarlet Spider (Clone)',
    universeId: 'earth-616',
    origin: 'New York City',
    description:
      'A flawed clone of Peter Parker who embraced his darker instincts to become a ferocious protector in a striking black and crimson suit.',
    powerIds: ['spider-sense', 'wall-crawling', 'fangs-claws', 'camouflage'],
    stats: { strength: 89, speed: 87, agility: 90, intelligence: 82 },
    model: '/models/characters/kaine.glb',
    image: '/images/characters/kaine.jpg',
    suitTheme: { primary: '#d90429', secondary: '#111111', accent: '#ef233c' },
    comic: {
      title: 'Kaine Parker / Scarlet Spider — Marvel Comics Database',
      url: 'https://www.marvel.com/comics/characters/1011426/scarlet_spider',
    },
  },
  {
    id: 'web-slinger',
    name: "Patrick O'Hara",
    alias: 'Web-Slinger',
    universeId: 'earth-31913',
    origin: 'Wild West, Earth-31913',
    description:
      'A cowboy gunslinger empowered by spider-abilities who rides across the frontier with his masked spider-steed Widow, firing pressurized web-bullets from dual revolvers.',
    powerIds: ['trick-revolver', 'equestrian-agility', 'spider-sense', 'wall-crawling'],
    stats: { strength: 83, speed: 89, agility: 92, intelligence: 84 },
    model: '/models/characters/webslinger.glb',
    image: '/images/characters/webslinger.jpg',
    suitTheme: { primary: '#d4a373', secondary: '#457b9d', accent: '#e63946' },
    comic: {
      title: "Web-Slinger (Patrick O'Hara) — Marvel Official",
      url: 'https://www.marvel.com/characters/web-slinger-patrick-ohara',
    },
  },
  {
    id: 'mayday-parker',
    name: 'May "Mayday" Parker',
    alias: 'Spider-Girl',
    universeId: 'earth-982',
    origin: 'New York City, MC2',
    description:
      'The daughter of Peter B. Parker and Mary Jane who inherited her father\'s powers to become the legendary Spider-Girl of the MC2 timeline.',
    powerIds: ['spider-sense', 'wall-crawling', 'repulsion-shove', 'web-shooting'],
    stats: { strength: 81, speed: 89, agility: 94, intelligence: 87 },
    model: '/models/characters/mayday.glb',
    image: '/images/characters/mayday.jpg',
    suitTheme: { primary: '#ee9b00', secondary: '#005f73', accent: '#0a9396' },
    comic: {
      title: 'Spider-Girl (Mayday Parker) — Marvel Official',
      url: 'https://www.marvel.com/characters/spider-girl-may-mayday-parker',
    },
  },
  {
    id: 'superior-spider-man',
    name: 'Otto Octavius',
    alias: 'Superior Spider-Man',
    universeId: 'earth-616',
    origin: 'New York City',
    description:
      'Doc Ock in Peter Parker\'s body — determined to prove he can be a more efficient, lethal, and superior Spider-Man through tactical genius and mechanical spider-arms.',
    powerIds: ['spider-sense', 'wall-crawling', 'mechanical-arms', 'systems-override'],
    stats: { strength: 87, speed: 82, agility: 86, intelligence: 99 },
    model: '/models/characters/superior.glb',
    image: '/images/characters/superior.jpg',
    suitTheme: { primary: '#9b5de5', secondary: '#212529', accent: '#f15bb5' },
    comic: {
      title: 'Doctor Octopus / Superior Spider-Man — Marvel Comics',
      url: 'https://www.marvel.com/characters/doctor-octopus-otto-octavius/in-comics',
    },
  },
  {
    id: 'margo-kess',
    name: 'Margo Kess',
    alias: 'Spider-Byte',
    universeId: 'earth-22191',
    origin: 'Cyberspace, Earth-22191',
    description:
      'A brilliant cyber-guardian who protects the multiverse using a virtual avatar projection to weave data and override digital threats in real time.',
    powerIds: ['cyber-avatar', 'neural-interface', 'systems-override', 'camouflage'],
    stats: { strength: 72, speed: 94, agility: 90, intelligence: 98 },
    model: '/models/characters/margo.glb',
    image: '/images/characters/margo.jpg',
    suitTheme: { primary: '#00f5d4', secondary: '#7b2cbf', accent: '#f15bb5' },
    comic: {
      title: 'Spider-Byte (Margo Kess) — Marvel Official',
      url: 'https://www.marvel.com/characters/spider-byte-margo-kess',
    },
    movies: [
      {
        title: 'Spider-Man: Across the Spider-Verse (2023)',
        url: 'https://www.sonypictures.com/movies/spidermanacrossthespiderverse',
      },
      {
        title: 'Spider-Man: Beyond the Spider-Verse (Upcoming)',
        url: 'https://www.sonypicturesanimation.com/projects/films/spider-man-beyond-spider-verse',
      },
    ],
  },
  {
    id: 'spider-rex',
    name: 'Pterptychus',
    alias: 'Spider-Rex',
    universeId: 'earth-66',
    origin: 'Prehistoric Earth-66',
    description:
      'A Tyrannosaurus Rex struck by a spider-bearing alien meteorite, giving him prehistoric jaw strength and web-swinging tail power across the jungle.',
    powerIds: ['dino-strength', 'spider-sense', 'wall-crawling', 'enhanced-agility'],
    stats: { strength: 99, speed: 75, agility: 78, intelligence: 68 },
    model: '/models/characters/rex.glb',
    image: '/images/characters/rex.jpg',
    suitTheme: { primary: '#ffba08', secondary: '#d00000', accent: '#38b000' },
    comic: {
      title: 'Spider-Rex — Marvel Official Article',
      url: 'https://www.marvel.com/articles/comics/spider-rex-origin-edge-of-spider-verse-1',
    },
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
    comic: {
      title: 'Spider-Punk (Hobie Brown) — Marvel Official',
      url: 'https://www.marvel.com/characters/spider-punk-hobie-brown-earth-138',
    },
    movies: [
      {
        title: 'Spider-Man: Across the Spider-Verse (2023)',
        url: 'https://www.sonypictures.com/movies/spidermanacrossthespiderverse',
      },
      {
        title: 'Spider-Man: Beyond the Spider-Verse (Upcoming)',
        url: 'https://www.sonypicturesanimation.com/projects/films/spider-man-beyond-spider-verse',
      },
    ],
    behindTheScenes: {
      title: 'Sony Pictures Imageworks — Spider-Punk Animation & VFX Breakdown',
      url: 'https://www.imageworks.com/index.php/our-craft/feature-animation/movies/spider-man-across-spider-verse',
    },
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
    comic: {
      title: 'Spider-Ham (Peter Porker) — Marvel Official',
      url: 'https://www.marvel.com/characters/spider-ham-peter-porker',
    },
    movies: [
      {
        title: 'Spider-Man: Into the Spider-Verse (2018)',
        url: 'https://www.sonypictures.com/movies/spidermanintothespiderverse',
      },
    ],
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
    comic: {
      title: 'Spider-Man Noir — Marvel Official',
      url: 'https://www.marvel.com/comics/characters/1012295/spiderman_noir',
    },
    movies: [
      {
        title: 'Spider-Man: Into the Spider-Verse (2018)',
        url: 'https://www.sonypictures.com/movies/spidermanintothespiderverse',
      },
    ],
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
    comic: {
      title: 'Takuya Yamashiro (Japanese Spider-Man)',
      url: 'https://www.marvel.com/comics/characters/1011377/spider-man_takuya_yamashiro',
    },
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
    comic: {
      title: 'Cyborg Spider-Man — Edge of Spider-Verse',
      url: 'https://www.marvel.com/articles/comics/edge-of-spider-verse-2-spooky-man-cyborg-spider-man',
    },
  },
  {
    id: 'anya-corazon',
    name: 'Anya Corazon',
    alias: 'Araña / Spider-Girl',
    universeId: 'earth-616',
    origin: 'Brooklyn, New York',
    description:
      'Empowered by Spider Society magic and cybernetic grappling gear, Araña uses exoskeleton armor and martial arts to protect the web.',
    powerIds: ['spider-sense', 'wall-crawling', 'martial-arts', 'web-shooting'],
    stats: { strength: 80, speed: 87, agility: 93, intelligence: 88 },
    model: '/models/characters/anya.glb',
    image: '/images/characters/anya.jpg',
    suitTheme: { primary: '#fb5607', secondary: '#3a0ca3', accent: '#ff006e' },
    comic: {
      title: 'Spider-Girl (Anya Corazon) — Marvel Official',
      url: 'https://www.marvel.com/comics/characters/1009157/spider-girl_anya_corazon',
    },
  },
];
