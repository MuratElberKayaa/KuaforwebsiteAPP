import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AdminAppointment,
  CustomerProfile,
  CustomerFormulaNote,
  ServiceItem,
  StaffMember,
  BranchItem,
  BranchWorkingHour,
  StaffShift,
  HolidayLeave,
  CampaignItem,
  SalonSettings,
  PortfolioItem,
  TestimonialItem,
  AppointmentStatus,
  AdminTabType,
} from '../types';
import { servicesData } from '../data/servicesData';
import { teamData } from '../data/teamData';
import { branchesData } from '../data/branchesData';
import { portfolioData } from '../data/portfolioData';
import { testimonialsData } from '../data/testimonialsData';
import {
  mockAdminAppointments,
  mockCustomers,
  mockBranchWorkingHours,
  mockStaffShifts,
  mockHolidayLeaves,
  mockCampaigns,
  mockSalonSettings,
} from '../data/adminMockData';
import { NotificationService } from '../services/notifications/NotificationService';

interface AdminContextType {
  // Navigation & Filters
  currentTab: AdminTabType;
  setCurrentTab: (tab: AdminTabType) => void;
  selectedBranchFilter: string; // 'all' or branchId
  setSelectedBranchFilter: (branchId: string) => void;

  // State Entities
  appointments: AdminAppointment[];
  customers: CustomerProfile[];
  services: ServiceItem[];
  team: StaffMember[];
  branches: BranchItem[];
  workingHours: BranchWorkingHour[];
  shifts: StaffShift[];
  holidayLeaves: HolidayLeave[];
  portfolioItems: PortfolioItem[];
  testimonials: TestimonialItem[];
  campaigns: CampaignItem[];
  settings: SalonSettings;

  // Appointment Actions
  addAppointment: (apt: Omit<AdminAppointment, 'id' | 'createdAt'>) => AdminAppointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  rescheduleAppointment: (id: string, date: string, timeSlot: string) => void;
  updateAppointmentNotes: (id: string, internalStaffNote: string) => void;
  deleteAppointment: (id: string) => void;

  // Customer Actions
  addCustomer: (customer: Omit<CustomerProfile, 'id' | 'firstVisitDate' | 'lastVisitDate' | 'totalVisits' | 'totalSpent' | 'formulaNotes'>) => CustomerProfile;
  updateCustomer: (id: string, updates: Partial<CustomerProfile>) => void;
  addCustomerFormulaNote: (customerId: string, note: Omit<CustomerFormulaNote, 'id'>) => void;
  deleteCustomer: (id: string) => void;

  // Services CRUD
  addService: (service: Omit<ServiceItem, 'id'>) => ServiceItem;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  // Team CRUD
  addStaff: (staff: Omit<StaffMember, 'id'>) => StaffMember;
  updateStaff: (id: string, updates: Partial<StaffMember>) => void;
  deleteStaff: (id: string) => void;

  // Branches CRUD
  addBranch: (branch: Omit<BranchItem, 'id'>) => BranchItem;
  updateBranch: (id: string, updates: Partial<BranchItem>) => void;
  deleteBranch: (id: string) => void;

  // Working Hours & Leaves
  updateWorkingHours: (hours: BranchWorkingHour[]) => void;
  updateStaffShift: (shift: StaffShift) => void;
  addHolidayLeave: (item: Omit<HolidayLeave, 'id'>) => void;
  deleteHolidayLeave: (id: string) => void;

  // Portfolio
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  deletePortfolioItem: (id: string) => void;

  // Testimonials
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => void;
  toggleTestimonialVerification: (id: string) => void;
  deleteTestimonial: (id: string) => void;

  // Campaigns
  addCampaign: (campaign: Omit<CampaignItem, 'id' | 'usageCount'>) => void;
  updateCampaign: (id: string, updates: Partial<CampaignItem>) => void;
  toggleCampaignActive: (id: string) => void;
  deleteCampaign: (id: string) => void;

  // Settings
  updateSettings: (updates: Partial<SalonSettings>) => void;
  resetAllToDefaults: () => void;
}

