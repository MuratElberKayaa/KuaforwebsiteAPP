import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Navigation,
  Sparkles,
  Star,
} from 'lucide-react';
import { Container, Button } from '../ui';
import { BranchItem, StaffMember, ServiceItem } from '../../types';
import { teamData } from '../../data/teamData';
import { servicesData } from '../../data/servicesData';
import { SeoHead } from '../seo/SeoHead';
import {
  generateHairSalonSchema,
  generateBreadcrumbSchema,
} from '../seo/schemaGenerators';

interface BranchDetailPageProps {
  branch: BranchItem;
  onBookBranch: (branch: BranchItem, staff?: StaffMember) => void;
  onSelectStaff?: (staff: StaffMember) => void;
  onSelectService?: (service: ServiceItem) => void;
  onNavigateToBranches: () => void;
  onNavigateHome: () => void;
}

export function BranchDetailPage({
  branch,
  onBookBranch,
  onSelectStaff,
  onSelectService,
  onNavigateToBranches,
  onNavigateHome,
}: BranchDetailPageProps) {
  // Find stylists assigned to this branch
  const branchStaff = teamData.filter((t) => t.branchIds.includes(branch.id));

  const branchSchema = generateHairSalonSchema(branch);
  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Şubelerimiz', url: '/subeler' },
    { name: branch.name, url: `/subeler/${branch.slug}` },
  ]);

  const combinedSchema = [branchSchema, breadcrumbsSchema];

  return (
    <div className="py-10 lg:py-16 bg-background text-foreground animate-fade-in">
      {/* Dynamic Local SEO Meta & HairSalon JSON-LD Schema */}
      <SeoHead
        title={`${branch.name} — ${branch.district}, ${branch.city} Lüks Kuaför`}
        description={`${branch.name} adres, telefon, çalışma saatleri ve randevu. ${branch.city} ${branch.district} stüdyomuzda artisanal balayage, saç kesimi ve saç bakım ritüelleri.`}
        canonicalUrl={`https://lelixir-atelier.com/#/subeler/${branch.slug}`}
        ogImage={branch.image}
        ogType="business.business"
        schemaJson={combinedSchema}
      />

      <Container size="full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-caption text-muted mb-8" aria-label="Breadcrumb">
          <button onClick={onNavigateHome} className="hover:text-foreground transition-colors">
            Ana Sayfa
          </button>
          <span>/</span>
          <button onClick={onNavigateToBranches} className="hover:text-foreground transition-colors">
            Şubelerimiz
          </button>
          <span>/</span>
          <span className="text-foreground font-medium">{branch.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          {/* Left Hero Image */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden shadow-card h-[380px] sm:h-[480px]">
            <img
              src={branch.image}
              alt={`${branch.name} İç Mekan ve Salon Atmosferi`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-surface/80 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="bg-accent text-background font-bold text-caption uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                {branch.city} • {branch.district}
              </span>
            </div>
          </div>

          {/* Right Hero Info & Fast Booking */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold block mb-2">
                LÜKS SAÇ STÜDYOSU
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
                {branch.name}
              </h1>
              <p className="text-small text-muted-dark leading-relaxed mt-3">
                {branch.district} lokasyonunda özel konsültasyon alanları, VIP bakım süiti ve usta stilist kadrosuyla kişiye özel kuaförlük deneyimi sunuyoruz.
              </p>
            </div>

            {/* Fast Contact Card */}
            <div className="p-5 bg-card border border-border rounded-xl space-y-3.5 text-small">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-foreground block">Adres:</span>
                  <span className="text-muted-dark">{branch.address}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border">
                <a
                  href={`tel:${branch.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-2 text-foreground hover:text-accent font-medium"
                >
                  <Phone className="w-4 h-4 text-accent" />
                  <span>{branch.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${branch.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="dark"
                size="md"
                onClick={() => onBookBranch(branch)}
                className="flex-1 font-semibold"
              >
                Bu Şubeden Randevu Al
              </Button>
              <a
                href={branch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-secondary hover:bg-card border border-border text-foreground font-semibold rounded-lg text-small transition-colors"
              >
                <Navigation className="w-4 h-4 text-accent" />
                <span>Haritada Yol Tarifi</span>
              </a>
            </div>
          </div>
        </div>

        {/* Middle Section: Amenities & Working Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Amenities & Highlights */}
          <div className="lg:col-span-7 bg-card border border-border p-6 sm:p-8 rounded-2xl space-y-6">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Şube Olanakları & Ayrıcalıklar
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {branch.features.map((feat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-secondary border border-border/80 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-small font-semibold text-foreground">{feat}</span>
                </div>
              ))}
            </div>

            <p className="text-small text-muted-dark leading-relaxed">
              Tüm misafirlerimize seansları boyunca gurme kahve ve özel çay seçkisi eşlik eder. Renk açma ve uzun bakım işlemlerinde VIP süitlerimizde konforlu çalışma ortamı ve yüksek hızlı Wi-Fi sunulmaktadır.
            </p>
          </div>

          {/* Working Hours Table */}
          <div className="lg:col-span-5 bg-card border border-border p-6 sm:p-8 rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-serif text-xl font-bold text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Çalışma Saatleri
              </h3>
              <span className="text-caption font-bold bg-emerald-500/15 text-emerald-600 px-2.5 py-1 rounded-full border border-emerald-500/30">
                Şu Anda Açık
              </span>
            </div>

            <div className="space-y-2 text-small">
              {[
                { days: 'Pazartesi — Cuma', hours: '09:30 - 20:00' },
                { days: 'Cumartesi', hours: '09:30 - 21:00' },
                { days: 'Pazar', hours: '10:00 - 18:00' },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/40 text-foreground/80">
                  <span className="font-medium">{h.days}</span>
                  <span className="font-mono text-accent font-semibold">{h.hours}</span>
                </div>
              ))}
            </div>

            <p className="text-caption text-muted pt-2">
              * Resmi tatillerde ve bayramlarda randevu yoğunluğuna göre saatler değişkenlik gösterebilir.
            </p>
          </div>
        </div>

        {/* Section: Stylists Stationed Here */}
        <div className="space-y-6 mb-16">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold block mb-1">
                UZMAN EKİBİMİZ
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                {branch.name} Bünyesindeki Usta Eller
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branchStaff.map((staff) => (
              <div
                key={staff.id}
                className="bg-card border border-border rounded-xl p-5 hover:border-accent/40 hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={staff.avatar}
                    alt={staff.name}
                    className="w-16 h-16 rounded-xl object-cover border border-border shrink-0 cursor-pointer"
                    onClick={() => onSelectStaff && onSelectStaff(staff)}
                  />
                  <div className="min-w-0 flex-1">
                    <h3
                      className="font-serif font-bold text-foreground text-lg hover:text-accent cursor-pointer truncate"
                      onClick={() => onSelectStaff && onSelectStaff(staff)}
                    >
                      {staff.name}
                    </h3>
                    <p className="text-xs text-accent font-medium mt-0.5">{staff.role}</p>
                    <div className="flex items-center gap-1 text-accent text-caption font-semibold mt-1">
                      <Star className="w-3.5 h-3.5 fill-accent" />
                      <span>{staff.rating.toFixed(1)} ({staff.reviewCount} Yorum)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-border flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectStaff && onSelectStaff(staff)}
                    className="text-xs text-foreground/70 hover:text-accent font-semibold"
                  >
                    Profili İncele
                  </button>
                  <Button
                    variant="dark"
                    size="xs"
                    onClick={() => onBookBranch(branch, staff)}
                  >
                    Bu Uzmanla Randevu Al
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Available Services */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold block mb-1">
                HİZMET SEÇKİSİ
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                Bu Şubemizde Sunulan İmza Hizmetler
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="bg-card border border-border rounded-xl p-5 hover:border-accent/40 hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-caption bg-secondary text-accent font-bold px-2 py-0.5 rounded">
                      {service.categoryName}
                    </span>
                    <span className="font-bold text-accent text-small">
                      {service.priceStartingFrom.toLocaleString('tr-TR')} ₺+
                    </span>
                  </div>
                  <h3
                    className="font-serif font-bold text-foreground text-base hover:text-accent cursor-pointer"
                    onClick={() => onSelectService && onSelectService(service)}
                  >
                    {service.name}
                  </h3>
                  <p className="text-caption text-muted-dark mt-1 line-clamp-2">
                    {service.subtitle}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-border flex items-center justify-between">
                  <span className="text-caption text-muted">Süre: {service.durationMinutes} dk</span>
                  <button
                    onClick={() => onBookBranch(branch)}
                    className="text-xs text-accent font-bold hover:underline"
                  >
                    Randevu Seç ➔
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
