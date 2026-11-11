import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import './OpticalCursor.css';

export const OpticalCursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let currX = -100;
    let currY = -100;
    let rafId = 0;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('a, button, input, textarea, [role="tab"]')
      );
      setInteractive(isInteractive);
    };

    const handleLeave = () => setVisible(false);

    const tick = () => {
      currX += (targetX - currX) * 0.2;
      currY += (targetY - currY) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currX}px, ${currY}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className={`w-optical-cursor ${visible ? 'w-optical-cursor--visible' : ''} ${
        interactive ? 'w-optical-cursor--interactive' : ''
      }`}
    />
  );
};

