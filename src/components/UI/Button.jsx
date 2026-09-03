import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../Cursor/CursorContext';

/**
 * Section 12/15: magnetic movement on hover, plus the custom
 * cursor's "→" label. Works whether or not CustomCursor is mounted
 * (setCursor no-ops safely on touch devices via the context default).
 */
export default function Button({ children, onClick, style, ...props }) {
  const ref = useRef(null);
  const { setCursor } = useCursor();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  function handlePointerMove(event) {
    const bounds = ref.current.getBoundingClientRect();
    const relX = event.clientX - (bounds.left + bounds.width / 2);
    const relY = event.clientY - (bounds.top + bounds.height / 2);
    x.set(relX * 0.3);
    y.set(relY * 0.3);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
    setCursor('default');
  }

  return (
    <motion.button
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={() => setCursor('button', '→')}
      onClick={onClick}
      whileHover={{ scale: 1.065 }}
      whileTap={{ scale: 0.96 }}
      style={{ x: springX, y: springY, ...style }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
