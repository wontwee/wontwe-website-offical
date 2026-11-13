/**
 * Global Ambient Cursor Spotlight Tracker
 * Updates --mouse-x and --mouse-y CSS variables on any hovered .w-spotlight element.
 */
export function initSpotlightTracker(): () => void {
  if (typeof window === 'undefined') return () => {};

  // Check if pointer device supports hover
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canHover) return () => {};

  const handleMouseMove = (e: MouseEvent) => {
    const target = (e.target as HTMLElement | null)?.closest?.('.w-spotlight') as HTMLElement | null;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.style.setProperty('--mouse-x', `${Math.round(x)}px`);
    target.style.setProperty('--mouse-y', `${Math.round(y)}px`);
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  return () => window.removeEventListener('mousemove', handleMouseMove);
}

