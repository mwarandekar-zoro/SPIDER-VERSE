/**
 * Section 39: SOUND & VOICE control.
 * Toggles Web Audio API synthesizer (cosmic drone, web thwip SFX, portal warps)
 * and Web Speech Synthesis (character & universe voice readouts).
 */
export default function SoundToggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={enabled ? 'Mute audio and character voice' : 'Enable web audio and voice system'}
      aria-pressed={enabled}
      title={enabled ? 'Mute Audio & Voice' : 'Enable Web Audio Synth & Character Voice Readouts'}
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        right: '1.25rem',
        zIndex: 40,
        padding: '0.5rem 0.9rem',
        borderRadius: '999px',
        border: enabled ? '1px solid var(--universe-primary)' : '1px solid rgba(255, 255, 255, 0.2)',
        background: enabled ? 'rgba(15, 13, 23, 0.88)' : 'rgba(21, 18, 30, 0.7)',
        color: '#ffffff',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-mono)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        boxShadow: enabled ? '0 0 20px var(--universe-primary)66' : '0 4px 16px rgba(0,0,0,0.4)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      <span style={{ fontSize: '1rem' }}>{enabled ? '🔊' : '🔇'}</span>
      <span style={{ fontSize: '0.65rem', letterSpacing: '0.05em', fontWeight: 600, color: enabled ? 'var(--universe-primary)' : 'var(--color-muted)' }}>
        {enabled ? 'VOICE ON' : 'AUDIO OFF'}
      </span>
    </button>
  );
}
