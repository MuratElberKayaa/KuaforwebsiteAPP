import React from 'react';
import { cn } from '../../utils/cn';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  isCurrent?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHome = true,
  className,
}) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-caption tracking-wider uppercase', className)}>
      <ol className="flex items-center space-x-2 flex-wrap">
        {showHome && (
          <li className="inline-flex items-center">
            <a
              href="/"
              className="text-muted hover:text-foreground transition-colors flex items-center gap-1"
              aria-label="Ana Sayfa"
            >
              <Home className="w-3.5 h-3.5" />
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-muted-light mx-1 shrink-0" />
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center">
              {item.isCurrent || isLast ? (
                <span className="text-foreground font-semibold" aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              )}

              {!isLast && (
                <ChevronRight className="w-3.5 h-3.5 text-muted-light mx-1 shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

