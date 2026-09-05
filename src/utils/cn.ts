import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-display',
        'text-h1',
        'text-h2',
        'text-h3',
        'text-body-lg',
        'text-body',
        'text-small',
        'text-caption',
        'text-eyebrow',
      ],
      'text-color': [
        'text-background',
        'text-foreground',
        'text-surface',
        'text-muted',
        'text-muted-light',
        'text-muted-dark',
        'text-accent',
        'text-accent-hover',
        'text-accent-light',
        'text-accent-dark',
        'text-dark',
        'text-dark-surface',
        'text-dark-card',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
