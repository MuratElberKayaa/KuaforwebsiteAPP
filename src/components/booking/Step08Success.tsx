import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Button, Badge } from '../ui';
import {
  CheckCircle2,
  Calendar,
  MessageCircle,
  Home,
  Navigation,
  Sparkles,
} from 'lucide-react';

interface Step08SuccessProps {
  onNavigateHome: () => void;
}

export const Step08Success: React.FC<Step08SuccessProps> = ({ onNavigateHome }) => {
  const {
    confirmedBooking,
    selectedServices,
    selectedStaff,
    selectedBranch,
    resetBooking,
  } = useBooking();

  if (!confirmedBooking) return null;

  // Generate Google Calendar Link
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `L'ÉLIXIR Atelier Randevusu - ${selectedServices.map((s) => s.name).join(', ')}`
  )}&dates=${confirmedBooking.date.replace(/-/g, '')}T${confirmedBooking.timeSlot.replace(':', '')}00/${confirmedBooking.date.replace(/-/g, '')}T200000&details=${encodeURIComponent(
    `Rezervasyon Kodu: ${confirmedBooking.bookingCode}\nUzman: ${selectedStaff ? selectedStaff.name : 'Master Stylist'}\nŞube: ${selectedBranch.name} (${selectedBranch.address})\nTahmini Tutar: ${confirmedBooking.totalEstimatedPrice} TL`
  )}&location=${encodeURIComponent(selectedBranch.address)}`;

  // Generate WhatsApp Message Link
  const whatsappUrl = `https://wa.me/905321002030?text=${encodeURIComponent(
    `Merhaba, L'ÉLIXIR Atelier ${confirmedBooking.bookingCode} nolu randevum hakkında: ${confirmedBooking.date} saat ${confirmedBooking.timeSlot}, ${selectedBranch.name}. Teşekkürler!`
  )}`;

  const handleFinish = () => {
    resetBooking();
    onNavigateHome();
  };

  return (
    <div className="max-w-2xl mx-auto py-6 text-center space-y-8 animate-fade-in">
      {/* Celebration Icon */}
      <div className="relative inline-flex">
        <div className="w-20 h-20 bg-success/15 text-success rounded-full flex items-center justify-center shadow-floating ring-4 ring-success/20">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div className="absolute -top-1 -right-1 bg-accent text-dark-surface p-1.5 rounded-full shadow-subtle animate-bounce">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* Main Headline */}
      <div className="space-y-2">
        <Badge variant="accent" size="md">
          Rezervasyon Onaylandı
        </Badge>
        <h2 className="font-serif text-h1 text-foreground">
          Randevunuz hazır.
        </h2>
        <p className="text-body text-muted max-w-md mx-auto leading-relaxed">
          Tebrikler <strong>{confirmedBooking.customer.fullName}</strong>, rezervasyonunuz oluşturuldu ve SMS onay detaylarınız iletildi.
        </p>
      </div>

      {/* Booking Details Card */}
      <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border/80 shadow-card text-left space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-border/60">
          <div>
            <span className="text-caption text-muted block">Rezervasyon Referans Numarası:</span>
            <span className="font-mono text-xl font-bold text-accent-dark tracking-wider">
              {confirmedBooking.bookingCode}
            </span>
          </div>
          <span className="text-caption bg-success/15 text-success px-3 py-1 rounded-full font-semibold">
            Onaylandı
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-small">
          <div>
            <span className="text-caption text-muted block">Hizmet(ler):</span>
            <span className="font-semibold text-foreground">
              {selectedServices.map((s) => s.name).join(' + ')}
            </span>
          </div>

          <div>
            <span className="text-caption text-muted block">Uzman Kuaför:</span>
            <span className="font-semibold text-foreground">
              {selectedStaff ? selectedStaff.name : 'İlk Müsait Master Stylist'}
            </span>
          </div>

          <div>
            <span className="text-caption text-muted block">Tarih & Saat:</span>
            <span className="font-semibold text-foreground">
              {confirmedBooking.date} · Saat {confirmedBooking.timeSlot}
            </span>
          </div>

          <div>
            <span className="text-caption text-muted block">Şube & Salon:</span>
            <span className="font-semibold text-foreground">
              {selectedBranch.name}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-border/60 flex items-center justify-between">
          <span className="text-small text-muted">Tahmini Tutar:</span>
          <span className="font-serif text-xl font-bold text-foreground">
            {confirmedBooking.totalEstimatedPrice.toLocaleString('tr-TR')} ₺
          </span>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <a
          href={googleCalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button
            variant="outline"
            size="md"
            isFullWidth
            leftIcon={<Calendar className="w-4 h-4 text-accent" />}
          >
            Google Takvime Ekle
          </Button>
        </a>

        <a
          href={selectedBranch.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button
            variant="outline"
            size="md"
            isFullWidth
            leftIcon={<Navigation className="w-4 h-4 text-accent" />}
          >
            Yol Tarifi Al
          </Button>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button
            variant="outline"
            size="md"
            isFullWidth
            leftIcon={<MessageCircle className="w-4 h-4 text-success" />}
          >
            WhatsApp'ta Paylaş
          </Button>
        </a>
      </div>

      {/* Return to Home */}
      <div className="pt-4 border-t border-border/60">
        <Button
          variant="dark"
          size="lg"
          onClick={handleFinish}
          leftIcon={<Home className="w-5 h-5 text-accent" />}
          className="w-full sm:w-auto shadow-card"
        >
          Ana Sayfaya Dön
        </Button>
      </div>
    </div>
  );
};
