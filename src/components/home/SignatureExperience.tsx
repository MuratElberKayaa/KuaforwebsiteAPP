import React from 'react';
import { Container, Button, Badge } from '../ui';
import { Sparkles, Check } from 'lucide-react';

interface SignatureExperienceProps {
  onBookClick: () => void;
}

export const SignatureExperience: React.FC<SignatureExperienceProps> = ({ onBookClick }) => {
  const steps = [
    { number: '01', title: 'Dijital & Yüz Yüze Konsültasyon', desc: 'Ten rengi, saç geçmişi ve yaşam tarzı analizi.' },
    { number: '02', title: 'Bağ Koruyucu K18 / Olaplex Pro', desc: 'Açma sürecinde saç telinin elastikiyetini koruyan bariyer.' },
    { number: '03', title: 'Serbest El Mikro Balayage', desc: 'Çizgisiz, yumuşak ve güneşte açılmış doğal ışık dağılımı.' },
    { number: '04', title: 'Glossing & Termal Parlaklık Mühürü', desc: '3 aya kadar solmayan ve yansıma veren özel cila.' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-dark-surface text-background relative overflow-hidden border-b border-dark-border">
      <Container size="full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Big Immersive Visual Frame (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-floating border border-dark-border relative">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=90"
                alt="Signature Balayage Experience"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-6 bg-dark/80 backdrop-blur-md rounded-xl border border-dark-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-eyebrow uppercase tracking-widest text-accent font-semibold">
                    Master Colorist Ritüeli
                  </span>
                  <span className="text-small font-serif font-bold text-accent">
                    4.200 ₺'den itibaren
                  </span>
                </div>
                <h4 className="font-serif text-xl text-white">
                  Kişiye Özel Balayage & Sarışınlık Deneyimi
                </h4>
              </div>
            </div>
          </div>

          {/* Right: Step-by-Step Experience Guide & CTA (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <Badge variant="accent" dot size="sm">
                İmza Ritüelimiz
              </Badge>
              <h2 className="font-serif text-h1 text-background mt-3 leading-tight">
                Sarışınlık bir renk değil,{' '}
                <span className="italic font-normal text-accent font-serif block">
                  bir mimari sanattır.
                </span>
              </h2>
              <p className="text-body-lg text-muted-light mt-4 leading-relaxed font-light">
                Her ton geçişi, saçın hareket ettiği yöne ve gün ışığındaki yansımasına göre milimetrik hesaplanır. Amacımız saçınızı sadece sarartmak değil, en sağlıklı ve lüks haline kavuşturmaktır.
              </p>
            </div>

            {/* 4 Process Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="p-4 rounded-xl bg-dark-card border border-dark-border space-y-1.5"
                >
                  <span className="font-mono text-accent text-caption font-bold">
                    {step.number}
                  </span>
                  <h4 className="font-serif text-base font-semibold text-white">
                    {step.title}
                  </h4>
                  <p className="text-caption text-muted-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Inclusions list */}
            <div className="flex flex-wrap gap-4 pt-2 text-caption text-muted-light">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-accent" /> Ücretsiz Renk Konsültasyonu
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-accent" /> VIP Suit Tercihi
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-accent" /> Dyson Supersonic Şekillendirme
              </span>
            </div>

            <div className="pt-2">
              <Button
                variant="gold"
                size="lg"
                onClick={onBookClick}
                leftIcon={<Sparkles className="w-5 h-5 text-dark-surface" />}
                className="w-full sm:w-auto"
              >
                Bu Ritüel İçin Randevu Al
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

