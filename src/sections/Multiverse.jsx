import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { universes } from '../data/universes';
import { spiderPeople } from '../data/spiderPeople';

// ─────────────────────────────────────────────────────────────
// Drifting Shooting Stars / Comets Component
// Spawns occasional glowing light streaks across the empty background
// ─────────────────────────────────────────────────────────────
function ShootingStars() {
  const shouldReduce = useReducedMotion();
  const [stars, setStars] = useState([]);

  useEffect(() => {
    if (shouldReduce) return;

    // Spawn a shooting star every 2.5 - 4.5 seconds
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      const top = Math.random() * 60 + 5; // 5% to 65% height
      const left = Math.random() * 40; // start left side
      const angle = 25 + Math.random() * 20; // 25deg - 45deg trajectory
      const duration = 1.2 + Math.random() * 0.8; // 1.2s - 2s speed
      const size = 100 + Math.random() * 80; // tail length

      setStars((prev) => [...prev.slice(-3), { id, top, left, angle, duration, size }]);
    }, 3200);

    return () => clearInterval(interval);
  }, [shouldReduce]);

  if (shouldReduce) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{
            x: `${star.left}vw`,
            y: `${star.top}vh`,
            opacity: 0,
            scale: 0.6,
          }}
          animate={{
            x: `calc(${star.left}vw + 45vw)`,
            y: `calc(${star.top}vh + 30vh)`,
            opacity: [0, 1, 1, 0],
            scale: [0.6, 1, 0.8, 0],
          }}
          transition={{
            duration: star.duration,
            ease: 'easeOut',
          }}
          onAnimationComplete={() => {
            setStars((prev) => prev.filter((s) => s.id !== star.id));
          }}
          style={{
            position: 'absolute',
            width: `${star.size}px`,
            height: '2px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0.9), var(--universe-primary, #00f0ff), transparent)',
            transform: `rotate(${star.angle}deg)`,
            borderRadius: '999px',
            boxShadow: '0 0 12px var(--universe-primary, #00f0ff), 0 0 20px #ffffff',
            transformOrigin: 'left center',
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Constellation Lines Component
// Draws SVG connection webs between universe pills
// ─────────────────────────────────────────────────────────────
function ConstellationLines({ containerRef, activeId }) {
  const shouldReduce = useReducedMotion();
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateLines = () => {
      const buttons = containerRef.current.querySelectorAll('button[data-universe-id]');
      const coords = [];
      const containerRect = containerRef.current.getBoundingClientRect();

      buttons.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        coords.push({
          id: btn.getAttribute('data-universe-id'),
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        });
      });

      // Connect adjacent nodes in sequence & cross-links
      const newLines = [];
      for (let i = 0; i < coords.length; i++) {
        for (let j = i + 1; j < coords.length; j++) {
          const dist = Math.hypot(coords[i].x - coords[j].x, coords[i].y - coords[j].y);
          // Connect nodes within a reasonable distance (e.g. < 280px)
          if (dist < 280) {
            const isConnectedToActive = activeId && (coords[i].id === activeId || coords[j].id === activeId);
            newLines.push({
              x1: coords[i].x,
              y1: coords[i].y,
              x2: coords[j].x,
              y2: coords[j].y,
              dist,
              isActive: isConnectedToActive,
              key: `${coords[i].id}-${coords[j].id}`,
            });
          }
        }
      }
      setLines(newLines);
    };

    updateLines();
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, [containerRef, activeId]);

  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {lines.map((line) => (
        <motion.line
          key={line.key}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={line.isActive ? 'var(--universe-primary, #00f0ff)' : 'rgba(255,255,255,0.15)'}
          strokeWidth={line.isActive ? 1.5 : 0.75}
          strokeDasharray={line.isActive ? 'none' : '3 3'}
          animate={
            shouldReduce
              ? {}
              : {
                  strokeOpacity: line.isActive ? [0.6, 1, 0.6] : [0.1, 0.25, 0.1],
                }
          }
          transition={{
            duration: line.isActive ? 1.5 : 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Live Hover-Preview Panel Component
// Rich information panel below the pills
// ─────────────────────────────────────────────────────────────
function UniversePreviewPanel({ universe }) {
  if (!universe) return null;

  const character = spiderPeople.find((p) => universe.characterIds.includes(p.id)) || spiderPeople[0];
  const primary = universe.theme?.primary || '#00f0ff';
  const secondary = universe.theme?.secondary || '#ff0055';
  const stats = universe.stats || { danger: 70, tech: 60, tone: 'Unknown' };

  return (
    <motion.div
      key={universe.id}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%',
        maxWidth: '780px',
        margin: '1.25rem auto 0',
        padding: '1.25rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        background: `linear-gradient(135deg, ${primary}15 0%, rgba(10, 8, 18, 0.92) 50%, ${secondary}10 100%)`,
        border: `1px solid ${primary}44`,
        backdropFilter: 'blur(16px)',
        boxShadow: `0 0 35px ${primary}22, 0 20px 40px rgba(0,0,0,0.6)`,
        pointerEvents: 'auto',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Top glowing accent border */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${primary}, ${secondary}, transparent)`,
          boxShadow: `0 0 10px ${primary}`,
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '85px 1fr',
          gap: '1.25rem',
          alignItems: 'center',
          textAlign: 'left',
        }}
      >
        {/* Character Thumbnail */}
        <div
          style={{
            position: 'relative',
            width: '85px',
            height: '110px',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            border: `1px solid ${primary}66`,
            background: `linear-gradient(160deg, ${primary}22, var(--color-void))`,
            flexShrink: 0,
          }}
        >
          {character?.image ? (
            <img
              src={character.image}
              alt={character.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
              }}
            >
              🕷️
            </div>
          )}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to top, rgba(10,8,18,0.9) 0%, transparent 60%)`,
            }}
          />
        </div>

        {/* Info & Stats Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {/* Header Row: Universe ID + Tone Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: primary,
                  background: `${primary}22`,
                  border: `1px solid ${primary}44`,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                {universe.name}
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}>
                {universe.title}
              </h3>
            </div>

            {/* Tone Badge */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.85)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '0.2rem 0.65rem',
                borderRadius: '999px',
                letterSpacing: '0.04em',
              }}
            >
              🎭 {stats.tone}
            </span>
          </div>

          {/* Description */}
          <p style={{ color: 'var(--color-web-dim)', fontSize: '0.88rem', lineHeight: 1.45 }}>
            {universe.description}
          </p>

          {/* Atmosphere Line */}
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', opacity: 0.9 }}>
            <span style={{ color: primary }}>🌌 Atmosphere:</span> {universe.atmosphere}
          </p>

          {/* Mini Stat Bars */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.85rem',
              marginTop: '0.4rem',
              paddingTop: '0.5rem',
              borderTop: `1px solid ${primary}22`,
            }}
          >
            {/* Danger Level */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
                <span style={{ color: 'var(--color-muted)' }}>⚠️ Danger Level</span>
                <span style={{ color: primary, fontWeight: 600 }}>{stats.danger}%</span>
              </div>
              <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.danger}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${primary}, #ff0055)`,
                    boxShadow: `0 0 8px ${primary}`,
                  }}
                />
              </div>
            </div>

            {/* Tech Level */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
                <span style={{ color: 'var(--color-muted)' }}>⚡ Tech Index</span>
                <span style={{ color: secondary || primary, fontWeight: 600 }}>{stats.tech}%</span>
              </div>
              <div style={{ width: '100%', height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.tech}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${secondary || primary}, #00f0ff)`,
                    boxShadow: `0 0 8px ${secondary || primary}`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Multiverse Map Overlay Section (Phase 4 Overhaul)
// ─────────────────────────────────────────────────────────────
export default function Multiverse({ hoveredUniverseId, selectedUniverseId, onSelectUniverse }) {
  const containerRef = useRef(null);

  // Active universe priority: hovered > selected > default to Earth-1610 so area is never empty
  const activeId = hoveredUniverseId || selectedUniverseId || 'earth-1610';
  const activeUniverse = useMemo(
    () => universes.find((u) => u.id === activeId) || universes[0],
    [activeId]
  );

  return (
    <section
      id="multiverse"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--edge-padding)',
        gap: '0.75rem',
        position: 'relative',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* ── Background Shooting Stars / Comets ── */}
      <ShootingStars />

      {/* ── Heading Overlay ── */}
      <motion.span
        className="eyebrow"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        THE MULTIVERSE MAP
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ fontSize: 'var(--fs-h1)', color: 'var(--color-web)', position: 'relative', zIndex: 1 }}
      >
        {activeUniverse ? activeUniverse.name : 'Hover a node'}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ color: 'var(--color-web-dim)', maxWidth: '42ch', position: 'relative', zIndex: 1 }}
      >
        Every glowing point is a universe connected across spacetime. Click any node or pill to dive in.
      </motion.p>

      {/* ── Pills Container with Constellation Lines ── */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          padding: '1.5rem 0.5rem 0.5rem',
          marginTop: '0.5rem',
          pointerEvents: 'auto',
        }}
      >
        {/* Constellation web connecting pills */}
        <ConstellationLines containerRef={containerRef} activeId={activeUniverse?.id} />

        {/* Universe Pill Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {universes.map((u) => {
            const isSelected = activeUniverse?.id === u.id;
            const primary = u.theme?.primary || '#00f0ff';

            return (
              <motion.button
                key={u.id}
                data-universe-id={u.id}
                onClick={() => onSelectUniverse?.(u.id)}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: isSelected ? 700 : 500,
                  border: `1px solid ${isSelected ? primary : `${primary}55`}`,
                  color: isSelected ? '#ffffff' : primary,
                  background: isSelected
                    ? `linear-gradient(135deg, ${primary}cc, ${primary}66)`
                    : 'rgba(15, 12, 25, 0.75)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: isSelected
                    ? `0 0 18px ${primary}88, 0 0 30px ${primary}44`
                    : `0 0 8px ${primary}11`,
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {isSelected && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      marginRight: '0.4rem',
                      boxShadow: '0 0 6px #ffffff',
                    }}
                  />
                )}
                {u.name}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Live Hover-Preview Panel ── */}
      <AnimatePresence mode="wait">
        <UniversePreviewPanel universe={activeUniverse} />
      </AnimatePresence>
    </section>
  );
}
