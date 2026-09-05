import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pills' | 'editorial';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab,
  onChange,
  variant = 'editorial',
  size = 'md',
  className,
}) => {
  const sizeStyles = {
    sm: 'text-caption py-1 px-2.5',
    md: 'text-small py-1.5 px-4',
    lg: 'text-body py-2 px-5',
  };
  const variantStyles = {
    underline: 'border-b border-border/80 gap-6 sm:gap-8',
    pills: 'bg-card/70 p-1 rounded-pill border border-border/60 gap-1.5 inline-flex',
    editorial: 'border-b border-border/60 gap-6 sm:gap-10 overflow-x-auto no-scrollbar',
  };

  const getTabStyles = (isActive: boolean) => {
    switch (variant) {
      case 'pills':
        return cn(
          'px-4 py-1.5 rounded-pill text-small font-medium transition-all duration-200',
          isActive
            ? 'bg-foreground text-background shadow-subtle'
            : 'text-muted hover:text-foreground hover:bg-card-hover'
        );
      case 'underline':
        return cn(
          'pb-3 border-b-2 font-medium transition-all duration-200 -mb-[2px]',
          isActive
            ? 'border-foreground text-foreground'
            : 'border-transparent text-muted hover:text-foreground hover:border-border-dark'
        );
      case 'editorial':
      default:
        return cn(
          'pb-3 border-b-2 uppercase text-caption tracking-widest font-semibold transition-all duration-300 whitespace-nowrap -mb-[1px]',
          isActive
            ? 'border-accent text-foreground'
            : 'border-transparent text-muted hover:text-foreground hover:border-accent/40'
        );
    }
  };

  return (
    <div className={cn('flex items-center', variantStyles[variant], className)} role="tablist">
      {items.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              sizeStyles[size],
              getTabStyles(isActive)
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'text-[0.65rem] px-1.5 py-0.2 rounded-full font-mono',
                  isActive
                    ? 'bg-accent text-dark-surface'
                    : 'bg-card text-muted-foreground'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
