import { createContext, useContext, useMemo, useState } from 'react';

const CursorContext = createContext(null);

/**
 * Wraps the whole app (both the DOM content layer and the R3F
 * canvas — context propagates across the Canvas boundary just like
 * any other React subtree) so any interactive element, 3D or DOM,
 * can call setCursor() without prop drilling. Variant changes are
 * discrete, event-driven (hover enter/leave), so plain React state
 * here is fine — this is nothing like the per-frame mouse position
 * refs used elsewhere.
 */
export function CursorProvider({ children }) {
  const [state, setState] = useState({ variant: 'default', label: '' });

  const setCursor = useMemo(
    () =>
      (variant = 'default', label = '') =>
        setState({ variant, label }),
    []
  );

  const value = useMemo(() => ({ ...state, setCursor }), [state, setCursor]);

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    // Safe no-op so components can call useCursor() even if a
    // provider isn't mounted somewhere up the tree.
    return { variant: 'default', label: '', setCursor: () => {} };
  }
  return ctx;
}
