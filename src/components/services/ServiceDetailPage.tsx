import React from 'react';
import { Container, Button, Badge, Breadcrumb, Accordion } from '../ui';
import { ServiceItem, StaffMember } from '../../types';
import { teamData } from '../../data/teamData';
import { portfolioData } from '../../data/portfolioData';
import { SeoHead } from '../seo/SeoHead';
import {
  generateServiceSchema,
  generateFaqSchema,
  generateBreadcrumbSchema,
} from '../seo/schemaGenerators';
import {
  Calendar,
  Clock,
  CheckCircle2,
  HelpCircle,
  AlertCircle,
  ShieldCheck,
  Star,
  Sparkles,
} from 'lucide-react';

interface ServiceDetailPageProps {
  service: ServiceItem;
  onBookService: (service: ServiceItem, staff?: StaffMember) => void;
  onNavigateToServices: () => void;
  onNavigateHome: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onBookService,
  onNavigateToServices,
  onNavigateHome,
}) => {
  // Find eligible staff
  const eligibleStaff = teamData.filter((staff) =>
    service.eligibleStaffIds?.includes(staff.id)
  );

  // Find related portfolio looks
  const relatedPortfolio = portfolioData.filter(
    (look) =>
      look.serviceName.toLowerCase().includes(service.name.toLowerCase()) ||
      look.category === (service.categoryId as any)
  );

  // SEO Schemas
  const serviceSchema = generateServiceSchema(service);
  const faqSchema = generateFaqSchema(service.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Hizmetler', url: '/hizmetler' },
    { name: service.name, url: `/hizmetler/${service.slug}` },
  ]);

  const combinedSchemas = [serviceSchema, faqSchema, breadcrumbSchema].filter(Boolean);

  return (
    <div className="py-8 sm:py-12 bg-background min-h-screen">
      {/* Dynamic SEO Meta & Service/FAQ Schemas */}
      <SeoHead
        title={`${service.name} — ${service.subtitle}`}
        description={`${service.name}: ${service.description} ${service.durationMinutes} dakika işlem süresi ve ${service.priceStartingFrom} ₺ başlayan fiyatlarla L'ÉLIXIR Atelier'de randevu oluşturun.`}
        canonicalUrl={`https://lelixir-atelier.com/#/hizmetler/${service.slug}`}
        ogImage={service.image}
        schemaJson={combinedSchemas}
      />

      <Container size="full">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Ana Sayfa', onClick: onNavigateHome },
              { label: 'Hizmetler', onClick: onNavigateToServices },
              { label: service.name, isCurrent: true },
            ]}
          />
        </div>

        {/* 1. Hero Showcase (Split 2-col) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          {/* Left: Large Editorial Image Frame (6 cols) */}
          <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-floating border border-border/80 bg-muted-light">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="accent" size="md">
                {service.categoryName}
              </Badge>
            </div>
            {service.isSignature && (
              <div className="absolute top-4 right-4 bg-dark/85 backdrop-blur-md text-accent text-caption uppercase tracking-wider font-bold py-1 px-3 rounded-full border border-dark-border flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Signature Ritüel
              </div>
            )}
          </div>

          {/* Right: Service Headline, Pricing, Duration & Primary CTA (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-eyebrow uppercase tracking-[0.25em] text-accent-dark font-semibold block mb-2">
                Kişiye Özel Hizmet Detayı
              </span>
              <h1 className="font-serif text-h1 text-foreground leading-tight">
                {service.name}
              </h1>
              <p className="text-body-lg text-accent-dark font-medium mt-2">
                {service.subtitle}
              </p>
            </div>

            <p className="text-body text-muted leading-relaxed font-light">
              {service.description}
            </p>

            {/* Duration & Pricing Summary Box */}
            <div className="p-5 rounded-xl bg-card border border-border/80 flex items-center justify-between">
              <div>
                <span className="text-caption text-muted block">Başlangıç Fiyatı:</span>
                <span className="font-serif text-2xl font-bold text-foreground">
                  {service.priceStartingFrom.toLocaleString('tr-TR')} {service.currency}
                </span>
              </div>
              <div className="text-right">
                <span className="text-caption text-muted block">Tahmini Süre:</span>
                <span className="text-small font-semibold text-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4 text-accent" /> ~{service.durationMinutes} Dakika
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Button
                variant="dark"
                size="lg"
                onClick={() => onBookService(service)}
                leftIcon={<Calendar className="w-5 h-5 text-accent" />}
                className="flex-1 shadow-card hover:shadow-floating"
              >
                Bu Hizmet İçin Randevu Al
              </Button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-caption text-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>K18 & Olaplex Bağ Koruma</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Ücretsiz Renk Konsültasyonu</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Color Specialized UX Helper: "İlk kez mi yaptırıyorsunuz?" & "Saçınızın Mevcut Durumu" */}
        {(service.firstTimeGuide || service.hairConditionChecklist) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {service.firstTimeGuide && (
              <div className="p-6 rounded-xl bg-accent/10 border border-accent/30 space-y-3">
                <div className="flex items-center gap-2 text-accent-dark font-semibold text-small uppercase tracking-wider">
                  <HelpCircle className="w-5 h-5 text-accent-dark" />
                  <span>İlk Kez Mi Yaptırıyorsunuz?</span>
                </div>
                <p className="text-small text-foreground/85 leading-relaxed">
                  {service.firstTimeGuide}
                </p>
              </div>
            )}

            {service.hairConditionChecklist && (
              <div className="p-6 rounded-xl bg-card border border-border/80 space-y-3">
                <div className="flex items-center gap-2 text-foreground font-semibold text-small uppercase tracking-wider">
                  <AlertCircle className="w-5 h-5 text-accent-dark" />
                  <span>Saçınızın Mevcut Durumu & Kontrol</span>
                </div>
                <ul className="space-y-2 text-caption text-muted leading-relaxed">
                  {service.hairConditionChecklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 3. Who is it for & Expected Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Who is it for */}
          {service.whoIsItFor && (
            <div className="p-8 rounded-2xl bg-card border border-border/80 space-y-4">
              <h3 className="font-serif text-h3 text-foreground">
                Kimin İçin Uygun?
              </h3>
              <ul className="space-y-3 text-body text-muted leading-relaxed">
                {service.whoIsItFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Expected Result & Longevity */}
          <div className="p-8 rounded-2xl bg-dark text-background border border-dark-border space-y-4">
            <h3 className="font-serif text-h3 text-white">
              Beklenen Sonuç & Kalıcılık
            </h3>
            {service.expectedResult && (
              <p className="text-body text-muted-light leading-relaxed font-light">
                {service.expectedResult}
              </p>
            )}
            {service.longevity && (
              <div className="pt-4 border-t border-dark-border">
                <span className="text-caption uppercase text-accent font-semibold tracking-wider block mb-1">
                  Kalıcılık Süresi:
                </span>
                <span className="text-small text-white font-medium">
                  {service.longevity}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 4. Process Steps */}
        {service.processSteps && (
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-eyebrow uppercase tracking-[0.25em] text-accent-dark font-semibold block mb-2">
                Uygulama Adımları
              </span>
              <h2 className="font-serif text-h2 text-foreground">
                Kusursuz Sonuç İçin İzlenen Süreç
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.processSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-6 rounded-xl bg-card border border-border/80 space-y-3"
                >
                  <span className="font-mono text-xl font-bold text-accent block">
                    {step.step}
                  </span>
                  <h4 className="font-serif text-h4 text-foreground">
                    {step.title}
                  </h4>
                  <p className="text-small text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Eligible Staff Members */}
        {eligibleStaff.length > 0 && (
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-eyebrow uppercase tracking-[0.25em] text-accent-dark font-semibold block mb-2">
                Uzman Kadro
              </span>
              <h2 className="font-serif text-h2 text-foreground">
                Bu Hizmeti Veren Kuaförlerimiz
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {eligibleStaff.map((staff) => (
                <div
                  key={staff.id}
                  className="p-6 rounded-xl bg-card border border-border/80 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={staff.avatar}
                      alt={staff.name}
                      className="w-14 h-14 rounded-full object-cover border border-border"
                    />
                    <div>
                      <h4 className="font-serif text-lg font-bold text-foreground">
                        {staff.name}
                      </h4>
                      <p className="text-caption text-accent-dark font-medium">{staff.role}</p>
                      <div className="flex items-center gap-1 text-[0.7rem] text-muted mt-0.5">
                        <Star className="w-3 h-3 text-accent fill-accent" /> {staff.rating} ({staff.reviewCount} Yorum)
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="dark"
                    size="xs"
                    onClick={() => onBookService(service, staff)}
                  >
                    Seç
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Related Portfolio Works */}
        {relatedPortfolio.length > 0 && (
          <div className="mb-16">
            <h3 className="font-serif text-h2 text-foreground mb-6">
              Bu Hizmete Ait İlham Veren Çalışmalar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPortfolio.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="aspect-[4/5] rounded-xl overflow-hidden bg-muted-light border border-border relative group cursor-pointer"
                  onClick={() => onBookService(service)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                    <h4 className="font-serif text-lg font-normal">{item.title}</h4>
                    <p className="text-caption text-accent-light">{item.stylistName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. FAQ Accordion */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="max-w-3xl mx-auto mb-16">
            <h3 className="font-serif text-h2 text-center text-foreground mb-8">
              Sıkça Sorulan Sorular
            </h3>
            <Accordion
              items={service.faqs.map((faq, idx) => ({
                id: `faq-${idx}`,
                title: faq.question,
                content: faq.answer,
              }))}
            />
          </div>
        )}

        {/* 8. Bottom Sticky / Final Booking Banner */}
        <div className="bg-dark text-background p-8 sm:p-12 rounded-2xl border border-dark-border text-center space-y-4">
          <h3 className="font-serif text-h2 text-white font-light">
            {service.name} için yerinizi ayırtın.
          </h3>
          <p className="text-small text-muted-light max-w-md mx-auto">
            Hemen istediğiniz şube ve saati seçerek randevunuzu onaylayın.
          </p>
          <div className="pt-2">
            <Button
              variant="gold"
              size="lg"
              onClick={() => onBookService(service)}
              leftIcon={<Calendar className="w-5 h-5 text-dark-surface" />}
            >
              Hemen Randevu Oluştur
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
