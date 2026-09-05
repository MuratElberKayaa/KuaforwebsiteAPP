import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'outline' | 'filled' | 'underlined';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = 'outline',
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const [isFocused, setIsFocused] = useState(false);

    const baseInputStyles =
      'w-full text-foreground placeholder:text-muted-light transition-all duration-200 text-body bg-transparent focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      outline:
        'bg-surface/80 border border-border rounded-md px-3.5 py-2.5 focus:border-accent focus:ring-1 focus:ring-accent focus:bg-surface',
      filled:
        'bg-card/70 border border-transparent rounded-md px-3.5 py-2.5 focus:bg-surface focus:border-accent focus:ring-1 focus:ring-accent',
      underlined:
        'bg-transparent border-b border-border rounded-none px-1 py-2 focus:border-accent focus:border-b-2',
    };

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-caption font-medium tracking-wide uppercase text-foreground/80 flex items-center justify-between"
          >
            <span>
              {label} {required && <span className="text-accent ml-0.5">*</span>}
            </span>
          </label>
        )}

        <div
          className={cn(
            'relative flex items-center',
            variantStyles[variant],
            error && 'border-error focus:border-error focus:ring-error',
            disabled && 'opacity-60 cursor-not-allowed',
            isFocused && 'shadow-subtle',
            className
          )}
        >
          {leftIcon && <div className="shrink-0 text-muted mr-2.5">{leftIcon}</div>}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={baseInputStyles}
            {...props}
          />
          {rightIcon && <div className="shrink-0 text-muted ml-2.5">{rightIcon}</div>}
        </div>

        {error && <p className="text-caption text-error mt-0.5">{error}</p>}
        {!error && helperText && (
          <p className="text-caption text-muted mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

