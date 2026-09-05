import React from 'react';
import { Container } from '../ui';
import { Award, ShieldCheck, Star, MapPin, CheckCircle2 } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustMetrics = [
    {
      icon: <Award className="w-5 h-5 text-accent" />,
      value: '14+ Yıl',
      label: 'Editorial & Salon Ustalığı',
      description: 'Paris & Londra L\'Oréal Pro Master',
    },
    {
      icon: <Star className="w-5 h-5 text-accent fill-accent" />,
      value: '4.9 ★',
      label: 'Google Memnuniyet Puanı',
      description: '1.850+ Gerçek Misafir Yorumu',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      value: '%100 Hijyen',
      label: 'Otoklav & Steril Protokol',
      description: 'Tek kullanımlık lüks havlu & setler',
    },
    {
      icon: <MapPin className="w-5 h-5 text-accent" />,
      value: '4 Lokasyon',
      label: 'Nişantaşı, Bebek, Cadde, Çayyolu',
      description: 'VIP Süitler & Vale Hizmeti',
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-accent" />,
      value: 'Şeffaf Fiyat',
      label: 'Sürpriz Ek Ücret Yok',
      description: 'Net süre & ücretsiz danışmanlık',
    },
  ];

  return (
    <section className="bg-card/70 border-b border-border/80 py-8 lg:py-10">
      <Container size="full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {trustMetrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col space-y-1.5 p-2 rounded-lg transition-all hover:bg-background/80"
            >
              <div className="flex items-center space-x-2">
                {metric.icon}
                <span className="font-serif text-2xl font-bold text-foreground tracking-tight">
                  {metric.value}
                </span>
              </div>
              <p className="text-small font-semibold text-foreground/90">
                {metric.label}
              </p>
              <p className="text-caption text-muted">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};


