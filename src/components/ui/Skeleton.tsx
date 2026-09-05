import React from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  ...props
}) => {
  const baseStyles = 'animate-pulse bg-card-hover/70';

  const variants = {
    text: 'h-4 w-full rounded-sm',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
    card: 'h-64 w-full rounded-lg',
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      aria-hidden="true"
      {...props}
    />
  );
};

