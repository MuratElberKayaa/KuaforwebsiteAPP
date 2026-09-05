import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  subtitle?: string;
  badge?: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('divide-y divide-border/80 border-y border-border/80', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="transition-colors duration-200">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full py-5 px-1 sm:px-2 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-expanded={isOpen}
            >
              <div className="pr-4 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-h4 sm:text-h3 text-foreground group-hover:text-accent-dark transition-colors">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className="text-[0.65rem] uppercase tracking-wider py-0.5 px-2 bg-card text-muted rounded-full border border-border">
                      {item.badge}
                    </span>
                  )}
                </div>
                {item.subtitle && (
                  <p className="text-small text-muted mt-1">{item.subtitle}</p>
                )}
              </div>

              <div
                className={cn(
                  'w-8 h-8 rounded-full border border-border/80 flex items-center justify-center shrink-0 text-muted transition-transform duration-300 group-hover:border-foreground/40 group-hover:text-foreground',
                  isOpen && 'rotate-180 bg-card text-foreground'
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="pb-6 px-1 sm:px-2 pt-1 text-body text-muted leading-relaxed animate-fade-in">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

