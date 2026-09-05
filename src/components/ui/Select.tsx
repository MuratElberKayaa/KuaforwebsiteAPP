import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      options,
      error,
      helperText,
      leftIcon,
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-caption font-medium tracking-wide uppercase text-foreground/80 flex items-center justify-between"
          >
            <span>
              {label} {required && <span className="text-accent ml-0.5">*</span>}
            </span>
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
              {leftIcon}
            </div>
          )}

          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            className={cn(
              'w-full bg-surface/80 border border-border rounded-md py-2.5 px-3.5 text-body text-foreground transition-all duration-200 appearance-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
              leftIcon ? 'pl-10' : 'pl-3.5',
              'pr-10',
              error && 'border-error focus:border-error focus:ring-error',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {error && <p className="text-caption text-error mt-0.5">{error}</p>}
        {!error && helperText && (
          <p className="text-caption text-muted mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

