# 🕷️ SPIDER-VERSE | Interactive Multiverse Experience

An immersive, high-performance web application exploring the Spider-Verse multiverse. Built with **React 19**, **Three.js / React Three Fiber (R3F)**, **Framer Motion**, and **Vite**, featuring interactive 3D dimensions, 20 Spider-People profiles, official Marvel comic reading guides, Sony Pictures film appearances, Sony Imageworks VFX breakdowns, and live suit-themed UI shifts.

---

## ✨ Features & Highlights

- **🌌 3D Interactive Multiverse Void**
  - Persistent 3D canvas with reactive particle fields, starfields, floating motes, and dimension nodes.
  - Dynamic cursor parallax and gyro-tilt physics responding to mouse movement.
  - Interactive Multiverse Map preview panel showing active universe atmosphere, Danger Level, Tech Index, and Tone Badge.
  - Dynamic SVG Constellation Lines connecting universe pills that glow on hover.

- **🦸‍♂️ 20 Spider-People Roster**
  - Deep-dive into 20 iconic Spider-People across dimensions:
    - 🕷️ **Miles Morales** (Earth-1610)
    - 🥁 **Gwen Stacy / Ghost-Spider** (Earth-65)
    - 🏙️ **Miguel O'Hara / Spider-Man 2099** (Earth-928)
    - 🇮🇳 **Pavitr Prabhakar / Spider-Man India** (Earth-50101)
    - 🕸️ **Peter B. Parker** (Earth-616)
    - 🕷️ **Jessica Drew / Spider-Woman** (Earth-616)
    - 💫 **Cindy Moon / Silk** (Earth-616)
    - 🔴 **Ben Reilly / Scarlet Spider** (Earth-616)
    - 🌒 **Kaine Parker / Scarlet Spider Clone** (Earth-616)
    - 🤠 **Patrick O'Hara / Web-Slinger** (Earth-31913)
    - 👧 **May "Mayday" Parker / Spider-Girl** (Earth-982)
    - 🦾 **Otto Octavius / Superior Spider-Man** (Earth-616)
    - 🌐 **Margo Kess / Spider-Byte** (Earth-22191)
    - 🦖 **Pterptychus / Spider-Rex** (Earth-66)
    - 🎸 **Hobie Brown / Spider-Punk** (Earth-138)
    - 🐷 **Peter Porker / Spider-Ham** (Earth-8311)
    - 🕵️ **Spider-Man Noir** (Earth-90214)
    - 🤖 **Takuya Yamashiro / Japanese Spider-Man** (Earth-51778)
    - 🦾 **Cyborg Spider-Man** (Earth-15)
    - 🥋 **Anya Corazon / Araña** (Earth-616)

- **📚 Official Marvel Comics Links & Reading Guides**
  - Legitimate outbound links to Marvel's official character reading guides, series databases, and issue spotlights.
  - Dedicated Comics-First profiles for comic-origin Spider-People (Silk, Ben Reilly, Kaine Parker, Jessica Drew, Araña).

- **🎬 Sony Pictures Feature Film Appearances & YouTube Showcase**
  - Official film pages for *Into the Spider-Verse (2018)*, *Across the Spider-Verse (2023)*, and *Beyond the Spider-Verse (June 18, 2027)*.
  - Branded YouTube showcase buttons for all 20 Spider-People and Sony Pictures India featurettes.

- **🎨 Sony Pictures Imageworks VFX & Animation Craft Hub**
  - Dedicated behind-the-scenes breakdown of Spider-Punk 2D/3D poster art innovation, multiverse lighting & compositing, and Mumbattan line-art design.

- **📡 Multiverse Radar Beacon & Glitch Theme Shift**
  - Left-side Hero section widget with live Canon Sync (99.9%) status metrics, quick-jump dimensional teleport chips, and a `🎲 Glitch Random Theme Shift` button that alters whole-app suit colors dynamically.

- **🏆 Interactive Powers Leaderboard & Universe Timeline**
  - Bar-race ranking of Spider-People by Strength, Speed, Agility, and Intelligence.
  - Vertical Multiverse Timeline tracking 8 key multiverse events across Inheritors, Spider-Society, and Independent factions.

- **🎯 Micro-Interactions & Ambient FX**
  - Canvas 2D web-shoot particle burst radiating outward on every mouse click.
  - 8-second idle prompt detector with spinning SVG web.
  - Rotating 10-fact Spider-Verse carousel on the loading screen.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **3D Graphics:** [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Styling:** Vanilla CSS Design System with CSS Custom Properties & Whole-App Suit Theme Injections
- **Audio:** Web Audio API synth oscillators & spatial sound triggers

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mwarandekar-zoro/SPIDER-VERSE.git
   cd SPIDER-VERSE
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173/`.

### Building for Production

To create an optimized production bundle:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 📂 Project Structure

```
Spider-Verse/
├── public/                  # Custom character artwork & static assets
│   └── images/characters/   # 20 Spider-People portrait artwork files (.jpg)
├── src/
│   ├── components/
│   │   ├── 3D/              # Three.js / R3F Canvas components (Nodes, Particles, Lights, Web)
│   │   ├── Character/       # Character cards, profiles, powers, stats, & relationships
│   │   ├── Comparison/      # Head-to-head variant comparison widgets
│   │   ├── Cursor/          # Custom cursor provider, trail physics, & canvas web burst
│   │   └── UI/              # Navbar, sound toggles, quality controls, loading screen, idle manager
│   ├── data/                # Multiverse datasets (spiderPeople.js, universes.js, powers.js)
│   ├── hooks/               # Custom hooks (mouse smoothing, responsive, audio, useUniverseTheme)
│   ├── sections/            # Major page sections (Hero, Multiverse, LoreIntro, PowersLeaderboard, UniverseTimeline, Explorer, Footer)
│   ├── styles/              # Global design system, typography, & responsive CSS
│   ├── App.jsx              # Main application entry & state orchestrator
│   └── main.jsx             # React root mount
├── index.html
├── package.json
└── vite.config.js
```

---

## 📄 License

This project is an open-source fan creation for educational and portfolio demonstration purposes. Spider-Man and Spider-Verse characters, logos, and concepts are copyright © Marvel Entertainment & Sony Pictures Animation.
