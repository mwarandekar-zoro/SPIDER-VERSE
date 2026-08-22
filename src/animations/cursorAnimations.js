import gsap from 'gsap';

/**
 * Animates the inner cursor ring element based on the active hover variant.
 *
 * @param {HTMLElement} element - The cursor ring element (.custom-cursor-ring)
 * @param {string} variant - The hover state variant ('default', 'character', 'universe', 'button')
 */
export function animateCursorVariant(element, variant) {
  if (!element) return;

  // Kill any running animations on the element to avoid conflicts
  gsap.killTweensOf(element);

  switch (variant) {
    case 'character':
      gsap.to(element, {
        scale: 2.2,
        backgroundColor: 'rgba(176, 38, 255, 0.12)', // Faint Rift color fill
        borderColor: 'rgba(176, 38, 255, 0.8)',
        borderRadius: '50%',
        duration: 0.3,
        ease: 'power2.out',
      });
      break;
    case 'universe':
      gsap.to(element, {
        scale: 2.5,
        backgroundColor: 'rgba(0, 240, 255, 0.12)', // Faint Glitch/Cyan color fill
        borderColor: 'rgba(0, 240, 255, 0.8)',
        borderRadius: '50%',
        duration: 0.3,
        ease: 'power2.out',
      });
      break;
    case 'button':
      gsap.to(element, {
        scale: 1.6,
        backgroundColor: 'rgba(176, 38, 255, 0.2)', // Button interactive fill
        borderColor: '#b026ff',
        borderRadius: '8px', // Slightly rounded corner for buttons
        duration: 0.25,
        ease: 'power2.out',
      });
      break;
    case 'default':
    default:
      gsap.to(element, {
        scale: 1,
        backgroundColor: 'rgba(176, 38, 255, 0)', // Transparent background
        borderColor: 'rgba(176, 38, 255, 0.5)',
        borderRadius: '50%',
        duration: 0.3,
        ease: 'power2.out',
      });
      break;
  }
}
