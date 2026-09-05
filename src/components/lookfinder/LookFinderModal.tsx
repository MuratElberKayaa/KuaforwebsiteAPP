import React, { useState } from 'react';
import { Modal, Button, SmoothImage } from '../ui';
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

interface LookFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLook: (service: ServiceItem, staff?: StaffMember | null, lookItem?: PortfolioItem) => void;
}

export const LookFinderModal: React.FC<LookFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectLook,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedVibe, setSelectedVibe] = useState<LookVibe | null>(null);
  const [selectedLength, setSelectedLength] = useState<HairLength | null>(null);
  const [, setSelectedAction] = useState<LookAction | null>(null);
  const [recommendedResults, setRecommendedResults] = useState<PortfolioItem[]>([]);


  // Step 1: Vibe options
  const vibeOptions: { id: LookVibe; title: string; subtitle: string; icon: string; bgGradient: string }[] = [
    {
      id: 'natural',
      title: 'Doğal & Çabasız (Natural)',
      subtitle: 'Kendi dokunuzu öne çıkaran, yumuşak ve zahmetsiz şıklık',
      icon: '🌿',
      bgGradient: 'from-amber-950/20 to-stone-900/40',
    },
    {
      id: 'elegant',
      title: 'Zarif & Zamansız (Elegant)',
      subtitle: 'Kusursuz parıltı, asil formlar ve haute coiffure duruşu',
      icon: '✨',
      bgGradient: 'from-yellow-950/20 to-stone-900/40',
    },
    {
      id: 'bold',
      title: 'İddialı & Cesur (Bold)',
      subtitle: 'Net çizgiler, kontrast tonlar ve bakışları üzerine çeken stil',
      icon: '⚡',
      bgGradient: 'from-stone-800/40 to-stone-950/60',
    },
    {
      id: 'minimal',
      title: 'Minimalist & Modern (Minimal)',
      subtitle: 'Sade, ayna parlaklığında ve net bitişli rafine estetik',
      icon: '🏛️',
      bgGradient: 'from-stone-900/30 to-stone-950/50',
    },
    {
      id: 'romantic',
      title: 'Romantik & Dalgalı (Romantic)',
      subtitle: 'Yumuşak dokunuşlar, hacimli katlar ve sıcak yansımalar',
      icon: '🌸',
      bgGradient: 'from-rose-950/20 to-stone-900/40',
    },
    {
      id: 'trendy',
      title: 'Trend & Editoryal (Trendy)',
      subtitle: 'Sezonun en çok konuşulan podyum ve sokak modası görünümleri',
      icon: '🔥',
      bgGradient: 'from-amber-900/20 to-stone-900/40',
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

  // Step 3: Desired action options
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
  };

  const handleSelectLength = (length: HairLength) => {
    setSelectedLength(length);
    setCurrentStep(3);
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
    }
  };

  const handleRestart = () => {
    setSelectedVibe(null);
    setSelectedLength(null);
    setSelectedAction(null);
    setCurrentStep(1);
  };

  const handleSelectResultLook = (look: PortfolioItem) => {
    const matchedService =
      servicesData.find((s) => s.name === look.serviceName) || servicesData[0];
    const matchedStaff =
      teamData.find((t) => t.name === look.stylistName) || null;

    onClose();
    onSelectLook(matchedService, matchedStaff, look);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      className="p-0 overflow-hidden"
      showCloseButton={true}
    >
      {/* Header bar */}
      <div className="bg-card px-6 py-4 border-b border-border/70 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-foreground tracking-wide flex items-center gap-2">
              L'ÉLIXIR Look Finder
              <span className="text-[0.65rem] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent-dark">
                Stil Keşfi
              </span>
            </h2>
            <p className="text-caption text-muted">
              3 adımda sizin için en uygun haute coiffure tasarımlarını keşfedin
            </p>
          </div>
        </div>

        {currentStep > 1 && currentStep < 4 && (
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3)}
            className="text-xs text-muted hover:text-foreground flex items-center gap-1 font-medium transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Geri
          </button>
        )}

        {currentStep === 4 && (
          <button
            type="button"
            onClick={handleRestart}
            className="text-xs text-accent hover:text-accent-dark flex items-center gap-1 font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Yeniden Başlat
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-border/40 h-1">
        <div
          className="bg-accent h-1 transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>

      {/* Body Area */}
      <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
        {/* STEP 01: VIBE */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-lg mx-auto">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-accent font-sans">
                Adım 01 / 03
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-bold mt-1">
                Nasıl bir görünüm arzu ediyorsunuz?
              </h3>
              <p className="text-small text-muted mt-1.5">
                Ruh halinize ve yaşam tarzınıza en yakın stil aurasını seçin.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
              {vibeOptions.map((vibe) => (
                <button
                  key={vibe.id}
                  type="button"
                  onClick={() => handleSelectVibe(vibe.id)}
                  className="group text-left p-5 rounded-xl border border-border/80 bg-card hover:border-accent hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="flex items-start justify-between w-full mb-3">
                    <span className="text-2xl">{vibe.icon}</span>
                    <span className="w-6 h-6 rounded-full border border-border/60 group-hover:border-accent group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3 h-3 text-muted group-hover:text-accent transition-colors" />
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-foreground group-hover:text-accent-dark transition-colors">
                      {vibe.title}
                    </h4>
                    <p className="text-caption text-muted mt-1 leading-relaxed">
                      {vibe.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 02: LENGTH */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-lg mx-auto">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-accent font-sans">
                Adım 02 / 03
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-bold mt-1">
                Mevcut saç uzunluğunuz nedir?
              </h3>
              <p className="text-small text-muted mt-1.5">
                Saç yapınıza en uygun düşüşü ve hacmi planlamak için saç boyunuzu belirleyin.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-3xl mx-auto">
              {lengthOptions.map((len) => (
                <button
                  key={len.id}
                  type="button"
                  onClick={() => handleSelectLength(len.id)}
                  className="group text-center p-6 sm:p-8 rounded-2xl border border-border/80 bg-card hover:border-accent hover:shadow-card hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center space-y-3"
                >
                  <div className="px-3 py-1 rounded-full bg-surface border border-border text-caption font-semibold text-accent">
                    {len.visual}
                  </div>
                  <h4 className="font-serif text-xl font-bold text-foreground group-hover:text-accent-dark transition-colors">
                    {len.title}
                  </h4>
                  <p className="text-caption text-muted">
                    {len.subtitle}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 03: ACTION */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-lg mx-auto">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-accent font-sans">
                Adım 03 / 03
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-bold mt-1">
                Saçınızda ne yapmak istiyorsunuz?
              </h3>
              <p className="text-small text-muted mt-1.5">
                Hedeflediğiniz işlem türünü seçin veya uzman yönlendirmesini tercih edin.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 max-w-3xl mx-auto">
              {actionOptions.map((act) => (
                <button
                  key={act.id}
                  type="button"
                  onClick={() => handleSelectAction(act.id)}
                  className="group text-left p-4 sm:p-5 rounded-xl border border-border/80 bg-card hover:border-accent hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0 group-hover:border-accent/40 transition-colors">
                    {act.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-foreground group-hover:text-accent-dark transition-colors truncate">
                      {act.title}
                    </h4>
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

        {/* STEP 04: RESULTS */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent-dark text-caption font-semibold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                Kişiselleştirilmiş Stil Önerileri
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-foreground font-bold">
                Sizin İçin Küratörlü Seçimler
              </h3>
              <p className="text-small text-muted mt-1">
                Seçtiğiniz kriterlere en uygun L'ÉLIXIR imza tasarımları ve uzman stilistler.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {recommendedResults.map((look) => (
                <div
                  key={look.id}
                  className="bg-card rounded-2xl border border-border/80 overflow-hidden shadow-card flex flex-col group hover:border-accent transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-dark">
                    <SmoothImage
                      src={look.image}
                      alt={look.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-dark/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[0.7rem] font-semibold text-accent border border-white/10">
                      {look.categoryLabel}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-serif text-xl font-bold text-foreground group-hover:text-accent-dark transition-colors">
                        {look.title}
                      </h4>
                      <p className="text-caption text-muted line-clamp-2 leading-relaxed">
                        {look.description}
                      </p>
                    </div>

                    {/* Meta info tags */}
                    <div className="pt-2 border-t border-border/60 flex flex-wrap items-center justify-between gap-2 text-caption">
                      <div className="flex items-center gap-2">
                        <span className="text-muted font-medium">Uzman:</span>
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

                    {/* Price and CTA */}
                    <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[0.65rem] text-muted uppercase tracking-wider block">
                          Başlangıç Fiyatı
                        </span>
                        <span className="font-serif text-lg font-bold text-foreground">
                          ₺{look.startingPrice?.toLocaleString('tr-TR')}
                        </span>
                      </div>

                      <Button
                        variant="gold"
                        size="sm"
                        onClick={() => handleSelectResultLook(look)}
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
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
      </div>
    </Modal>
  );
};
