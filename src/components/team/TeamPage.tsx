import React, { useState, useMemo } from 'react';
import { Container, SectionHeading, Button, Badge, Breadcrumb, InstagramIcon } from '../ui';
import { teamData } from '../../data/teamData';
import { servicesData } from '../../data/servicesData';
import { StaffMember } from '../../types';
import { Calendar, Star, Clock, Award } from 'lucide-react';

interface TeamPageProps {
  onSelectStaff: (staff: StaffMember) => void;
  onBookWithStaff: (staff: StaffMember) => void;
  onNavigateHome: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({
  onSelectStaff,
  onBookWithStaff,
  onNavigateHome,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'Tüm Artistik Kadro' },
    { id: 'color', label: 'Renk & Balayage' },
    { id: 'cut', label: 'Kesim & Form' },
    { id: 'styling', label: 'Styling & Fön' },
    { id: 'bridal', label: 'Gelin & Özel Gün' },
    { id: 'care', label: 'Saç Sağlığı' },
  ];

  const filteredTeam = useMemo(() => {
    if (selectedFilter === 'all') return teamData;
    return teamData.filter((staff) => staff.category === selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="py-8 sm:py-12 bg-background min-h-screen">
      <Container size="full">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Ana Sayfa', onClick: onNavigateHome },
              { label: 'Artistik Ekibimiz', isCurrent: true },
            ]}
          />
        </div>

        {/* Page Header */}
        <SectionHeading
          eyebrow="Uluslararası Akademi Eğitimi"
          title="Saçınıza dokunan eller."
          subtitle="Paris, Londra ve Milano moda haftalarında backstage deneyimi olan, yüz hatlarınıza en uygun formu ve rengi ortaya çıkaran master kuaför kadromuz."
          align="left"
          className="mb-8"
        />

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-8 no-scrollbar">
          {filters.map((filter) => {
            const isActive = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`text-caption uppercase tracking-wider font-semibold py-2.5 px-5 rounded-pill transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-foreground text-background shadow-subtle'
                    : 'bg-card text-muted hover:text-foreground hover:bg-card-hover border border-border/80'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Editorial Portrait Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredTeam.map((staff) => {
            const staffServices = servicesData.filter((s) =>
              staff.serviceIds?.includes(s.id)
            );

            return (
              <div
                key={staff.id}
                className="bg-card rounded-2xl border border-border/80 shadow-subtle hover:shadow-card-hover transition-all duration-500 overflow-hidden flex flex-col sm:flex-row group"
              >
                {/* Left: Editorial Portrait Frame (45% on sm) */}
                <div
                  onClick={() => onSelectStaff(staff)}
                  className="sm:w-5/12 relative aspect-[3/4] sm:aspect-auto overflow-hidden bg-muted-light cursor-pointer shrink-0"
                >
                  <img
                    src={staff.avatar}
                    alt={staff.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-editorial"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                  {/* Rating Tag */}
                  <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-pill flex items-center gap-1 border border-border/60 shadow-subtle">
                    <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                    <span className="text-caption font-bold text-foreground">
                      {staff.rating}
                    </span>
                  </div>

                  {/* Experience Badge */}
                  <div className="absolute bottom-3 left-3 bg-dark/80 backdrop-blur-md text-accent text-[0.65rem] uppercase tracking-wider font-semibold py-1 px-2.5 rounded-full border border-dark-border flex items-center gap-1">
                    <Award className="w-3 h-3 text-accent" /> {staff.experienceYears} Yıl Deneyim
                  </div>
                </div>

                {/* Right: Stylist Details & Services Preview (55% on sm) */}
                <div className="sm:w-7/12 p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-eyebrow uppercase text-accent-dark font-semibold tracking-wider">
                        {staff.role.split('&')[0]}
                      </span>
                      {staff.instagram && (
                        <a
                          href="https://instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-accent p-1"
                          aria-label="Instagram Profili"
                        >
                          <InstagramIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <h3
                      onClick={() => onSelectStaff(staff)}
                      className="font-serif text-h3 text-foreground group-hover:text-accent-dark transition-colors cursor-pointer"
                    >
                      {staff.name}
                    </h3>

                    {staff.quote && (
                      <p className="text-caption italic text-muted-foreground mt-1 line-clamp-2">
                        {staff.quote}
                      </p>
                    )}

                    <p className="text-small text-muted mt-3 line-clamp-3 leading-relaxed">
                      {staff.bio}
                    </p>

                    {/* Specialties Tags */}
                    <div className="flex flex-wrap gap-1.5 my-4 pt-3 border-t border-border/60">
                      {staff.specialties.map((spec, idx) => (
                        <Badge key={idx} variant="default" size="sm">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    {/* Available Services Preview */}
                    {staffServices.length > 0 && (
                      <div className="space-y-1.5 mb-4">
                        <span className="text-[0.68rem] uppercase font-semibold text-muted tracking-wider block">
                          Öne Çıkan Hizmetleri:
                        </span>
                        <div className="flex flex-wrap gap-2 text-caption text-foreground/80 font-medium">
                          {staffServices.map((srv) => (
                            <span key={srv.id} className="bg-surface px-2.5 py-1 rounded-md border border-border">
                              {srv.name} · {srv.priceStartingFrom} ₺
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom CTA & Next Availability */}
                  <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    {staff.nextAvailableDate && (
                      <div className="flex items-center gap-1.5 text-caption text-success font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        <span>En Erken: {staff.nextAvailableDate}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectStaff(staff)}
                        className="text-caption font-semibold text-muted hover:text-foreground underline underline-offset-4 px-2"
                      >
                        Biyografi
                      </button>

                      <Button
                        variant="dark"
                        size="sm"
                        onClick={() => onBookWithStaff(staff)}
                        leftIcon={<Calendar className="w-4 h-4 text-accent" />}
                        className="group-hover:bg-accent group-hover:text-dark-surface transition-colors"
                      >
                        Randevu Al
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};
