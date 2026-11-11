import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function scrollToSection(sectionId: string): void {
  const target = document.getElementById(sectionId);
  if (!target) return;

  const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';
  target.scrollIntoView({ behavior, block: 'start' });
}

export const MOTION_EASE = {
  cinematic: 'power3.out',
  architectural: 'expo.out',
  smooth: 'power2.inOut',
} as const;

