/**
 * TextScramble — headings that decode letter-by-letter
 * as they scroll into view, like a hacking terminal.
 *
 * Props:
 *   text     — the final text to reveal
 *   as       — element tag (default 'span')
 *   speed    — ms between character reveals (default 38)
 *   delay    — ms before starting after entering view (default 100)
 *   className, style — forwarded
 */
import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

function scramble(final, progress) {
  return final
    .split('')
    .map((char, i) => {
      if (char === ' ') return ' ';
      if (i < progress) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join('');
}

export default function TextScramble({
  text = '',
  as: Tag = 'span',
  speed = 38,
  delay = 100,
  className = '',
  style = {},
}) {
  const [displayed, setDisplayed] = useState(text);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);
  const intervalRef = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(text);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealed) {
          setRevealed(true);
          observer.disconnect();
          setTimeout(() => {
            progressRef.current = 0;
            intervalRef.current = setInterval(() => {
              progressRef.current += 1;
              setDisplayed(scramble(text, progressRef.current));
              if (progressRef.current >= text.length) {
                clearInterval(intervalRef.current);
                setDisplayed(text);
              }
            }, speed);
          }, delay);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearInterval(intervalRef.current);
    };
  }, [text, speed, delay, revealed]);

  return (
    <Tag ref={ref} className={className} style={{ fontFamily: 'inherit', ...style }}>
      {displayed}
    </Tag>
  );
}
