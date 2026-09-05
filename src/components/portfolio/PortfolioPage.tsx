import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Container, SectionHeading, Button, Badge, Breadcrumb, BeforeAfterSlider, Modal } from '../ui';
import { portfolioData } from '../../data/portfolioData';
import { beforeAfterData } from '../../data/beforeAfterData';
import { servicesData } from '../../data/servicesData';
import { teamData } from '../../data/teamData';
import { PortfolioItem, ServiceItem, StaffMember } from '../../types';
import {
  Calendar,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Scissors,
  CheckCircle2,
  Layers,
} from 'lucide-react';

interface PortfolioPageProps {
  onBookLook: (service: ServiceItem, staff?: StaffMember | null) => void;
  onNavigateHome: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onBookLook,
  onNavigateHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'gallery' | 'before-after'>('gallery');

  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'kesim', label: 'Kesim' },
    { id: 'renk', label: 'Renk' },
    { id: 'balayage', label: 'Balayage' },
    { id: 'ombre', label: 'Ombre' },
    { id: 'gelin', label: 'Gelin' },
    { id: 'styling', label: 'Styling' },
    { id: 'erkek', label: 'Erkek' },
    { id: 'bakim', label: 'Bakım' },
  ];

  // Filtered portfolio
  const filteredWorks = useMemo(() => {
    if (selectedCategory === 'all') return portfolioData;
    return portfolioData.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const currentItem = selectedItemIndex !== null ? filteredWorks[selectedItemIndex] : null;

  // Keyboard navigation for Lightbox
  const handlePrevItem = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredWorks.length - 1
    );
  }, [selectedItemIndex, filteredWorks.length]);

  const handleNextItem = useCallback(() => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((prev) =>
      prev! < filteredWorks.length - 1 ? prev! + 1 : 0
    );
  }, [selectedItemIndex, filteredWorks.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrevItem();
      if (e.key === 'ArrowRight') handleNextItem();
      if (e.key === 'Escape') setSelectedItemIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, handlePrevItem, handleNextItem]);

  const handleBookCurrentLook = (look: PortfolioItem) => {
    const matchedService =
      servicesData.find((s) => s.name === look.serviceName) || servicesData[0];
    const matchedStaff =
      teamData.find((t) => t.name === look.stylistName) || null;
    setSelectedItemIndex(null);
    onBookLook(matchedService, matchedStaff);
  };

  return (
    <div className="py-8 sm:py-12 bg-background min-h-screen">
      <Container size="full">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Ana Sayfa', onClick: onNavigateHome },
              { label: 'Küratörlü Portfolyo & Dönüşümler', isCurrent: true },
            ]}
          />
        </div>

        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <SectionHeading
            eyebrow="Atelier Lookbook"
            title="İlham Veren Saç Tasarımları"
            subtitle="Stüdyolarımızda her gün gerçekleşen gerçek misafir dönüşümleri, haute-coiffure kesimler ve zamansız gelin modelleri."
            align="left"
            className="mb-0"
          />

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 mt-6 md:mt-0 p-1.5 bg-card rounded-pill border border-border">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 rounded-pill text-caption font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'gallery'
                  ? 'bg-foreground text-background shadow-subtle'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              Lookbook Galeri ({portfolioData.length})
            </button>
            <button
              onClick={() => setActiveTab('before-after')}
              className={`px-4 py-2 rounded-pill text-caption font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'before-after'
                  ? 'bg-foreground text-background shadow-subtle'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-accent" />
              <span>Öncesi / Sonrası ({beforeAfterData.length})</span>
            </button>
          </div>
        </div>

        {/* 1. MASONRY GALLERY VIEW */}
        {activeTab === 'gallery' && (
          <div>
            {/* Category Filters Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-8 no-scrollbar">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-caption uppercase tracking-wider font-semibold py-2 px-4 rounded-pill transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-dark text-background shadow-subtle'
                        : 'bg-card text-muted hover:text-foreground hover:bg-card-hover border border-border/80'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Masonry-Style Responsive Editorial Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredWorks.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemIndex(index)}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer bg-muted-light border border-border/80 shadow-subtle hover:shadow-floating transition-all duration-500"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-editorial"
                    loading="lazy"
                  />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10 group-hover:opacity-0 transition-opacity">
                    <span className="bg-dark/80 backdrop-blur-md text-white text-[0.65rem] uppercase tracking-wider font-semibold py-1 px-3 rounded-full border border-dark-border">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-background z-10">
                    <div className="flex justify-end">
                      <span className="p-2 rounded-full bg-surface/20 backdrop-blur-md text-white">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>

                    <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
                      <Badge variant="accent" size="sm">
                        {item.categoryLabel}
                      </Badge>

                      <h3 className="font-serif text-xl font-normal text-white">
                        {item.title}
                      </h3>

                      <p className="text-caption text-white/80 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between border-t border-white/20 text-caption text-accent-light">
                        <span>{item.stylistName}</span>
                        <span className="font-semibold underline underline-offset-2 flex items-center gap-1">
                          Detay & Randevu &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. BEFORE/AFTER COMPARISON VIEW */}
        {activeTab === 'before-after' && (
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="font-serif text-h2 text-foreground">
                Değişim küçük bir dokunuşla başlar.
              </h3>
              <p className="text-small text-muted mt-2">
                Renk düzeltme, hasarlı saç onarımları ve sombre uygulamalarımızda elde ettiğimiz gerçek dönüşümler.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {beforeAfterData.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-card p-6 sm:p-8 rounded-2xl border border-border/80 shadow-subtle space-y-6"
                >
                  <BeforeAfterSlider
                    beforeImage={item.beforeImage}
                    afterImage={item.afterImage}
                    beforeAlt={`${item.title} - Öncesi`}
                    afterAlt={`${item.title} - Sonrası`}
                    aspectRatio="aspect-[4/3]"
                  />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-eyebrow uppercase text-accent-dark font-semibold">
                        Vaka #{idx + 1} · {item.serviceName}
                      </span>
                      <span className="text-caption text-muted font-medium">
                        {item.stylistName}
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-foreground">
                      {item.title}
                    </h4>

                    <p className="text-small text-muted leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2">
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={() => {
                          const matchedService = servicesData[0];
                          onBookLook(matchedService, null);
                        }}
                        leftIcon={<Calendar className="w-4 h-4 text-accent" />}
                        isFullWidth
                      >
                        Bu Dönüşümü Randevu Et
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. ELEGANT FULLSCREEN LIGHTBOX MODAL */}
        {currentItem && (
          <Modal
            isOpen={selectedItemIndex !== null}
            onClose={() => setSelectedItemIndex(null)}
            size="xl"
            className="p-0 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto animate-lightbox-zoom">
              {/* Left: High-Res Image Frame (7 cols) */}
              <div className="lg:col-span-7 relative bg-dark flex items-center justify-center min-h-[360px] lg:min-h-[540px]">
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="max-h-[80vh] w-full object-contain"
                />

                {/* Lightbox Navigation Buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevItem();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark/70 hover:bg-dark text-white border border-white/20 flex items-center justify-center transition-colors backdrop-blur-md"
                  aria-label="Önceki Görünüm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextItem();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark/70 hover:bg-dark text-white border border-white/20 flex items-center justify-center transition-colors backdrop-blur-md"
                  aria-label="Sonraki Görünüm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Right: Look Details, Technique Notes & Booking CTA (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-card">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="accent" size="sm">
                        {currentItem.categoryLabel}
                      </Badge>
                      <span className="text-caption font-mono text-muted">
                        {selectedItemIndex! + 1} / {filteredWorks.length}
                      </span>
                    </div>

                    <h3 className="font-serif text-h2 text-foreground leading-snug">
                      {currentItem.title}
                    </h3>
                  </div>

                  <p className="text-body text-muted leading-relaxed font-light">
                    {currentItem.description}
                  </p>

                  <div className="p-4 rounded-xl bg-surface border border-border/80 space-y-2.5">
                    <div className="flex items-center gap-2 text-small">
                      <Scissors className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-muted">Uygulayan Uzman:</span>
                      <span className="font-semibold text-foreground">
                        {currentItem.stylistName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-small">
                      <Sparkles className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-muted">İlgili Hizmet:</span>
                      <span className="font-semibold text-foreground">
                        {currentItem.serviceName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-small">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      <span className="text-muted">Garanti:</span>
                      <span className="font-semibold text-foreground">
                        K18 Bağ Onarıcı Koruma
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Booking CTA */}
                <div className="pt-6 mt-6 border-t border-border/60">
                  <Button
                    variant="dark"
                    size="lg"
                    isFullWidth
                    onClick={() => handleBookCurrentLook(currentItem)}
                    leftIcon={<Calendar className="w-5 h-5 text-accent" />}
                    className="shadow-card hover:shadow-floating"
                  >
                    Bu Görünümü İstiyorum (Randevu Al)
                  </Button>
                  <p className="text-center text-[0.7rem] text-muted mt-2">
                    Klavye ‹ sol ve sağ › ok tuşlarıyla görünümler arasında gezinebilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </Container>
    </div>
  );
};

