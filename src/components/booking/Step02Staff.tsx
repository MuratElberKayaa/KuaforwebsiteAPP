import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { teamData } from '../../data/teamData';
import { Badge } from '../ui';
import { Sparkles, Star, Clock, Check } from 'lucide-react';

export const Step02Staff: React.FC = () => {
  const { selectedStaffId, setSelectedStaffId } = useBooking();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-h2 text-foreground">
          Uzman Kuaförünüzü Seçin
        </h3>
        <p className="text-small text-muted mt-1">
          İster favori stilistinizi seçin, isterseniz en erken müsait olan master uzmanımıza yerinizi ayırtın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fast Option: Any Staff (Fark Etmez) */}
        <div
          onClick={() => setSelectedStaffId('any')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
            selectedStaffId === 'any'
              ? 'border-accent bg-accent/5 ring-2 ring-accent shadow-subtle'
              : 'border-border bg-surface hover:bg-card hover:border-border-dark'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center text-accent-dark shrink-0">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif text-lg font-bold text-foreground">
                  Fark Etmez
                </h4>
                <Badge variant="success" size="sm">
                  En Hızlı
                </Badge>
              </div>
              <p className="text-small text-muted mt-0.5">
                Seçtiğiniz tarihteki en erken müsait master stilist.
              </p>
            </div>
          </div>

          <div
            className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
              selectedStaffId === 'any'
                ? 'bg-foreground border-foreground text-white'
                : 'border-border-dark'
            }`}
          >

            {selectedStaffId === 'any' && <Check className="w-3.5 h-3.5" />}
          </div>
        </div>

        {/* Specific Staff Members */}
        {teamData.map((staff) => {
          const isSelected = selectedStaffId === staff.id;

          return (
            <div
              key={staff.id}
              onClick={() => setSelectedStaffId(staff.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                isSelected
                  ? 'border-accent bg-accent/5 ring-2 ring-accent shadow-subtle'
                  : 'border-border bg-surface hover:bg-card hover:border-border-dark'
              }`}
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="relative shrink-0">
                  <img
                    src={staff.avatar}
                    alt={staff.name}
                    className="w-14 h-14 rounded-full object-cover border border-border"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-surface px-1.5 py-0.2 rounded-full border border-border flex items-center text-[0.65rem] font-bold text-foreground shadow-subtle">
                    <Star className="w-2.5 h-2.5 text-accent fill-accent mr-0.5" />
                    {staff.rating}
                  </div>
                </div>

                <div className="overflow-hidden">
                  <h4 className="font-serif text-lg font-bold text-foreground truncate">
                    {staff.name}
                  </h4>
                  <p className="text-caption text-accent-dark font-medium truncate">
                    {staff.role}
                  </p>
                  {staff.nextAvailableDate && (
                    <p className="text-[0.7rem] text-success font-medium flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> Müsait: {staff.nextAvailableDate}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                  isSelected
                    ? 'bg-foreground border-foreground text-white'
                    : 'border-border-dark'
                }`}
              >

                {isSelected && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

