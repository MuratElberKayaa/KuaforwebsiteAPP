import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, StaffMember, BranchItem, AppointmentBooking } from '../types';
import { servicesData } from '../data/servicesData';
import { teamData } from '../data/teamData';
import { branchesData } from '../data/branchesData';
import { sanitizeText, sanitizePhone, sanitizeEmail } from '../utils/sanitize';
import confetti from 'canvas-confetti';

export type BookingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface BookingContextType {
  currentStep: BookingStep;
  setCurrentStep: (step: BookingStep) => void;
  goToNextStep: () => boolean;
  goToPrevStep: () => void;
  resetBooking: () => void;

  // Selections
  selectedServiceIds: string[];
  toggleService: (serviceId: string) => void;
  setSelectedServiceIds: (ids: string[]) => void;
  selectedStaffId: string;
  setSelectedStaffId: (staffId: string) => void;
  selectedBranchId: string;
  setSelectedBranchId: (branchId: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTimeSlot: string;
  setSelectedTimeSlot: (slot: string) => void;

  // Customer info
  customerFirstName: string;
  setCustomerFirstName: (name: string) => void;
  customerLastName: string;
  setCustomerLastName: (name: string) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  customerEmail: string;
  setCustomerEmail: (email: string) => void;
  customerNote: string;
  setCustomerNote: (note: string) => void;
  kvkkConsent: boolean;
  setKvkkConsent: (consent: boolean) => void;

  // Errors & Validation
  formErrors: { [key: string]: string };
  clearErrors: () => void;

  // Computed totals
  selectedServices: ServiceItem[];
  selectedStaff: StaffMember | null;
  selectedBranch: BranchItem;
  totalEstimatedPrice: number;
  totalDurationMinutes: number;

  // Confirmation
  confirmedBooking: AppointmentBooking | null;
  confirmBooking: () => void;

  // Abandonment Recovery
  hasUnfinishedDraft: boolean;
  dismissDraftRecovery: () => void;
  resumeDraft: () => void;
}

const STORAGE_KEY = 'lelixir_booking_state_v1';

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from LocalStorage if exists
  const getSavedState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  };

  const saved = getSavedState();

  const [currentStep, setCurrentStep] = useState<BookingStep>(saved?.currentStep || 1);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(
    saved?.selectedServiceIds || [servicesData[0].id]
  );
  const [selectedStaffId, setSelectedStaffId] = useState<string>(
    saved?.selectedStaffId || 'any'
  );
  const [selectedBranchId, setSelectedBranchId] = useState<string>(
    saved?.selectedBranchId || branchesData[0].id
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    saved?.selectedDate || '2026-09-08'
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(
    saved?.selectedTimeSlot || '14:30'
  );

  const [customerFirstName, setCustomerFirstName] = useState<string>(
    saved?.customerFirstName || ''
  );
  const [customerLastName, setCustomerLastName] = useState<string>(
    saved?.customerLastName || ''
  );
  const [customerPhone, setCustomerPhone] = useState<string>(
    saved?.customerPhone || ''
  );
  const [customerEmail, setCustomerEmail] = useState<string>(
    saved?.customerEmail || ''
  );
  const [customerNote, setCustomerNote] = useState<string>(
    saved?.customerNote || ''
  );
  const [kvkkConsent, setKvkkConsent] = useState<boolean>(
    saved?.kvkkConsent || false
  );

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBooking | null>(
    saved?.confirmedBooking || null
  );

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      const stateToSave = {
        currentStep,
        selectedServiceIds,
        selectedStaffId,
        selectedBranchId,
        selectedDate,
        selectedTimeSlot,
        customerFirstName,
        customerLastName,
        customerPhone,
        customerEmail,
        customerNote,
        kvkkConsent,
        confirmedBooking,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // ignore
    }
  }, [
    currentStep,
    selectedServiceIds,
    selectedStaffId,
    selectedBranchId,
    selectedDate,
    selectedTimeSlot,
    customerFirstName,
    customerLastName,
    customerPhone,
    customerEmail,
    customerNote,
    kvkkConsent,
    confirmedBooking,
  ]);

  // Computed values
  const selectedServices = servicesData.filter((s) => selectedServiceIds.includes(s.id));
  const selectedStaff =
    selectedStaffId === 'any' ? null : teamData.find((t) => t.id === selectedStaffId) || null;
  const selectedBranch =
    branchesData.find((b) => b.id === selectedBranchId) || branchesData[0];
  const totalEstimatedPrice = selectedServices.reduce(
    (acc, curr) => acc + curr.priceStartingFrom,
    0
  );
  const totalDurationMinutes = selectedServices.reduce(
    (acc, curr) => acc + curr.durationMinutes,
    0
  );

  const toggleService = (serviceId: string) => {
    if (selectedServiceIds.includes(serviceId)) {
      if (selectedServiceIds.length > 1) {
        setSelectedServiceIds((prev) => prev.filter((id) => id !== serviceId));
      }
    } else {
      setSelectedServiceIds((prev) => [...prev, serviceId]);
    }
  };

  const clearErrors = () => setFormErrors({});

  const validateStep = (step: BookingStep): boolean => {
    const errors: { [key: string]: string } = {};

    if (step === 1 && selectedServiceIds.length === 0) {
      errors.service = 'Lütfen en az bir hizmet seçiniz.';
    }

    if (step === 4 && !selectedDate) {
      errors.date = 'Lütfen randevu tarihi seçiniz.';
    }

    if (step === 5 && !selectedTimeSlot) {
      errors.timeSlot = 'Lütfen randevu saati seçiniz.';
    }

    if (step === 6) {
      if (!customerFirstName.trim()) errors.firstName = 'Lütfen adınızı giriniz.';
      if (!customerLastName.trim()) errors.lastName = 'Lütfen soyadınızı giriniz.';
      if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
        errors.phone = 'Geçerli bir telefon numarası giriniz (Örn: 0532 000 0000).';
      }
      if (!kvkkConsent) {
        errors.kvkk = 'Devam etmek için KVKK aydınlatma metnini onaylamanız gerekmektedir.';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goToNextStep = (): boolean => {
    if (!validateStep(currentStep)) {
      return false;
    }

    if (currentStep === 7) {
      confirmBooking();
      return true;
    }

    setCurrentStep((prev) => (Math.min(8, prev + 1) as BookingStep));
    window.scrollTo({ top: 100, behavior: 'smooth' });
    return true;
  };

  const goToPrevStep = () => {
    clearErrors();
    setCurrentStep((prev) => (Math.max(1, prev - 1) as BookingStep));
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const confirmBooking = () => {
    const bookingCode = `LX-${Math.floor(10000 + Math.random() * 90000)}`;
    const cleanFirstName = sanitizeText(customerFirstName);
    const cleanLastName = sanitizeText(customerLastName);
    const cleanPhone = sanitizePhone(customerPhone);
    const cleanEmail = sanitizeEmail(customerEmail);
    const cleanNote = sanitizeText(customerNote);

    const newBooking: AppointmentBooking = {
      bookingCode,
      serviceIds: selectedServiceIds,
      branchId: selectedBranchId,
      staffId: selectedStaffId,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      customer: {
        fullName: `${cleanFirstName} ${cleanLastName}`.trim(),
        phone: cleanPhone,
        email: cleanEmail,
        hairHistoryNote: cleanNote,
      },
      totalEstimatedPrice,
      totalDurationMinutes,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(newBooking);
    setCurrentStep(8);


    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#1C1917', '#DFCAAC', '#A07F50'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const [hasUnfinishedDraft, setHasUnfinishedDraft] = useState<boolean>(
    Boolean(saved && saved.currentStep > 1 && !saved.confirmedBooking)
  );

  const dismissDraftRecovery = () => {
    setHasUnfinishedDraft(false);
  };

  const resumeDraft = () => {
    if (saved && saved.currentStep) {
      setCurrentStep(saved.currentStep);
    }
    setHasUnfinishedDraft(false);
  };

  const resetBooking = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHasUnfinishedDraft(false);
    setCurrentStep(1);
    setSelectedServiceIds([servicesData[0].id]);
    setSelectedStaffId('any');
    setSelectedBranchId(branchesData[0].id);
    setSelectedDate('2026-09-08');
    setSelectedTimeSlot('14:30');
    setCustomerFirstName('');
    setCustomerLastName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setCustomerNote('');
    setKvkkConsent(false);
    setConfirmedBooking(null);
    setFormErrors({});
  };

  return (
    <BookingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        goToNextStep,
        goToPrevStep,
        resetBooking,
        selectedServiceIds,
        toggleService,
        setSelectedServiceIds,
        selectedStaffId,
        setSelectedStaffId,
        selectedBranchId,
        setSelectedBranchId,
        selectedDate,
        setSelectedDate,
        selectedTimeSlot,
        setSelectedTimeSlot,
        customerFirstName,
        setCustomerFirstName,
        customerLastName,
        setCustomerLastName,
        customerPhone,
        setCustomerPhone,
        customerEmail,
        setCustomerEmail,
        customerNote,
        setCustomerNote,
        kvkkConsent,
        setKvkkConsent,
        formErrors,
        clearErrors,
        selectedServices,
        selectedStaff,
        selectedBranch,
        totalEstimatedPrice,
        totalDurationMinutes,
        confirmedBooking,
        confirmBooking,
        hasUnfinishedDraft,
        dismissDraftRecovery,
        resumeDraft,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

