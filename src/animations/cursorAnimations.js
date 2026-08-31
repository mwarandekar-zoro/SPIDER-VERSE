import gsap from 'gsap';

/**
 * Safely converts any color string (#hex, rgb, rgba) to a valid rgba() string with alpha
 */
function toRgba(colorStr, alpha = 1) {
  if (!colorStr) return `rgba(176, 38, 255, ${alpha})`;
  const trimmed = colorStr.trim();
  if (trimmed.startsWith('#')) {
    let hex = trimmed.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const r = parseInt(hex.substring(0, 2), 16) || 176;
    const g = parseInt(hex.substring(2, 4), 16) || 38;
    const b = parseInt(hex.substring(4, 6), 16) || 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  if (trimmed.startsWith('rgb')) {
    const match = trimmed.match(/\d+/g);
    if (match && match.length >= 3) {
      return `rgba(${match[0]}, ${match[1]}, ${match[2]}, ${alpha})`;
    }
  }
  return trimmed;
}

/**
 * Animates the inner cursor ring element based on the active hover variant.
 * Reads --universe-primary and --universe-secondary from document computed style
 * so every selection (Miles red, Gwen pink, 2099 cyan, etc.) changes the ring color!
 *
 * @param {HTMLElement} element - The cursor ring element (.custom-cursor-ring)
 * @param {string} variant - The hover state variant ('default', 'character', 'universe', 'button')
 */
export function animateCursorVariant(element, variant) {
  if (!element) return;

  // Kill any running animations on the element to avoid conflicts
  gsap.killTweensOf(element);

  const primary = getComputedStyle(document.documentElement)
    .getPropertyValue('--universe-primary').trim() || '#b026ff';
  const secondary = getComputedStyle(document.documentElement)
    .getPropertyValue('--universe-secondary').trim() || '#00f0ff';

  switch (variant) {
    case 'character':
      gsap.to(element, {
        scale: 2.2,
        backgroundColor: toRgba(primary, 0.15),
        borderColor: primary,
        borderRadius: '50%',
        boxShadow: `0 0 20px ${toRgba(primary, 0.4)}`,
        duration: 0.3,
        ease: 'power2.out',
      });
      break;
    case 'universe':
      gsap.to(element, {
        scale: 2.5,
        backgroundColor: toRgba(secondary, 0.15),
        borderColor: secondary,
        borderRadius: '50%',
        boxShadow: `0 0 25px ${toRgba(secondary, 0.5)}`,
        duration: 0.3,
        ease: 'power2.out',
      });
      break;
    case 'button':
      gsap.to(element, {
        scale: 1.6,
        backgroundColor: toRgba(primary, 0.2),
        borderColor: primary,
        borderRadius: '8px',
        boxShadow: `0 0 16px ${toRgba(primary, 0.35)}`,
        duration: 0.25,
        ease: 'power2.out',
      });
      break;
    case 'default':
    default:
      gsap.to(element, {
        scale: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: toRgba(primary, 0.5),
        borderRadius: '50%',
        boxShadow: `0 0 10px ${toRgba(primary, 0.2)}`,
        duration: 0.3,
        ease: 'power2.out',
      });
      break;
  }
}
