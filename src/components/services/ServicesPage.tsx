import React, { useState, useMemo } from 'react';
import { Container, SectionHeading, Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardFooter, Breadcrumb } from '../ui';
import { servicesData } from '../../data/servicesData';
import { ServiceItem } from '../../types';
import { Search, ArrowRight, Sparkles, Filter, Check } from 'lucide-react';

interface ServicesPageProps {
  onSelectService: (service: ServiceItem) => void;
  onBookService: (service: ServiceItem) => void;
  onNavigateHome: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectService,
  onBookService,
  onNavigateHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'duration'>('recommended');

  const categories = [
    { id: 'all', label: 'Tüm Hizmetler' },
    { id: 'hair', label: 'Saç' },
    { id: 'color', label: 'Renk' },
    { id: 'care', label: 'Bakım' },
    { id: 'bridal', label: 'Gelin & Özel Gün' },
    { id: 'men', label: 'Erkek' },
  ];

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = { all: servicesData.length };
    servicesData.forEach((s) => {
      counts[s.categoryId] = (counts[s.categoryId] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered & Sorted Services
  const filteredServices = useMemo(() => {
    return servicesData
      .filter((service) => {
        const matchesCategory =
          selectedCategory === 'all' || service.categoryId === selectedCategory;
        const matchesSearch =
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceStartingFrom - b.priceStartingFrom;
        if (sortBy === 'price-desc') return b.priceStartingFrom - a.priceStartingFrom;
        if (sortBy === 'duration') return a.durationMinutes - b.durationMinutes;
        return (b.isSignature ? 1 : 0) - (a.isSignature ? 1 : 0);
      });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="py-8 sm:py-12 bg-background min-h-screen">
      <Container size="full">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Ana Sayfa', onClick: onNavigateHome },
              { label: 'Hizmetler & Ritüeller', isCurrent: true },
            ]}
          />
        </div>

        {/* Page Header */}
        <SectionHeading
          eyebrow="Haute-Coiffure Menüsü"
          title="Size uygun hizmeti keşfedin."
          subtitle="Tüm saç tipleri, özel günler ve sağlık ritüelleri için şeffaf fiyatlandırma, süreler ve uzman ekibimizle eksiksiz hizmet yelpazemiz."
          align="left"
          className="mb-8"
        />

        {/* Search & Filter Bar */}
        <div className="bg-card p-4 sm:p-6 rounded-2xl border border-border/80 shadow-subtle mb-12 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hizmet, bakım veya işlem adı arayın..."
                className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-body text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center space-x-3">
              <span className="text-caption font-semibold uppercase text-muted whitespace-nowrap hidden sm:inline">
                Sıralama:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-surface border border-border rounded-lg px-3.5 py-2.5 text-small text-foreground focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="recommended">Önerilen (İmza Hizmetler)</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="duration">İşlem Süresi</option>
              </select>
            </div>
          </div>

          {/* Category Tabs with Counts */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-caption uppercase tracking-wider font-semibold py-2 px-4 rounded-pill transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-foreground text-background shadow-subtle'
                      : 'bg-surface text-muted hover:text-foreground hover:bg-card-hover border border-border/70'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[0.65rem] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-accent text-dark-surface' : 'bg-card text-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-caption text-muted">
          <span>Toplam {filteredServices.length} hizmet listeleniyor</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-accent-dark underline hover:text-foreground"
            >
              Aramayı Temizle
            </button>
          )}
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                variant="interactive"
                className="flex flex-col group h-full border-border/70 hover:border-accent/80 transition-all duration-500"
              >
                {/* Image Frame */}
                <div
                  onClick={() => onSelectService(service)}
                  className="relative aspect-[16/11] w-full overflow-hidden bg-muted-light cursor-pointer"
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-editorial"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <Badge variant={service.isSignature ? 'accent' : 'default'} size="sm">
                      {service.categoryName}
                    </Badge>
                    {service.isSignature && (
                      <span className="bg-dark/80 backdrop-blur-md text-accent text-[0.65rem] uppercase tracking-widest font-bold py-1 px-2.5 rounded-full border border-dark-border flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-accent" /> Signature
                      </span>
                    )}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 bg-surface/95 backdrop-blur-md px-3 py-1.5 rounded-md border border-border/70 shadow-subtle">
                    <span className="text-[0.65rem] text-muted block leading-tight">Başlangıç</span>
                    <span className="font-serif text-base font-bold text-foreground">
                      {service.priceStartingFrom.toLocaleString('tr-TR')} {service.currency}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-6">
                  <CardHeader className="mb-2">
                    <CardTitle
                      onClick={() => onSelectService(service)}
                      className="group-hover:text-accent-dark transition-colors cursor-pointer"
                    >
                      {service.name}
                    </CardTitle>
                    <p className="text-caption text-accent-dark font-medium mt-1">
                      {service.subtitle}
                    </p>
                    <CardDescription className="mt-3 line-clamp-3">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  {/* Features */}
                  {service.features && (
                    <ul className="space-y-1.5 my-4 pt-4 border-t border-border/50 text-caption text-foreground/80">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Footer CTAs */}
                  <CardFooter className="justify-between pt-4 mt-auto gap-2">
                    <button
                      onClick={() => onSelectService(service)}
                      className="text-caption font-semibold text-muted hover:text-foreground flex items-center gap-1 underline underline-offset-4"
                    >
                      Detayları Gör
                    </button>

                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() => onBookService(service)}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="group-hover:bg-accent group-hover:text-dark-surface transition-colors"
                    >
                      Randevu Al
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Filter className="w-8 h-8 text-muted mx-auto mb-3" />
            <h4 className="font-serif text-h3 text-foreground">Aradığınız kriterde hizmet bulunamadı</h4>
            <p className="text-small text-muted mt-1">
              Farklı bir arama terimi veya kategori seçmeyi deneyebilirsiniz.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4"
            >
              Filtreleri Sıfırla
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};
