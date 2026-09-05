import { useRef, useEffect } from 'react';

interface UseMagneticEffectOptions {
  maxDistance?: number;
  strength?: number;
  disabled?: boolean;
}

export function useMagneticEffect<T extends HTMLElement = HTMLButtonElement>({
  maxDistance = 8,
  strength = 0.25,
  disabled = false,
}: UseMagneticEffectOptions = {}) {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion or explicit disable
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (disabled || isTouchDevice || prefersReducedMotion) {
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      // Clamp movement within maxDistance
      const clampedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX));
      const clampedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY));

      element.style.transform = `translate3d(${clampedX.toFixed(2)}px, ${clampedY.toFixed(2)}px, 0)`;
      element.style.transition = 'transform 0.15s ease-out';
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate3d(0, 0, 0)';
      element.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.style.transform = '';
      element.style.transition = '';
    };
  }, [maxDistance, strength, disabled]);

  return elementRef;
}
