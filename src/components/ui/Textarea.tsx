import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, disabled, required, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-caption font-medium tracking-wide uppercase text-foreground/80 flex items-center justify-between"
          >
            <span>
              {label} {required && <span className="text-accent ml-0.5">*</span>}
            </span>
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          required={required}
          className={cn(
            'w-full bg-surface/80 border border-border rounded-md px-3.5 py-2.5 text-body text-foreground placeholder:text-muted-light transition-all duration-200 resize-y focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent focus:bg-surface disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-error focus:border-error focus:ring-error',
            className
          )}
          {...props}
        />

        {error && <p className="text-caption text-error mt-0.5">{error}</p>}
        {!error && helperText && (
          <p className="text-caption text-muted mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

