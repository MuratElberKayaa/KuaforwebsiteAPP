import React, { useState } from 'react';
import { cn } from '../../utils/cn';

interface SmoothImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  containerClassName?: string;
  aspectRatio?: string;
  hoverZoom?: boolean;
}

export const SmoothImage: React.FC<SmoothImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  aspectRatio = 'aspect-4/3',
  hoverZoom = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-secondary',
        aspectRatio,
        containerClassName
      )}
    >
      {/* Background skeleton blur placeholder */}
      <div
        className={cn(
          'absolute inset-0 bg-border/40 transition-opacity duration-700',
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100 animate-pulse'
        )}
      />

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          'w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isLoaded ? 'opacity-100 filter-none scale-100' : 'opacity-0 scale-[1.02] blur-xs',
          hoverZoom && 'hover:scale-[1.045]',
          className
        )}
        {...props}
      />
    </div>
  );
};
