import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Container, Button, Breadcrumb } from '../ui';
import { Step01Service } from './Step01Service';
import { Step02Staff } from './Step02Staff';
import { Step03Branch } from './Step03Branch';
import { Step04Date } from './Step04Date';
import { Step05Time } from './Step05Time';
import { Step06Customer } from './Step06Customer';
import { Step07Summary } from './Step07Summary';
import { Step08Success } from './Step08Success';
import {
  Scissors,
  User,
  MapPin,
  Calendar,
  Clock,
  UserCheck,
  FileCheck,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface BookingPageProps {
  onNavigateHome: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({ onNavigateHome }) => {
  const {
    currentStep,
    setCurrentStep,
    goToNextStep,
    goToPrevStep,
    resetBooking,
    totalEstimatedPrice,
    totalDurationMinutes,
    selectedServices,
    hasUnfinishedDraft,
    resumeDraft,
  } = useBooking();

  const stepList = [
    { num: 1, label: 'Hizmet', icon: <Scissors className="w-4 h-4" /> },
    { num: 2, label: 'Uzman', icon: <User className="w-4 h-4" /> },
    { num: 3, label: 'Şube', icon: <MapPin className="w-4 h-4" /> },
    { num: 4, label: 'Tarih', icon: <Calendar className="w-4 h-4" /> },
    { num: 5, label: 'Saat', icon: <Clock className="w-4 h-4" /> },
    { num: 6, label: 'Bilgiler', icon: <UserCheck className="w-4 h-4" /> },
    { num: 7, label: 'Özet', icon: <FileCheck className="w-4 h-4" /> },
    { num: 8, label: 'Onay', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="py-8 sm:py-12 bg-background min-h-screen">
      <Container size="full">
        {/* Breadcrumb & Reset Action */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
          <Breadcrumb
            items={[
              { label: 'Ana Sayfa', onClick: onNavigateHome },
              { label: 'Online Randevu', isCurrent: true },
            ]}
          />

          {currentStep < 8 && (
            <button
              onClick={resetBooking}
              className="text-caption text-muted hover:text-error flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Seçimleri Sıfırla</span>
            </button>
          )}
        </div>

        {/* Abandonment Draft Recovery Banner (When user left mid-way) */}
        {hasUnfinishedDraft && currentStep === 1 && (
          <div className="max-w-4xl mx-auto mb-8 bg-accent/15 border border-accent/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-small shadow-subtle">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-bold text-foreground block">
                  Kaydedilmiş Randevu Taslağınız Var
                </span>
                <p className="text-caption text-muted-dark">
                  {selectedServices.map((s) => s.name).join(', ')} • {totalDurationMinutes} dk seans
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="dark" size="sm" onClick={resumeDraft}>
                Kaldığım Yerden Devam Et
              </Button>
              <Button variant="outline" size="sm" onClick={resetBooking}>
                Yeni Başlat
              </Button>
            </div>
          </div>
        )}

        {/* Multi-Step Horizontal Progress Stepper */}
        {currentStep < 8 && (
          <div className="mb-8 max-w-4xl mx-auto">
            {/* Steps Pills Bar */}
            <div className="flex items-center justify-between overflow-x-auto pb-4 no-scrollbar gap-2">
              {stepList.slice(0, 7).map((step) => {
                const isCompleted = step.num < currentStep;
                const isCurrent = step.num === currentStep;

                return (
                  <button
                    key={step.num}
                    type="button"
                    disabled={step.num > currentStep}
                    onClick={() => setCurrentStep(step.num as any)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-pill text-caption font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                      isCurrent
                        ? 'bg-foreground text-background shadow-subtle ring-2 ring-accent'
                        : isCompleted
                        ? 'bg-card text-foreground/90 border border-accent/40'
                        : 'bg-card/40 text-muted border border-border/40 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-bold ${
                        isCurrent
                          ? 'bg-accent text-dark-surface'
                          : isCompleted
                          ? 'bg-foreground text-background'
                          : 'bg-border text-muted'
                      }`}
                    >
                      {step.num}
                    </span>
                    <span>{step.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full bg-border/60 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-accent transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep - 1) / 7) * 100}%` }}
              />
            </div>

            {/* Decision-Easing Reassurance Bar */}
            <div className="mt-4 p-3 bg-secondary/80 border border-border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-caption text-muted-dark">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span>
                  Randevunuz seçtiğiniz hizmetlerle yaklaşık <strong className="text-foreground font-semibold">{totalDurationMinutes} dakika</strong> sürer.
                </span>
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                24 Saat Öncesine Kadar Ücretsiz İptal / Erteleme
              </span>
            </div>
          </div>
        )}

        {/* Step Views Content with Smooth Step Transition */}
        <div className="max-w-4xl mx-auto mb-16">
          <div key={currentStep} className="animate-step-forward">
            {currentStep === 1 && <Step01Service />}
            {currentStep === 2 && <Step02Staff />}
            {currentStep === 3 && <Step03Branch />}
            {currentStep === 4 && <Step04Date />}
            {currentStep === 5 && <Step05Time />}
            {currentStep === 6 && <Step06Customer />}
            {currentStep === 7 && <Step07Summary />}
            {currentStep === 8 && <Step08Success onNavigateHome={onNavigateHome} />}
          </div>
        </div>

        {/* Bottom Floating Navigation Bar (Steps 1-6) */}
        {currentStep < 7 && (
          <div className="sticky bottom-4 z-30 max-w-4xl mx-auto bg-surface/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-border/80 shadow-floating flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-[0.68rem] uppercase tracking-wider text-muted block">
                  Seçili: {selectedServices.length} Hizmet
                </span>
                <span className="font-serif text-lg sm:text-xl font-bold text-foreground">
                  ~{totalDurationMinutes} dk · {totalEstimatedPrice.toLocaleString('tr-TR')} ₺
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={goToPrevStep}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Geri
                </Button>
              )}

              <Button
                variant="gold"
                size="md"
                onClick={goToNextStep}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shadow-card"
              >
                {currentStep === 6 ? 'Özeti İncele' : 'Devam Et'}
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

