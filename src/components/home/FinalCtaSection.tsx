import React from 'react';
import { Container, Button } from '../ui';
import { Calendar, MessageCircle, Sparkles } from 'lucide-react';

interface FinalCtaSectionProps {
  onBookClick: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onBookClick }) => {
  return (
    <section className="py-20 lg:py-28 bg-dark text-background relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <Container size="md" className="text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 text-accent text-eyebrow uppercase tracking-[0.3em] font-semibold">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>L'ÉLIXIR Atelier Deneyimi</span>
        </div>

        <h2 className="font-serif text-h1 sm:text-display text-background font-light leading-tight">
          Yeni görünümünüz için <br />
          <span className="italic font-serif text-accent font-normal">
            hazır mısınız?
          </span>
        </h2>

        <p className="text-body-lg text-muted-light max-w-xl mx-auto leading-relaxed font-light">
          İster cesur bir renk dönüşümü, ister zamansız bir gelin tasarımı. Size en uygun uzmanı ve saati seçerek randevunuzu 45 saniyede oluşturun.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="gold"
            size="lg"
            onClick={onBookClick}
            leftIcon={<Calendar className="w-5 h-5 text-dark-surface" />}
            className="w-full sm:w-auto shadow-floating"
          >
            Hemen Randevu Al
          </Button>

          <a
            href="https://wa.me/905321002030"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="lg"
              isFullWidth
              leftIcon={<MessageCircle className="w-5 h-5 text-accent" />}
              className="text-white border-white/30 hover:border-white hover:bg-white/10"
            >
              WhatsApp Concierge
            </Button>
          </a>
        </div>

        {/* Conversion Trust & Friction-Reduction Sub-Note */}
        <p className="text-caption text-muted-light/70 tracking-wide pt-2">
          ⚡ 45 saniyede hızlı rezervasyon • 🛡️ 24 saat öncesine kadar ücretsiz erteleme • 💳 Sürpriz ek ücret yok
        </p>
      </Container>
    </section>
  );
};

