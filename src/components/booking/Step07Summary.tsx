import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Button, Badge } from '../ui';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Sparkles,
} from 'lucide-react';

export const Step07Summary: React.FC = () => {
  const {
    selectedServices,
    selectedStaff,
    selectedBranch,
    selectedDate,
    selectedTimeSlot,
    customerFirstName,
    customerLastName,
    customerPhone,
    customerEmail,
    customerNote,
    totalEstimatedPrice,
    totalDurationMinutes,
    goToNextStep,
    goToPrevStep,
  } = useBooking();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h3 className="font-serif text-h2 text-foreground">
          Randevu Özeti & Son Onay
        </h3>
        <p className="text-small text-muted mt-1">
          Lütfen seçtiğiniz hizmet, uzman, lokasyon ve tarih bilgilerini kontrol ediniz.
        </p>
      </div>

      {/* Main Summary Card */}
      <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border/80 shadow-card space-y-6">
        {/* Selected Services Group */}
        <div className="space-y-3 pb-6 border-b border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-eyebrow uppercase text-accent-dark font-semibold">
              Seçilen Hizmetler ({selectedServices.length})
            </span>
            <span className="text-caption text-muted flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-accent" /> Toplam ~{totalDurationMinutes} dk
            </span>
          </div>

          <div className="space-y-2">
            {selectedServices.map((srv) => (
              <div
                key={srv.id}
                className="p-3.5 rounded-xl bg-surface border border-border flex items-center justify-between"
              >
                <div>
                  <h4 className="font-serif text-base font-bold text-foreground">
                    {srv.name}
                  </h4>
                  <p className="text-caption text-muted">{srv.subtitle}</p>
                </div>
                <span className="font-serif text-base font-bold text-foreground">
                  {srv.priceStartingFrom.toLocaleString('tr-TR')} ₺
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Details Grid (Staff, Branch, Date/Time) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-border/60 text-small">
          {/* Staff */}
          <div className="p-4 rounded-xl bg-surface border border-border space-y-1.5">
            <div className="flex items-center gap-1.5 text-caption text-accent-dark font-semibold uppercase tracking-wider">
              <User className="w-3.5 h-3.5" />
              <span>Uzman Kuaför</span>
            </div>
            <p className="font-serif text-lg font-bold text-foreground">
              {selectedStaff ? selectedStaff.name : 'İlk Müsait Master Stylist'}
            </p>
            <p className="text-caption text-muted">
              {selectedStaff ? selectedStaff.role : 'L\'ÉLIXIR Atelier Ekibi'}
            </p>
          </div>

          {/* Branch */}
          <div className="p-4 rounded-xl bg-surface border border-border space-y-1.5">
            <div className="flex items-center gap-1.5 text-caption text-accent-dark font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Şube Lokasyonu</span>
            </div>
            <p className="font-serif text-lg font-bold text-foreground">
              {selectedBranch.name}
            </p>
            <p className="text-caption text-muted line-clamp-1">
              {selectedBranch.address}
            </p>
          </div>

          {/* Date & Time */}
          <div className="p-4 rounded-xl bg-surface border border-border space-y-1.5 sm:col-span-2">
            <div className="flex items-center gap-1.5 text-caption text-accent-dark font-semibold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Randevu Tarihi & Saati</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-serif text-lg font-bold text-foreground">
                {selectedDate} · Saat {selectedTimeSlot}
              </p>
              <Badge variant="success" size="sm">
                Slot Rezerve Edildi
              </Badge>
            </div>
          </div>
        </div>

        {/* Customer Info Review */}
        <div className="space-y-2 pb-6 border-b border-border/60 text-small text-muted">
          <div className="flex items-center justify-between">
            <span>Misafir Adı:</span>
            <span className="font-semibold text-foreground">
              {customerFirstName} {customerLastName}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>İletişim Telefonu:</span>
            <span className="font-semibold text-foreground">{customerPhone}</span>
          </div>
          {customerEmail && (
            <div className="flex items-center justify-between">
              <span>E-Posta:</span>
              <span className="font-semibold text-foreground">{customerEmail}</span>
            </div>
          )}
          {customerNote && (
            <div className="pt-2 text-caption italic">
              <strong>Özel Not:</strong> "{customerNote}"
            </div>
          )}
        </div>

        {/* Total Price Callout */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-dark text-white">

          <div>
            <span className="text-[0.7rem] uppercase tracking-wider text-muted-light block">
              Tahmini Toplam Tutar:
            </span>
            <span className="text-caption text-accent">
              (Ödeme salonda işlem sonrası yapılır)
            </span>
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-accent">
            {totalEstimatedPrice.toLocaleString('tr-TR')} ₺
          </span>
        </div>

        {/* Confirmation CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={goToPrevStep}
            className="w-full sm:w-auto"
          >
            Düzenle / Geri
          </Button>

          <Button
            variant="gold"
            size="lg"
            onClick={goToNextStep}
            leftIcon={<Sparkles className="w-5 h-5 text-dark-surface" />}
            className="w-full sm:flex-1 shadow-floating"
          >
            Randevuyu Onayla
          </Button>
        </div>
      </div>
    </div>
  );
};
