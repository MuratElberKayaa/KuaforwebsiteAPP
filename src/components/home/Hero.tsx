import React from 'react';
import { Button, Badge, Container } from '../ui';
import { Sparkles, ArrowDownRight, Calendar, Star, ShieldCheck } from 'lucide-react';
import { useMagneticEffect } from '../../hooks/useMagneticEffect';
import { useCardTilt } from '../../hooks/useCardTilt';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const magneticButtonRef = useMagneticEffect<HTMLButtonElement>({ maxDistance: 6, strength: 0.2 });
  const tiltCardRef = useCardTilt<HTMLDivElement>({ maxRotation: 3, scale: 1.01 });

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden py-8 sm:py-12 lg:py-0 border-b border-border/70 bg-gradient-to-b from-background via-card/30 to-background">
      {/* Background Decorative Accent Gradients */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[calc(100vh-140px)] py-4 lg:py-12">
          {/* Left Column: Editorial Headline & Conversion Messaging (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10 space-y-5 sm:space-y-8 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <Badge variant="accent" dot size="sm">
                Luxury Editorial Hair Studio
              </Badge>
              <span className="text-[0.68rem] text-muted tracking-wider uppercase font-medium">
                İstanbul · Ankara
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="font-serif text-display text-foreground font-light tracking-tight leading-[1.05]">
                Saçınız. <br />
                <span className="italic font-normal font-serif text-accent-dark">
                  Sizin imzanız.
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-body sm:text-body-lg lg:text-xl text-muted max-w-xl font-light leading-relaxed">
              Yüz hatlarınızı, ten renginizi ve kişisel auranızı tamamlayan, artisanal renklendirme ve couture saç tasarımı deneyimi.
            </p>

            {/* Primary & Secondary Conversion CTAs (Thumb-Friendly with Magnetic Hover) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <Button
                ref={magneticButtonRef}
                variant="dark"
                size="lg"
                onClick={onBookClick}
                leftIcon={<Calendar className="w-5 h-5 text-accent" />}
                className="w-full sm:w-auto min-h-[50px] shadow-card hover:shadow-floating transition-transform-luxury"
              >
                Online Randevu Al
              </Button>

              <a href="#portfolio" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  isFullWidth
                  rightIcon={<ArrowDownRight className="w-5 h-5 text-muted" />}
                  className="min-h-[50px]"
                >
                  Çalışmalarımızı Gör
                </Button>
              </a>
            </div>

            {/* Micro Social Proof Under CTAs */}
            <div className="pt-4 border-t border-border/70 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent" />
                  ))}
                </div>
                <span className="text-[0.72rem] sm:text-caption font-semibold text-foreground">
                  4.9★ Google
                </span>
              </div>

              <div className="flex items-center space-x-1.5 sm:space-x-2 text-muted">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span className="text-[0.72rem] sm:text-caption font-medium">
                  Kişiye Özel Analiz
                </span>
              </div>

              <div className="hidden sm:flex items-center space-x-2 text-muted">
                <Sparkles className="w-4 h-4 text-accent shrink-0" />
                <span className="text-caption font-medium">
                  Kérastase & K18
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Composition (5 cols) with subtle 3D tilt */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0 perspective-1000">
            <div ref={tiltCardRef} className="relative mx-auto max-w-md lg:max-w-none will-change-transform">
              {/* Main Image Frame */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-floating border border-border/80 bg-card">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85"
                  alt="L'ÉLIXIR Atelier Signature Balayage"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-editorial"
                  loading="eager"
                />

                {/* Subtle Image Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Editorial Label */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-background z-10 flex items-center justify-between">
                  <div>
                    <span className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.2em] text-accent font-semibold block">
                      Signature Look
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
                      Champagne Melt Balayage
                    </h3>
                  </div>
                  <span className="text-[0.7rem] sm:text-caption text-white/80 font-mono">
                    Nişantaşı
                  </span>
                </div>
              </div>

              {/* Floating Today Available Badge */}
              <div className="absolute -bottom-4 -left-3 sm:-bottom-6 sm:-left-6 bg-surface/95 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-floating border border-border/90 max-w-[220px] sm:max-w-[260px] animate-fade-in">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-[0.75rem] sm:text-caption font-bold text-foreground">
                    Bugün 3 Müsait Slot
                  </span>
                </div>
                <p className="text-[0.68rem] sm:text-caption text-muted leading-tight">
                  Nişantaşı & Bebek stüdyolarında açık randevular.
                </p>
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-6 bg-dark text-background px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow-card border border-dark-border text-center">
                <span className="font-serif text-xl sm:text-2xl font-bold text-accent block leading-none">
                  14+
                </span>
                <span className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-muted-light font-medium">
                  Yıl Deneyim
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
