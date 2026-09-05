import { useState } from 'react';
import {
  Clock,
  Plus,
  Trash2,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { BranchWorkingHour } from '../../types';

export function WorkingHoursTab() {
  const {
    workingHours,
    updateWorkingHours,
    shifts,
    team,
    holidayLeaves,
    addHolidayLeave,
    deleteHolidayLeave,
  } = useAdmin();

  const [activeSubTab, setActiveSubTab] = useState<'branch' | 'shifts' | 'holidays'>('branch');

  // Add Holiday / Leave Modal state
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [holidayType, setHolidayType] = useState<'holiday' | 'leave'>('holiday');
  const [holidayTitle, setHolidayTitle] = useState('');
  const [holidayStaffId, setHolidayStaffId] = useState('');
  const [holidayStartDate, setHolidayStartDate] = useState('');
  const [holidayEndDate, setHolidayEndDate] = useState('');
  const [holidayNotes, setHolidayNotes] = useState('');

  // Update Branch Working Hour row
  const handleBranchHourChange = (
    dayIndex: number,
    field: keyof BranchWorkingHour,
    value: any
  ) => {
    const updated = workingHours.map((wh) =>
      wh.dayIndex === dayIndex ? { ...wh, [field]: value } : wh
    );
    updateWorkingHours(updated);
  };

  const handleAddHolidayLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!holidayTitle || !holidayStartDate || !holidayEndDate) return;

    const staffObj = team.find((t) => t.id === holidayStaffId);

    addHolidayLeave({
      type: holidayType,
      title: holidayTitle,
      staffId: holidayType === 'leave' ? holidayStaffId : undefined,
      staffName: holidayType === 'leave' ? staffObj?.name : undefined,
      startDate: holidayStartDate,
      endDate: holidayEndDate,
      notes: holidayNotes,
    });

    setIsHolidayModalOpen(false);
    setHolidayTitle('');
    setHolidayStartDate('');
    setHolidayEndDate('');
    setHolidayNotes('');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#16161a] border border-[#26262b] p-4 rounded-xl">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            Çalışma Saatleri, Vardiyalar & İzin Yönetimi
          </h1>
          <p className="text-xs text-white/50 mt-0.5">
            Salon açılış saatleri, personel çalışma programı ve tatil planlama
          </p>
        </div>

        {/* Subtab Switches */}
        <div className="bg-[#202025] border border-[#2e2e36] rounded-lg p-1 flex items-center text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('branch')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeSubTab === 'branch'
                ? 'bg-accent text-background font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Salon Saatleri
          </button>
          <button
            onClick={() => setActiveSubTab('shifts')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeSubTab === 'shifts'
                ? 'bg-accent text-background font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Personel Vardiyaları
          </button>
          <button
            onClick={() => setActiveSubTab('holidays')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeSubTab === 'holidays'
                ? 'bg-accent text-background font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Tatil & İzinler ({holidayLeaves.length})
          </button>
        </div>
      </div>

      {/* 1. Branch Working Hours */}
      {activeSubTab === 'branch' && (
        <div className="bg-[#16161a] border border-[#26262b] rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#26262b]">
            <span className="text-sm font-bold text-white">
              Haftalık Salon Açılış & Kapanış Programı
            </span>
            <span className="text-xs text-accent">Otomatik Kaydedilir</span>
          </div>

          <div className="divide-y divide-[#26262b] text-xs">
            {workingHours.map((wh) => (
              <div
                key={wh.dayIndex}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 w-36">
                  <input
                    type="checkbox"
                    id={`open-${wh.dayIndex}`}
                    checked={wh.isOpen}
                    onChange={(e) =>
                      handleBranchHourChange(wh.dayIndex, 'isOpen', e.target.checked)
                    }
                    className="w-4 h-4 accent-accent cursor-pointer"
                  />
                  <label
                    htmlFor={`open-${wh.dayIndex}`}
                    className="font-bold text-white cursor-pointer"
                  >
                    {wh.dayName}
                  </label>
                </div>

                {wh.isOpen ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white/50 text-[11px]">Açılış:</span>
                      <input
                        type="time"
                        value={wh.openTime}
                        onChange={(e) =>
                          handleBranchHourChange(
                            wh.dayIndex,
                            'openTime',
                            e.target.value
                          )
                        }
                        className="bg-[#202025] border border-[#2e2e36] rounded-lg px-2.5 py-1 text-white text-xs"
                      />
                    </div>
                    <span className="text-white/30">—</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white/50 text-[11px]">Kapanış:</span>
                      <input
                        type="time"
                        value={wh.closeTime}
                        onChange={(e) =>
                          handleBranchHourChange(
                            wh.dayIndex,
                            'closeTime',
                            e.target.value
                          )
                        }
                        className="bg-[#202025] border border-[#2e2e36] rounded-lg px-2.5 py-1 text-white text-xs"
                      />
                    </div>
                  </div>
                ) : (
                  <span className="text-rose-400 font-semibold bg-rose-500/10 px-3 py-1 rounded-md">
                    Kapalı (Tatil Günü)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Staff Shifts */}
      {activeSubTab === 'shifts' && (
        <div className="bg-[#16161a] border border-[#26262b] rounded-xl p-5 space-y-4">
          <div className="pb-3 border-b border-[#26262b]">
            <h3 className="text-sm font-bold text-white">
              Uzman Haftalık Vardiya ve Şube Planı
            </h3>
            <p className="text-xs text-white/50 mt-0.5">
              Her uzmanın haftanın günlerine göre çalışma saatleri ve görevli olduğu şube
            </p>
          </div>

          <div className="space-y-4">
            {team.map((st) => (
              <div
                key={st.id}
                className="bg-[#1c1c22] border border-[#2e2e36] rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <img
                      src={st.avatar}
                      alt={st.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{st.name}</h4>
                      <p className="text-[10px] text-accent">{st.role}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-white/40">
                    Haftalık 45 Saat Planlı
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-[11px]">
                  {workingHours.map((wh) => {
                    const shift = shifts.find(
                      (s) => s.staffId === st.id && s.dayIndex === wh.dayIndex
                    );
                    const isWorking = shift ? shift.isWorking : true;

                    return (
                      <div
                        key={wh.dayIndex}
                        className={`p-2 rounded-lg border text-center ${
                          isWorking
                            ? 'bg-[#16161a] border-white/10 text-white'
                            : 'bg-rose-500/5 border-rose-500/20 text-white/40'
                        }`}
                      >
                        <span className="font-bold block text-[10px] uppercase text-white/70">
                          {wh.dayName.substring(0, 3)}
                        </span>
                        <span className="text-accent font-mono text-[10px] block mt-1">
                          {isWorking ? (shift ? `${shift.startTime}-${shift.endTime}` : '09:00-18:00') : 'İzinli'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Holidays & Leaves */}
      {activeSubTab === 'holidays' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-[#16161a] border border-[#26262b] p-4 rounded-xl">
            <span className="text-xs text-white/60">
              Planlanan Resmi Tatiller ve Personel Yıllık İzinleri
            </span>
            <button
              onClick={() => setIsHolidayModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent/90 text-background font-semibold text-xs rounded-lg transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Tatil / İzin Ekle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {holidayLeaves.map((hl) => (
              <div
                key={hl.id}
                className="bg-[#16161a] border border-[#26262b] rounded-xl p-4 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        hl.type === 'holiday'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      }`}
                    >
                      {hl.type === 'holiday' ? 'Resmi Tatil' : 'Personel İzni'}
                    </span>
                    <h3 className="font-bold text-white text-sm">{hl.title}</h3>
                  </div>

                  {hl.staffName && (
                    <p className="text-accent font-medium">
                      Personel: {hl.staffName}
                    </p>
                  )}

                  <p className="text-white/60 font-mono text-[11px]">
                    {hl.startDate} — {hl.endDate}
                  </p>

                  {hl.notes && (
                    <p className="text-white/40 text-[11px] italic">
                      "{hl.notes}"
                    </p>
                  )}
                </div>

                <button
                  onClick={() => deleteHolidayLeave(hl.id)}
                  className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-md border border-rose-500/20 shrink-0"
                  title="Sil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Holiday/Leave Modal */}
      {isHolidayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-[#16161a] border border-[#26262b] rounded-2xl p-6 space-y-4 animate-fade-in text-xs text-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#26262b]">
              <h3 className="text-sm font-bold text-white">
                Yeni Tatil veya İzin Kaydı
              </h3>
              <button
                onClick={() => setIsHolidayModalOpen(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddHolidayLeave} className="space-y-3">
              <div>
                <label className="block text-white/60 mb-1 font-medium">Tür</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setHolidayType('holiday')}
                    className={`py-2 rounded-lg font-bold transition-colors ${
                      holidayType === 'holiday'
                        ? 'bg-accent text-background'
                        : 'bg-white/5 text-white/60'
                    }`}
                  >
                    Resmi / Salon Tatili
                  </button>
                  <button
                    type="button"
                    onClick={() => setHolidayType('leave')}
                    className={`py-2 rounded-lg font-bold transition-colors ${
                      holidayType === 'leave'
                        ? 'bg-accent text-background'
                        : 'bg-white/5 text-white/60'
                    }`}
                  >
                    Personel İzni
                  </button>
                </div>
              </div>

              {holidayType === 'leave' && (
                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Personel Seçin *
                  </label>
                  <select
                    value={holidayStaffId}
                    onChange={(e) => setHolidayStaffId(e.target.value)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden"
                  >
                    <option value="">Seçiniz...</option>
                    {team.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.role})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Başlık / Sebep *
                </label>
                <input
                  type="text"
                  required
                  value={holidayTitle}
                  onChange={(e) => setHolidayTitle(e.target.value)}
                  placeholder="Örn: Yıllık İzin veya Bayram Tatili"
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Başlangıç Tarihi *
                  </label>
                  <input
                    type="date"
                    required
                    value={holidayStartDate}
                    onChange={(e) => setHolidayStartDate(e.target.value)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Bitiş Tarihi *
                  </label>
                  <input
                    type="date"
                    required
                    value={holidayEndDate}
                    onChange={(e) => setHolidayEndDate(e.target.value)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Notlar
                </label>
                <textarea
                  rows={2}
                  value={holidayNotes}
                  onChange={(e) => setHolidayNotes(e.target.value)}
                  placeholder="Ek açıklama..."
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-accent hover:bg-accent/90 text-background font-bold rounded-lg transition-colors"
                >
                  Kaydet
                </button>
                <button
                  type="button"
                  onClick={() => setIsHolidayModalOpen(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/15"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
