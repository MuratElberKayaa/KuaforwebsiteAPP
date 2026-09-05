export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  categoryId: 'hair' | 'color' | 'care' | 'bridal' | 'men';
  categoryName: string;
  name: string;
  subtitle: string;
  description: string;
  durationMinutes: number;
  priceStartingFrom: number;
  currency: string;
  image: string;
  isSignature: boolean;
  whoIsItFor?: string[];
  processSteps?: ServiceProcessStep[];
  expectedResult?: string;
  longevity?: string;
  eligibleStaffIds?: string[];
  features?: string[];
  faqs?: ServiceFAQ[];
  firstTimeGuide?: string;
  hairConditionChecklist?: string[];
}

export interface StaffSchedule {
  branchId: string;
  branchName: string;
  days: string;
  hours: string;
}

export interface StaffMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  category: 'color' | 'cut' | 'styling' | 'bridal' | 'men' | 'care';
  experienceYears: number;
  avatar: string;
  coverImage?: string;
  bio: string;
  quote?: string;
  education?: string[];
  specialties: string[];
  branchIds: string[];
  serviceIds?: string[];
  schedules?: StaffSchedule[];
  rating: number;
  reviewCount: number;
  instagram?: string;
  nextAvailableDate?: string;
}

export interface BranchItem {
  id: string;
  slug: string;
  name: string;
  city: string;
  district: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: string;
  image: string;
  googleMapsUrl: string;
  features: string[];
}

export type LookVibe = 'natural' | 'elegant' | 'bold' | 'minimal' | 'romantic' | 'trendy';
export type HairLength = 'short' | 'medium' | 'long';
export type LookAction = 'cut' | 'color' | 'balayage' | 'styling' | 'treatment' | 'not-sure';

export interface LookFinderPreferences {
  vibe: LookVibe;
  length: HairLength;
  action: LookAction;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'kesim' | 'renk' | 'balayage' | 'ombre' | 'sombre' | 'gelin' | 'styling' | 'bakim' | 'erkek';
  categoryLabel: string;
  image: string;
  stylistName: string;
  stylistId?: string;
  serviceName: string;
  serviceId?: string;
  description: string;
  vibes?: LookVibe[];
  hairLengths?: HairLength[];
  actions?: LookAction[];
  estimatedDuration?: string;
  startingPrice?: number;
}


export interface BeforeAfterItem {
  id: string;
  title: string;
  subtitle: string;
  serviceName: string;
  serviceId?: string;
  stylistName: string;
  stylistId?: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  avatar?: string;
  rating: number;
  date: string;
  serviceName: string;
  branchName: string;
  comment: string;
  isVerified: boolean;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  caption: string;
  url: string;
}

export interface AppointmentBooking {
  id?: string;
  bookingCode?: string;
  serviceIds: string[];
  branchId: string;
  staffId: string;
  date: string;
  timeSlot: string;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    hairHistoryNote?: string;
  };
  totalEstimatedPrice: number;
  totalDurationMinutes: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: string;
}

// ----------------------------------------------------
// ADMIN & SALON MANAGEMENT TYPES (PHASE 9)
// ----------------------------------------------------

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export interface AdminAppointment {
  id: string;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceIds: string[];
  staffId: string;
  branchId: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm
  durationMinutes: number;
  price: number;
  status: AppointmentStatus;
  customerNote?: string;
  internalStaffNote?: string;
  createdAt: string;
}

export interface CustomerFormulaNote {
  id: string;
  date: string;
  serviceName: string;
  stylistName: string;
  formula: string; // e.g. "Majirel 7.1 (30g) + 20vol (45ml), bekletme: 35dk"
  notes?: string;
}

export interface CustomerProfile {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  avatar?: string;
  firstVisitDate: string;
  lastVisitDate: string;
  totalVisits: number;
  totalSpent: number;
  favoriteStylistId?: string;
  favoriteServiceIds?: string[];
  formulaNotes: CustomerFormulaNote[];
  generalNotes?: string;
  tags?: string[]; // e.g. "VIP", "Hassas Saç Derisi", "Düzenli Boya"
}

export interface BranchWorkingHour {
  dayIndex: number; // 0: Pazar, 1: Pazartesi, ..., 6: Cumartesi
  dayName: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface StaffShift {
  id: string;
  staffId: string;
  branchId: string;
  dayIndex: number;
  isWorking: boolean;
  startTime: string;
  endTime: string;
}

export interface HolidayLeave {
  id: string;
  type: 'holiday' | 'leave'; // 'holiday': Resmi/Dini tatil (tüm salon), 'leave': Personel izni
  staffId?: string;
  staffName?: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  notes?: string;
}

export interface CampaignItem {
  id: string;
  title: string;
  description: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: string;
  endDate: string;
  minSpend?: number;
  applicableServiceIds?: string[];
  applicableBranchIds?: string[];
  isActive: boolean;
  usageCount: number;
}

export interface SalonSettings {
  salonName: string;
  legalTitle: string;
  currency: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagramUrl: string;
  minAdvanceHours: number;
  maxAdvanceDays: number;
  slotIntervalMinutes: number;
  cancellationHoursNotice: number;
  smsNotificationsEnabled: boolean;
  emailNotificationsEnabled: boolean;
  whatsappNotificationsEnabled: boolean;
  autoConfirmOnlineBookings: boolean;
}

export type AdminTabType =
  | 'dashboard'
  | 'appointments'
  | 'customers'
  | 'services'
  | 'team'
  | 'branches'
  | 'working-hours'
  | 'portfolio'
  | 'testimonials'
  | 'campaigns'
  | 'notifications-hub'
  | 'settings';

// ----------------------------------------------------
// EDITORIAL BLOG & CONTENT ENGINE TYPES (PHASE 12)
// ----------------------------------------------------

export type BlogCategory =
  | 'sac-trendleri'
  | 'sac-bakimi'
  | 'sac-renkleri'
  | 'gelin'
  | 'styling'
  | 'erkek'
  | 'salon-rehberi';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: BlogCategory;
  categoryLabel: string;
  readTimeMinutes: number;
  publishedDate: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  authorSlug: string;
  coverImage: string;
  summary: string;
  contentHtml: string;
  relatedServiceSlug?: string;
  relatedServiceId?: string;
  relatedServiceIds?: string[];
  relatedPortfolioIds?: string[];
  tags: string[];
  pullQuote?: {
    text: string;
    author: string;
  };
  keyTakeaways?: string[];
}



