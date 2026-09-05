import React from 'react';
import { Container, Button } from '../ui';
import { Sparkles, HeartHandshake, Eye, Award } from 'lucide-react';

interface PhilosophySectionProps {
  onBookClick: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ onBookClick }) => {
  const pillars = [
    {
      icon: <Eye className="w-5 h-5 text-accent" />,
      title: 'Kişiye Özel Renk Mimarisi',
      description: 'Ten alt tonunuz, göz renginiz ve saçınızın doğal düşüşü analiz edilerek tamamen size özgü formüller oluşturulur.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-accent" />,
      title: 'Sıfır Hasar Felsefesi',
      description: 'Açma ve renklendirme işlemlerinde saç bağlarını onaran K18 ve Olaplex Pro teknolojileri standart olarak uygulanır.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-accent" />,
      title: 'Huzurlu Salon Ambiyansı',
      description: 'Gürültüden uzak, özel kahve & şampanya ikramlarının olduğu, dinlendirici ve ayrıcalıklı bir atmosfer.',
    },
    {
      icon: <Award className="w-5 h-5 text-accent" />,
      title: 'Uluslararası Akademi Eğitimi',
      description: 'Tüm artistik ekibimiz her sezon Londra ve Paris moda haftalarındaki saç trendleri ve teknikleriyle güncellenir.',
    },
  ];

  return (
    <section id="philosophy" className="py-20 lg:py-32 bg-dark text-background relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <Container size="full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Big Editorial Statement (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <span className="text-eyebrow uppercase tracking-[0.3em] text-accent font-semibold block">
              Marka Manifestosu & Felsefe
            </span>

            <h2 className="font-serif text-h1 text-background font-light leading-tight">
              "Biz sadece saç yapmıyoruz.{' '}
              <span className="italic font-normal text-accent font-serif block mt-2">
                Kendinizi iyi hissetmenizi sağlıyoruz."
              </span>
            </h2>

            <p className="text-body-lg text-muted-light leading-relaxed font-light">
              L'ÉLIXIR Atelier olarak saçın bir aksesuar değil, kadının ve erkeğin en güçlü imzası olduğuna inanıyoruz. Kapımızdan içeri girdiğiniz andan itibaren aceleye getirilmemiş, dinlenmiş ve baştan sona size adanmış bir güzellik ritüeli deneyimlersiniz.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-dark-border">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2 text-accent font-semibold text-small">
                    {pillar.icon}
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-caption text-muted-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button
                variant="gold"
                size="md"
                onClick={onBookClick}
              >
                Bu Deneyimi Keşfet & Randevu Al
              </Button>
            </div>
          </div>

          {/* Right Column: Editorial Atmosphere Images (6 cols) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-12 gap-4 relative">
              <div className="col-span-7 aspect-[4/5] rounded-xl overflow-hidden shadow-floating border border-dark-border">
                <img
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=85"
                  alt="L'ÉLIXIR Salon Ambiyansı"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="col-span-5 flex flex-col gap-4 mt-8">
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-floating border border-dark-border">
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=85"
                    alt="Saç Styling Detayı"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 rounded-xl bg-dark-card border border-dark-border text-center">
                  <span className="font-serif text-2xl font-bold text-accent block">
                    %100
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-wider text-muted-light">
                    Kişiye Özel Konsültasyon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

