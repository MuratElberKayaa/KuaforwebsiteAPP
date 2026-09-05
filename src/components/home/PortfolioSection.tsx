import React, { useState } from 'react';
import { Container, SectionHeading, Button, Badge, Modal } from '../ui';
import { portfolioData } from '../../data/portfolioData';
import { Sparkles, Calendar, Maximize2, Scissors } from 'lucide-react';
import { PortfolioItem } from '../../types';

interface PortfolioSectionProps {
  onBookLookClick: (look: PortfolioItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onBookLookClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'balayage', label: 'Balayage & Sarışınlık' },
    { id: 'kesim', label: 'Couture Kesim' },
    { id: 'sombre', label: 'Sombre & Yansımalar' },
    { id: 'gelin', label: 'Gelin Tasarımı' },
    { id: 'bakim', label: 'Saç Sağlığı' },
    { id: 'erkek', label: 'Erkek Grooming' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? portfolioData
      : portfolioData.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-card/30 border-b border-border/80">
      <Container size="full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Küratörlü Çalışmalar"
            title="İlham Veren Dönüşümler"
            subtitle="Stüdyolarımızda her gün hayata geçen gerçek saç tasarımları ve editorial portfolyomuz."
            align="left"
            className="mb-0"
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-caption uppercase tracking-wider font-semibold py-2 px-3.5 rounded-pill transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-foreground text-background shadow-subtle'
                    : 'bg-surface text-muted hover:text-foreground border border-border/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer bg-muted-light border border-border/70 shadow-subtle hover:shadow-card-hover transition-all duration-500"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-editorial"
                loading="lazy"
              />

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-background">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="accent" size="sm">
                      {item.categoryLabel}
                    </Badge>
                    <span className="p-1.5 rounded-full bg-surface/20 text-white backdrop-blur-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-white">
                    {item.title}
                  </h3>

                  <p className="text-caption text-white/80 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-white/20 text-caption text-accent-light">
                    <span>{item.stylistName}</span>
                    <span className="font-semibold underline underline-offset-2 flex items-center gap-1">
                      İncele & Randevu Al &rarr;
                    </span>
                  </div>
                </div>
              </div>

              {/* Subtle category tag visible always */}
              <div className="absolute top-3 left-3 group-hover:opacity-0 transition-opacity">
                <span className="bg-dark/70 backdrop-blur-md text-white text-[0.65rem] uppercase tracking-wider font-semibold py-1 px-2.5 rounded-full">
                  {item.categoryLabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Look Detail Modal */}
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={selectedItem?.title}
          subtitle={`${selectedItem?.serviceName} · ${selectedItem?.stylistName}`}
          size="lg"
        >
          {selectedItem && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 aspect-[4/5] rounded-lg overflow-hidden border border-border">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-6 space-y-5">
                <div>
                  <Badge variant="accent" size="sm" className="mb-2">
                    {selectedItem.categoryLabel}
                  </Badge>
                  <h3 className="font-serif text-h3 text-foreground">
                    {selectedItem.title}
                  </h3>
                  <p className="text-body text-muted mt-2 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-card border border-border/70 space-y-2">
                  <div className="flex items-center gap-2 text-small">
                    <Scissors className="w-4 h-4 text-accent" />
                    <span className="text-muted">Uygulayan Kuaför:</span>
                    <span className="font-semibold text-foreground">
                      {selectedItem.stylistName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-small">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-muted">Hizmet:</span>
                    <span className="font-semibold text-foreground">
                      {selectedItem.serviceName}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="dark"
                    size="md"
                    onClick={() => {
                      const item = selectedItem;
                      setSelectedItem(null);
                      onBookLookClick(item);
                    }}
                    leftIcon={<Calendar className="w-4 h-4 text-accent" />}
                    isFullWidth
                  >
                    Bu Görünüm İçin Randevu Al
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </Container>
    </section>
  );
};

