import React from 'react';
import { cn } from '../../utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Sayfalama"
      className={cn('flex items-center justify-center space-x-2 my-8', className)}
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-foreground hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Önceki Sayfa"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page) => {
        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isCurrent ? 'page' : undefined}
            className={cn(
              'w-10 h-10 rounded-md text-small font-medium transition-all duration-200',
              isCurrent
                ? 'bg-foreground text-background font-semibold shadow-subtle'
                : 'text-foreground/80 hover:bg-card border border-transparent hover:border-border'
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-foreground hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Sonraki Sayfa"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

