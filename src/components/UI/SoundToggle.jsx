/** Section 39: SOUND ON/OFF control. Controlled component — App owns
 * the actual soundEnabled state so other actions (like a portal
 * transition) can check it too. */
export default function SoundToggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={enabled ? 'Mute sound' : 'Enable sound'}
      aria-pressed={enabled}
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        right: '1.25rem',
        zIndex: 40,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1px solid rgba(242, 240, 234, 0.2)',
        background: 'rgba(21, 18, 30, 0.7)',
        color: 'var(--color-web)',
        fontSize: '1.1rem',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  );
}
