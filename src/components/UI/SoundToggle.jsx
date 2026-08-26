/**
 * Section 39: SOUND & VOICE control button.
 * Restored to clean, circular 44px floating glass icon button (🔊 / 🔇).
 * Glows in suit primary color when audio & voice are enabled!
 */
export default function SoundToggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={enabled ? 'Mute sound and voice' : 'Enable audio and voice system'}
      aria-pressed={enabled}
      title={enabled ? 'Sound & Voice ON (Click to Mute)' : 'Sound & Voice OFF (Click to Enable)'}
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        right: '1.25rem',
        zIndex: 40,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: enabled ? '1.5px solid var(--universe-primary)' : '1px solid rgba(242, 240, 234, 0.2)',
        background: enabled ? 'rgba(15, 13, 23, 0.85)' : 'rgba(21, 18, 30, 0.7)',
        color: 'var(--color-web)',
        fontSize: '1.25rem',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: enabled ? '0 0 20px var(--universe-primary)77' : '0 4px 16px rgba(0,0,0,0.4)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  );
}
