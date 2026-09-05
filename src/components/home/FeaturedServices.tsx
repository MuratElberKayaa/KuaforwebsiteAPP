import React, { useState } from 'react';
import { Container, SectionHeading, Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardFooter, RevealOnScroll } from '../ui';
import { servicesData } from '../../data/servicesData';
import { Clock, ArrowRight, Sparkles, Check } from 'lucide-react';
import { ServiceItem } from '../../types';

interface FeaturedServicesProps {
  onSelectServiceForBooking: (service: ServiceItem) => void;
  onOpenLookFinder?: () => void;
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({
  onSelectServiceForBooking,
  onOpenLookFinder,
}) => {

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tüm Hizmetler' },
    { id: 'color', label: 'Renk & Balayage' },
    { id: 'hair', label: 'Couture Kesim' },
    { id: 'bridal', label: 'Gelin & Özel Gün' },
    { id: 'care', label: 'Saç Sağlığı' },
  ];

  const filteredServices =
    selectedCategory === 'all'
      ? servicesData
      : servicesData.filter((s) => s.categoryId === selectedCategory);

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-28 bg-background border-b border-border/80">
      <Container size="full">
        {/* Section Header with Reveal */}
        <RevealOnScroll animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <SectionHeading
              eyebrow="Sanat & Kusursuzluk"
              title="İmza Hizmetlerimiz"
              subtitle="Her saç tipi ve estetik arayış için kişiye özel formüle edilen haute-coiffure ritüelleri."
              align="left"
              className="mb-0"
            />

            {/* Horizontal Category Selector with Touch Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-4 md:pt-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-caption uppercase tracking-wider font-semibold py-2.5 px-4 rounded-pill transition-all duration-200 whitespace-nowrap min-h-[44px] ${
                    selectedCategory === cat.id
                      ? 'bg-dark text-background shadow-subtle'
                      : 'bg-card text-muted hover:text-foreground hover:bg-card-hover border border-border/70'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Services Grid & Mobile Horizontal Touch Scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service, index) => (
            <RevealOnScroll key={service.id} delayMs={index * 60} animation="fade-up">
              <Card
                variant="interactive"
                className="flex flex-col group h-full border-border/70 hover:border-accent/80 transition-all duration-500"
              >
                {/* Image Frame */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-muted-light">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-editorial"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Top Badges */}
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

                  {/* Price tag on image bottom right */}
                  <div className="absolute bottom-3 right-3 bg-surface/95 backdrop-blur-md px-3 py-1.5 rounded-md border border-border/70 shadow-subtle">
                  <span className="text-[0.65rem] text-muted block leading-tight">Başlangıç</span>
                  <span className="font-serif text-base font-bold text-foreground">
                    {service.priceStartingFrom.toLocaleString('tr-TR')} {service.currency}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-5 sm:p-6">
                <CardHeader className="mb-2">
                  <CardTitle className="group-hover:text-accent-dark transition-colors text-lg sm:text-xl">
                    {service.name}
                  </CardTitle>
                  <p className="text-caption text-accent-dark font-medium mt-1">
                    {service.subtitle}
                  </p>
                  <CardDescription className="mt-2.5 line-clamp-3">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                {/* Features list */}
                {service.features && (
                  <ul className="space-y-1.5 my-3 sm:my-4 pt-3 sm:pt-4 border-t border-border/50 text-caption text-foreground/80">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Card Footer with Duration & Booking CTA */}
                <CardFooter className="justify-between pt-4 mt-auto">
                  <div className="flex items-center text-caption text-muted font-medium">
                    <Clock className="w-3.5 h-3.5 text-accent mr-1.5" />
                    <span>~{service.durationMinutes} dk</span>
                  </div>

                  <Button
                    variant="dark"
                    size="sm"
                    onClick={() => onSelectServiceForBooking(service)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="group-hover:bg-accent group-hover:text-dark-surface min-h-[44px] px-4"
                  >
                    Randevu Al
                  </Button>
                </CardFooter>
              </div>
            </Card>
          </RevealOnScroll>
          ))}
        </div>

        {/* Look Finder Discovery Banner */}
        <RevealOnScroll animation="fade-up">
          <div className="mt-12 bg-gradient-to-r from-dark via-stone-900 to-dark text-background rounded-2xl p-6 sm:p-8 border border-accent/30 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground-light">
                    Hangi Hizmete İhtiyacınız Olduğundan Emin Değil misiniz?
                  </h3>
                  <span className="hidden sm:inline-block text-[0.65rem] px-2 py-0.5 rounded-full bg-accent text-background font-bold uppercase tracking-wider">
                    Look Finder
                  </span>
                </div>
                <p className="text-small text-muted-light max-w-xl leading-relaxed">
                  3 hızlı tercihinizi belirleyin, teninize ve saç yapınıza en uygun kişiselleştirilmiş stilleri anında keşfedin.
                </p>
              </div>
            </div>

            <Button
              variant="gold"
              size="md"
              onClick={onOpenLookFinder}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="font-semibold shrink-0 shadow-subtle hover:shadow-card cursor-pointer"
            >
              Stilini Keşfet (Look Finder)
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
};

