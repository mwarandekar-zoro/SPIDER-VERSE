import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCharacter } from '../../hooks/useCharacter';
import CharacterStats from './CharacterStats';
import CharacterPowers from './CharacterPowers';
import CharacterRelationships from './CharacterRelationships';
import Button from '../UI/Button';

/**
 * Section 20 layout: full character detail view with large portrait,
 * suit-themed UI shift, and entrance animation.
 *
 * Two-part entrance: portal-burst glow flash (in character's suit
 * primary color) + panel sliding up. Both re-trigger when switching
 * characters so every selection feels like a fresh dimensional arrival.
 */
export default function CharacterProfile({
  characterId,
  onSelectCharacter,
  onExploreUniverse,
  onCompare,
  onClose,
}) {
  const character = useCharacter(characterId);
  const [imageError, setImageError] = useState(false);
  if (!character) return null;

  const primary = character.suitTheme?.primary ?? character.universe?.theme?.primary ?? '#b026ff';
  const secondary = character.suitTheme?.secondary ?? character.universe?.theme?.secondary ?? '#00f0ff';
  const accent = character.suitTheme?.accent ?? primary;
  const showImage = !!character.image && !imageError;

  return (
    <motion.div
      key={characterId}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto',
        background: `linear-gradient(135deg, ${primary}15 0%, rgba(15,13,23,0.95) 40%, ${secondary}10 100%)`,
        border: `1px solid ${primary}55`,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        boxShadow: `0 0 60px ${primary}22, 0 0 120px ${secondary}11`,
      }}
    >
      {/* Suit-burst: cinematic radial flash in the character's primary color */}
      <motion.div
        key={`burst-${characterId}`}
        aria-hidden="true"
        initial={{ opacity: 0.8, scale: 0.3, rotate: 0 }}
        animate={{ opacity: 0, scale: 2.0, rotate: 30 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 30% 50%, ${primary}55, ${secondary}22, transparent 70%)`,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Top border accent line in suit primary */}
      <div
        aria-hidden="true"
        style={{
          height: '3px',
          background: `linear-gradient(90deg, ${primary}, ${secondary}, ${primary})`,
          boxShadow: `0 0 12px ${primary}`,
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(320px, 38vw, 420px) 1fr',
          gap: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Portrait column */}
        <div style={{ position: 'relative', minHeight: '440px', overflow: 'hidden', background: 'rgba(8,7,12,0.95)' }}>
          {showImage ? (
            <>
              {/* Blurred background image layer to fill edges seamlessly */}
              <img
                src={character.image}
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'blur(24px) brightness(0.35) saturate(1.4)',
                  transform: 'scale(1.2)',
                }}
              />
              {/* Main FULL image — un-cropped, 100% visible */}
              <img
                src={character.image}
                alt={character.name}
                onError={() => setImageError(true)}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  maxHeight: '520px',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  display: 'block',
                  zIndex: 1,
                  filter: `drop-shadow(0 0 25px ${primary}66)`,
                }}
              />
              {/* Subtle edge vignette overlay — no heavy black covering face */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to right, transparent 75%, rgba(15,13,23,0.95) 100%),
                               linear-gradient(to top, rgba(15,13,23,0.8) 0%, transparent 35%)`,
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />
              {/* Suit color glow accent */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at 30% 30%, ${primary}18, transparent 70%)`,
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />
            </>
          ) : (
            /* Generative art portrait for characters without an image file */
            <>
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(160deg, ${primary}22, ${secondary}11, var(--color-void))` }} />
              {/* Animated glow */}
              <motion.div
                animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.1, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(ellipse at 50% 40%, ${primary}55, transparent 70%)`,
                }}
              />
              {/* Web strands SVG */}
              <svg viewBox="0 0 280 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35 }} aria-hidden="true">
                {Array.from({ length: 9 }, (_, i) => {
                  const angle = (i / 8) * Math.PI;
                  const x2 = 140 + Math.cos(angle - Math.PI / 2) * 260;
                  const y2 = 10 + Math.sin(angle - Math.PI / 2) * 380;
                  return <line key={i} x1="140" y1="10" x2={x2} y2={y2} stroke={primary} strokeWidth="1.2" />;
                })}
                {[50, 100, 155, 210, 270].map((r, i) => (
                  <ellipse key={i} cx="140" cy="10" rx={r} ry={r * 0.7} stroke={i % 2 === 0 ? primary : secondary} strokeWidth="1" fill="none" />
                ))}
              </svg>
              {/* Floating particles */}
              {Array.from({ length: 5 }, (_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -15 - i * 4, 0], opacity: [0.3, 0.9, 0.3] }}
                  transition={{ duration: 3 + i * 0.7, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    width: `${4 + (i % 3) * 3}px`,
                    height: `${4 + (i % 3) * 3}px`,
                    borderRadius: '50%',
                    background: i % 2 === 0 ? primary : secondary,
                    left: `${20 + i * 16}%`,
                    top: `${25 + (i % 3) * 15}%`,
                    boxShadow: `0 0 10px ${i % 2 === 0 ? primary : secondary}`,
                  }}
                />
              ))}
              {/* Spider emblem center */}
              <div style={{
                position: 'absolute', top: '45%', left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}>
                <div style={{
                  width: '100px', height: '100px', borderRadius: '50%',
                  border: `2px solid ${primary}44`,
                  background: `radial-gradient(circle, ${primary}22, transparent)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px',
                  boxShadow: `0 0 30px ${primary}44`,
                }}>
                  <span style={{ fontSize: '42px', filter: `drop-shadow(0 0 14px ${primary})` }}>🕷️</span>
                </div>
              </div>
              {/* Bottom gradient for blending */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(to right, transparent 60%, rgba(15,13,23,0.95) 100%), linear-gradient(to top, ${secondary}88 0%, transparent 40%)`,
              }} />
            </>
          )}
        </div>

        {/* Info column */}
        <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          <button
            onClick={onClose}
            aria-label="Close character profile"
            style={{
              float: 'right',
              color: primary,
              fontSize: '1.25rem',
              opacity: 0.7,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.opacity = 1)}
            onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
          >
            ✕
          </button>

          {/* Universe tag */}
          <span
            className="eyebrow"
            style={{
              color: primary,
              background: `${primary}22`,
              border: `1px solid ${primary}44`,
              borderRadius: '999px',
              padding: '0.25rem 0.75rem',
              fontSize: '0.7rem',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {character.universe?.name}
          </span>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              color: '#ffffff',
              marginTop: '0.2rem',
              lineHeight: 1,
              textShadow: `0 0 24px ${primary}88`,
            }}
          >
            {character.name}
          </h2>
          <p
            style={{
              color: accent,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              marginTop: '0.3rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {character.alias}
          </p>

          <div
            style={{
              height: '1px',
              background: `linear-gradient(90deg, ${primary}44, transparent)`,
              margin: '1.25rem 0',
            }}
          />

          <p
            style={{
              color: 'var(--color-web-dim)',
              lineHeight: 1.65,
              fontSize: '0.95rem',
            }}
          >
            {character.description}
          </p>
          <p
            style={{
              color: 'var(--color-muted)',
              fontSize: 'var(--fs-small)',
              marginTop: '0.5rem',
            }}
          >
            Origin: <span style={{ color: primary }}>{character.origin}</span>
          </p>

          <div
            style={{
              height: '1px',
              background: `linear-gradient(90deg, ${primary}44, transparent)`,
              margin: '1.25rem 0',
            }}
          />

          <h3 style={sectionHeadingStyle(primary)}>Powers</h3>
          <CharacterPowers powers={character.powers} accent={primary} />

          <div
            style={{
              height: '1px',
              background: `linear-gradient(90deg, ${primary}44, transparent)`,
              margin: '1.25rem 0',
            }}
          />

          <h3 style={sectionHeadingStyle(primary)}>Combat Stats</h3>
          <p style={{ color: 'var(--color-muted)', fontSize: 'var(--fs-small)', marginBottom: '0.75rem' }}>
            Experience-specific visualization values.
          </p>
          <CharacterStats stats={character.stats} accent={primary} />

          {character.relationships.length > 0 && (
            <>
              <div
                style={{
                  height: '1px',
                  background: `linear-gradient(90deg, ${primary}44, transparent)`,
                  margin: '1.25rem 0',
                }}
              />
              <h3 style={sectionHeadingStyle(primary)}>Relationships</h3>
              <CharacterRelationships
                relationships={character.relationships}
                onSelectCharacter={onSelectCharacter}
              />
            </>
          )}

          {character.movies && character.movies.length > 0 && (
            <>
              <div
                style={{
                  height: '1px',
                  background: `linear-gradient(90deg, ${primary}44, transparent)`,
                  margin: '1.25rem 0',
                }}
              />
              <h3 style={sectionHeadingStyle(primary)}>🎬 Feature Film Appearances</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {character.movies.map((movie, idx) => (
                  <a
                    key={idx}
                    href={movie.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.55rem 1.1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${primary}33`,
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      textDecoration: 'none',
                      transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${primary}22`;
                      e.currentTarget.style.borderColor = primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = `${primary}33`;
                    }}
                  >
                    <span>🎬</span>
                    <span>{movie.title}</span>
                    <span style={{ color: primary, marginLeft: 'auto' }}>↗</span>
                  </a>
                ))}
              </div>
            </>
          )}

          {character.video && (
            <>
              <div
                style={{
                  height: '1px',
                  background: `linear-gradient(90deg, ${primary}44, transparent)`,
                  margin: '1.25rem 0',
                }}
              />
              <h3 style={sectionHeadingStyle(primary)}>▶️ Featured Video & Showcase</h3>
              <a
                href={character.video.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.6rem 1.2rem',
                  borderRadius: 'var(--radius-sm)',
                  background: `${secondary}18`,
                  border: `1px solid ${secondary}55`,
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  boxShadow: `0 0 16px ${secondary}22`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${secondary}33`;
                  e.currentTarget.style.borderColor = secondary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${secondary}18`;
                  e.currentTarget.style.borderColor = `${secondary}55`;
                }}
              >
                <span>🎥</span>
                <span>{character.video.title}</span>
                <span style={{ color: secondary, marginLeft: '0.2rem' }}>↗</span>
              </a>
            </>
          )}

          {character.youtubeSearch && (
            <>
              {!character.video && (
                <div
                  style={{
                    height: '1px',
                    background: `linear-gradient(90deg, ${primary}44, transparent)`,
                    margin: '1.25rem 0',
                  }}
                />
              )}
              {!character.video && <h3 style={sectionHeadingStyle(primary)}>▶️ YouTube Video Showcase</h3>}
              <div style={{ marginTop: character.video ? '0.5rem' : '0' }}>
                <a
                  href={character.youtubeSearch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.6rem 1.2rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 0, 0, 0.12)',
                    border: '1px solid rgba(255, 0, 0, 0.4)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 0 16px rgba(255, 0, 0, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 0, 0, 0.25)';
                    e.currentTarget.style.borderColor = '#ff2222';
                    e.currentTarget.style.boxShadow = '0 0 24px rgba(255, 0, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 0, 0, 0.12)';
                    e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.4)';
                    e.currentTarget.style.boxShadow = '0 0 16px rgba(255, 0, 0, 0.2)';
                  }}
                >
                  <span style={{ color: '#ff3333' }}>▶</span>
                  <span>{character.youtubeSearch.title}</span>
                  <span style={{ color: '#ff3333', marginLeft: '0.2rem' }}>↗</span>
                </a>
              </div>
            </>
          )}

          {character.behindTheScenes && (
            <>
              <div
                style={{
                  height: '1px',
                  background: `linear-gradient(90deg, ${primary}44, transparent)`,
                  margin: '1.25rem 0',
                }}
              />
              <h3 style={sectionHeadingStyle(primary)}>✨ Behind the Scenes & VFX Craft</h3>
              <a
                href={character.behindTheScenes.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  background: `linear-gradient(90deg, ${primary}22, ${secondary}22)`,
                  border: `1px solid ${primary}`,
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  boxShadow: `0 0 20px ${primary}44`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 0 28px ${primary}88`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = `0 0 20px ${primary}44`;
                }}
              >
                <span>🎨</span>
                <span>{character.behindTheScenes.title}</span>
                <span style={{ color: primary, marginLeft: '0.2rem' }}>↗</span>
              </a>
            </>
          )}

          {character.comic && (
            <>
              <div
                style={{
                  height: '1px',
                  background: `linear-gradient(90deg, ${primary}44, transparent)`,
                  margin: '1.25rem 0',
                }}
              />
              <h3 style={sectionHeadingStyle(primary)}>Official Marvel Comics</h3>
              <a
                href={character.comic.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  background: `${primary}18`,
                  border: `1px solid ${primary}44`,
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  boxShadow: `0 0 16px ${primary}22`,
                  marginBottom: '0.5rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${primary}33`;
                  e.currentTarget.style.borderColor = primary;
                  e.currentTarget.style.boxShadow = `0 0 20px ${primary}55`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${primary}18`;
                  e.currentTarget.style.borderColor = `${primary}44`;
                  e.currentTarget.style.boxShadow = `0 0 16px ${primary}22`;
                }}
              >
                <span>📚</span>
                <span>{character.comic.title}</span>
                <span style={{ color: primary, marginLeft: '0.2rem' }}>↗</span>
              </a>
            </>
          )}

          <div
            style={{
              height: '1px',
              background: `linear-gradient(90deg, ${primary}44, transparent)`,
              margin: '1.25rem 0',
            }}
          />

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button
              onClick={() => onExploreUniverse(character.universe?.id)}
              style={{
                padding: '0.7rem 1.4rem',
                borderRadius: '999px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background: primary,
                color: '#08070c',
                boxShadow: `0 0 16px ${primary}66`,
              }}
            >
              Explore Universe →
            </Button>
            <Button
              onClick={() => onCompare(character.id)}
              style={{
                padding: '0.7rem 1.4rem',
                borderRadius: '999px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background: 'transparent',
                color: primary,
                border: `1px solid ${primary}`,
              }}
            >
              Compare
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function sectionHeadingStyle(primary) {
  return {
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: primary,
    marginBottom: '0.75rem',
  };
}
