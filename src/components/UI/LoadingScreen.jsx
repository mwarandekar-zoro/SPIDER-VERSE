import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// Spider-Verse facts — shown in a rotating carousel while
// the experience loads. Keeps the screen lively instead of
// just a static spinner and progress bar.
// ─────────────────────────────────────────────────────────────
const FACTS = [
  { emoji: '🕷️', text: 'Miles Morales was bitten by a radioactive spider during a school trip to Alchemax.' },
  { emoji: '🎸', text: 'Hobie Brown built his Spider-Punk suit from stolen Oscorp equipment and refuses to trademark it.' },
  { emoji: '🐷', text: 'Peter Porker was actually a spider before being bitten by a radioactive pig named May Porker.' },
  { emoji: '🌐', text: 'The Spider-Society monitors over 200+ parallel universes from Earth-928\'s Nueva York.' },
  { emoji: '🥁', text: 'Gwen Stacy plays drums for a band called The Mary Janes on Earth-65.' },
  { emoji: '🤖', text: 'Takuya Yamashiro pilots Leopardon, a giant mech — the first Spider-Man to have one.' },
  { emoji: '🧬', text: 'Miguel O\'Hara has fangs and talons from spliced spider DNA — and 100% of his DNA is arachnid.' },
  { emoji: '🎨', text: 'Into the Spider-Verse used a different visual style for each character — Miles is paint and ink.' },
  { emoji: '🌆', text: 'Pavitr Prabhakar protects Mumbattan — a fusion city of Mumbai and Manhattan on Earth-50101.' },
  { emoji: '🔧', text: 'Cyborg Spider-Man\'s mechanical arm has web-shooters integrated directly into the chassis.' },
];

const STAGES = [
  'Calibrating multiverse coordinates...',
  'Loading Spider-People...',
  'Weaving the web of life...',
  'Initializing dimension portals...',
  'Almost there...',
];

/**
 * Phase 7 upgrade: Loading screen now shows a rotating Spider-Verse
 * fact carousel while the progress bar runs, giving the user something
 * interesting to read instead of a static spinner.
 */
export default function LoadingScreen({ onComplete, skipAnimation = false }) {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(() => Math.floor(Math.random() * FACTS.length));
  const [done, setDone] = useState(false);

  // Progress + stage advance
  useEffect(() => {
    if (skipAnimation) {
      const t = setTimeout(() => setDone(true), 200);
      return () => clearTimeout(t);
    }

    const stageInterval = setInterval(() => {
      setStageIndex((i) => Math.min(i + 1, STAGES.length - 1));
    }, 380);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 5 + Math.random() * 9, 100);
        if (next >= 100) {
          clearInterval(progressInterval);
          clearInterval(stageInterval);
          setTimeout(() => setDone(true), 300);
        }
        return next;
      });
    }, 90);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, [skipAnimation]);

  // Fact carousel — rotates every 2.2s
  useEffect(() => {
    if (skipAnimation) return;
    const interval = setInterval(() => {
      setFactIndex((i) => (i + 1) % FACTS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [skipAnimation]);

  const fact = FACTS[factIndex];

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          key="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: skipAnimation ? 0.15 : 0.6 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'var(--color-void)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0',
          }}
        >
          {/* ── Spinning web logo ── */}
          <motion.svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{ marginBottom: '1.5rem' }}
            aria-hidden="true"
          >
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i * Math.PI * 2) / 8;
              return (
                <line
                  key={i}
                  x1="36" y1="36"
                  x2={36 + Math.cos(a) * 34}
                  y2={36 + Math.sin(a) * 34}
                  stroke="var(--color-rift)"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                />
              );
            })}
            {[10, 20, 28, 34].map((r) => (
              <circle key={r} cx="36" cy="36" r={r} fill="none"
                stroke="var(--color-rift)" strokeWidth="0.9" strokeOpacity="0.5" />
            ))}
            <motion.circle
              cx="36" cy="36" r="5"
              fill="var(--color-rift)"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </motion.svg>

          {/* ── Eyebrow ── */}
          <span className="eyebrow" style={{ marginBottom: '1.25rem' }}>
            LOADING SPIDER-VERSE
          </span>

          {/* ── Progress Bar ── */}
          <div
            style={{
              width: 'min(300px, 70vw)',
              height: '4px',
              background: 'rgba(242, 240, 234, 0.1)',
              borderRadius: '999px',
              overflow: 'hidden',
              marginBottom: '0.6rem',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--color-rift), var(--color-glitch))',
                boxShadow: '0 0 10px var(--color-rift)',
              }}
              animate={{ width: `${skipAnimation ? 100 : progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.15 }}
            />
          </div>

          {/* ── Stage label ── */}
          {!skipAnimation && (
            <AnimatePresence mode="wait">
              <motion.span
                key={stageIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--color-muted)',
                  marginBottom: '2rem',
                }}
              >
                {STAGES[stageIndex]}
              </motion.span>
            </AnimatePresence>
          )}

          {/* ── Fact Carousel ── */}
          {!skipAnimation && (
            <div
              style={{
                width: 'min(420px, 88vw)',
                minHeight: '90px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '0.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--color-muted)',
                  letterSpacing: '0.1em',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                }}
              >
                Did you know?
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={factIndex}
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    textAlign: 'center',
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>
                    {fact.emoji}
                  </span>
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--color-web-dim)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {fact.text}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Dot indicators */}
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.85rem' }}>
                {FACTS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === factIndex ? '16px' : '5px',
                      height: '5px',
                      borderRadius: '999px',
                      background: i === factIndex ? 'var(--color-rift)' : 'rgba(255,255,255,0.2)',
                      transition: 'all 0.35s ease',
                      boxShadow: i === factIndex ? '0 0 6px var(--color-rift)' : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
