import React from 'react';
import { useScrollReveal, UseScrollRevealOptions } from '../../hooks/useScrollReveal';
import { cn } from '../../utils/cn';

interface RevealOnScrollProps extends UseScrollRevealOptions {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'scale-up' | 'slide-right' | 'slide-left';
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className,
  animation = 'fade-up',
  threshold = 0.1,
  rootMargin = '0px 0px -30px 0px',
  delayMs = 0,
  triggerOnce = true,
}) => {
  const { ref, isVisible } = useScrollReveal({
    threshold,
    rootMargin,
    delayMs,
    triggerOnce,
  });

  const getAnimationClasses = () => {
    switch (animation) {
      case 'fade-in':
        return isVisible ? 'opacity-100' : 'opacity-0';
      case 'scale-up':
        return isVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95';
      case 'slide-right':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-6';
      case 'slide-left':
        return isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-6';
      case 'fade-up':
      default:
        return isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity]',
        getAnimationClasses(),
        className
      )}
    >
      {children}
    </div>
  );
};
