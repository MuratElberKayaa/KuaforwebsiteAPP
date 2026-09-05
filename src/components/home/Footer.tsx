import React from 'react';
import { Container, InstagramIcon } from '../ui';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onBookClick: () => void;
  onNavigateBranches?: () => void;
  onNavigateBlog?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onBookClick,
  onNavigateBranches,
  onNavigateBlog,
}) => {
  return (
    <footer className="bg-dark-surface text-background pt-16 pb-28 sm:pb-16 border-t border-dark-border">
      <Container size="full">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-dark-border">
          {/* Col 1: Brand Manifesto (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-3xl font-bold tracking-[0.2em] uppercase block text-white">
              L'ÉLIXIR <span className="text-accent font-normal italic">Atelier</span>
            </span>
            <p className="text-small text-muted-light max-w-sm leading-relaxed font-light">
              İstanbul ve Ankara'da üst segment kuaförlük ve saç sanatı. Kişiye özel renk mimarisi, haute-coiffure kesim ve gelin tasarımlarıyla saçınızı sanatla buluşturuyoruz.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-muted-light hover:text-accent hover:border-accent transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="tel:+902122345060"
                className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-muted-light hover:text-accent hover:border-accent transition-colors"
                aria-label="Telefon"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:concierge@lelixir-atelier.com"
                className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-muted-light hover:text-accent hover:border-accent transition-colors"
                aria-label="E-posta"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Services & Journal Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg text-white font-semibold tracking-wide">
              Keşfedin
            </h4>
            <ul className="space-y-2 text-small text-muted-light">
              <li>
                <a href="#/hizmetler/balayage" className="hover:text-accent transition-colors">
                  Artisanal Balayage
                </a>
              </li>
              <li>
                <a href="#/hizmetler/sac-kesimi" className="hover:text-accent transition-colors">
                  Couture Saç Kesimi
                </a>
              </li>
              <li>
                <a href="#/hizmetler/gelin-saci" className="hover:text-accent transition-colors">
                  Gelin Saçı & VIP Paket
                </a>
              </li>
              <li>
                <button
                  onClick={onNavigateBlog}
                  className="hover:text-accent transition-colors text-left"
                >
                  L'ÉLIXIR Dergi & Trendler
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Branches Quick Links */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-lg text-white font-semibold tracking-wide">
                Şubelerimiz
              </h4>
              {onNavigateBranches && (
                <button
                  onClick={onNavigateBranches}
                  className="text-accent hover:underline text-caption font-semibold"
                >
                  Tümü ➔
                </button>
              )}
            </div>
            <ul className="space-y-2 text-small text-muted-light">
              <li>
                <a href="#/subeler/nisantasi-flagship" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Nişantaşı Flagship</span>
                </a>
              </li>
              <li>
                <a href="#/subeler/bebek-waterfront" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Bebek Waterfront</span>
                </a>
              </li>
              <li>
                <a href="#/subeler/bagdat-caddesi" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Bağdat Caddesi Lounge</span>
                </a>
              </li>
              <li>
                <a href="#/subeler/ankara-cayyolu" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>Ankara Çayyolu Studio</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Working Hours & Booking */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg text-white font-semibold tracking-wide">
              Çalışma Saatleri
            </h4>
            <div className="space-y-2 text-small text-muted-light">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>Pzt - Cmt: 09:30 - 20:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>Pazar: 10:00 - 18:00</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onBookClick}
                  className="text-accent hover:text-accent-light text-small font-semibold flex items-center gap-1 underline underline-offset-4"
                >
                  Online Randevu Başlat <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-caption text-muted-light gap-4">
          <p>© {new Date().getFullYear()} L'ÉLIXIR Atelier Hair Studio. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#kvkk" className="hover:text-white transition-colors">
              KVKK Aydınlatma Metni
            </a>
            <a href="#gizlilik" className="hover:text-white transition-colors">
              Gizlilik Politikası
            </a>
            <a href="#cerez" className="hover:text-white transition-colors">
              Çerez Tercihleri
            </a>
            <a href="#iptal" className="hover:text-white transition-colors">
              İptal & Randevu Şartları
            </a>
            <a
              href="#/admin"
              className="inline-flex items-center gap-1 text-accent hover:text-accent-light transition-colors font-medium border border-accent/30 px-2 py-0.5 rounded text-[11px]"
            >
              <span>Salon Yönetim Paneli (Admin)</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

