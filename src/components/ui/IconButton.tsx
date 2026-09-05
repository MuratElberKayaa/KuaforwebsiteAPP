import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'dark' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isRound?: boolean;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = 'ghost',
      size = 'md',
      isRound = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center transition-all duration-200 ease-editorial select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95';

    const variants = {
      primary: '!bg-foreground !text-white hover:!bg-dark-card shadow-sm',
      secondary: 'bg-card text-foreground hover:bg-card-hover border border-border/80',
      outline: 'bg-transparent text-foreground border border-border hover:border-foreground',
      ghost: 'bg-transparent text-foreground hover:bg-foreground/10',
      gold: '!bg-accent !text-stone-900 font-bold hover:!bg-accent-hover',
      dark: '!bg-[#12100E] !text-white hover:!bg-[#221F1C] border border-[#332E2A]',
      white: 'bg-surface text-foreground hover:bg-card border border-border/40 shadow-subtle',
    };


    const sizes = {
      xs: 'w-7 h-7 text-xs',
      sm: 'w-9 h-9 text-sm',
      md: 'w-11 h-11 text-base',
      lg: 'w-13 h-13 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isRound ? 'rounded-full' : 'rounded-md',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

