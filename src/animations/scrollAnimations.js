/**
 * Initializes a scroll-tied fade effect on the hero element.
 * As the user scrolls down, the hero content fades out and lifts up slightly,
 * revealing the 3D multiverse map behind it.
 *
 * @param {HTMLElement} element - The Hero section element to animate
 * @returns {Function} A cleanup function to remove event listeners
 */
export function initHeroScrollFade(element) {
  if (!element) return () => {};

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Calculate fade progress: fully faded out after scrolling 80% of viewport height
    const progress = Math.min(scrollY / (viewportHeight * 0.8), 1);
    
    // Fade out and lift up slightly
    element.style.opacity = (1 - progress).toString();
    element.style.transform = `translateY(${-progress * 60}px)`;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Call once immediately to apply initial state based on current scroll position
  handleScroll();

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}
