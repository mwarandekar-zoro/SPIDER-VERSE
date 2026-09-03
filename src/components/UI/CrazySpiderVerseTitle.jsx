import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { playSound } from '../../utils/audio';

/**
 * CrazySpiderVerseTitle — A mind-blowing, hyper-dynamic multiverse glitch
 * title effect designed for the main "SPIDER-VERSE" headings.
 *
 * Features:
 * - 3D Tilt perspective tracking mouse movement
 * - Into the Spider-Verse RGB Chromatic Ghost Layers (Cyan / Magenta / Yellow)
 * - Individual letter hover jitter ripple
 * - Spider-Sense electric warning sparks
 * - Audio thwip SFX on hover trigger
 */
export default function CrazySpiderVerseTitle({
  text = 'SPIDER-VERSE',
  as: Tag = 'h1',
  fontSize = 'var(--fs-hero)',
  style = {},
  className = '',
}) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt motion tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), {
    stiffness: 250,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), {
    stiffness: 250,
    damping: 18,
  });

  function handlePointerMove(e) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(relX);
    mouseY.set(relY);
  }

  function handlePointerEnter() {
    setIsHovered(true);
    try {
      playSound('web', { volume: 0.3 });
    } catch (e) {
      // Audio fallback safety
    }
  }

  function handlePointerLeave() {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }

  const letters = text.split('');

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        position: 'relative',
        display: 'inline-block',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        userSelect: 'none',
        padding: '0.2em 0.4em',
        ...style,
      }}
      className={className}
    >
      {/* ── 3D TILT WRAPPER ── */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── SPIDER-SENSE WARNING SPARKS ON HOVER ── */}
        <motion.div
          animate={{
            opacity: isHovered ? [0, 1, 0.8, 1, 0] : 0,
            scale: isHovered ? [0.8, 1.3, 1.1, 1.4, 0.9] : 0.8,
          }}
          transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
          style={{
            position: 'absolute',
            inset: '-20px -30px',
            pointerEvents: 'none',
            zIndex: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '1.8rem', color: '#00f0ff', filter: 'drop-shadow(0 0 12px #00f0ff)' }}>⚡</span>
          <span style={{ fontSize: '1.8rem', color: 'var(--universe-primary)', filter: 'drop-shadow(0 0 12px var(--universe-primary))' }}>💥</span>
          <span style={{ fontSize: '1.8rem', color: '#ff0055', filter: 'drop-shadow(0 0 12px #ff0055)' }}>⚡</span>
        </motion.div>

        {/* ── CHROMATIC GHOST LAYER 1 (CYAN GLITCH SHIFT) ── */}
        <motion.span
          aria-hidden="true"
          animate={{
            x: isHovered ? [-8, 6, -5, 8, -4] : 0,
            y: isHovered ? [-4, 3, -6, 2, -2] : 0,
            skewX: isHovered ? [-12, 10, -8, 6, 0] : 0,
            opacity: isHovered ? 0.85 : 0,
          }}
          transition={{
            duration: 0.25,
            repeat: isHovered ? Infinity : 0,
            repeatType: 'reverse',
          }}
          style={{
            position: 'absolute',
            inset: 0,
            fontFamily: 'var(--font-display)',
            fontSize,
            fontWeight: 800,
            color: '#00f0ff',
            textShadow: '0 0 20px #00f0ff, 0 0 40px #00f0ff',
            zIndex: 1,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
            letterSpacing: '-0.01em',
          }}
        >
          {text}
        </motion.span>

        {/* ── CHROMATIC GHOST LAYER 2 (MAGENTA GLITCH SHIFT) ── */}
        <motion.span
          aria-hidden="true"
          animate={{
            x: isHovered ? [8, -6, 7, -5, 3] : 0,
            y: isHovered ? [4, -3, 5, -4, 2] : 0,
            skewX: isHovered ? [10, -14, 8, -5, 0] : 0,
            opacity: isHovered ? 0.85 : 0,
          }}
          transition={{
            duration: 0.22,
            repeat: isHovered ? Infinity : 0,
            repeatType: 'reverse',
          }}
          style={{
            position: 'absolute',
            inset: 0,
            fontFamily: 'var(--font-display)',
            fontSize,
            fontWeight: 800,
            color: '#ff0055',
            textShadow: '0 0 20px #ff0055, 0 0 40px #ff0055',
            zIndex: 1,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
            letterSpacing: '-0.01em',
          }}
        >
          {text}
        </motion.span>

        {/* ── MAIN FOREGROUND LAYER WITH PER-LETTER RIPPLE ── */}
        <Tag
          style={{
            fontSize,
            color: 'var(--color-web)',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            position: 'relative',
            zIndex: 3,
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-0.01em',
            textShadow: isHovered
              ? '0 0 20px var(--universe-primary), 0 0 40px var(--universe-secondary), 0 0 70px #ffffff'
              : '0 0 15px rgba(255,255,255,0.2)',
            transition: 'text-shadow 0.3s ease',
            display: 'inline-flex',
          }}
        >
          {letters.map((char, index) => (
            <motion.span
              key={index}
              animate={{
                y: isHovered ? [-3, 3, -2, 4, 0] : 0,
                rotate: isHovered ? [-4, 5, -3, 4, 0] : 0,
                scale: isHovered ? [1, 1.15, 0.95, 1.1, 1] : 1,
                color: isHovered
                  ? ['#ffffff', 'var(--universe-primary)', 'var(--universe-secondary)', '#ffffff']
                  : 'var(--color-web)',
              }}
              transition={{
                duration: 0.35,
                delay: index * 0.03,
                repeat: isHovered ? Infinity : 0,
                repeatType: 'reverse',
              }}
              style={{
                display: 'inline-block',
                whiteSpace: 'pre',
              }}
            >
              {char}
            </motion.span>
          ))}
        </Tag>

        {/* ── UNDERNEATH GLOW PULSE AURA ── */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.9 : 0,
            scale: isHovered ? [1, 1.3, 1.1] : 0.8,
          }}
          transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, var(--universe-primary) 0%, var(--universe-secondary) 50%, transparent 80%)',
            filter: 'blur(30px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
