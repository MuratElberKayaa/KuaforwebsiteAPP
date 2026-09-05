import React from 'react';
import { Calendar, MessageCircle, Phone } from 'lucide-react';

interface MobileStickyBarProps {
  onBookClick: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onBookClick }) => {
  return (
    <aside
      aria-label="Hızlı İşlem Çubuğu"
      className="fixed bottom-0 left-0 right-0 z-sticky lg:hidden bg-surface/95 backdrop-blur-md border-t border-border/80 px-4 py-3 shadow-floating transition-all safe-area-pb"
    >
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        {/* Primary Booking Button (60% width) */}
        <button
          onClick={onBookClick}
          className="flex-1 bg-foreground text-white hover:bg-dark-card py-3 px-4 rounded-md font-semibold text-small flex items-center justify-center gap-2 shadow-card active:scale-[0.98] transition-transform cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-accent" />
          <span>Randevu Al</span>
        </button>


        {/* WhatsApp Button */}
        <a
          href="https://wa.me/905321002030"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-11 bg-card hover:bg-card-hover text-foreground border border-border/80 rounded-md flex items-center justify-center active:scale-95 transition-transform"
          aria-label="WhatsApp'tan Yaz"
        >
          <MessageCircle className="w-5 h-5 text-success" />
        </a>

        {/* Call Button */}
        <a
          href="tel:+902122345060"
          className="w-12 h-11 bg-card hover:bg-card-hover text-foreground border border-border/80 rounded-md flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Telefonla Ara"
        >
          <Phone className="w-5 h-5 text-accent-dark" />
        </a>
      </div>
    </aside>
  );
};

