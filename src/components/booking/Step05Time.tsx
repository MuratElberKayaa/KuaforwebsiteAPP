import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Sun, Sunset, Moon } from 'lucide-react';

export const Step05Time: React.FC = () => {
  const { selectedTimeSlot, setSelectedTimeSlot, selectedDate, formErrors } = useBooking();

  const timeSlots = [
    { time: '09:30', period: 'morning', label: '09:30', isAvailable: true },
    { time: '10:00', period: 'morning', label: '10:00', isAvailable: false }, // Busy slot
    { time: '10:30', period: 'morning', label: '10:30', isAvailable: true },
    { time: '11:30', period: 'morning', label: '11:30', isAvailable: true },
    { time: '13:00', period: 'afternoon', label: '13:00', isAvailable: true },
    { time: '14:00', period: 'afternoon', label: '14:00', isAvailable: false },
    { time: '14:30', period: 'afternoon', label: '14:30', isAvailable: true },
    { time: '15:30', period: 'afternoon', label: '15:30', isAvailable: true },
    { time: '16:30', period: 'afternoon', label: '16:30', isAvailable: true },
    { time: '17:30', period: 'evening', label: '17:30', isAvailable: true },
    { time: '18:30', period: 'evening', label: '18:30', isAvailable: false },
    { time: '19:00', period: 'evening', label: '19:00', isAvailable: true },
  ];

  const morningSlots = timeSlots.filter((s) => s.period === 'morning');
  const afternoonSlots = timeSlots.filter((s) => s.period === 'afternoon');
  const eveningSlots = timeSlots.filter((s) => s.period === 'evening');

  const renderSlotGroup = (title: string, icon: React.ReactNode, slots: typeof timeSlots) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-caption font-semibold uppercase tracking-wider text-muted border-b border-border/60 pb-2">
        {icon}
        <span>{title}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {slots.map((slot) => {
          const isSelected = selectedTimeSlot === slot.time;

          return (
            <button
              key={slot.time}
              type="button"
              disabled={!slot.isAvailable}
              onClick={() => setSelectedTimeSlot(slot.time)}
              className={`p-3.5 rounded-xl border text-center transition-all duration-200 flex items-center justify-between px-4 cursor-pointer ${
                isSelected
                  ? 'bg-foreground text-white border-foreground font-bold ring-2 ring-accent shadow-subtle'
                  : !slot.isAvailable
                  ? 'bg-card/40 border-border/40 text-muted-light/40 cursor-not-allowed'
                  : 'bg-surface border-border hover:bg-card hover:border-accent text-foreground font-medium'
              }`}

            >
              <span className="font-mono text-small">{slot.time}</span>
              {!slot.isAvailable ? (
                <span className="text-[0.65rem] text-error font-semibold">Dolu</span>
              ) : isSelected ? (
                <span className="text-[0.65rem] text-accent font-semibold">Seçili</span>
              ) : (
                <span className="text-[0.65rem] text-success font-semibold">Müsait</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h3 className="font-serif text-h2 text-foreground">
          Müsait Saat Dilimini Seçin
        </h3>
        <p className="text-small text-muted mt-1">
          {selectedDate} tarihi için gerçek zamanlı rezervasyon saatleri.
        </p>
      </div>

      {formErrors.timeSlot && (
        <p className="p-3 bg-error/10 border border-error/30 text-error text-caption rounded-lg font-medium">
          {formErrors.timeSlot}
        </p>
      )}

      <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border/80 shadow-subtle space-y-8">
        {renderSlotGroup('Sabah Dilimi (09:30 - 12:00)', <Sun className="w-4 h-4 text-accent" />, morningSlots)}
        {renderSlotGroup('Öğleden Sonra (13:00 - 17:00)', <Sunset className="w-4 h-4 text-accent" />, afternoonSlots)}
        {renderSlotGroup('Akşam Dilimi (17:30 - 20:00)', <Moon className="w-4 h-4 text-accent" />, eveningSlots)}
      </div>
    </div>
  );
};
