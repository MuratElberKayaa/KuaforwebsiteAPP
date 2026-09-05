import { useState } from 'react';
import {
  Menu,
  Building2,
  Bell,
  Plus,
  CheckCircle2,
  Clock,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

interface AdminTopbarProps {
  onToggleSidebar: () => void;
  onOpenCreateAppointment: () => void;
  onReturnToPublic: () => void;
  onLogout?: () => void;
}

export function AdminTopbar({
  onToggleSidebar,
  onOpenCreateAppointment,
  onReturnToPublic,
  onLogout,
}: AdminTopbarProps) {


  const {
    branches,
    selectedBranchFilter,
    setSelectedBranchFilter,
    appointments,
    setCurrentTab,
  } = useAdmin();

  const [showNotifications, setShowNotifications] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter((a) => a.date === todayStr);
  const pendingAppointments = appointments.filter((a) => a.status === 'pending');

  return (
    <header className="h-16 bg-[#16161a] border-b border-[#26262b] sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6">
      {/* Left section: Hamburger & Branch Selector */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          aria-label="Menüyü Aç/Kapat"
          className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Branch Filter Dropdown */}
        <div className="flex items-center gap-2 bg-[#202025] border border-[#2e2e36] rounded-lg px-3 py-1.5 text-xs">
          <Building2 className="w-4 h-4 text-accent shrink-0" />
          <span className="text-white/50 hidden sm:inline">Şube:</span>
          <select
            value={selectedBranchFilter}
            onChange={(e) => setSelectedBranchFilter(e.target.value)}
            className="bg-transparent text-white font-medium focus:outline-hidden cursor-pointer"
          >
            <option value="all" className="bg-[#1a1a1e] text-white">
              Tüm Şubeler (Genel Merkez)
            </option>
            {branches.map((b) => (
              <option key={b.id} value={b.id} className="bg-[#1a1a1e] text-white">
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Today Summary Badge */}
        <div className="hidden md:flex items-center gap-2 text-xs text-white/70 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg">
          <Clock className="w-3.5 h-3.5 text-accent" />
          <span>Bugün: <strong>{todayAppointments.length}</strong> Randevu</span>
        </div>
      </div>

      {/* Right section: Search, Notifications, Quick Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Bildirimler"
            className="relative p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {pendingAppointments.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#1a1a1e] border border-[#2e2e36] rounded-xl shadow-2xl p-3 z-50 animate-fade-in text-xs text-white">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 font-medium">
                <span>Bildirimler & Bekleyenler</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-md font-bold">
                  {pendingAppointments.length} Bekleyen
                </span>
              </div>

              {pendingAppointments.length === 0 ? (
                <div className="py-6 text-center text-white/40">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-1 text-green-500/40" />
                  Bekleyen yeni randevu yok.
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {pendingAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      onClick={() => {
                        setCurrentTab('appointments');
                        setShowNotifications(false);
                      }}
                      className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors border border-white/5"
                    >
                      <div className="flex items-center justify-between font-semibold text-white">
                        <span>{apt.customerName}</span>
                        <span className="text-accent">{apt.timeSlot}</span>
                      </div>
                      <p className="text-white/60 text-[11px] truncate mt-0.5">
                        {apt.bookingCode} • {apt.date}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick New Appointment Button */}
        <button
          onClick={onOpenCreateAppointment}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent/90 text-background font-medium text-xs sm:text-sm rounded-lg transition-colors shadow-sm font-semibold"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Yeni Randevu</span>
        </button>

        {/* Return to Public Website */}
        <button
          onClick={onReturnToPublic}
          title="Web Sitesine Dön"
          className="hidden sm:flex items-center gap-1.5 text-xs text-white/60 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors border border-white/10 cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Siteyi Gör</span>
        </button>

        {/* Lock / Logout Button */}
        {onLogout && (
          <button
            onClick={onLogout}
            title="Güvenli Çıkış Yap & Kilitle"
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 px-2.5 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors border border-red-500/20 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Çıkış</span>
          </button>
        )}
      </div>
    </header>

  );
}
