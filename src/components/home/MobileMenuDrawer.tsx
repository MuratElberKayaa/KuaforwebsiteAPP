import React from 'react';
import { Drawer, Button, InstagramIcon } from '../ui';
import { MapPin, Phone, Calendar } from 'lucide-react';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onBookClick: () => void;
  onNavigateHome?: () => void;
  onNavigateServices?: () => void;
  onNavigateTeam?: () => void;
  onNavigatePortfolio?: () => void;
  onNavigateBranches?: () => void;
  onNavigateBlog?: () => void;
  onNavigateLookFinder?: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  onBookClick,
  onNavigateHome,
  onNavigateServices,
  onNavigateTeam,
  onNavigatePortfolio,
  onNavigateBranches,
  onNavigateBlog,
  onNavigateLookFinder,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="L'ÉLIXIR Atelier"
      subtitle="Haute Coiffure & Saç Sanatı"
      position="right"
    >
      <div className="flex flex-col h-full justify-between space-y-8">
        {/* Nav Links */}
        <nav className="flex flex-col space-y-4 pt-4">
          <button
            onClick={() => {
              onClose();
              onNavigateHome?.();
            }}
            className="font-serif text-2xl text-left text-foreground hover:text-accent-dark transition-colors pb-3 border-b border-border/60"
          >
            Ana Sayfa
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateLookFinder?.();
            }}
            className="font-serif text-2xl text-left text-accent-dark hover:text-accent font-bold transition-colors pb-3 border-b border-border/60 flex items-center justify-between"
          >
            <span>Look Finder (Stilini Keşfet)</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-background font-sans font-semibold">Yeni</span>
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateServices?.();
            }}
            className="font-serif text-2xl text-left text-foreground hover:text-accent-dark transition-colors pb-3 border-b border-border/60"
          >
            Hizmetler Menüsü
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigatePortfolio?.();
            }}
            className="font-serif text-2xl text-left text-foreground hover:text-accent-dark transition-colors pb-3 border-b border-border/60"
          >
            Küratörlü Portfolyo
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigateTeam?.();
            }}
            className="font-serif text-2xl text-left text-foreground hover:text-accent-dark transition-colors pb-3 border-b border-border/60"
          >
            Artistik Ekibimiz
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateBranches?.();
            }}
            className="font-serif text-2xl text-left text-foreground hover:text-accent-dark transition-colors pb-3 border-b border-border/60"
          >
            Şubelerimiz & Ulaşım
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateBlog?.();
            }}
            className="font-serif text-2xl text-left text-foreground hover:text-accent-dark transition-colors pb-3 border-b border-border/60"
          >
            Dergi & Saç Rehberi
          </button>
        </nav>

        {/* Bottom Contacts & Booking Button */}
        <div className="space-y-6 pt-6 border-t border-border">
          <Button
            variant="gold"
            size="lg"
            isFullWidth
            onClick={() => {
              onClose();
              onBookClick();
            }}
            leftIcon={<Calendar className="w-5 h-5 text-dark-surface" />}
          >
            Online Randevu Al
          </Button>

          <div className="space-y-2 text-small text-muted">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Nişantaşı · Bebek · Bağdat Cad. · Çayyolu</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent" />
              <a href="tel:+902122345060" className="hover:text-foreground">
                +90 (212) 234 50 60
              </a>
            </div>
            <div className="flex items-center gap-2">
              <InstagramIcon className="w-4 h-4 text-accent" />
              <span>@lelixir.atelier</span>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
