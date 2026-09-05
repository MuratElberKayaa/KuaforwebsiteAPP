import { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export function CustomersTab() {
  const {
    customers,
    appointments,
    services,
    team,
    addCustomer,
    addCustomerFormulaNote,
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    customers[0]?.id || null
  );

  // Add Customer modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newTags, setNewTags] = useState('Yeni Müşteri');

  // Add Formula Note modal state
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);
  const [formulaServiceName, setFormulaServiceName] = useState('');
  const [formulaStylistName, setFormulaStylistName] = useState('Selin Varol');
  const [formulaText, setFormulaText] = useState('');
  const [formulaNotes, setFormulaNotes] = useState('');

  // Selected customer object
  const selectedCustomer =
    customers.find((c) => c.id === selectedCustomerId) || null;

  // Filtered customers
  const filteredCustomers = customers.filter(
    (c) =>
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.tags && c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Customer appointments
  const customerAppointments = appointments.filter((a) => {
    if (!selectedCustomer) return false;
    return (
      a.customerPhone.replace(/\s+/g, '') ===
        selectedCustomer.phone.replace(/\s+/g, '') ||
      a.customerName.toLowerCase() === selectedCustomer.fullName.toLowerCase()
    );
  });

  const getServiceName = (id: string) =>
    services.find((s) => s.id === id)?.name || id;
  const getStaffName = (id: string) =>
    team.find((t) => t.id === id)?.name || id;

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newPhone) return;

    const created = addCustomer({
      fullName: newFullName,
      phone: newPhone,
      email: newEmail || undefined,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      generalNotes: newNotes,
    });

    setSelectedCustomerId(created.id);
    setIsAddModalOpen(false);
    setNewFullName('');
    setNewPhone('');
    setNewEmail('');
    setNewNotes('');
  };

  const handleCreateFormula = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || !formulaText) return;

    addCustomerFormulaNote(selectedCustomer.id, {
      date: new Date().toISOString().split('T')[0],
      serviceName: formulaServiceName || 'Teknik Saç Boyama & Cila',
      stylistName: formulaStylistName,
      formula: formulaText,
      notes: formulaNotes,
    });

    setIsFormulaModalOpen(false);
    setFormulaText('');
    setFormulaNotes('');
  };

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#16161a] border border-[#26262b] p-4 rounded-xl">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            Müşteri CRM & Saç Formül Defteri
          </h1>
          <p className="text-xs text-white/50 mt-0.5">
            Toplam {customers.length} kayıtlı misafir ve teknik boya/bakım reçeteleri
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Müşteri adı, tel veya etiket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#202025] border border-[#2e2e36] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-accent w-56 sm:w-64"
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent/90 text-background font-semibold text-xs rounded-lg transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Müşteri</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Customer List Left (40%), Profile & Formula notebook Right (60%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Customer List */}
        <div className="lg:col-span-5 bg-[#16161a] border border-[#26262b] rounded-xl overflow-hidden flex flex-col h-[700px]">
          <div className="p-3 bg-[#1c1c22] border-b border-[#26262b] text-xs font-semibold text-white/60 flex items-center justify-between">
            <span>Misafir Listesi ({filteredCustomers.length})</span>
            <span className="text-[10px] text-accent">Seçmek için dokunun</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#26262b] custom-scrollbar">
            {filteredCustomers.length === 0 ? (
              <div className="py-12 text-center text-white/40 text-xs">
                Müşteri bulunamadı.
              </div>
            ) : (
              filteredCustomers.map((cust) => {
                const isSelected = selectedCustomer?.id === cust.id;
                return (
                  <div
                    key={cust.id}
                    onClick={() => setSelectedCustomerId(cust.id)}
                    className={`p-3.5 cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-accent/15 border-l-4 border-l-accent'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-[#26262f] border border-white/10 flex items-center justify-center text-accent font-bold text-xs shrink-0 overflow-hidden">
                        {cust.avatar ? (
                          <img
                            src={cust.avatar}
                            alt={cust.fullName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          cust.fullName.substring(0, 2).toUpperCase()
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-white truncate">
                            {cust.fullName}
                          </p>
                          {cust.tags && cust.tags.length > 0 && (
                            <span className="text-[9px] bg-accent/20 text-accent px-1.5 py-0.2 rounded font-medium truncate">
                              {cust.tags[0]}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-white/50 truncate mt-0.5">
                          {cust.phone}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-white block">
                        {cust.totalSpent.toLocaleString('tr-TR')} ₺
                      </span>
                      <span className="text-[10px] text-white/40 block">
                        {cust.totalVisits} randevu
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Customer Details, Formula Notebook, History */}
        <div className="lg:col-span-7 bg-[#16161a] border border-[#26262b] rounded-xl p-5 overflow-y-auto h-[700px] space-y-5 custom-scrollbar">
          {selectedCustomer ? (
            <>
              {/* Profile Card Header */}
              <div className="bg-[#1c1c22] border border-[#2e2e36] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-[#26262f] border border-accent/40 flex items-center justify-center text-accent font-bold text-base overflow-hidden shrink-0">
                    {selectedCustomer.avatar ? (
                      <img
                        src={selectedCustomer.avatar}
                        alt={selectedCustomer.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      selectedCustomer.fullName.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">
                      {selectedCustomer.fullName}
                    </h2>
                    <div className="flex items-center gap-3 text-xs text-white/60 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-accent">
                        <Phone className="w-3 h-3" />
                        {selectedCustomer.phone}
                      </span>
                      {selectedCustomer.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {selectedCustomer.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                  <span className="text-xs text-white/40">Toplam Ciro</span>
                  <span className="text-base font-bold text-accent">
                    {selectedCustomer.totalSpent.toLocaleString('tr-TR')} ₺
                  </span>
                  <span className="text-[11px] text-white/50">
                    {selectedCustomer.totalVisits} Ziyaret
                  </span>
                </div>
              </div>

              {/* Tags & General Notes */}
              <div className="bg-[#1c1c22] border border-[#2e2e36] rounded-xl p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white/50 uppercase tracking-wider text-[11px]">
                    Müşteri Etiketleri & Tercihler
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selectedCustomer.tags?.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-accent/15 text-accent rounded-md text-[11px] font-medium border border-accent/30"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {selectedCustomer.generalNotes && (
                  <p className="text-white/80 italic mt-2 bg-black/20 p-2.5 rounded-lg border border-white/5">
                    "{selectedCustomer.generalNotes}"
                  </p>
                )}
              </div>

              {/* Technical Formula Notebook (Saç Reçeteleri) */}
              <div className="bg-[#1c1c22] border border-[#2e2e36] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Teknik Saç Formül Defteri
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsFormulaModalOpen(true)}
                    className="px-2.5 py-1 bg-accent hover:bg-accent/90 text-background font-semibold text-[11px] rounded-md transition-colors"
                  >
                    + Formül Ekle
                  </button>
                </div>

                {(!selectedCustomer.formulaNotes ||
                  selectedCustomer.formulaNotes.length === 0) ? (
                  <div className="py-6 text-center text-white/40 text-xs bg-black/20 rounded-lg border border-white/5">
                    Bu müşteri için henüz teknik boya/açıcı formülü kaydedilmedi.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {selectedCustomer.formulaNotes.map((fn) => (
                      <div
                        key={fn.id}
                        className="p-3 bg-[#16161a] rounded-lg border border-white/10 space-y-1.5 text-xs"
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span className="text-accent">{fn.serviceName}</span>
                          <span className="text-white/40 text-[10px]">
                            {fn.date} • {fn.stylistName}
                          </span>
                        </div>
                        <div className="bg-black/30 p-2 rounded-md font-mono text-[11px] text-emerald-300 border border-emerald-500/20">
                          {fn.formula}
                        </div>
                        {fn.notes && (
                          <p className="text-white/60 text-[11px]">
                            {fn.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Appointment History */}
              <div className="bg-[#1c1c22] border border-[#2e2e36] rounded-xl p-4 space-y-3 text-xs">
                <h3 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  Randevu Geçmişi ({customerAppointments.length})
                </h3>

                {customerAppointments.length === 0 ? (
                  <p className="text-white/40 text-xs py-4 text-center">
                    Kayıtlı randevu bulunmuyor.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {customerAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="p-2.5 rounded-lg bg-[#16161a] border border-white/5 flex items-center justify-between"
                      >
                        <div>
                          <span className="font-semibold text-white block">
                            {apt.serviceIds.map(getServiceName).join(' + ')}
                          </span>
                          <span className="text-[11px] text-white/40">
                            {apt.date} • {apt.timeSlot} • Uzman:{' '}
                            {getStaffName(apt.staffId)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-accent font-bold block">
                            {apt.price} ₺
                          </span>
                          <span className="text-[10px] text-white/50 uppercase font-semibold">
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="py-24 text-center text-white/40">
              Detayları görüntülemek için soldaki listeden bir müşteri seçin.
            </div>
          )}
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-[#16161a] border border-[#26262b] rounded-2xl p-6 space-y-4 animate-fade-in text-xs text-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#26262b]">
              <h3 className="text-sm font-bold text-white">Yeni Müşteri Ekle</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-3">
              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
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
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="05XX XXX XX XX"
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  E-posta (İsteğe bağlı)
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="ayse@example.com"
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Etiketler (Virgülle ayırın)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="VIP, Hassas Saç, Balayage"
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Özel Notlar
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Müşteri tercihleri, içecek ikramı vb."
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-accent hover:bg-accent/90 text-background font-bold rounded-lg transition-colors"
                >
                  Müşteriyi Kaydet
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/15"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Formula Modal */}
      {isFormulaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-[#16161a] border border-[#26262b] rounded-2xl p-6 space-y-4 animate-fade-in text-xs text-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#26262b]">
              <h3 className="text-sm font-bold text-white">
                Teknik Boya / Bakım Formülü Ekle
              </h3>
              <button
                onClick={() => setIsFormulaModalOpen(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateFormula} className="space-y-3">
              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Hizmet Adı
                </label>
                <input
                  type="text"
                  value={formulaServiceName}
                  onChange={(e) => setFormulaServiceName(e.target.value)}
                  placeholder="Artisanal Balayage & Gloss"
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Uygulayan Uzman
                </label>
                <select
                  value={formulaStylistName}
                  onChange={(e) => setFormulaStylistName(e.target.value)}
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden"
                >
                  {team.map((st) => (
                    <option key={st.id} value={st.name}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Teknik Reçete & Karışım Oranları *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formulaText}
                  onChange={(e) => setFormulaText(e.target.value)}
                  placeholder="Örn: Blond Studio 9 + 30vol (1:1.5). Cila: Dia Light 9.12 (25g) + 9.02 (10g) + 6vol. Bekletme: 18dk."
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 font-mono text-emerald-300 text-xs focus:outline-hidden focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  İşlem Notları & Gözlemler
                </label>
                <input
                  type="text"
                  value={formulaNotes}
                  onChange={(e) => setFormulaNotes(e.target.value)}
                  placeholder="K18 mist uygulandı, saç uçları çok sağlıklı."
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-accent hover:bg-accent/90 text-background font-bold rounded-lg transition-colors"
                >
                  Formülü Kaydet
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormulaModalOpen(false)}
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
