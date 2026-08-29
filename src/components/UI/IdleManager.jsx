import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// useIdleDetector — fires onIdle after `timeout` ms of no
// pointer/key/scroll/click activity, fires onActive the moment
// any event fires again.
// ─────────────────────────────────────────────────────────────
export function useIdleDetector({ timeout = 8000, onIdle, onActive }) {
  const timerRef = useRef(null);
  const isIdleRef = useRef(false);

  const resetTimer = useCallback(() => {
    if (isIdleRef.current) {
      isIdleRef.current = false;
      onActive?.();
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      isIdleRef.current = true;
      onIdle?.();
    }, timeout);
  }, [timeout, onIdle, onActive]);

  useEffect(() => {
    const events = ['pointermove', 'pointerdown', 'keydown', 'scroll', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));
    resetTimer(); // prime the timer on mount
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, [resetTimer]);
}

// ─────────────────────────────────────────────────────────────
// IdlePrompt — the subtle UI overlay that appears when the user
// has been idle. Fades in a dreamy "still there?" prompt with a
// pulsing web-spinner so the page feels alive, not frozen.
// ─────────────────────────────────────────────────────────────
function SpinningWeb() {
  return (
    <motion.svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      style={{ display: 'block', margin: '0 auto 1rem' }}
      aria-hidden="true"
    >
      {/* 8 strands */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI * 2) / 8;
        return (
          <line
            key={i}
            x1="32" y1="32"
            x2={32 + Math.cos(a) * 30}
            y2={32 + Math.sin(a) * 30}
            stroke="var(--universe-primary, #b026ff)"
            strokeWidth="1"
            strokeOpacity="0.7"
          />
        );
      })}
      {/* Concentric rings */}
      {[8, 16, 24, 30].map((r) => (
        <circle key={r} cx="32" cy="32" r={r} fill="none"
          stroke="var(--universe-primary, #b026ff)" strokeWidth="0.8" strokeOpacity="0.5" />
      ))}
      <motion.circle
        cx="32" cy="32" r="4"
        fill="var(--universe-primary, #b026ff)"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
}

export function IdlePrompt({ isIdle }) {
  return (
    <AnimatePresence>
      {isIdle && (
        <motion.div
          key="idle-prompt"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <SpinningWeb />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--universe-primary, #b026ff)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textShadow: '0 0 12px var(--universe-primary, #b026ff)',
              whiteSpace: 'nowrap',
            }}
          >
            The multiverse is waiting...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// IdleSwingBy — Spawns an animated Spider-Silhouette swinging across
// the screen corner IMMEDIATELY when the user becomes idle.
// ─────────────────────────────────────────────────────────────
function IdleSwingBy({ isIdle }) {
  const [swingCount, setSwingCount] = useState(0);

  useEffect(() => {
    if (!isIdle) return;

    // Swing IMMEDIATELY on idle state enter
    setSwingCount((prev) => prev + 1);

    // Then repeat every 8s while remaining idle
    const interval = setInterval(() => {
      setSwingCount((prev) => prev + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, [isIdle]);

  return (
    <AnimatePresence>
      {isIdle && (
        <motion.div
          key={`swing-${swingCount}`}
          initial={{ x: -160, y: 200, rotate: -35, opacity: 0 }}
          animate={{
            x: [ -160, window.innerWidth * 0.45, window.innerWidth + 160 ],
            y: [ 200, 50, 300 ],
            rotate: [ -35, 0, 45 ],
            opacity: [ 0, 1, 0 ],
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '120px',
            height: '120px',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          {/* Animated Glowing Web String */}
          <svg
            width="400"
            height="400"
            style={{ position: 'absolute', top: '-350px', left: '40px', overflow: 'visible' }}
          >
            <line
              x1="40"
              y1="350"
              x2="250"
              y2="0"
              stroke="var(--universe-primary, #b026ff)"
              strokeWidth="3"
              strokeDasharray="6 3"
              strokeOpacity="0.95"
              style={{ filter: 'drop-shadow(0 0 10px var(--universe-primary, #b026ff))' }}
            />
          </svg>

          {/* Large Spider-Person Silhouette */}
          <svg
            viewBox="0 0 100 100"
            style={{
              width: '100%',
              height: '100%',
              fill: 'var(--universe-primary, #b026ff)',
              filter: 'drop-shadow(0 0 25px var(--universe-primary, #b026ff)) drop-shadow(0 0 40px #ffffff)',
            }}
          >
            <path d="M50,15 C45,15 42,20 42,26 C42,32 45,36 50,38 C55,36 58,32 58,26 C58,20 55,15 50,15 Z M50,42 C40,44 32,54 32,66 C32,78 40,86 50,88 C60,86 68,78 68,66 C68,54 60,44 50,42 Z" />
            <path d="M42,26 Q20,10 10,25 Q30,35 42,36" stroke="var(--universe-primary, #b026ff)" strokeWidth="3" fill="none" />
            <path d="M58,26 Q80,10 90,25 Q70,35 58,36" stroke="var(--universe-primary, #b026ff)" strokeWidth="3" fill="none" />
            <path d="M38,48 Q10,40 5,60 Q25,62 36,58" stroke="var(--universe-primary, #b026ff)" strokeWidth="3" fill="none" />
            <path d="M62,48 Q90,40 95,60 Q75,62 64,58" stroke="var(--universe-primary, #b026ff)" strokeWidth="3" fill="none" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────
// IdleManager — drop this into App. Owns idle state + prompt + swing.
// ─────────────────────────────────────────────────────────────
export default function IdleManager() {
  const [isIdle, setIsIdle] = useState(false);

  useIdleDetector({
    timeout: 6000, // 6s idle to trigger prompt + swing-by!
    onIdle: () => setIsIdle(true),
    onActive: () => setIsIdle(false),
  });

  return (
    <>
      <IdlePrompt isIdle={isIdle} />
      <IdleSwingBy isIdle={isIdle} />
    </>
  );
}
