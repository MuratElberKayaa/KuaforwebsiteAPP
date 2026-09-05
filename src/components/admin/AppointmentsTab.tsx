import { useState } from 'react';
import {
  Calendar as CalendarIcon,
  User,
  Search,
  Plus,
  Edit2,
  Phone,
  Mail,
  Check,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminAppointment, AppointmentStatus } from '../../types';

interface AppointmentsTabProps {
  onOpenCreateModal: () => void;
  selectedAppointment: AdminAppointment | null;
  onSelectAppointment: (apt: AdminAppointment | null) => void;
}

export function AppointmentsTab({
  onOpenCreateModal,
  selectedAppointment,
  onSelectAppointment,
}: AppointmentsTabProps) {
  const {
    appointments,
    services,
    team,
    branches,
    selectedBranchFilter,
    updateAppointmentStatus,
    rescheduleAppointment,
    updateAppointmentNotes,
  } = useAdmin();

  const [viewMode, setViewMode] = useState<'table' | 'day' | 'week'>('table');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stylistFilter, setStylistFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Reschedule state
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('10:00');

  // Internal note editing
  const [internalNoteInput, setInternalNoteInput] = useState('');

  // Filtering
  const filtered = appointments.filter((apt) => {
    const matchBranch =
      selectedBranchFilter === 'all' || apt.branchId === selectedBranchFilter;
    const matchStatus = statusFilter === 'all' || apt.status === statusFilter;
    const matchStylist = stylistFilter === 'all' || apt.staffId === stylistFilter;
    const matchSearch =
      searchQuery === '' ||
      apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.customerPhone.includes(searchQuery) ||
      apt.bookingCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBranch && matchStatus && matchStylist && matchSearch;
  });

  const getServiceName = (id: string) =>
    services.find((s) => s.id === id)?.name || id;
  const getStaffName = (id: string) =>
    team.find((t) => t.id === id)?.name || 'Uzman';
  const getBranchName = (id: string) =>
    branches.find((b) => b.id === id)?.name || 'Şube';

  const statusConfig: Record<
    AppointmentStatus,
    { label: string; bg: string; text: string; border: string }
  > = {
    pending: {
      label: 'Onay Bekliyor',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
    },
    confirmed: {
      label: 'Onaylandı',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
    },
    completed: {
      label: 'Tamamlandı',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
    },
    cancelled: {
      label: 'İptal Edildi',
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      border: 'border-rose-500/30',
    },
    no_show: {
      label: 'Gelmedi',
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
    },
  };

  const handleOpenDetail = (apt: AdminAppointment) => {
    onSelectAppointment(apt);
    setInternalNoteInput(apt.internalStaffNote || '');
    setIsRescheduling(false);
    setRescheduleDate(apt.date);
    setRescheduleTime(apt.timeSlot);
  };

  const handleSaveReschedule = () => {
    if (selectedAppointment && rescheduleDate && rescheduleTime) {
      rescheduleAppointment(selectedAppointment.id, rescheduleDate, rescheduleTime);
      setIsRescheduling(false);
      onSelectAppointment({
        ...selectedAppointment,
        date: rescheduleDate,
        timeSlot: rescheduleTime,
      });
    }
  };

  const handleSaveNotes = () => {
    if (selectedAppointment) {
      updateAppointmentNotes(selectedAppointment.id, internalNoteInput);
      onSelectAppointment({
        ...selectedAppointment,
        internalStaffNote: internalNoteInput,
      });
    }
  };

  return (
    <div className="space-y-5">
      {/* Header & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#16161a] border border-[#26262b] p-4 rounded-xl">
        {/* Left: Title & View Switches */}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-accent" />
            Randevu Yönetimi & Takvim
          </h1>

          <div className="bg-[#202025] border border-[#2e2e36] rounded-lg p-1 flex items-center text-xs">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-accent text-background font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Liste
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                viewMode === 'day'
                  ? 'bg-accent text-background font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Günlük
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                viewMode === 'week'
                  ? 'bg-accent text-background font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Haftalık
            </button>
          </div>
        </div>

        {/* Right: Search & Create Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="İsim, telefon veya kod..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#202025] border border-[#2e2e36] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-accent w-48 sm:w-56"
            />
          </div>

          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent/90 text-background font-semibold text-xs rounded-lg transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Randevu</span>
          </button>
        </div>
      </div>

      {/* Filter Row: Status pills & Stylist selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#16161a] border border-[#26262b] px-4 py-3 rounded-xl text-xs">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'all', label: 'Tümü', count: filtered.length },
            {
              id: 'pending',
              label: 'Bekleyen',
              count: appointments.filter((a) => a.status === 'pending').length,
            },
            {
              id: 'confirmed',
              label: 'Onaylanan',
              count: appointments.filter((a) => a.status === 'confirmed').length,
            },
            {
              id: 'completed',
              label: 'Tamamlanan',
              count: appointments.filter((a) => a.status === 'completed').length,
            },
            {
              id: 'cancelled',
              label: 'İptal',
              count: appointments.filter((a) => a.status === 'cancelled').length,
            },
            {
              id: 'no_show',
              label: 'Gelmedi',
              count: appointments.filter((a) => a.status === 'no_show').length,
            },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium shrink-0 flex items-center gap-1.5 ${
                statusFilter === st.id
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{st.label}</span>
              <span className="text-[10px] opacity-70 bg-black/30 px-1.5 py-0.2 rounded-full">
                {st.count}
              </span>
            </button>
          ))}
        </div>

        {/* Stylist Filter */}
        <div className="flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-accent shrink-0" />
          <select
            value={stylistFilter}
            onChange={(e) => setStylistFilter(e.target.value)}
            className="bg-[#202025] border border-[#2e2e36] rounded-lg px-2.5 py-1 text-white focus:outline-hidden text-xs"
          >
            <option value="all">Tüm Uzmanlar</option>
            {team.map((st) => (
              <option key={st.id} value={st.id}>
                {st.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Table / Calendar View */}
      {viewMode === 'table' && (
        <div className="bg-[#16161a] border border-[#26262b] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1c1c22] text-white/50 border-b border-[#26262b] uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Kod & Tarih</th>
                  <th className="py-3 px-4">Müşteri</th>
                  <th className="py-3 px-4">Hizmet(ler)</th>
                  <th className="py-3 px-4">Uzman & Şube</th>
                  <th className="py-3 px-4">Tutar</th>
                  <th className="py-3 px-4">Durum</th>
                  <th className="py-3 px-4 text-right">Eylemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#26262b] text-white/80">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-white/40">
                      Eşleşen randevu bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filtered.map((apt) => {
                    const st = statusConfig[apt.status];
                    return (
                      <tr
                        key={apt.id}
                        onClick={() => handleOpenDetail(apt)}
                        className="hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <td className="py-3.5 px-4 font-mono font-medium">
                          <span className="text-accent font-bold block">
                            {apt.bookingCode}
                          </span>
                          <span className="text-[11px] text-white/50 block">
                            {apt.date} • {apt.timeSlot}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-white block">
                            {apt.customerName}
                          </span>
                          <span className="text-[11px] text-white/40 block">
                            {apt.customerPhone}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 max-w-[220px]">
                          <span className="font-medium text-white truncate block">
                            {apt.serviceIds.map(getServiceName).join(', ')}
                          </span>
                          <span className="text-[11px] text-white/40 block">
                            {apt.durationMinutes} dakika
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="text-white block font-medium">
                            {getStaffName(apt.staffId)}
                          </span>
                          <span className="text-[11px] text-white/40 block">
                            {getBranchName(apt.branchId)}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-semibold text-accent">
                          {apt.price.toLocaleString('tr-TR')} ₺
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${st.bg} ${st.text} ${st.border}`}
                          >
                            {st.label}
                          </span>
                        </td>

                        <td
                          className="py-3.5 px-4 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1.5">
                            {apt.status === 'pending' && (
                              <button
                                onClick={() =>
                                  updateAppointmentStatus(apt.id, 'confirmed')
                                }
                                title="Onayla"
                                className="p-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-md border border-emerald-500/30"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => handleOpenDetail(apt)}
                              className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white rounded-md border border-white/5 text-[11px]"
                            >
                              Detay
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Day / Week Calendar Simulator View */}
      {(viewMode === 'day' || viewMode === 'week') && (
        <div className="bg-[#16161a] border border-[#26262b] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#26262b]">
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-[#202025] border border-[#2e2e36] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-hidden"
              />
              <span className="text-xs text-white/50">
                Seçili gün: <strong>{selectedDate}</strong>
              </span>
            </div>
            <span className="text-xs text-accent font-semibold">
              {filtered.filter((a) => a.date === selectedDate).length} Randevu
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered
              .filter((a) => a.date === selectedDate)
              .map((apt) => (
                <div
                  key={apt.id}
                  onClick={() => handleOpenDetail(apt)}
                  className="p-3.5 rounded-xl bg-[#1c1c22] border border-[#2e2e36] hover:border-accent/40 cursor-pointer transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-accent">
                      {apt.timeSlot} ({apt.durationMinutes} dk)
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold ${
                        statusConfig[apt.status].bg
                      } ${statusConfig[apt.status].text} ${
                        statusConfig[apt.status].border
                      }`}
                    >
                      {statusConfig[apt.status].label}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {apt.customerName}
                    </h4>
                    <p className="text-xs text-white/70">
                      {apt.serviceIds.map(getServiceName).join(' + ')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-white/40 pt-1 border-t border-white/5">
                    <span>{getStaffName(apt.staffId)}</span>
                    <span className="text-accent font-bold">{apt.price} ₺</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Appointment Detail Drawer / Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg h-full bg-[#16161a] border-l border-[#26262b] p-6 flex flex-col justify-between overflow-y-auto custom-scrollbar">
            {/* Drawer Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#26262b]">
                <div>
                  <span className="text-xs font-mono text-accent font-bold">
                    {selectedAppointment.bookingCode}
                  </span>
                  <h2 className="text-lg font-bold text-white">
                    Randevu Detayı
                  </h2>
                </div>
                <button
                  onClick={() => onSelectAppointment(null)}
                  className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5"
                >
                  ✕
                </button>
              </div>

              {/* Status Banner */}
              <div className="flex items-center justify-between bg-[#1c1c22] p-3 rounded-xl border border-[#2e2e36]">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/50">Mevcut Durum:</span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-md font-bold border ${
                      statusConfig[selectedAppointment.status].bg
                    } ${statusConfig[selectedAppointment.status].text} ${
                      statusConfig[selectedAppointment.status].border
                    }`}
                  >
                    {statusConfig[selectedAppointment.status].label}
                  </span>
                </div>

                {/* Quick Status Modifiers */}
                <div className="flex items-center gap-1.5">
                  {selectedAppointment.status !== 'confirmed' && (
                    <button
                      onClick={() =>
                        updateAppointmentStatus(selectedAppointment.id, 'confirmed')
                      }
                      className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-md text-xs font-semibold"
                    >
                      Onayla
                    </button>
                  )}
                  {selectedAppointment.status !== 'completed' && (
                    <button
                      onClick={() =>
                        updateAppointmentStatus(selectedAppointment.id, 'completed')
                      }
                      className="px-2.5 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-md text-xs font-semibold"
                    >
                      Tamamla
                    </button>
                  )}
                  {selectedAppointment.status !== 'no_show' && (
                    <button
                      onClick={() =>
                        updateAppointmentStatus(selectedAppointment.id, 'no_show')
                      }
                      className="px-2 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-md text-xs"
                    >
                      Gelmedi
                    </button>
                  )}
                  {selectedAppointment.status !== 'cancelled' && (
                    <button
                      onClick={() =>
                        updateAppointmentStatus(selectedAppointment.id, 'cancelled')
                      }
                      className="px-2 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-md text-xs"
                    >
                      İptal
                    </button>
                  )}
                </div>
              </div>

              {/* Customer Info Card */}
              <div className="bg-[#1c1c22] p-4 rounded-xl border border-[#2e2e36] space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  Müşteri Bilgileri
                </h3>
                <p className="text-base font-bold text-white">
                  {selectedAppointment.customerName}
                </p>
                <div className="flex items-center gap-4 text-xs text-white/70">
                  <a
                    href={`tel:${selectedAppointment.customerPhone}`}
                    className="flex items-center gap-1 text-accent hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {selectedAppointment.customerPhone}
                  </a>
                  {selectedAppointment.customerEmail && (
                    <span className="flex items-center gap-1 text-white/50">
                      <Mail className="w-3.5 h-3.5" />
                      {selectedAppointment.customerEmail}
                    </span>
                  )}
                </div>
                {selectedAppointment.customerNote && (
                  <div className="mt-2 p-2.5 bg-black/20 rounded-lg text-xs text-amber-200/90 border border-amber-500/20">
                    <strong>Müşteri Notu:</strong> {selectedAppointment.customerNote}
                  </div>
                )}
              </div>

              {/* Service & Schedule Card */}
              <div className="bg-[#1c1c22] p-4 rounded-xl border border-[#2e2e36] space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-white/50 font-semibold uppercase tracking-wider text-[11px]">
                    Hizmet Detayı
                  </span>
                  <span className="text-accent font-bold text-sm">
                    {selectedAppointment.price.toLocaleString('tr-TR')} ₺
                  </span>
                </div>

                <div className="space-y-1">
                  {selectedAppointment.serviceIds.map((sid) => (
                    <div
                      key={sid}
                      className="flex items-center justify-between text-white font-medium"
                    >
                      <span>• {getServiceName(sid)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-white/70">
                  <div>
                    <span className="text-white/40 block text-[10px]">Uzman</span>
                    <strong>{getStaffName(selectedAppointment.staffId)}</strong>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">Şube</span>
                    <strong>{getBranchName(selectedAppointment.branchId)}</strong>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">Tarih / Saat</span>
                    <strong>
                      {selectedAppointment.date} • {selectedAppointment.timeSlot}
                    </strong>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">Süre</span>
                    <strong>{selectedAppointment.durationMinutes} Dakika</strong>
                  </div>
                </div>

                {/* Reschedule Button or Form */}
                <div className="pt-2">
                  {!isRescheduling ? (
                    <button
                      onClick={() => setIsRescheduling(true)}
                      className="w-full py-1.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-accent" />
                      <span>Tarih / Saati Değiştir (Reschedule)</span>
                    </button>
                  ) : (
                    <div className="p-3 bg-black/40 rounded-xl border border-accent/30 space-y-2">
                      <span className="font-semibold text-white block">
                        Yeni Randevu Zamanı
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="date"
                          value={rescheduleDate}
                          onChange={(e) => setRescheduleDate(e.target.value)}
                          className="bg-[#202025] border border-[#2e2e36] rounded-lg px-2.5 py-1 text-white text-xs"
                        />
                        <input
                          type="time"
                          value={rescheduleTime}
                          onChange={(e) => setRescheduleTime(e.target.value)}
                          className="bg-[#202025] border border-[#2e2e36] rounded-lg px-2.5 py-1 text-white text-xs"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveReschedule}
                          className="flex-1 py-1 bg-accent text-background font-bold rounded-lg"
                        >
                          Kaydet
                        </button>
                        <button
                          onClick={() => setIsRescheduling(false)}
                          className="px-3 py-1 bg-white/10 text-white rounded-lg"
                        >
                          İptal
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stylist Internal Notes & Formula */}
              <div className="bg-[#1c1c22] p-4 rounded-xl border border-[#2e2e36] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                    Dahili Salon & Formül Notu
                  </span>
                  <button
                    onClick={handleSaveNotes}
                    className="text-[11px] text-accent hover:underline font-medium"
                  >
                    Notu Kaydet
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={internalNoteInput}
                  onChange={(e) => setInternalNoteInput(e.target.value)}
                  placeholder="Boya formülü, alerji bilgisi, içecek tercihi vb..."
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-accent"
                />
              </div>
            </div>

            {/* Footer Close */}
            <div className="pt-4 border-t border-[#26262b]">
              <button
                onClick={() => onSelectAppointment(null)}
                className="w-full py-2 bg-white/10 hover:bg-white/15 text-white font-medium rounded-lg text-xs transition-colors"
              >
                Pencereyi Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
