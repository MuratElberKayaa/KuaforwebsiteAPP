import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { branchesData } from '../../data/branchesData';
import { MapPin, Clock, Phone, Navigation, Check } from 'lucide-react';

export const Step03Branch: React.FC = () => {
  const { selectedBranchId, setSelectedBranchId } = useBooking();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-h2 text-foreground">
          Stüdyo & Lokasyon Seçimi
        </h3>
        <p className="text-small text-muted mt-1">
          Size en yakın şubemizi veya tercih ettiğiniz salon ambiyansını belirleyin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branchesData.map((branch) => {
          const isSelected = selectedBranchId === branch.id;

          return (
            <div
              key={branch.id}
              onClick={() => setSelectedBranchId(branch.id)}
              className={`rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-accent bg-accent/5 ring-2 ring-accent shadow-card'
                  : 'border-border bg-surface hover:bg-card hover:border-border-dark shadow-subtle'
              }`}
            >
              {/* Branch Image Frame */}
              <div className="relative aspect-[16/9] w-full bg-muted-light">
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-dark/80 backdrop-blur-md text-white text-[0.65rem] uppercase tracking-wider font-semibold py-1 px-2.5 rounded-full border border-dark-border">
                  {branch.district} · {branch.city}
                </div>

                <div
                  className={`absolute top-3 right-3 w-6 h-6 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? 'bg-foreground border-foreground text-white'
                      : 'bg-surface/80 border-border-dark text-transparent'
                  }`}

                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>

              {/* Branch Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="font-serif text-xl font-bold text-foreground">
                    {branch.name}
                  </h4>

                  <div className="space-y-1.5 text-caption text-muted">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent shrink-0" />
                      <span>{branch.hours}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-accent shrink-0" />
                      <span>{branch.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Features Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/60">
                  {branch.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-[0.68rem] bg-card text-foreground/80 px-2 py-0.5 rounded-md border border-border flex items-center gap-1 font-medium"
                    >
                      <Check className="w-3 h-3 text-accent" />
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Map Link */}
                <div className="pt-2 flex justify-end">
                  <a
                    href={branch.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-caption text-accent-dark hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Navigation className="w-3.5 h-3.5" /> Haritada Gör
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

