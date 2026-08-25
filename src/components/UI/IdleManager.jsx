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
// IdleManager — drop this into App. Owns idle state + prompt.
// ─────────────────────────────────────────────────────────────
export default function IdleManager() {
  const [isIdle, setIsIdle] = useState(false);

  useIdleDetector({
    timeout: 8000,
    onIdle: () => setIsIdle(true),
    onActive: () => setIsIdle(false),
  });

  return <IdlePrompt isIdle={isIdle} />;
}
