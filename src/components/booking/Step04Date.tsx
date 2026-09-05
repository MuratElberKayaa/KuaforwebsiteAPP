import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export const Step04Date: React.FC = () => {
  const { selectedDate, setSelectedDate, selectedBranch, selectedStaff, formErrors } = useBooking();

  // Days in September 2026 (starting Tuesday Sept 1 to Sept 30)
  const daysInSeptember = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-09-${day < 10 ? '0' + day : day}`;
    const dayOfWeek = (day + 1) % 7; // 0: Sunday, 1: Monday, 2: Tuesday, etc.

    // Branch / Staff availability rules
    let isUnavailable = day < 6; // Past dates disabled

    // Bebek closed on Monday
    if (selectedBranch.slug === 'bebek-waterfront' && dayOfWeek === 1) {
      isUnavailable = true;
    }

    // Ankara / Cadde closed on Sunday
    if (selectedBranch.slug === 'ankara-cayyolu' && dayOfWeek === 1) {
      isUnavailable = true;
    }

    return {
      day,
      dateStr,
      dayOfWeek,
      isUnavailable,
    };
  });

  const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-h2 text-foreground">
          Randevu Tarihini Belirleyin
        </h3>
        <p className="text-small text-muted mt-1">
          {selectedBranch.name}{' '}
          {selectedStaff ? `· Uzman: ${selectedStaff.name}` : ''} için müsait takvim günleri.
        </p>
      </div>

      {formErrors.date && (
        <p className="p-3 bg-error/10 border border-error/30 text-error text-caption rounded-lg font-medium">
          {formErrors.date}
        </p>
      )}

      {/* Calendar Card */}
      <div className="max-w-xl mx-auto bg-card p-6 sm:p-8 rounded-2xl border border-border/80 shadow-subtle">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-accent" />
            <h4 className="font-serif text-xl font-bold text-foreground">
              Eylül 2026
            </h4>
          </div>

          <div className="flex items-center space-x-1">
            <button
              disabled
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted opacity-40 cursor-not-allowed"
              aria-label="Önceki Ay"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              className="w-8 h-8 rounded-full border border-border bg-surface flex items-center justify-center text-foreground hover:bg-card transition-colors"
              aria-label="Sonraki Ay"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Weekday Columns */}
        <div className="grid grid-cols-7 gap-2 text-center mb-3">
          {weekDays.map((wd) => (
            <span
              key={wd}
              className="text-caption font-semibold uppercase text-muted tracking-wider"
            >
              {wd}
            </span>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Sept 1, 2026 starts on Tuesday -> 1 empty offset on Monday */}
          <div className="aspect-square opacity-0 pointer-events-none" />

          {daysInSeptember.map((item) => {
            const isSelected = selectedDate === item.dateStr;

            return (
              <button
                key={item.dateStr}
                type="button"
                disabled={item.isUnavailable}
                onClick={() => setSelectedDate(item.dateStr)}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-200 relative cursor-pointer ${
                  isSelected
                    ? 'bg-foreground text-white font-bold ring-2 ring-accent shadow-subtle'
                    : item.isUnavailable
                    ? 'bg-transparent text-muted-light/40 cursor-not-allowed line-through'
                    : 'bg-surface hover:bg-card hover:border-accent/60 border border-border text-foreground font-medium'
                }`}

              >
                <span className="text-small">{item.day}</span>
                {!item.isUnavailable && !isSelected && (
                  <span className="w-1 h-1 rounded-full bg-success absolute bottom-1.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-8 pt-4 border-t border-border/60 text-caption text-muted">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
            <span>Müsait Günler</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-foreground" />
            <span>Seçili Gün</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-muted-light/40" />
            <span>Dolu / Kapalı</span>
          </div>
        </div>
      </div>
    </div>
  );
};

