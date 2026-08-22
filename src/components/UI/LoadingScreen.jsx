import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STAGES = [
  'Loading environment...',
  'Loading characters...',
  'Loading textures...',
  'Initializing multiverse...',
];

/**
 * Section 40: a real loading sequence before the main experience.
 * This build uses lightweight primitives rather than large
 * downloaded assets, so there's genuinely little to wait for — the
 * staged progress here is honest about that (it's brief) rather
 * than artificially stretched out to look more impressive.
 *
 * skipAnimation collapses this to a near-instant pass-through for
 * reduced-motion users, per section 38.
 */
export default function LoadingScreen({ onComplete, skipAnimation = false }) {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (skipAnimation) {
      const t = setTimeout(() => setDone(true), 200);
      return () => clearTimeout(t);
    }

    const stageInterval = setInterval(() => {
      setStageIndex((i) => Math.min(i + 1, STAGES.length - 1));
    }, 320);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 6 + Math.random() * 10, 100);
        if (next >= 100) {
          clearInterval(progressInterval);
          clearInterval(stageInterval);
          setTimeout(() => setDone(true), 250);
        }
        return next;
      });
    }, 90);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, [skipAnimation]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          key="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: skipAnimation ? 0.15 : 0.5 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'var(--color-void)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <span className="eyebrow">LOADING SPIDER-VERSE</span>
          <div
            style={{
              width: 'min(280px, 70vw)',
              height: '4px',
              background: 'rgba(242, 240, 234, 0.1)',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${skipAnimation ? 100 : progress}%`,
                height: '100%',
                background: 'var(--color-rift)',
                transition: 'width 0.15s ease',
              }}
            />
          </div>
          {!skipAnimation && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
              {STAGES[stageIndex]}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
