import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { DashboardTab } from './DashboardTab';
import { AppointmentsTab } from './AppointmentsTab';
import { CustomersTab } from './CustomersTab';
import { ServicesTab } from './ServicesTab';
import { TeamTab } from './TeamTab';
import { BranchesTab } from './BranchesTab';
import { WorkingHoursTab } from './WorkingHoursTab';
import { PortfolioAdminTab } from './PortfolioAdminTab';
import { TestimonialsTab } from './TestimonialsTab';
import { CampaignsTab } from './CampaignsTab';
import { NotificationsHubTab } from './NotificationsHubTab';
import { SettingsTab } from './SettingsTab';
import { AdminAuthGate } from './AdminAuthGate';

import { AdminAppointment } from '../../types';


interface AdminLayoutProps {
  onReturnToPublic: () => void;
}

export function AdminLayout({ onReturnToPublic }: AdminLayoutProps) {

  const {
    currentTab,
    setCurrentTab,
    services,
    team,
    branches,
    addAppointment,
  } = useAdmin();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<AdminAppointment | null>(null);

  // Quick Create Appointment Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createCustomerName, setCreateCustomerName] = useState('');
  const [createCustomerPhone, setCreateCustomerPhone] = useState('');
  const [createServiceIds, setCreateServiceIds] = useState<string[]>([services[0]?.id || 'srv-balayage']);
  const [createStaffId, setCreateStaffId] = useState(team[0]?.id || 'staff-selin');
  const [createBranchId, setCreateBranchId] = useState(branches[0]?.id || 'branch-nisantasi');
  const [createDate, setCreateDate] = useState(new Date().toISOString().split('T')[0]);
  const [createTimeSlot, setCreateTimeSlot] = useState('11:00');
  const [createNote, setCreateNote] = useState('');

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createCustomerName || !createCustomerPhone) return;

    const selectedServices = services.filter((s) => createServiceIds.includes(s.id));
    const totalPrice = selectedServices.reduce((sum, s) => sum + s.priceStartingFrom, 0);
    const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

    const newApt = addAppointment({
      bookingCode: `ELX-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: createCustomerName,
      customerPhone: createCustomerPhone,
      serviceIds: createServiceIds,
      staffId: createStaffId,
      branchId: createBranchId,
      date: createDate,
      timeSlot: createTimeSlot,
      durationMinutes: totalDuration || 60,
      price: totalPrice || 1500,
      status: 'confirmed',
      customerNote: createNote,
      internalStaffNote: 'Telefon / Salon Yönetiminden Oluşturuldu',
    });

    setIsCreateModalOpen(false);
    setCreateCustomerName('');
    setCreateCustomerPhone('');
    setCreateNote('');

    // Switch to appointments tab and select new appointment
    setCurrentTab('appointments');
    setSelectedAppointment(newApt);
  };

  const toggleServiceInCreate = (srvId: string) => {
    setCreateServiceIds((prev) =>
      prev.includes(srvId)
        ? prev.length > 1
          ? prev.filter((id) => id !== srvId)
          : prev
        : [...prev, srvId]
    );
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('lelixir_admin_auth_v1');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  return (
    <AdminAuthGate onReturnToPublic={onReturnToPublic}>
      <div className="min-h-screen bg-[#0f0f12] text-white flex">
        {/* Sidebar */}
        <AdminSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onReturnToPublic={onReturnToPublic}
        />

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
            isSidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
          }`}
        >
          {/* Topbar */}
          <AdminTopbar
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            onOpenCreateAppointment={() => setIsCreateModalOpen(true)}
            onReturnToPublic={onReturnToPublic}
            onLogout={handleLogout}
          />

          {/* Tab Content Container */}
          <main className="flex-1 p-4 lg:p-6 overflow-y-auto">

          {currentTab === 'dashboard' && (
            <DashboardTab
              onOpenCreateAppointment={() => setIsCreateModalOpen(true)}
              onSelectAppointment={(apt) => {
                setSelectedAppointment(apt);
                setCurrentTab('appointments');
              }}
            />
          )}

          {currentTab === 'appointments' && (
            <AppointmentsTab
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
              selectedAppointment={selectedAppointment}
              onSelectAppointment={setSelectedAppointment}
            />
          )}

          {currentTab === 'customers' && <CustomersTab />}

          {currentTab === 'services' && <ServicesTab />}

          {currentTab === 'team' && <TeamTab />}

          {currentTab === 'branches' && <BranchesTab />}

          {currentTab === 'working-hours' && <WorkingHoursTab />}

          {currentTab === 'portfolio' && <PortfolioAdminTab />}

          {currentTab === 'testimonials' && <TestimonialsTab />}

          {currentTab === 'campaigns' && <CampaignsTab />}

          {currentTab === 'notifications-hub' && <NotificationsHubTab />}

          {currentTab === 'settings' && <SettingsTab />}
        </main>
      </div>

      {/* Global Quick Create Appointment Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-[#16161a] border border-[#26262b] rounded-2xl p-6 space-y-4 animate-fade-in text-xs text-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-[#26262b]">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Yeni Randevu Kaydı (Telefon / Walk-In)
                </h3>
                <p className="text-[11px] text-white/50">
                  Rezervasyon doğrudan takvime işlenecektir
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Müşteri Adı Soyadı *
                  </label>
                  <input
                    type="text"
                    required
                    value={createCustomerName}
                    onChange={(e) => setCreateCustomerName(e.target.value)}
                    placeholder="Örn: Ayşe Demir"
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Telefon Numarası *
                  </label>
                  <input
                    type="tel"
                    required
                    value={createCustomerPhone}
                    onChange={(e) => setCreateCustomerPhone(e.target.value)}
                    placeholder="05XX XXX XX XX"
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>
              </div>

              {/* Service Selection Checklist */}
              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Hizmet Seçimi *
                </label>
                <div className="max-h-36 overflow-y-auto p-2 bg-[#202025] border border-[#2e2e36] rounded-lg space-y-1.5 custom-scrollbar">
                  {services.map((srv) => (
                    <label
                      key={srv.id}
                      className="flex items-center justify-between p-1.5 rounded hover:bg-white/5 cursor-pointer text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={createServiceIds.includes(srv.id)}
                          onChange={() => toggleServiceInCreate(srv.id)}
                          className="w-4 h-4 accent-accent"
                        />
                        <span className="text-white font-medium">{srv.name}</span>
                      </div>
                      <span className="text-accent font-semibold text-[11px]">
                        {srv.priceStartingFrom} ₺ ({srv.durationMinutes} dk)
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Staff & Branch */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Uzman Seçin
                  </label>
                  <select
                    value={createStaffId}
                    onChange={(e) => setCreateStaffId(e.target.value)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden"
                  >
                    {team.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Şube Seçin
                  </label>
                  <select
                    value={createBranchId}
                    onChange={(e) => setCreateBranchId(e.target.value)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Randevu Tarihi *
                  </label>
                  <input
                    type="date"
                    required
                    value={createDate}
                    onChange={(e) => setCreateDate(e.target.value)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Saat *
                  </label>
                  <input
                    type="time"
                    required
                    value={createTimeSlot}
                    onChange={(e) => setCreateTimeSlot(e.target.value)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Müşteri veya İşlem Notu
                </label>
                <textarea
                  rows={2}
                  value={createNote}
                  onChange={(e) => setCreateNote(e.target.value)}
                  placeholder="Alerji, özel istek, tercih edilen ikram vb."
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-accent hover:bg-accent/90 text-background font-bold text-xs rounded-xl transition-colors shadow-sm"
                >
                  Randevuyu Onayla & Takvime Ekle
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/15"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </AdminAuthGate>
  );
}



