import { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ArrowUpRight,
  Sparkles,
  Navigation,
} from 'lucide-react';
import { Container, SectionHeading, Button } from '../ui';
import { branchesData } from '../../data/branchesData';
import { BranchItem } from '../../types';
import { SeoHead } from '../seo/SeoHead';
import { generateBreadcrumbSchema } from '../seo/schemaGenerators';

interface BranchesPageProps {
  onSelectBranch: (branch: BranchItem) => void;
  onBookBranch: (branch: BranchItem) => void;
  onNavigateHome: () => void;
}

export function BranchesPage({
  onSelectBranch,
  onBookBranch,
  onNavigateHome,
}: BranchesPageProps) {
  const [cityFilter, setCityFilter] = useState<'all' | 'İstanbul' | 'Ankara'>('all');

  const filteredBranches = branchesData.filter(
    (b) => cityFilter === 'all' || b.city === cityFilter
  );

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Şubelerimiz', url: '/subeler' },
  ]);

  return (
    <div className="py-10 lg:py-16 bg-background text-foreground animate-fade-in">
      {/* Dynamic SEO Meta */}
      <SeoHead
        title="Şubelerimiz — İstanbul & Ankara Lüks Saç Tasarım Stüdyoları"
        description="L'ÉLIXIR Atelier Nişantaşı Flagship, Bebek Waterfront, Bağdat Caddesi ve Ankara Çayyolu şubelerimizin adres, telefon, çalışma saatleri ve harita bilgileri."
        canonicalUrl="https://lelixir-atelier.com/#/subeler"
        schemaJson={breadcrumbSchema}
      />

      <Container size="full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-caption text-muted mb-8" aria-label="Breadcrumb">
          <button onClick={onNavigateHome} className="hover:text-foreground transition-colors">
            Ana Sayfa
          </button>
          <span>/</span>
          <span className="text-foreground font-medium">Şubelerimiz & Stüdyolar</span>
        </nav>

        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-3 block">
            LOKASYONLAR & STÜDYOLAR
          </span>
          <SectionHeading
            title="Kişiye Özel Lüks Saç Deneyimi."
            subtitle="İstanbul Boğazı’nın zarafetinden Nişantaşı’nın modasına ve Ankara’nın seçkin dokusuna uzanan 4 özel stüdyomuzda sizleri ağırlıyoruz."
            align="center"
          />

          {/* City Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'Tüm Şubeler (4)' },
              { id: 'İstanbul', label: 'İstanbul (3)' },
              { id: 'Ankara', label: 'Ankara (1)' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setCityFilter(c.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  cityFilter === c.id
                    ? 'bg-dark-surface text-background shadow-card'
                    : 'bg-card text-foreground/70 hover:text-foreground border border-border'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredBranches.map((branch) => (
            <article
              key={branch.id}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 hover:shadow-card transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Branch Hero Image & Badge */}
                <div
                  className="h-64 sm:h-72 relative overflow-hidden cursor-pointer"
                  onClick={() => onSelectBranch(branch)}
                >
                  <img
                    src={branch.image}
                    alt={`${branch.name} Salon Görseli`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-surface/90 via-dark-surface/30 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-background font-bold text-caption uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {branch.city} • {branch.district}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
                      {branch.name}
                    </h2>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 space-y-4 text-small">
                  <div className="flex items-start gap-3 text-foreground/80">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <a
                      href={`tel:${branch.phone.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center gap-2 text-foreground/80 hover:text-accent font-medium"
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

                  <div className="flex items-center gap-2 text-muted text-caption pt-1 border-t border-border/60">
                    <Clock className="w-4 h-4 text-accent shrink-0" />
                    <span>{branch.hours}</span>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {branch.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[0.68rem] bg-secondary text-foreground/80 px-2.5 py-1 rounded-md border border-border"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-accent" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/40 mt-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={branch.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-card hover:bg-secondary border border-border text-foreground text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-accent" />
                    <span>Yol Tarifi</span>
                  </a>
                  <button
                    onClick={() => onSelectBranch(branch)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-4 py-2.5 text-accent hover:text-accent-dark text-xs font-semibold rounded-lg transition-colors hover:underline"
                  >
                    <span>Şube Detayı</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => onBookBranch(branch)}
                  className="w-full sm:w-auto font-semibold"
                >
                  Bu Şubeden Randevu Al
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}

