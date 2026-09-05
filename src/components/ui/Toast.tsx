import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toast: (message: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ type = 'info', title, description, duration = 4000 }: Omit<ToastMessage, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, title, description, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-success shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-error shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-accent-dark shrink-0" />;
    }
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-toast flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-4 rounded-lg bg-surface border border-border shadow-floating animate-fade-in transition-all'
            )}
            role="alert"
          >
            {getIcon(t.type)}
            <div className="flex-1">
              <h4 className="text-small font-semibold text-foreground">{t.title}</h4>
              {t.description && (
                <p className="text-caption text-muted mt-0.5 leading-normal">
                  {t.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-muted hover:text-foreground transition-colors p-0.5 rounded-sm"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

