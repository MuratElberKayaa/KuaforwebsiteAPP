import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { servicesData } from '../../data/servicesData';
import { Clock, Check } from 'lucide-react';

export const Step01Service: React.FC = () => {
  const { selectedServiceIds, toggleService, formErrors } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tümü' },
    { id: 'color', label: 'Renk & Balayage' },
    { id: 'hair', label: 'Couture Kesim' },
    { id: 'bridal', label: 'Gelin & Özel Gün' },
    { id: 'care', label: 'Saç Sağlığı' },
    { id: 'men', label: 'Erkek' },
  ];

  const filteredServices =
    selectedCategory === 'all'
      ? servicesData
      : servicesData.filter((s) => s.categoryId === selectedCategory);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-h2 text-foreground">
          Almak İstediğiniz Hizmeti Seçin
        </h3>
        <p className="text-small text-muted mt-1">
          Dilerseniz aynı randevu seansında birden fazla bakım veya kesim hizmeti birleştirebilirsiniz.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`text-caption uppercase tracking-wider font-semibold py-2 px-4 rounded-pill transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-foreground text-white shadow-subtle'
                : 'bg-surface text-muted hover:text-foreground border border-border'
            }`}

          >
            {cat.label}
          </button>
        ))}
      </div>

      {formErrors.service && (
        <p className="p-3 bg-error/10 border border-error/30 text-error text-caption rounded-lg font-medium">
          {formErrors.service}
        </p>
      )}

      {/* Service Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service) => {
          const isSelected = selectedServiceIds.includes(service.id);

          return (
            <div
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? 'border-accent bg-accent/5 ring-2 ring-accent shadow-subtle'
                  : 'border-border bg-surface hover:bg-card hover:border-border-dark'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-foreground border-foreground text-background'
                          : 'border-border-dark bg-background'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-lg font-bold text-foreground">
                          {service.name}
                        </h4>
                        {service.isSignature && (
                          <span className="hidden sm:inline-flex bg-dark text-accent text-[0.6rem] uppercase tracking-wider font-bold py-0.5 px-2 rounded-full">
                            Signature
                          </span>
                        )}
                      </div>
                      <span className="text-caption text-accent-dark font-medium">
                        {service.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="aspect-square w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-border">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <p className="text-small text-muted line-clamp-2 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between">
                <div className="flex items-center text-caption text-muted font-medium">
                  <Clock className="w-3.5 h-3.5 text-accent mr-1.5" />
                  <span>~{service.durationMinutes} Dakika</span>
                </div>

                <div>
                  <span className="text-[0.65rem] text-muted block text-right leading-tight">Başlangıç</span>
                  <span className="font-serif text-base font-bold text-foreground">
                    {service.priceStartingFrom.toLocaleString('tr-TR')} {service.currency}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
