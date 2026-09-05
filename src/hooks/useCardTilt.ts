import { useRef, useEffect } from 'react';

interface UseCardTiltOptions {
  maxRotation?: number; // degrees (default 3.5 deg)
  scale?: number; // scale up on hover (default 1.015)
  disabled?: boolean;
}

export function useCardTilt<T extends HTMLElement = HTMLDivElement>({
  maxRotation = 3.5,
  scale = 1.015,
  disabled = false,
}: UseCardTiltOptions = {}) {
  const cardRef = useRef<T | null>(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (disabled || isTouchDevice || prefersReducedMotion) {
      return;
    }

    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate normalized percentage [-1, 1]
      const rotateX = ((y - centerY) / centerY) * -maxRotation;
      const rotateY = ((x - centerX) / centerX) * maxRotation;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`;
      card.style.transition = 'transform 0.1s ease-out';
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.style.transform = '';
      card.style.transition = '';
    };
  }, [maxRotation, scale, disabled]);

  return cardRef;
}
