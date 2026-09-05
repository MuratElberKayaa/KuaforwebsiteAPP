import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'bottom';
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  position = 'right',
  className,
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

  const positionStyles = {
    left: 'left-0 top-0 bottom-0 w-full max-w-md animate-[slideLeft_0.35s_cubic-bezier(0.16,1,0.3,1)]',
    right: 'right-0 top-0 bottom-0 w-full max-w-md animate-[slideRight_0.35s_cubic-bezier(0.16,1,0.3,1)]',
    bottom: 'bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl animate-[slideUp_0.35s_cubic-bezier(0.16,1,0.3,1)]',
  };

  return (
    <div
      className="fixed inset-0 z-modal flex overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-dark/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Body */}
      <div
        className={cn(
          'fixed bg-background border-border/80 shadow-floating z-10 flex flex-col',
          positionStyles[position],
          position === 'left' && 'border-r',
          position === 'right' && 'border-l',
          position === 'bottom' && 'border-t',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-border/60 bg-surface/40 shrink-0">
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
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

