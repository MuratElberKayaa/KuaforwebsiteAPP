import React from 'react';
import { Container, Button, Badge, Breadcrumb, InstagramIcon } from '../ui';
import { StaffMember, ServiceItem } from '../../types';
import { servicesData } from '../../data/servicesData';
import { portfolioData } from '../../data/portfolioData';
import {
  Calendar,
  Star,
  Clock,
  MapPin,
  Award,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Scissors,
} from 'lucide-react';

interface TeamDetailPageProps {
  staff: StaffMember;
  onBookWithStaff: (staff: StaffMember, service?: ServiceItem) => void;
  onNavigateToTeam: () => void;
  onNavigateHome: () => void;
}

export const TeamDetailPage: React.FC<TeamDetailPageProps> = ({
  staff,
  onBookWithStaff,
  onNavigateToTeam,
  onNavigateHome,
}) => {
  // Services provided by this staff
  const staffServices = servicesData.filter((service) =>
    staff.serviceIds?.includes(service.id)
  );

  // Works created by this staff
  const staffPortfolio = portfolioData.filter(
    (look) =>
      look.stylistName.toLowerCase().includes(staff.name.toLowerCase()) ||
      look.stylistId === staff.id
  );

  return (
    <div className="py-8 sm:py-12 bg-background min-h-screen">
      <Container size="full">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Ana Sayfa', onClick: onNavigateHome },
              { label: 'Ekibimiz', onClick: onNavigateToTeam },
              { label: staff.name, isCurrent: true },
            ]}
          />
        </div>

        {/* 1. Hero Profile Showcase (Split 2-Col) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Left: Big Editorial Portrait (5 cols) */}
          <div className="lg:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-floating border border-border/80 bg-muted-light">
            <img
              src={staff.avatar}
              alt={staff.name}
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent pointer-events-none" />

            {/* Overlaid Badges */}
            <div className="absolute top-4 left-4">
              <Badge variant="accent" size="md">
                {staff.experienceYears} Yıllık Deneyim
              </Badge>
            </div>

            <div className="absolute top-4 right-4 bg-surface/95 backdrop-blur-md px-3 py-1.5 rounded-pill flex items-center gap-1.5 border border-border shadow-subtle">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-small font-bold text-foreground">
                {staff.rating}
              </span>
              <span className="text-caption text-muted">
                ({staff.reviewCount} İnceleme)
              </span>
            </div>

            {staff.instagram && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-caption bg-dark/80 backdrop-blur-md p-3 rounded-xl border border-dark-border">
                <span className="flex items-center gap-1.5">
                  <InstagramIcon className="w-4 h-4 text-accent" />
                  <span className="font-mono">{staff.instagram}</span>
                </span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline text-[0.7rem] uppercase font-semibold"
                >
                  Takip Et &rarr;
                </a>
              </div>
            )}
          </div>

          {/* Right: Biography, Quote, Specialties & Main Booking CTA (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-eyebrow uppercase tracking-[0.25em] text-accent-dark font-semibold block mb-2">
                Master Stylist Profili
              </span>
              <h1 className="font-serif text-h1 text-foreground leading-tight">
                {staff.name}
              </h1>
              <p className="text-body-lg text-accent-dark font-medium mt-1">
                {staff.role}
              </p>
            </div>

            {staff.quote && (
              <blockquote className="p-4 sm:p-5 rounded-xl bg-card border-l-4 border-accent text-foreground/90 font-serif text-lg italic leading-relaxed">
                {staff.quote}
              </blockquote>
            )}

            <p className="text-body text-muted leading-relaxed font-light">
              {staff.bio}
            </p>

            {/* Specialties Badges */}
            <div>
              <span className="text-caption font-semibold uppercase tracking-wider text-foreground block mb-2.5">
                Uzmanlık Alanları & Teknikler:
              </span>
              <div className="flex flex-wrap gap-2">
                {staff.specialties.map((spec, idx) => (
                  <Badge key={idx} variant="default" size="md">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Main Primary Booking CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                variant="dark"
                size="lg"
                onClick={() => onBookWithStaff(staff)}
                leftIcon={<Calendar className="w-5 h-5 text-accent" />}
                className="shadow-card hover:shadow-floating flex-1"
              >
                {staff.name.split(' ')[0]} ile Randevu Al
              </Button>
            </div>

            {/* Next Availability Preview */}
            {staff.nextAvailableDate && (
              <div className="p-3.5 rounded-lg bg-success/10 border border-success/30 flex items-center gap-2 text-small text-success font-medium">
                <Clock className="w-4 h-4 text-success shrink-0" />
                <span>En Erken Müsaitlik: <strong>{staff.nextAvailableDate}</strong></span>
              </div>
            )}
          </div>
        </div>

        {/* 2. Education & Working Branch Schedules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Education & Certificates */}
          {staff.education && (
            <div className="p-8 rounded-2xl bg-card border border-border/80 space-y-4">
              <div className="flex items-center gap-2 text-accent-dark font-semibold">
                <GraduationCap className="w-5 h-5" />
                <h3 className="font-serif text-h3 text-foreground">
                  Akademi Eğitimi & Sertifikalar
                </h3>
              </div>
              <ul className="space-y-3 text-small text-muted leading-relaxed">
                {staff.education.map((edu, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Working Branches & Weekly Hours */}
          {staff.schedules && (
            <div className="p-8 rounded-2xl bg-dark text-background border border-dark-border space-y-4">
              <div className="flex items-center gap-2 text-accent">
                <MapPin className="w-5 h-5" />
                <h3 className="font-serif text-h3 text-white">
                  Çalıştığı Şubeler & Günler
                </h3>
              </div>
              <div className="space-y-3">
                {staff.schedules.map((sch, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-dark-card border border-dark-border space-y-1">
                    <span className="font-semibold text-white block text-small">
                      {sch.branchName}
                    </span>
                    <div className="flex items-center justify-between text-caption text-muted-light">
                      <span>{sch.days}</span>
                      <span className="font-mono text-accent">{sch.hours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Services Offered by This Stylist */}
        {staffServices.length > 0 && (
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
              <div>
                <span className="text-eyebrow uppercase tracking-[0.25em] text-accent-dark font-semibold block mb-1">
                  Hizmet Yelpazesi
                </span>
                <h2 className="font-serif text-h2 text-foreground">
                  {staff.name}'in Sunduğu İmza Hizmetler
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staffServices.map((srv) => (
                <div
                  key={srv.id}
                  className="p-6 rounded-2xl bg-card border border-border/80 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="accent" size="sm">
                        {srv.categoryName}
                      </Badge>
                      <span className="text-caption text-muted flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-accent" /> {srv.durationMinutes} dk
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-foreground">
                      {srv.name}
                    </h4>
                    <p className="text-small text-muted mt-2 line-clamp-2">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-border/60 flex items-center justify-between">
                    <div>
                      <span className="text-[0.65rem] text-muted block">Başlangıç</span>
                      <span className="font-serif text-lg font-bold text-foreground">
                        {srv.priceStartingFrom.toLocaleString('tr-TR')} ₺
                      </span>
                    </div>

                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() => onBookWithStaff(staff, srv)}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Seç & Randevu Al
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Portfolio Works by this Stylist */}
        {staffPortfolio.length > 0 && (
          <div className="mb-16">
            <h3 className="font-serif text-h2 text-foreground mb-6">
              {staff.name}'in İmza Dönüşümleri & Portfolyosu
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {staffPortfolio.map((item) => (
                <div
                  key={item.id}
                  className="aspect-[4/5] rounded-xl overflow-hidden bg-muted-light border border-border relative group cursor-pointer"
                  onClick={() => onBookWithStaff(staff)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[0.65rem] uppercase tracking-wider text-accent font-semibold block">
                      {item.categoryLabel}
                    </span>
                    <h4 className="font-serif text-lg font-normal">{item.title}</h4>
                    <p className="text-caption text-white/80">{item.serviceName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Final Stylist CTA */}
        <div className="bg-dark text-background p-8 sm:p-12 rounded-2xl border border-dark-border text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto text-accent mb-2">
            <Scissors className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-h2 text-white font-light">
            {staff.name} ile saçınızı dönüştürmeye hazır mısınız?
          </h3>
          <p className="text-small text-muted-light max-w-md mx-auto">
            Hemen müsait gün ve saat dilimini seçerek randevunuzu tamamlayın.
          </p>
          <div className="pt-2">
            <Button
              variant="gold"
              size="lg"
              onClick={() => onBookWithStaff(staff)}
              leftIcon={<Sparkles className="w-5 h-5 text-dark-surface" />}
            >
              Randevuyu Başlat
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

