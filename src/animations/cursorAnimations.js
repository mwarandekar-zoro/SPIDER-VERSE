import gsap from 'gsap';

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
        backgroundColor: `${primary}22`,
        borderColor: primary,
        borderRadius: '50%',
        boxShadow: `0 0 20px ${primary}66`,
        duration: 0.3,
        ease: 'power2.out',
      });
      break;
    case 'universe':
      gsap.to(element, {
        scale: 2.5,
        backgroundColor: `${secondary}22`,
        borderColor: secondary,
        borderRadius: '50%',
        boxShadow: `0 0 25px ${secondary}88`,
        duration: 0.3,
        ease: 'power2.out',
      });
      break;
    case 'button':
      gsap.to(element, {
        scale: 1.6,
        backgroundColor: `${primary}33`,
        borderColor: primary,
        borderRadius: '8px',
        boxShadow: `0 0 16px ${primary}55`,
        duration: 0.25,
        ease: 'power2.out',
      });
      break;
    case 'default':
    default:
      gsap.to(element, {
        scale: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: `${primary}88`,
        borderRadius: '50%',
        boxShadow: `0 0 10px ${primary}33`,
        duration: 0.3,
        ease: 'power2.out',
      });
      break;
  }
}
