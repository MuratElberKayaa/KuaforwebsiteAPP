import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Button, IconButton, Container } from '../ui';
import { Menu, Calendar, Phone } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
  onOpenMobileMenu: () => void;
  onNavigateHome?: () => void;
  onNavigateServices?: () => void;
  onNavigateTeam?: () => void;
  onNavigatePortfolio?: () => void;
  onNavigateBranches?: () => void;
  onNavigateBlog?: () => void;
  onNavigateLookFinder?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookClick,
  onOpenMobileMenu,
  onNavigateHome,
  onNavigateServices,
  onNavigateTeam,
  onNavigatePortfolio,
  onNavigateBranches,
  onNavigateBlog,
  onNavigateLookFinder,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-sticky w-full transition-all duration-300',
        isScrolled
          ? 'glass-header py-3 shadow-subtle border-b border-border/70'
          : 'bg-background/95 py-5 border-b border-transparent'
      )}
    >
      <Container size="full" className="flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={onNavigateHome}
          className="group flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm cursor-pointer"
          aria-label="L'ÉLIXIR Atelier Ana Sayfa"
        >
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.2em] text-foreground uppercase group-hover:text-accent-dark transition-colors">
            L'ÉLIXIR
          </span>
          <span className="text-[0.62rem] uppercase tracking-[0.4em] text-accent font-semibold -mt-1 font-sans">
            Atelier Hair Studio
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6" aria-label="Ana Menü">
          <button
            onClick={onNavigateServices}
            className="text-small tracking-wider uppercase font-medium text-foreground/85 hover:text-accent-dark transition-colors relative py-1 cursor-pointer"
          >
            Hizmetler
          </button>
          <button
            onClick={onNavigatePortfolio}
            className="text-small tracking-wider uppercase font-medium text-foreground/85 hover:text-accent-dark transition-colors relative py-1 cursor-pointer"
          >
            Çalışmalar
          </button>
          <button
            onClick={onNavigateLookFinder}
            className="text-small tracking-wider uppercase font-semibold text-accent-dark hover:text-accent transition-colors relative py-1 flex items-center gap-1.5 cursor-pointer bg-accent/10 px-2.5 rounded-full border border-accent/20"
          >
            <span>Look Finder</span>
            <span className="text-[0.65rem] px-1.5 py-0.2 bg-accent text-background font-bold rounded-full">Yeni</span>
          </button>
          <button
            onClick={onNavigateTeam}
            className="text-small tracking-wider uppercase font-medium text-foreground/85 hover:text-accent-dark transition-colors relative py-1 cursor-pointer"
          >
            Ekibimiz
          </button>
          <button
            onClick={onNavigateBranches}
            className="text-small tracking-wider uppercase font-medium text-foreground/85 hover:text-accent-dark transition-colors relative py-1 cursor-pointer"
          >
            Şubelerimiz
          </button>
          <button
            onClick={onNavigateBlog}
            className="text-small tracking-wider uppercase font-medium text-foreground/85 hover:text-accent-dark transition-colors relative py-1 cursor-pointer"
          >
            Dergi
          </button>
        </nav>


        {/* Right CTA Actions */}
        <div className="flex items-center space-x-3">
          <a
            href="tel:+902122345060"
            className="hidden md:inline-flex items-center gap-1.5 text-small text-foreground/80 hover:text-foreground font-medium px-3 py-2 rounded-md hover:bg-card transition-colors"
          >
            <Phone className="w-4 h-4 text-accent" />
            <span>0212 234 50 60</span>
          </a>

          {/* Desktop Primary Booking CTA */}
          <Button
            variant="dark"
            size="sm"
            onClick={onBookClick}
            leftIcon={<Calendar className="w-4 h-4 text-accent" />}
            className="hidden sm:inline-flex font-semibold shadow-subtle hover:shadow-card"
          >
            Randevu Al
          </Button>

          {/* Mobile Booking Icon / Action */}
          <Button
            variant="dark"
            size="xs"
            onClick={onBookClick}
            className="sm:hidden"
          >
            Randevu
          </Button>

          {/* Mobile Hamburger Trigger */}
          <IconButton
            aria-label="Menüyü Aç"
            variant="ghost"
            size="md"
            onClick={onOpenMobileMenu}
            className="lg:hidden text-foreground hover:bg-card"
          >
            <Menu className="w-5 h-5" />
          </IconButton>
        </div>
      </Container>
    </header>
  );
};
