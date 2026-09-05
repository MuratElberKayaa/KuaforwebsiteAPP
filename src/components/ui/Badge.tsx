import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'dark' | 'outline' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 font-medium uppercase tracking-wider select-none rounded-pill';

  const variants = {
    default: 'bg-card text-foreground/80 border border-border',
    accent: 'bg-accent/15 text-accent-dark border border-accent/30',
    dark: 'bg-dark text-background/90 border border-dark-border',
    outline: 'bg-transparent text-foreground/80 border border-border-dark',
    success: 'bg-success/15 text-success border border-success/30',
    warning: 'bg-warning/15 text-warning border border-warning/30',
    error: 'bg-error/15 text-error border border-error/30',
  };

  const sizes = {
    sm: 'text-[0.65rem] py-0.5 px-2.5',
    md: 'text-caption py-1 px-3',
    lg: 'text-small py-1.5 px-4',
  };

  const dotColors = {
    default: 'bg-muted',
    accent: 'bg-accent',
    dark: 'bg-background',
    outline: 'bg-foreground',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', dotColors[variant])} />}
      {children}
    </span>
  );
};

