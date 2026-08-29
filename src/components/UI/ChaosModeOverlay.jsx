/**
 * ChaosModeOverlay — "Spider-Verse Chaos Mode" Easter Egg
 *
 * Triggered by Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) or typing 'spider'.
 * Screen fills with web-swinging Spider-Person silhouettes and
 * dimensional rift lines swinging across the viewport.
 */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../../utils/audio';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export function useKonamiCode(onUnlock) {
  const [inputIndex, setInputIndex] = useState(0);

  useEffect(() => {
    function handleKeyDown(e) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI_CODE[inputIndex].toLowerCase();

      if (key === expected) {
        const next = inputIndex + 1;
        if (next === KONAMI_CODE.length) {
          onUnlock();
          setInputIndex(0);
        } else {
          setInputIndex(next);
        }
      } else {
        setInputIndex(0);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputIndex, onUnlock]);
}

export default function ChaosModeOverlay({ active, onClose }) {
  useEffect(() => {
    if (active) {
      playSound('portal', { volume: 0.8 });
      const timer = setTimeout(() => {
        onClose?.();
      }, 8500);
      return () => clearTimeout(timer);
    }
  }, [active, onClose]);

  if (!active) return null;

  const silhouettes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    startX: i % 2 === 0 ? -100 : window.innerWidth + 100,
    endX: i % 2 === 0 ? window.innerWidth + 100 : -100,
    startY: 100 + i * 80,
    endY: 200 + (i % 3) * 150,
    delay: i * 0.4,
    color: ['#ff2222', '#ff6fd8', '#00f0ff', '#ffdd00', '#ffb300', '#ff6644'][i % 6],
  }));

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 9999,
            overflow: 'hidden',
          }}
        >
          {/* Banner notification */}
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            style={{
              position: 'absolute',
              top: '5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(90deg, #ff0055, #b026ff, #00f0ff)',
              padding: '0.6rem 1.8rem',
              borderRadius: '999px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 900,
              fontSize: '0.9rem',
              color: '#fff',
              letterSpacing: '0.15em',
              boxShadow: '0 0 35px rgba(255, 0, 85, 0.8)',
              textTransform: 'uppercase',
            }}
          >
            ⚠️ SPIDER-VERSE CHAOS MODE ACTIVATED ⚠️
          </motion.div>

          {/* Swinging Silhouettes */}
          {silhouettes.map((s) => (
            <motion.div
              key={s.id}
              initial={{ x: s.startX, y: s.startY, rotate: -20, opacity: 0 }}
              animate={{
                x: [s.startX, (s.startX + s.endX) / 2, s.endX],
                y: [s.startY, s.startY - 120, s.endY],
                rotate: [ -25, 15, 35 ],
                opacity: [ 0, 1, 0 ],
              }}
              transition={{ duration: 2.2, delay: s.delay, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                width: '60px',
                height: '60px',
              }}
            >
              {/* Web line attached */}
              <svg
                width="200"
                height="200"
                style={{
                  position: 'absolute',
                  top: '-150px',
                  left: '15px',
                  overflow: 'visible',
                }}
              >
                <line
                  x1="15"
                  y1="150"
                  x2="100"
                  y2="0"
                  stroke={s.color}
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
              </svg>

              {/* Spider Silhouette Icon */}
              <svg
                viewBox="0 0 100 100"
                style={{
                  width: '100%',
                  height: '100%',
                  fill: s.color,
                  filter: `drop-shadow(0 0 12px ${s.color})`,
                }}
              >
                <path d="M50,15 C45,15 42,20 42,26 C42,32 45,36 50,38 C55,36 58,32 58,26 C58,20 55,15 50,15 Z M50,42 C40,44 32,54 32,66 C32,78 40,86 50,88 C60,86 68,78 68,66 C68,54 60,44 50,42 Z" />
                <path d="M42,26 Q20,10 10,25 Q30,35 42,36" stroke={s.color} strokeWidth="3" fill="none" />
                <path d="M58,26 Q80,10 90,25 Q70,35 58,36" stroke={s.color} strokeWidth="3" fill="none" />
                <path d="M38,48 Q10,40 5,60 Q25,62 36,58" stroke={s.color} strokeWidth="3" fill="none" />
                <path d="M62,48 Q90,40 95,60 Q75,62 64,58" stroke={s.color} strokeWidth="3" fill="none" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
