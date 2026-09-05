import React, { useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Modal, Button } from '../ui';
import { Step01Service } from './Step01Service';
import { Step02Staff } from './Step02Staff';
import { Step03Branch } from './Step03Branch';
import { Step04Date } from './Step04Date';
import { Step05Time } from './Step05Time';
import { Step06Customer } from './Step06Customer';
import { Step07Summary } from './Step07Summary';
import { Step08Success } from './Step08Success';
import { ServiceItem, StaffMember, BranchItem } from '../../types';
import { ArrowLeft, ArrowRight, X, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceItem | null;
  initialStaff?: StaffMember | null;
  initialBranch?: BranchItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialStaff,
  initialBranch,
}) => {
  const {
    currentStep,
    goToNextStep,
    goToPrevStep,
    selectedServices,
    totalEstimatedPrice,
    totalDurationMinutes,
    hasUnfinishedDraft,
    resumeDraft,
    resetBooking,
    setSelectedServiceIds,
    setSelectedStaffId,
    setSelectedBranchId,
  } = useBooking();

  // Apply initial selections if provided
  useEffect(() => {
    if (initialService) {
      setSelectedServiceIds([initialService.id]);
    }
    if (initialStaff) {
      setSelectedStaffId(initialStaff.id);
    }
    if (initialBranch) {
      setSelectedBranchId(initialBranch.id);
    }
  }, [
    initialService,
    initialStaff,
    initialBranch,
    setSelectedServiceIds,
    setSelectedStaffId,
    setSelectedBranchId,
  ]);

  if (!isOpen) return null;

  const stepTitles = [
    '01. Hizmet Seçimi',
    '02. Uzman Tercihi',
    '03. Şube Lokasyonu',
    '04. Tarih Seçimi',
    '05. Saat Dilimi',
    '06. İletişim Bilgileri',
    '07. Randevu Özeti & Onay',
    '08. Randevu Hazır!',
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      className="p-0 overflow-hidden max-h-[92vh] flex flex-col"
    >
      {/* Modal Stepper Header */}
      <div className="bg-dark text-background p-5 sm:p-6 border-b border-dark-border shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-eyebrow uppercase tracking-[0.2em] text-accent font-semibold block">
              Online Rezervasyon Motoru
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white">
              {stepTitles[currentStep - 1]}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-muted-light hover:text-white p-1 rounded-full transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-dark-border h-1.5 rounded-full overflow-hidden flex">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <div
              key={s}
              className={`h-full flex-1 transition-all duration-300 border-r border-dark ${
                s <= currentStep ? 'bg-accent' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Abandonment Draft Recovery Banner (When user left mid-way) */}
      {hasUnfinishedDraft && currentStep === 1 && (
        <div className="bg-accent/15 border-b border-accent/30 p-3 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-caption">
          <div className="flex items-center gap-2 text-foreground">
            <Sparkles className="w-4 h-4 text-accent shrink-0" />
            <span>
              Önceki randevu taslağınız kaydedildi (<strong>{selectedServices.map(s => s.name).join(', ')}</strong>).
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={resumeDraft}
              className="px-3 py-1 bg-dark text-background rounded-md font-bold hover:bg-black text-caption transition-colors"
            >
              Kaldığım Yerden Devam Et
            </button>
            <button
              onClick={resetBooking}
              className="px-2 py-1 text-muted hover:text-foreground text-caption"
            >
              Sıfırla
            </button>
          </div>
        </div>
      )}

      {/* Decision-Easing Reassurance Notice (Steps 1-6) */}
      {currentStep < 7 && (
        <div className="bg-secondary px-5 sm:px-6 py-2.5 border-b border-border text-caption flex items-center justify-between text-muted-dark">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>
              Randevunuz seçtiğiniz hizmetlerle yaklaşık <strong className="text-foreground font-semibold">{totalDurationMinutes} dakika</strong> sürer.
            </span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-emerald-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            24s Öncesine Kadar Ücretsiz İptal / Erteleme
          </span>
        </div>
      )}

      {/* Modal Scrollable Body with Step Transition */}
      <div className="p-6 sm:p-8 overflow-y-auto flex-1">
        <div key={currentStep} className="animate-step-forward">
          {currentStep === 1 && <Step01Service />}
          {currentStep === 2 && <Step02Staff />}
          {currentStep === 3 && <Step03Branch />}
          {currentStep === 4 && <Step04Date />}
          {currentStep === 5 && <Step05Time />}
          {currentStep === 6 && <Step06Customer />}
          {currentStep === 7 && <Step07Summary />}
          {currentStep === 8 && <Step08Success onNavigateHome={onClose} />}
        </div>
      </div>

      {/* Modal Bottom Action Bar (Steps 1-6) */}
      {currentStep < 7 && (
        <div className="bg-card px-6 py-4 border-t border-border/80 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[0.68rem] text-muted block">
              Seçili ({selectedServices.length}):
            </span>
            <span className="font-serif text-base font-bold text-foreground">
              ~{totalDurationMinutes} dk · {totalEstimatedPrice.toLocaleString('tr-TR')} ₺
            </span>
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevStep}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Geri
              </Button>
            )}

            <Button
              variant="gold"
              size="sm"
              onClick={goToNextStep}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {currentStep === 6 ? 'Özeti İncele' : 'Devam Et'}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
