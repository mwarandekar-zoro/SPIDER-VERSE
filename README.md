# 🕷️ SPIDER-VERSE | Interactive Multiverse Experience

An immersive, interactive web application exploring the Spider-Verse multiverse. Built with **React**, **Three.js / React Three Fiber (R3F)**, **GSAP**, and **Vite**, featuring interactive 3D dimensions, character profiles, ability comparisons, and cinematic portal transitions.

---

## ✨ Features

- **🌌 3D Interactive Multiverse Void**
  - Persistent 3D canvas with reactive particle fields and floating dimension fragments.
  - Interactive Universe Nodes connected through a 3D web network.
  - Dynamic cursor parallax and gyro-tilt physics responding to mouse movement.
  - Universe-themed lighting shifts and atmospheric transitions.

- **🌀 Cinematic Dimensional Portals**
  - Seamless GSAP-driven camera zoom, warp tunnel, and dimensional travel transitions between universes.
  - Distinct ambient atmospheres, themes, and color palettes for each Earth (Earth-1610, Earth-65, Earth-928, Earth-50101, Earth-616, etc.).

- **🦸‍♂️ Character Explorer & Profiles**
  - Deep-dive into iconic Spider-People: Miles Morales, Gwen Stacy, Miguel O'Hara (Spider-Man 2099), Peter B. Parker, Pavitr Prabhakar (Spider-Man India), and more.
  - Comprehensive breakdown of powers, stats, gadgets, suits, and backstories.
  - Interactive relationship mapping between multiverse variants.

- **⚔️ Spider-Variant Comparison Tool**
  - Side-by-side attribute and skill comparison (Strength, Agility, Tech, Web Mastery, Experience, Combat).
  - Power radar and metric comparison with instant visual feedback.

- **🎯 Spider-Themed Custom Cursor & FX**
  - Responsive trailing dot physics and interactive hover states.
  - Dimensional glitch aesthetics and comic-inspired design language.

- **🔊 Audio & Performance Control**
  - Built-in Web Audio synthesis for dimensional hums, portal warps, and UI feedback.
  - Device performance tier detection with runtime quality selector (**L**ow / **M**edium / **H**igh DPR & particle counts).
  - Full mobile and desktop responsive design with reduced-motion accessibility support.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **3D Graphics:** [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations:** [GSAP (GreenSock)](https://gsap.com/)
- **Styling:** Modern Vanilla CSS Design System with CSS Custom Properties
- **Audio:** Web Audio API synth oscillators & spatial sound triggers

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher recommended) installed.

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
   Navigate to `http://localhost:5173/` (or the port shown in your terminal).

### Building for Production

To create an optimized production build:
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
├── public/                  # Static assets & icons
├── src/
│   ├── animations/          # GSAP portal, scroll, & cursor animation controllers
│   ├── assets/              # Static images & branding
│   ├── components/
│   │   ├── 3D/              # Three.js / R3F Canvas components (Nodes, Particles, Lights, Web)
│   │   ├── Character/       # Character cards, profiles, powers, & stats
│   │   ├── Comparison/      # Head-to-head variant comparison widgets
│   │   ├── Cursor/          # Custom cursor provider & trail physics
│   │   ├── Effects/         # Shaders, glows, and visual FX
│   │   └── UI/              # Navbar, sound toggles, quality controls, loading screen
│   ├── data/                # Multiverse datasets (universes, spiderPeople, powers, relations)
│   ├── hooks/               # Custom hooks (mouse smoothing, responsive, audio, characters)
│   ├── sections/            # Major page sections (Hero, Multiverse, Explorer, Compare)
│   ├── styles/              # Global design system, typography, & responsive CSS
│   ├── utils/               # Math, audio synthesis, device profiling, & constants
│   ├── App.jsx              # Main application entry & state orchestrator
│   └── main.jsx             # React root mount
├── index.html
├── package.json
└── vite.config.js
```

---

## 🎮 Controls & Interactions

- **Mouse Movement / Drag:** Tilt and orbit the 3D Multiverse node cluster with parallax reaction.
- **Node Click:** Warp directly into a universe with cinematic dimensional portal camera zoom.
- **Character Explorer:** Select any character to view detailed combat stats and backstory.
- **Comparison Tool:** Select any two Spider-People from the dropdown to compare metrics side by side.
- **Top Right Navigation:** Quick jump between `Explore`, `Characters`, and `Compare`.
- **Bottom Right Controls:** Toggle audio on/off or switch performance fidelity tiers (`L` / `M` / `H`).

---

## 📄 License

This project is open-source and created for educational and portfolio demonstration purposes. Spider-Man and Spider-Verse characters and concepts are copyright © Marvel & Sony Pictures Animation.
