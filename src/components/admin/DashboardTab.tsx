import {
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Users,
  Clock,
  Scissors,
  ArrowUpRight,
  Check,
  Building2,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminAppointment } from '../../types';

interface DashboardTabProps {
  onOpenCreateAppointment: () => void;
  onSelectAppointment: (apt: AdminAppointment) => void;
}

export function DashboardTab({
  onOpenCreateAppointment,
  onSelectAppointment,
}: DashboardTabProps) {
  const {
    appointments,
    customers,
    services,
    team,
    branches,
    selectedBranchFilter,
    updateAppointmentStatus,
    setCurrentTab,
  } = useAdmin();

  const todayStr = new Date().toISOString().split('T')[0];

  // Filter appointments by selected branch
  const filteredAppointments = appointments.filter(
    (a) => selectedBranchFilter === 'all' || a.branchId === selectedBranchFilter
  );

  const todayAppointments = filteredAppointments.filter(
    (a) => a.date === todayStr
  );

  const completedToday = todayAppointments.filter(
    (a) => a.status === 'completed'
  );
  const pendingToday = todayAppointments.filter(
    (a) => a.status === 'pending'
  );

  // Today's estimated total revenue from confirmed & completed
  const todayRevenue = todayAppointments
    .filter((a) => a.status === 'confirmed' || a.status === 'completed')
    .reduce((sum, a) => sum + a.price, 0);

  // Upcoming appointments (future dates)
  const upcomingAppointments = filteredAppointments.filter(
    (a) => a.date > todayStr && a.status !== 'cancelled'
  );

  // Cancellation Rate calculation
  const totalAllTime = filteredAppointments.length;
  const totalCancelled = filteredAppointments.filter(
    (a) => a.status === 'cancelled' || a.status === 'no_show'
  ).length;
  const cancellationRate =
    totalAllTime > 0 ? Math.round((totalCancelled / totalAllTime) * 100) : 0;

  // Helper names
  const getServiceName = (id: string) =>
    services.find((s) => s.id === id)?.name || id;
  const getStaffName = (id: string) =>
    team.find((t) => t.id === id)?.name || 'Uzman';
  const getBranchName = (id: string) =>
    branches.find((b) => b.id === id)?.name || 'Şube';

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#16161a] border border-[#26262b] p-5 rounded-xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
            Salon Operasyon Paneli
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            {new Date().toLocaleDateString('tr-TR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })} • Canlı Randevu ve Performans Akışı
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentTab('appointments')}
            className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-medium rounded-lg border border-white/10 transition-colors"
          >
            Tüm Takvimi Aç
          </button>
          <button
            onClick={onOpenCreateAppointment}
            className="px-3.5 py-2 bg-accent hover:bg-accent/90 text-background font-semibold text-xs rounded-lg transition-colors shadow-xs"
          >
            + Randevu Oluştur
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Card 1: Today Appointments */}
        <div className="bg-[#16161a] border border-[#26262b] p-4 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs font-medium">Bugünkü Randevu</span>
            <Calendar className="w-4 h-4 text-accent" />
          </div>
          <div>
            <span className="text-2xl font-bold text-white tracking-tight">
              {todayAppointments.length}
            </span>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-amber-400">
              <span>{pendingToday.length} bekleyen</span>
            </div>
          </div>
        </div>

        {/* Card 2: Today Est. Revenue */}
        <div className="bg-[#16161a] border border-[#26262b] p-4 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs font-medium">Bugünkü Ciro</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-2xl font-bold text-emerald-400 tracking-tight">
              {todayRevenue.toLocaleString('tr-TR')} ₺
            </span>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-white/40">
              <span>{completedToday.length} işlem tamamlandı</span>
            </div>
          </div>
        </div>

        {/* Card 3: Upcoming */}
        <div className="bg-[#16161a] border border-[#26262b] p-4 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs font-medium">Gelecek Randevu</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <span className="text-2xl font-bold text-white tracking-tight">
              {upcomingAppointments.length}
            </span>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-white/40">
              <span>Gelecek 7 gün</span>
            </div>
          </div>
        </div>

        {/* Card 4: Completed Services */}
        <div className="bg-[#16161a] border border-[#26262b] p-4 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs font-medium">Tamamlanan</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-2xl font-bold text-white tracking-tight">
              {completedToday.length}
            </span>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-400/80">
              <span>Koltuk verimi %92</span>
            </div>
          </div>
        </div>

        {/* Card 5: Cancellation Rate */}
        <div className="bg-[#16161a] border border-[#26262b] p-4 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs font-medium">İptal Oranı</span>
            <XCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <span className="text-2xl font-bold text-rose-400 tracking-tight">
              %{cancellationRate}
            </span>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-white/40">
              <span>{totalCancelled} randevu</span>
            </div>
          </div>
        </div>

        {/* Card 6: Total Customers */}
        <div className="bg-[#16161a] border border-[#26262b] p-4 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-white/50 mb-2">
            <span className="text-xs font-medium">Kayıtlı Müşteri</span>
            <Users className="w-4 h-4 text-accent" />
          </div>
          <div>
            <span className="text-2xl font-bold text-white tracking-tight">
              {customers.length}
            </span>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-accent/80">
              <span>+3 bu hafta</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Split: Today's Timeline & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Live Appointments Timeline */}
        <div className="lg:col-span-2 bg-[#16161a] border border-[#26262b] rounded-xl p-5 flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-[#26262b] mb-4">
            <div>
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                Bugünün Randevu Çizelgesi
              </h2>
              <p className="text-xs text-white/50 mt-0.5">
                Bugün için planlanan toplam {todayAppointments.length} seans
              </p>
            </div>
            <button
              onClick={() => setCurrentTab('appointments')}
              className="text-xs text-accent hover:underline flex items-center gap-1"
            >
              Tümünü Gör <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {todayAppointments.length === 0 ? (
            <div className="py-12 text-center text-white/40">
              <Calendar className="w-10 h-10 mx-auto mb-2 text-white/20" />
              Bugün için bu şubede kayıtlı randevu bulunmuyor.
            </div>
          ) : (
            <div className="space-y-3 flex-1 overflow-y-auto">
              {todayAppointments
                .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot))
                .map((apt) => {
                  const statusColors = {
                    confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                    pending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                    completed: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
                    cancelled: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
                    no_show: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
                  };

                  const statusLabels = {
                    confirmed: 'Onaylandı',
                    pending: 'Onay Bekliyor',
                    completed: 'Tamamlandı',
                    cancelled: 'İptal Edildi',
                    no_show: 'Gelmedi',
                  };

                  return (
                    <div
                      key={apt.id}
                      className="bg-[#1c1c22] border border-[#2e2e36] hover:border-accent/40 rounded-xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                      onClick={() => onSelectAppointment(apt)}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="bg-[#24242c] border border-white/10 rounded-lg p-2.5 text-center min-w-[64px] shrink-0">
                          <span className="text-base font-bold text-accent block leading-none">
                            {apt.timeSlot}
                          </span>
                          <span className="text-[10px] text-white/40 uppercase block mt-1">
                            {apt.durationMinutes} dk
                          </span>
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-bold text-white truncate">
                              {apt.customerName}
                            </h3>
                            <span className="text-[11px] text-white/40">
                              ({apt.bookingCode})
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${
                                statusColors[apt.status]
                              }`}
                            >
                              {statusLabels[apt.status]}
                            </span>
                          </div>

                          <p className="text-xs text-white/80 font-medium mt-1 truncate">
                            {apt.serviceIds.map(getServiceName).join(' + ')}
                          </p>

                          <div className="flex items-center gap-3 text-[11px] text-white/50 mt-1 flex-wrap">
                            <span>Uzman: <strong>{getStaffName(apt.staffId)}</strong></span>
                            <span>•</span>
                            <span>Şube: {getBranchName(apt.branchId)}</span>
                            <span>•</span>
                            <span className="text-accent font-semibold">{apt.price} ₺</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Status Action Buttons */}
                      <div
                        className="flex items-center gap-1.5 self-end sm:self-center shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {apt.status === 'pending' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                            title="Onayla"
                            className="p-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-xs font-semibold flex items-center gap-1 border border-emerald-500/40 transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Onayla</span>
                          </button>
                        )}

                        {apt.status === 'confirmed' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                            title="Tamamla"
                            className="p-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-xs font-semibold flex items-center gap-1 border border-blue-500/40 transition-colors"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Tamamla</span>
                          </button>
                        )}

                        <button
                          onClick={() => onSelectAppointment(apt)}
                          className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-white text-xs rounded-lg transition-colors border border-white/5"
                        >
                          Detay
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Right 1 Col: Popular Services & Quick Insights */}
        <div className="space-y-6">
          {/* Popular Services Breakdown */}
          <div className="bg-[#16161a] border border-[#26262b] rounded-xl p-5">
            <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
              <Scissors className="w-4 h-4 text-accent" />
              Popüler Hizmetler
            </h2>

            <div className="space-y-3">
              {services.slice(0, 5).map((srv, idx) => (
                <div key={srv.id} className="text-xs">
                  <div className="flex items-center justify-between font-medium text-white mb-1">
                    <span className="truncate max-w-[180px]">{srv.name}</span>
                    <span className="text-accent font-semibold">{srv.priceStartingFrom} ₺+</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-accent h-full rounded-full transition-all duration-500"
                      style={{ width: `${100 - idx * 18}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Branch Overview Card */}
          <div className="bg-[#16161a] border border-[#26262b] rounded-xl p-5">
            <h2 className="text-base font-semibold text-white flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-accent" />
              Şube Doluluk Oranları
            </h2>

            <div className="space-y-3 text-xs">
              {branches.map((b) => (
                <div key={b.id} className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{b.name}</p>
                    <p className="text-[11px] text-white/40">{b.district}</p>
                  </div>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    %88 Dolu
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
