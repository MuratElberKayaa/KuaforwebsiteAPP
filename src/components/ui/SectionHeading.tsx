import React from 'react';
import { cn } from '../../utils/cn';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
}) => {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  return (
    <div className={cn('flex flex-col max-w-3xl mb-12 sm:mb-16', alignStyles[align], className)}>
      {eyebrow && (
        <span className="text-eyebrow font-semibold uppercase text-accent-dark tracking-[0.25em] mb-2.5">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-serif text-h2 sm:text-h1 text-foreground tracking-tight text-balance leading-tight',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-body sm:text-body-lg text-muted max-w-2xl leading-relaxed text-balance">
          {subtitle}
        </p>
      )}
    </div>
  );
};

