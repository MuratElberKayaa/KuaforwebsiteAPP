import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'dark' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isFullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      isFullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-300 ease-editorial relative overflow-hidden select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

    const variants = {
      primary:
        '!bg-foreground !text-white hover:!bg-dark-card hover:!text-white shadow-sm border border-transparent',
      secondary:
        'bg-card text-foreground hover:bg-card-hover border border-border/80 shadow-subtle',
      outline:
        'bg-transparent text-foreground border border-foreground/30 hover:border-foreground hover:bg-foreground/5',
      ghost:
        'bg-transparent text-foreground hover:bg-foreground/5 hover:text-accent-dark',
      gold:
        '!bg-accent !text-stone-900 font-bold hover:!bg-accent-hover shadow-subtle hover:shadow-glow-gold transition-shadow',
      dark:
        '!bg-[#12100E] !text-white hover:!bg-[#221F1C] hover:!text-white border border-[#332E2A]',
      white:
        'bg-surface text-foreground hover:bg-card shadow-subtle border border-border/40',
    };

    const sizes = {
      xs: 'text-xs py-1.5 px-3 rounded-sm gap-1.5 tracking-wider uppercase font-semibold',
      sm: 'text-sm py-2 px-4 rounded-sm gap-2 tracking-wide font-medium',
      md: 'text-base py-2.5 px-6 rounded-md gap-2.5 tracking-wide font-medium',
      lg: 'text-lg py-3.5 px-8 rounded-md gap-3 tracking-wide font-medium',
      xl: 'text-xl py-4 px-10 rounded-lg gap-3.5 tracking-wider font-semibold',
    };


    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isFullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading && (
          <Loader2 className="w-4 h-4 animate-spin shrink-0 -ml-1 mr-2" />
        )}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span className="truncate">{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

