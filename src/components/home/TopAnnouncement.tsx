import React, { useState } from 'react';
import { X, Sparkles, MapPin, Phone } from 'lucide-react';
import { Container } from '../ui';

interface TopAnnouncementProps {
  onBookClick?: () => void;
}

export const TopAnnouncement: React.FC<TopAnnouncementProps> = ({ onBookClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-dark text-background py-2 text-caption border-b border-dark-border relative z-40 transition-all">
      <Container size="full" className="flex items-center justify-between">
        {/* Left: Branch highlight / Location */}
        <div className="hidden lg:flex items-center space-x-4 text-muted-light">
          <span className="flex items-center gap-1 hover:text-accent transition-colors">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            İstanbul (Nişantaşı, Bebek, Bağdat Cad.) & Ankara (Çayyolu)
          </span>
        </div>

        {/* Center: Main Promotion */}
        <div className="flex items-center justify-center space-x-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-accent shrink-0 animate-pulse" />
          <span className="tracking-wide">
            Yeni sezon saç trendleri & renk konsültasyonu için randevunuzu şimdi oluşturun.
          </span>
          <button
            onClick={onBookClick}
            className="underline underline-offset-4 font-semibold text-accent hover:text-accent-light transition-colors ml-1"
          >
            Randevu Al &rarr;
          </button>
        </div>

        {/* Right: Phone & Dismiss */}
        <div className="flex items-center space-x-4">
          <a
            href="tel:+902122345060"
            className="hidden sm:flex items-center gap-1.5 text-muted-light hover:text-background transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-accent" />
            <span>+90 (212) 234 50 60</span>
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="text-muted-light hover:text-background p-1 -mr-1 transition-colors"
            aria-label="Duyuruyu Kapat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </Container>
    </div>
  );
};

