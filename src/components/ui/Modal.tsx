import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = 'md',
  className,
  showCloseButton = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    full: 'max-w-[96vw] h-[92vh]',
  };

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          'relative w-full bg-background border border-border/80 rounded-xl shadow-floating z-10 flex flex-col max-h-[90vh] overflow-hidden my-auto',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-border/60 bg-surface/50 shrink-0">
            <div>
              {title && (
                <h2 className="font-serif text-h3 text-foreground tracking-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-small text-muted mt-0.5">{subtitle}</p>
              )}
            </div>

            {showCloseButton && (
              <IconButton
                aria-label="Kapat"
                variant="ghost"
                size="sm"
                isRound
                onClick={onClose}
                className="hover:bg-foreground/10 ml-auto shrink-0"
              >
                <X className="w-5 h-5 text-foreground/70" />
              </IconButton>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

