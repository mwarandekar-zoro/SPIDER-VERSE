import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { initHeroScrollFade } from '../animations/scrollAnimations';
import { spiderPeople } from '../data/spiderPeople';

// ─────────────────────────────────────────────────────────────
// Picks one Spider-Person that stays constant for this session.
// useState lazy initializer runs ONCE per true mount and is
// not preserved by React HMR, so every refresh gives a
// genuinely different Spider-Person.
// ─────────────────────────────────────────────────────────────
function useSessionCharacter() {
  const [character] = useState(() => {
    const idx = Math.floor(Math.random() * spiderPeople.length);
    return spiderPeople[idx];
  });
  return character;
}

// ─────────────────────────────────────────────────────────────
// Web-strand lines radiating from all four corners toward the
// hero title. Pure SVG positioned absolutely so it never affects
// layout. Opacity kept low so it reads as texture, not chrome.
// ─────────────────────────────────────────────────────────────
function CornerWebs() {
  const shouldReduce = useReducedMotion();

  // 6 strands per corner, angles fan toward centre-ish
  const corners = [
    { cx: 0,    cy: 0,    angles: [20, 35, 50, 65, 80, 95]  },  // top-left
    { cx: 100,  cy: 0,    angles: [100, 115, 130, 145, 160, 175] }, // top-right
    { cx: 0,    cy: 100,  angles: [-20, -35, -50, -5, -65, -80] }, // bottom-left
    { cx: 100,  cy: 100,  angles: [200, 215, 230, 245, 260, 275] }, // bottom-right (unused — feels busy)
  ].slice(0, 3); // use 3 corners for balance

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {corners.map((corner, ci) =>
        corner.angles.map((deg, li) => {
          const rad = (deg * Math.PI) / 180;
          const length = 45 + li * 8;
          const x2 = corner.cx + Math.cos(rad) * length;
          const y2 = corner.cy + Math.sin(rad) * length;
          return (
            <motion.line
              key={`${ci}-${li}`}
              x1={corner.cx}
              y1={corner.cy}
              x2={x2}
              y2={y2}
              stroke="var(--universe-primary)"
              strokeWidth="0.15"
              strokeOpacity={0}
              animate={shouldReduce ? {} : { strokeOpacity: [0.05, 0.18, 0.05] }}
              transition={{
                duration: 4 + li * 0.7,
                repeat: Infinity,
                delay: ci * 0.8 + li * 0.4,
                ease: 'easeInOut',
              }}
            />
          );
        })
      )}

      {/* Concentric arc segments at each active corner */}
      {corners.map((corner, ci) => {
        const radii = [12, 22, 33];
        return radii.map((r, ri) => (
          <motion.path
            key={`arc-${ci}-${ri}`}
            d={`M ${corner.cx + (ci % 2 === 0 ? r : -r)},${corner.cy} A ${r} ${r} 0 0 ${ci < 2 ? 1 : 0} ${corner.cx},${corner.cy + (ci < 2 ? r : -r)}`}
            fill="none"
            stroke="var(--universe-primary)"
            strokeWidth="0.12"
            strokeOpacity={0}
            animate={shouldReduce ? {} : { strokeOpacity: [0.04, 0.14, 0.04] }}
            transition={{
              duration: 5 + ri,
              repeat: Infinity,
              delay: ci * 0.6 + ri * 0.9,
              ease: 'easeInOut',
            }}
          />
        ));
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Animated stat ticker: each token fades in sequentially then
// loops a subtle pulse-glow to stay alive without being
// distracting.
// ─────────────────────────────────────────────────────────────
const STATS = ['20 Spider-People', '14 Universes', '∞ Possibilities'];

function StatTicker() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
        letterSpacing: '0.08em',
      }}
    >
      {STATS.map((stat, i) => (
        <motion.span
          key={stat}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.0 + i * 0.2,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <motion.span
            animate={
              shouldReduce
                ? {}
                : {
                    color: ['var(--universe-primary)', 'var(--color-web)', 'var(--universe-primary)'],
                    textShadow: [
                      '0 0 0px var(--universe-primary)',
                      '0 0 12px var(--universe-primary)',
                      '0 0 0px var(--universe-primary)',
                    ],
                  }
            }
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 1.1, ease: 'easeInOut' }}
            style={{ color: 'var(--universe-primary)' }}
          >
            {stat}
          </motion.span>
          {i < STATS.length - 1 && (
            <span style={{ color: 'var(--color-muted)', opacity: 0.4 }}>·</span>
          )}
        </motion.span>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Scroll-down indicator: pulsing chevron + thin vertical line.
// Positioned at bottom-center of the hero. Fades out on scroll.
// ─────────────────────────────────────────────────────────────
function ScrollIndicator() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      aria-label="Scroll down to explore"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        zIndex: 2,
        cursor: 'default',
      }}
    >
      {/* Vertical line that pulses downward */}
      <motion.div
        style={{
          width: '1px',
          height: '40px',
          background: `linear-gradient(to bottom, var(--universe-primary), transparent)`,
          transformOrigin: 'top',
        }}
        animate={shouldReduce ? {} : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Chevron pair */}
      <motion.svg
        width="20"
        height="14"
        viewBox="0 0 20 14"
        fill="none"
        animate={shouldReduce ? {} : { y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M 2 2 L 10 10 L 18 2"
          stroke="var(--universe-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 2 7 L 10 15 L 18 7"
          stroke="var(--universe-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />
      </motion.svg>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Featured character card — floats in the empty hero space.
// Session-stable random pick from spiderPeople so it "rotates"
// on every page load / refresh.
// ─────────────────────────────────────────────────────────────
function FeaturedCard({ character }) {
  const shouldReduce = useReducedMotion();
  const primary   = character.suitTheme?.primary   ?? '#b026ff';
  const secondary = character.suitTheme?.secondary ?? '#00f0ff';

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: 10 }}
      animate={{ opacity: 1, x: 0,  y: 0  }}
      transition={{ delay: 1.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        right: 'clamp(1rem, 6vw, 5rem)',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        width: 'clamp(180px, 20vw, 240px)',
      }}
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={shouldReduce ? {} : { y: [-6, 6, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Card shell */}
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: `1px solid ${primary}55`,
            background: `linear-gradient(145deg, ${primary}18, rgba(8,7,12,0.92) 60%, ${secondary}10)`,
            backdropFilter: 'blur(12px)',
            boxShadow: `0 0 30px ${primary}33, 0 20px 60px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Top accent bar */}
          <div
            style={{
              height: '2px',
              background: `linear-gradient(90deg, ${primary}, ${secondary})`,
              boxShadow: `0 0 8px ${primary}`,
            }}
          />

          {/* Character portrait / art */}
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
            {character.image ? (
              <img
                src={character.image}
                alt={character.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              /* Fallback: animated glow with spider emoji */
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `radial-gradient(circle at 50% 40%, ${primary}33, transparent 70%)`,
                  fontSize: '3rem',
                }}
              >
                🕷️
              </div>
            )}

            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to top, rgba(8,7,12,0.96) 0%, rgba(8,7,12,0.3) 50%, transparent 100%)`,
              }}
            />

            {/* Character info over the gradient */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '0.85rem 0.85rem 0.75rem',
              }}
            >
              {/* "Featured today" badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  background: `${primary}22`,
                  border: `1px solid ${primary}44`,
                  borderRadius: '999px',
                  padding: '0.2rem 0.55rem',
                  marginBottom: '0.5rem',
                }}
              >
                <motion.span
                  animate={shouldReduce ? {} : { opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: primary,
                    display: 'inline-block',
                    boxShadow: `0 0 6px ${primary}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: primary,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Featured
                </span>
              </div>

              <h3
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.1,
                  textShadow: `0 0 12px ${primary}66`,
                }}
              >
                {character.name}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: primary,
                  letterSpacing: '0.06em',
                  marginTop: '0.2rem',
                  textTransform: 'uppercase',
                }}
              >
                {character.alias}
              </p>
            </div>
          </div>

          {/* Bottom: universe tag */}
          <div
            style={{
              padding: '0.6rem 0.85rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: `1px solid ${primary}22`,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--color-muted)',
                letterSpacing: '0.05em',
              }}
            >
              {character.universeId?.toUpperCase()}
            </span>
            <span style={{ color: primary, fontSize: '0.75rem' }}>→</span>
          </div>
        </div>

        {/* Corner glow blob behind the card */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-20px',
            background: `radial-gradient(ellipse at 50% 50%, ${primary}18, transparent 70%)`,
            zIndex: -1,
            pointerEvents: 'none',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Multiverse Radar Beacon — Left-side companion widget for the
// Hero section. Provides live dimension status metrics, quick
// dimensional teleport chips, and a random suit-theme shift button.
// ─────────────────────────────────────────────────────────────
function MultiverseBeacon({ onSelectCharacter }) {
  const QUICK_HEROES = [
    { id: 'miles-morales', name: 'Miles', tag: '1610', icon: '🕷️', color: '#ff2222' },
    { id: 'gwen-stacy', name: 'Gwen', tag: '65', icon: '🥁', color: '#ff6fd8' },
    { id: 'miguel-ohara', name: '2099', tag: '928', icon: '🏙️', color: '#003cff' },
    { id: 'pavitr-prabhakar', name: 'Pavitr', tag: '50101', icon: '🇮🇳', color: '#ff9500' },
    { id: 'hobie-brown', name: 'Punk', tag: '138', icon: '🎸', color: '#ffdd00' },
  ];

  const handleShiftGlitch = () => {
    const randomHero = spiderPeople[Math.floor(Math.random() * spiderPeople.length)];
    if (onSelectCharacter) {
      onSelectCharacter(randomHero.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -40, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        left: 'clamp(1rem, 4vw, 3rem)',
        bottom: 'clamp(2rem, 12vh, 6rem)',
        zIndex: 3,
        maxWidth: '280px',
        width: 'calc(100% - 2rem)',
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          background: 'rgba(15, 13, 23, 0.78)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          textAlign: 'left',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 12px rgba(255, 255, 255, 0.03)',
        }}
      >
        {/* Beacon Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#00ff88',
                boxShadow: '0 0 10px #00ff88',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--universe-primary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              📡 MULTIVERSE RADAR
            </span>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'var(--color-muted)',
              background: 'rgba(255,255,255,0.05)',
              padding: '0.15rem 0.45rem',
              borderRadius: '999px',
            }}
          >
            LIVE
          </span>
        </div>

        {/* Live Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.4rem',
            marginBottom: '0.75rem',
            padding: '0.5rem',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div>
            <span style={{ fontSize: '0.58rem', color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>CANON SYNC</span>
            <span style={{ fontSize: '0.72rem', color: '#00ff88', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>99.9% STABLE</span>
          </div>
          <div>
            <span style={{ fontSize: '0.58rem', color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>SOCIETY HUB</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--universe-primary)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>ACTIVE</span>
          </div>
        </div>

        {/* Quick Jump Hero Chips */}
        <div style={{ marginBottom: '0.75rem' }}>
          <span
            style={{
              fontSize: '0.6rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'block',
              marginBottom: '0.4rem',
            }}
          >
            Dimensional Quick Jump:
          </span>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {QUICK_HEROES.map((hero) => (
              <button
                key={hero.id}
                onClick={() => onSelectCharacter && onSelectCharacter(hero.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.25rem 0.55rem',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${hero.color}44`,
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${hero.color}22`;
                  e.currentTarget.style.borderColor = hero.color;
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = `${hero.color}44`;
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <span>{hero.icon}</span>
                <span>{hero.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Random Shift Action Button */}
        <button
          onClick={handleShiftGlitch}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            padding: '0.45rem',
            borderRadius: 'var(--radius-sm)',
            background: 'linear-gradient(90deg, var(--universe-primary)22, var(--universe-secondary)22)',
            border: '1px solid var(--universe-primary)55',
            color: '#ffffff',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(90deg, var(--universe-primary)44, var(--universe-secondary)44)';
            e.currentTarget.style.borderColor = 'var(--universe-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(90deg, var(--universe-primary)22, var(--universe-secondary)22)';
            e.currentTarget.style.borderColor = 'var(--universe-primary)55';
          }}
        >
          <span>🎲</span>
          <span>Glitch Random Theme Shift</span>
          <span>⚡</span>
        </button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero Section — Phase 3 upgrade
// ─────────────────────────────────────────────────────────────
export default function Hero({ onSelectCharacter }) {
  const heroRef      = useRef(null);
  const featured     = useSessionCharacter();

  useEffect(() => {
    const cleanup = initHeroScrollFade(heroRef.current);
    return cleanup;
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--edge-padding)',
        gap: '1.25rem',
        overflow: 'hidden',
      }}
    >
      {/* ── Corner web strands ── */}
      <CornerWebs />

      {/* ── Eyebrow ── */}
      <motion.span
        className="eyebrow"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1,  y: 0  }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        EXPLORE THE MULTIVERSE
      </motion.span>

      {/* ── Main Title ── */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1,  y: 0  }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: 'var(--fs-hero)',
          color: 'var(--color-web)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        SPIDER-VERSE
      </motion.h1>

      {/* ── Subtitle ── */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1,  y: 0  }}
        transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ color: 'var(--color-web-dim)', maxWidth: '32ch', position: 'relative', zIndex: 1 }}
      >
        Move your cursor. The multiverse is already reacting.
      </motion.p>

      {/* ── Stat Ticker ── */}
      <StatTicker />

      {/* ── Left-side Multiverse Beacon Widget ── */}
      <MultiverseBeacon onSelectCharacter={onSelectCharacter} />

      {/* ── Right-side Featured Character Card ── */}
      <FeaturedCard character={featured} />

      {/* ── Scroll Indicator ── */}
      <ScrollIndicator />
    </section>
  );
}