const STORAGE_KEY = 'lelixir_salon_admin_state_v1';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [currentTab, setCurrentTab] = useState<AdminTabType>('dashboard');
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<string>('all');

  // Core Data States
  const [appointments, setAppointments] = useState<AdminAppointment[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_appointments`);
    return saved ? JSON.parse(saved) : mockAdminAppointments;
  });

  const [customers, setCustomers] = useState<CustomerProfile[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_customers`);
    return saved ? JSON.parse(saved) : mockCustomers;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_services`);
    return saved ? JSON.parse(saved) : servicesData;
  });

  const [team, setTeam] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_team`);
    return saved ? JSON.parse(saved) : teamData;
  });

  const [branches, setBranches] = useState<BranchItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_branches`);
    return saved ? JSON.parse(saved) : branchesData;
  });

  const [workingHours, setWorkingHours] = useState<BranchWorkingHour[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_workingHours`);
    return saved ? JSON.parse(saved) : mockBranchWorkingHours;
  });

  const [shifts, setShifts] = useState<StaffShift[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_shifts`);
    return saved ? JSON.parse(saved) : mockStaffShifts;
  });

  const [holidayLeaves, setHolidayLeaves] = useState<HolidayLeave[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_holidayLeaves`);
    return saved ? JSON.parse(saved) : mockHolidayLeaves;
  });

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_portfolio`);
    return saved ? JSON.parse(saved) : portfolioData;
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_testimonials`);
    return saved ? JSON.parse(saved) : testimonialsData;
  });

  const [campaigns, setCampaigns] = useState<CampaignItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_campaigns`);
    return saved ? JSON.parse(saved) : mockCampaigns;
  });

  const [settings, setSettings] = useState<SalonSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
    return saved ? JSON.parse(saved) : mockSalonSettings;
  });

  // LocalStorage sync effects
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_appointments`, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_customers`, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_team`, JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_branches`, JSON.stringify(branches));
  }, [branches]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_workingHours`, JSON.stringify(workingHours));
  }, [workingHours]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_shifts`, JSON.stringify(shifts));
  }, [shifts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_holidayLeaves`, JSON.stringify(holidayLeaves));
  }, [holidayLeaves]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_portfolio`, JSON.stringify(portfolioItems));
  }, [portfolioItems]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_testimonials`, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_campaigns`, JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
  }, [settings]);

  // Appointment Actions
  const addAppointment = (apt: Omit<AdminAppointment, 'id' | 'createdAt'>): AdminAppointment => {
    const newApt: AdminAppointment = {
      ...apt,
      id: `apt-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [newApt, ...prev]);

    // Check if customer exists, if not create basic profile or update visit count
    setCustomers((prevCusts) => {
      const existing = prevCusts.find((c) => c.phone.replace(/\s+/g, '') === apt.customerPhone.replace(/\s+/g, ''));
      if (existing) {
        return prevCusts.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalVisits: c.totalVisits + 1,
                totalSpent: c.totalSpent + apt.price,
                lastVisitDate: apt.date,
              }
            : c
        );
      } else {
        const newCustomer: CustomerProfile = {
          id: `cust-${Date.now()}`,
          fullName: apt.customerName,
          phone: apt.customerPhone,
          email: apt.customerEmail,
          firstVisitDate: apt.date,
          lastVisitDate: apt.date,
          totalVisits: 1,
          totalSpent: apt.price,
          favoriteStylistId: apt.staffId,
          favoriteServiceIds: apt.serviceIds,
          formulaNotes: [],
          tags: ['Yeni Müşteri'],
          generalNotes: apt.customerNote || '',
        };
        return [newCustomer, ...prevCusts];
      }
    });

    // Trigger notification
    const branchObj = branches.find((b) => b.id === apt.branchId);
    const staffObj = team.find((t) => t.id === apt.staffId);
    const serviceNames = apt.serviceIds
      .map((id) => services.find((s) => s.id === id)?.name || id)
      .join(' + ');

    NotificationService.dispatch({
      event: 'BOOKING_CREATED',
      recipientPhone: apt.customerPhone,
      recipientEmail: apt.customerEmail,
      recipientName: apt.customerName,
      variables: {
        customer_name: apt.customerName,
        customer_phone: apt.customerPhone,
        customer_email: apt.customerEmail,
        service_names: serviceNames,
        staff_name: staffObj?.name || 'L\'ÉLIXIR Uzmanı',
        branch_name: branchObj?.name || 'Nişantaşı Flagship',
        branch_address: branchObj?.address || 'Abdi İpekçi Cad. No: 42',
        branch_phone: branchObj?.phone || '+90 (212) 234 50 60',
        date: apt.date,
        time_slot: apt.timeSlot,
        booking_code: newApt.bookingCode,
        total_price: `${apt.price.toLocaleString('tr-TR')} ₺`,
        duration_minutes: String(apt.durationMinutes),
        maps_url: branchObj?.googleMapsUrl || 'https://maps.google.com',
        salon_name: settings.salonName,
      },
    });

    return newApt;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments((prev) => {
      const apt = prev.find((a) => a.id === id);
      if (apt) {
        const branchObj = branches.find((b) => b.id === apt.branchId);
        const staffObj = team.find((t) => t.id === apt.staffId);
        const serviceNames = apt.serviceIds
          .map((sid) => services.find((s) => s.id === sid)?.name || sid)
          .join(' + ');

        const eventMap: Partial<Record<AppointmentStatus, any>> = {
          confirmed: 'BOOKING_CONFIRMED',
          cancelled: 'BOOKING_CANCELLED',
          completed: 'APPOINTMENT_COMPLETED',
        };

        const targetEvent = eventMap[status];
        if (targetEvent) {
          NotificationService.dispatch({
            event: targetEvent,
            recipientPhone: apt.customerPhone,
            recipientEmail: apt.customerEmail,
            recipientName: apt.customerName,
            variables: {
              customer_name: apt.customerName,
              customer_phone: apt.customerPhone,
              customer_email: apt.customerEmail,
              service_names: serviceNames,
              staff_name: staffObj?.name || 'L\'ÉLIXIR Uzmanı',
              branch_name: branchObj?.name || 'Nişantaşı Flagship',
              branch_address: branchObj?.address || 'Abdi İpekçi Cad. No: 42',
              branch_phone: branchObj?.phone || '+90 (212) 234 50 60',
              date: apt.date,
              time_slot: apt.timeSlot,
              booking_code: apt.bookingCode,
              total_price: `${apt.price.toLocaleString('tr-TR')} ₺`,
              duration_minutes: String(apt.durationMinutes),
              maps_url: branchObj?.googleMapsUrl || 'https://maps.google.com',
              salon_name: settings.salonName,
            },
          });
        }
      }
      return prev.map((a) => (a.id === id ? { ...a, status } : a));
    });
  };

  const rescheduleAppointment = (id: string, date: string, timeSlot: string) => {
    setAppointments((prev) => {
      const apt = prev.find((a) => a.id === id);
      if (apt) {
        const branchObj = branches.find((b) => b.id === apt.branchId);
        const staffObj = team.find((t) => t.id === apt.staffId);
        const serviceNames = apt.serviceIds
          .map((sid) => services.find((s) => s.id === sid)?.name || sid)
          .join(' + ');

        NotificationService.dispatch({
          event: 'BOOKING_RESCHEDULED',
          recipientPhone: apt.customerPhone,
          recipientEmail: apt.customerEmail,
          recipientName: apt.customerName,
          variables: {
            customer_name: apt.customerName,
            customer_phone: apt.customerPhone,
            customer_email: apt.customerEmail,
            service_names: serviceNames,
            staff_name: staffObj?.name || 'L\'ÉLIXIR Uzmanı',
            branch_name: branchObj?.name || 'Nişantaşı Flagship',
            branch_address: branchObj?.address || 'Abdi İpekçi Cad. No: 42',
            branch_phone: branchObj?.phone || '+90 (212) 234 50 60',
            date: date,
            time_slot: timeSlot,
            booking_code: apt.bookingCode,
            total_price: `${apt.price.toLocaleString('tr-TR')} ₺`,
            duration_minutes: String(apt.durationMinutes),
            maps_url: branchObj?.googleMapsUrl || 'https://maps.google.com',
            salon_name: settings.salonName,
          },
        });
      }
      return prev.map((a) => (a.id === id ? { ...a, date, timeSlot } : a));
    });
  };

  const updateAppointmentNotes = (id: string, internalStaffNote: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, internalStaffNote } : a))
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  // Customer Actions
  const addCustomer = (
    cust: Omit<CustomerProfile, 'id' | 'firstVisitDate' | 'lastVisitDate' | 'totalVisits' | 'totalSpent' | 'formulaNotes'>
  ): CustomerProfile => {
    const today = new Date().toISOString().split('T')[0];
    const newCustomer: CustomerProfile = {
      ...cust,
      id: `cust-${Date.now()}`,
      firstVisitDate: today,
      lastVisitDate: today,
      totalVisits: 1,
      totalSpent: 0,
      formulaNotes: [],
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    return newCustomer;
  };

  const updateCustomer = (id: string, updates: Partial<CustomerProfile>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const addCustomerFormulaNote = (customerId: string, note: Omit<CustomerFormulaNote, 'id'>) => {
    const newNote: CustomerFormulaNote = {
      ...note,
      id: `fn-${Date.now()}`,
    };
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId
          ? { ...c, formulaNotes: [newNote, ...(c.formulaNotes || [])] }
          : c
      )
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  // Services CRUD
  const addService = (service: Omit<ServiceItem, 'id'>): ServiceItem => {
    const newService: ServiceItem = {
      ...service,
      id: `srv-${Date.now()}`,
    };
    setServices((prev) => [...prev, newService]);
    return newService;
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Team CRUD
  const addStaff = (staff: Omit<StaffMember, 'id'>): StaffMember => {
    const newStaff: StaffMember = {
      ...staff,
      id: `staff-${Date.now()}`,
    };
    setTeam((prev) => [...prev, newStaff]);
    return newStaff;
  };

  const updateStaff = (id: string, updates: Partial<StaffMember>) => {
    setTeam((prev) =>
      prev.map((st) => (st.id === id ? { ...st, ...updates } : st))
    );
  };

  const deleteStaff = (id: string) => {
    setTeam((prev) => prev.filter((st) => st.id !== id));
  };

  // Branches CRUD
  const addBranch = (branch: Omit<BranchItem, 'id'>): BranchItem => {
    const newBranch: BranchItem = {
      ...branch,
      id: `branch-${Date.now()}`,
    };
    setBranches((prev) => [...prev, newBranch]);
    return newBranch;
  };

  const updateBranch = (id: string, updates: Partial<BranchItem>) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const deleteBranch = (id: string) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  // Working Hours & Shifts
  const updateWorkingHours = (hours: BranchWorkingHour[]) => {
    setWorkingHours(hours);
  };

  const updateStaffShift = (shift: StaffShift) => {
    setShifts((prev) => {
      const idx = prev.findIndex(
        (s) => s.staffId === shift.staffId && s.dayIndex === shift.dayIndex
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = shift;
        return next;
      }
      return [...prev, shift];
    });
  };

  const addHolidayLeave = (item: Omit<HolidayLeave, 'id'>) => {
    const newH: HolidayLeave = {
      ...item,
      id: `hl-${Date.now()}`,
    };
    setHolidayLeaves((prev) => [...prev, newH]);
  };

  const deleteHolidayLeave = (id: string) => {
    setHolidayLeaves((prev) => prev.filter((h) => h.id !== id));
  };

  // Portfolio
  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: `port-${Date.now()}`,
    };
    setPortfolioItems((prev) => [newItem, ...prev]);
  };

  const deletePortfolioItem = (id: string) => {
    setPortfolioItems((prev) => prev.filter((p) => p.id !== id));
  };

  // Testimonials
  const addTestimonial = (item: Omit<TestimonialItem, 'id'>) => {
    const newT: TestimonialItem = {
      ...item,
      id: `t-${Date.now()}`,
    };
    setTestimonials((prev) => [newT, ...prev]);
  };

  const toggleTestimonialVerification = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isVerified: !t.isVerified } : t))
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // Campaigns
  const addCampaign = (campaign: Omit<CampaignItem, 'id' | 'usageCount'>) => {
    const newCamp: CampaignItem = {
      ...campaign,
      id: `cmp-${Date.now()}`,
      usageCount: 0,
    };
    setCampaigns((prev) => [newCamp, ...prev]);
  };

  const updateCampaign = (id: string, updates: Partial<CampaignItem>) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const toggleCampaignActive = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  // Settings
  const updateSettings = (updates: Partial<SalonSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const resetAllToDefaults = () => {
    setAppointments(mockAdminAppointments);
    setCustomers(mockCustomers);
    setServices(servicesData);
    setTeam(teamData);
    setBranches(branchesData);
    setWorkingHours(mockBranchWorkingHours);
    setShifts(mockStaffShifts);
    setHolidayLeaves(mockHolidayLeaves);
    setPortfolioItems(portfolioData);
    setTestimonials(testimonialsData);
    setCampaigns(mockCampaigns);
    setSettings(mockSalonSettings);
    localStorage.clear();
  };

  return (
    <AdminContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        selectedBranchFilter,
        setSelectedBranchFilter,
        appointments,
        customers,
        services,
        team,
        branches,
        workingHours,
        shifts,
        holidayLeaves,
        portfolioItems,
        testimonials,
        campaigns,
        settings,
        addAppointment,
        updateAppointmentStatus,
        rescheduleAppointment,
        updateAppointmentNotes,
        deleteAppointment,
        addCustomer,
        updateCustomer,
        addCustomerFormulaNote,
        deleteCustomer,
        addService,
        updateService,
        deleteService,
        addStaff,
        updateStaff,
        deleteStaff,
        addBranch,
        updateBranch,
        deleteBranch,
        updateWorkingHours,
        updateStaffShift,
        addHolidayLeave,
        deleteHolidayLeave,
        addPortfolioItem,
        deletePortfolioItem,
        addTestimonial,
        toggleTestimonialVerification,
        deleteTestimonial,
        addCampaign,
        updateCampaign,
        toggleCampaignActive,
        deleteCampaign,
        updateSettings,
        resetAllToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
