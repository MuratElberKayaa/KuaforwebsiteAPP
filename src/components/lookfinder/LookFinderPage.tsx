import React, { useState } from 'react';
import { Container, Button, SmoothImage, Breadcrumb } from '../ui';
import { LookVibe, HairLength, LookAction, PortfolioItem, ServiceItem, StaffMember } from '../../types';
import { recommendLooks } from '../../services/lookFinderService';
import { servicesData } from '../../data/servicesData';
import { teamData } from '../../data/teamData';
import {
  Sparkles,
  ChevronLeft,
  Scissors,
  Palette,
  Sparkle,
  Waves,
  HeartHandshake,
  HelpCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

interface LookFinderPageProps {
  onSelectLook: (service: ServiceItem, staff?: StaffMember | null, lookItem?: PortfolioItem) => void;
  onNavigateHome: () => void;
}

export const LookFinderPage: React.FC<LookFinderPageProps> = ({
  onSelectLook,
  onNavigateHome,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedVibe, setSelectedVibe] = useState<LookVibe | null>(null);
  const [selectedLength, setSelectedLength] = useState<HairLength | null>(null);
  const [, setSelectedAction] = useState<LookAction | null>(null);
  const [recommendedResults, setRecommendedResults] = useState<PortfolioItem[]>([]);


  // Step 1: Vibe options
  const vibeOptions: { id: LookVibe; title: string; subtitle: string; icon: string }[] = [
    {
      id: 'natural',
      title: 'Doğal & Çabasız (Natural)',
      subtitle: 'Kendi dokunuzu öne çıkaran, yumuşak ve zahmetsiz şıklık',
      icon: '🌿',
    },
    {
      id: 'elegant',
      title: 'Zarif & Zamansız (Elegant)',
      subtitle: 'Kusursuz parıltı, asil formlar ve haute coiffure duruşu',
      icon: '✨',
    },
    {
      id: 'bold',
      title: 'İddialı & Cesur (Bold)',
      subtitle: 'Net çizgiler, kontrast tonlar ve bakışları üzerine çeken stil',
      icon: '⚡',
    },
    {
      id: 'minimal',
      title: 'Minimalist & Modern (Minimal)',
      subtitle: 'Sade, ayna parlaklığında ve net bitişli rafine estetik',
      icon: '🏛️',
    },
    {
      id: 'romantic',
      title: 'Romantik & Dalgalı (Romantic)',
      subtitle: 'Yumuşak dokunuşlar, hacimli katlar ve sıcak yansımalar',
      icon: '🌸',
    },
    {
      id: 'trendy',
      title: 'Trend & Editoryal (Trendy)',
      subtitle: 'Sezonun en çok konuşulan podyum ve sokak modası görünümleri',
      icon: '🔥',
    },
  ];

  // Step 2: Hair length options
  const lengthOptions: { id: HairLength; title: string; subtitle: string; visual: string }[] = [
    {
      id: 'short',
      title: 'Kısa Saç',
      subtitle: 'Çene hizası, Bob veya Pixie boyu',
      visual: '✂️ Çene ve Kulak Hizası',
    },
    {
      id: 'medium',
      title: 'Orta Boy Saç',
      subtitle: 'Omuz hizası ve köprücük kemiği',
      visual: '💇‍♀️ Omuz & Göğüs Üstü',
    },
    {
      id: 'long',
      title: 'Uzun Saç',
      subtitle: 'Göğüs hizası ve daha uzun',
      visual: '✨ Sırt & Bel Boyu',
    },
  ];

  // Step 3: Action options
  const actionOptions: { id: LookAction; title: string; subtitle: string; icon: React.ReactNode }[] = [
    {
      id: 'balayage',
      title: 'Işıltı & Balayage',
      subtitle: 'Doğal açma, sombre veya kontür ışıltıları',
      icon: <Sparkle className="w-5 h-5 text-accent" />,
    },
    {
      id: 'color',
      title: 'Tüm Renk & Tonlama',
      subtitle: 'Dip boyası, global renk veya zengin gloss parlatma',
      icon: <Palette className="w-5 h-5 text-accent" />,
    },
    {
      id: 'cut',
      title: 'Kesim & Şekillendirme',
      subtitle: 'İmza katlı kesim, bob veya uç temizliği',
      icon: <Scissors className="w-5 h-5 text-accent" />,
    },
    {
      id: 'styling',
      title: 'Özel Davet / Fön & Şekillendirme',
      subtitle: 'Hollywood dalgası, gelin tasarımı veya davet topuzu',
      icon: <Waves className="w-5 h-5 text-accent" />,
    },
    {
      id: 'treatment',
      title: 'Bakım & Onarım Ritüeli',
      subtitle: 'Tokyo botox, K18 moleküler onarım ve nem bakımı',
      icon: <HeartHandshake className="w-5 h-5 text-accent" />,
    },
    {
      id: 'not-sure',
      title: 'Kararsızım / Uzmanım Önersin',
      subtitle: 'Salonda uzman stilistim saç analizime göre yönlendirsin',
      icon: <HelpCircle className="w-5 h-5 text-accent" />,
    },
  ];

  const handleSelectVibe = (vibe: LookVibe) => {
    setSelectedVibe(vibe);
    setCurrentStep(2);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleSelectLength = (length: HairLength) => {
    setSelectedLength(length);
    setCurrentStep(3);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleSelectAction = (action: LookAction) => {
    setSelectedAction(action);
    if (selectedVibe && selectedLength) {
      const results = recommendLooks({
        vibe: selectedVibe,
        length: selectedLength,
        action,
      });
      setRecommendedResults(results);
      setCurrentStep(4);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    setSelectedVibe(null);
    setSelectedLength(null);
    setSelectedAction(null);
    setCurrentStep(1);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleSelectResultLook = (look: PortfolioItem) => {
    const matchedService =
      servicesData.find((s) => s.name === look.serviceName) || servicesData[0];
    const matchedStaff =
      teamData.find((t) => t.name === look.stylistName) || null;

    onSelectLook(matchedService, matchedStaff, look);
  };

  return (
    <div className="py-8 sm:py-12 bg-background min-h-screen">
      <Container size="lg">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Ana Sayfa', onClick: onNavigateHome },
              { label: 'Look Finder & Stil Keşfi', isCurrent: true },
            ]}
          />
        </div>

        {/* Hero Section Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent-dark text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            İnteraktif Saç Sanatı & Stil Danışmanı
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-foreground">
            Size Özel İdeal Görünümü Keşfedin
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Hangi teknik isme ihtiyacınız olduğunu bilmenize gerek yok. Birkaç hızlı tercihinizi belirleyin, size en çok yakışacak couture saç modellerini ve uzman stilistleri sunalım.
          </p>
        </div>

        {/* Progress & Controls Bar */}
        <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 mb-8 shadow-subtle flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-accent text-background font-bold flex items-center justify-center text-sm font-mono">
              0{currentStep}
            </span>
            <div>
              <span className="text-caption text-muted uppercase tracking-wider block">
                {currentStep === 4 ? 'Tamamlandı' : `Adım 0${currentStep} / 03`}
              </span>
              <span className="font-serif text-base font-bold text-foreground">
                {currentStep === 1 && 'Stil Aurası & Ruh Hali'}
                {currentStep === 2 && 'Saç Uzunluğu & Form'}
                {currentStep === 3 && 'İşlem Hedefi'}
                {currentStep === 4 && 'Kişiselleştirilmiş Öneriler'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 1 && currentStep < 4 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3)}
                leftIcon={<ChevronLeft className="w-4 h-4" />}
              >
                Önceki Adım
              </Button>
            )}

            {currentStep === 4 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRestart}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Yeniden Başlat
              </Button>
            )}
          </div>
        </div>

        {/* STEP 01 */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center text-foreground">
              Nasıl bir görünüm arzu ediyorsunuz?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vibeOptions.map((vibe) => (
                <button
                  key={vibe.id}
                  type="button"
                  onClick={() => handleSelectVibe(vibe.id)}
                  className="group text-left p-6 rounded-2xl border border-border/80 bg-card hover:border-accent hover:shadow-card hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between w-full mb-4">
                    <span className="text-3xl">{vibe.icon}</span>
                    <span className="w-7 h-7 rounded-full border border-border/60 group-hover:border-accent group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors" />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-accent-dark transition-colors">
                      {vibe.title}
                    </h3>
                    <p className="text-caption text-muted mt-1.5 leading-relaxed">
                      {vibe.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 02 */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center text-foreground">
              Mevcut saç uzunluğunuz nedir?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {lengthOptions.map((len) => (
                <button
                  key={len.id}
                  type="button"
                  onClick={() => handleSelectLength(len.id)}
                  className="group text-center p-8 rounded-2xl border border-border/80 bg-card hover:border-accent hover:shadow-card hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center space-y-3"
                >
                  <div className="px-3 py-1 rounded-full bg-surface border border-border text-caption font-semibold text-accent">
                    {len.visual}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-accent-dark transition-colors">
                    {len.title}
                  </h3>
                  <p className="text-caption text-muted">
                    {len.subtitle}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 03 */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center text-foreground">
              Saçınızda ne yapmak istiyorsunuz?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {actionOptions.map((act) => (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => handleSelectAction(act.id)}
                  className="group text-left p-5 rounded-xl border border-border/80 bg-card hover:border-accent hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0 group-hover:border-accent/40 transition-colors">
                    {act.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-accent-dark transition-colors truncate">
                      {act.title}
                    </h3>
                    <p className="text-caption text-muted line-clamp-1 mt-0.5">
                      {act.subtitle}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 04 */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent-dark text-caption font-semibold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                Kişiselleştirilmiş Stil Eşleşmeleri
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-bold">
                Sizin İçin Seçilen İdeal Görünümler
              </h2>
              <p className="text-small text-muted mt-1.5">
                Stil ve saç yapınıza tam uyum sağlayan L'ÉLIXIR tasarımları.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {recommendedResults.map((look) => (
                <div
                  key={look.id}
                  className="bg-card rounded-2xl border border-border/80 overflow-hidden shadow-card flex flex-col group hover:border-accent transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-dark">
                    <SmoothImage
                      src={look.image}
                      alt={look.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-accent border border-white/10">
                      {look.categoryLabel}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-accent-dark transition-colors">
                        {look.title}
                      </h3>
                      <p className="text-small text-muted leading-relaxed">
                        {look.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-2 text-caption">
                      <div className="flex items-center gap-2">
                        <span className="text-muted font-medium">Uzman Stilist:</span>
                        <span className="text-foreground font-semibold">
                          {look.stylistName}
                        </span>
                      </div>
                      {look.estimatedDuration && (
                        <div className="flex items-center gap-1 text-muted">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          <span>{look.estimatedDuration}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-caption text-muted uppercase tracking-wider block">
                          Başlangıç Fiyatı
                        </span>
                        <span className="font-serif text-xl font-bold text-foreground">
                          ₺{look.startingPrice?.toLocaleString('tr-TR')}
                        </span>
                      </div>

                      <Button
                        variant="gold"
                        size="md"
                        onClick={() => handleSelectResultLook(look)}
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                        className="font-semibold shadow-subtle hover:shadow-card"
                      >
                        Bu Görünümü İstiyorum
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
