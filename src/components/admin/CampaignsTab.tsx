import { useState } from 'react';
import {
  Tag,
  Plus,
  Edit2,
  Trash2,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { CampaignItem } from '../../types';

export function CampaignsTab() {
  const {
    campaigns,
    addCampaign,
    updateCampaign,
    toggleCampaignActive,
    deleteCampaign,
  } = useAdmin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState(15);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minSpend, setMinSpend] = useState(2000);
  const [isActive, setIsActive] = useState(true);

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setCode('PROMO' + Math.floor(100 + Math.random() * 900));
    setDiscountType('percentage');
    setDiscountValue(15);
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate(new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0]);
    setMinSpend(2000);
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cmp: CampaignItem) => {
    setEditingId(cmp.id);
    setTitle(cmp.title);
    setDescription(cmp.description);
    setCode(cmp.code);
    setDiscountType(cmp.discountType);
    setDiscountValue(cmp.discountValue);
    setStartDate(cmp.startDate);
    setEndDate(cmp.endDate);
    setMinSpend(cmp.minSpend || 0);
    setIsActive(cmp.isActive);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !code) return;

    if (editingId) {
      updateCampaign(editingId, {
        title,
        description,
        code: code.toUpperCase().trim(),
        discountType,
        discountValue,
        startDate,
        endDate,
        minSpend,
        isActive,
      });
    } else {
      addCampaign({
        title,
        description,
        code: code.toUpperCase().trim(),
        discountType,
        discountValue,
        startDate,
        endDate,
        minSpend,
        applicableServiceIds: [],
        applicableBranchIds: [],
        isActive,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#16161a] border border-[#26262b] p-4 rounded-xl">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-accent" />
            Kampanyalar & İndirim Kuponları
          </h1>
          <p className="text-xs text-white/50 mt-0.5">
            Toplam {campaigns.length} aktif / planlanan promosyon
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent/90 text-background font-semibold text-xs rounded-lg transition-colors shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Kampanya Oluştur</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((cmp) => (
          <div
            key={cmp.id}
            className={`bg-[#16161a] border rounded-xl p-5 flex flex-col justify-between space-y-4 transition-colors ${
              cmp.isActive
                ? 'border-[#26262b] hover:border-accent/40'
                : 'border-white/5 opacity-60'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-accent bg-accent/15 px-2.5 py-1 rounded-md border border-accent/30 tracking-wider">
                  {cmp.code}
                </span>

                <button
                  onClick={() => toggleCampaignActive(cmp.id)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    cmp.isActive
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  {cmp.isActive ? 'Aktif' : 'Pasif'}
                </button>
              </div>

              <h3 className="text-sm font-bold text-white">{cmp.title}</h3>
              <p className="text-xs text-white/60">{cmp.description}</p>
            </div>

            {/* Metrics */}
            <div className="p-3 bg-[#1c1c22] rounded-lg border border-white/5 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/50">İndirim Oranı:</span>
                <span className="font-bold text-accent">
                  {cmp.discountType === 'percentage'
                    ? `%${cmp.discountValue}`
                    : `${cmp.discountValue} ₺`}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/50">Min. Harcama:</span>
                <span className="text-white font-medium">
                  {cmp.minSpend ? `${cmp.minSpend.toLocaleString('tr-TR')} ₺` : 'Yok'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/50">Geçerlilik:</span>
                <span className="text-white/80 font-mono text-[11px]">
                  {cmp.startDate} ~ {cmp.endDate}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <span className="text-white/40 text-[11px]">Kullanım Sayısı:</span>
                <span className="font-bold text-white">{cmp.usageCount} kez</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-[#26262b] flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(cmp)}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white rounded-md text-xs font-medium border border-white/5 flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3 text-accent" />
                Düzenle
              </button>
              <button
                onClick={() => {
                  if (confirm(`"${cmp.title}" kampanyasını silmek istediğinize emin misiniz?`)) {
                    deleteCampaign(cmp.id);
                  }
                }}
                className="p-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-md border border-rose-500/20"
                title="Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Campaign Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-[#16161a] border border-[#26262b] rounded-2xl p-6 space-y-4 animate-fade-in text-xs text-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-[#26262b]">
              <h3 className="text-sm font-bold text-white">
                {editingId ? 'Kampanyayı Düzenle' : 'Yeni Kampanya Oluştur'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Kampanya Başlığı *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örn: Sonbahar Işıltı Sezonu"
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Kupon Kodu (PROMO CODE) *
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="AUTUMN26"
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 font-mono text-accent uppercase font-bold focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    İndirim Tipi
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden"
                  >
                    <option value="percentage">Yüzde (%)</option>
                    <option value="fixed">Sabit Tutar (₺)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    İndirim Değeri *
                  </label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Başlangıç Tarihi
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Bitiş Tarihi
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Minimum Sepet / Harcama Tutarı (₺)
                </label>
                <input
                  type="number"
                  value={minSpend}
                  onChange={(e) => setMinSpend(Number(e.target.value))}
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Açıklama
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Kampanya şartları ve kapsamı..."
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="cmpActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 accent-accent"
                />
                <label htmlFor="cmpActive" className="text-white/80 cursor-pointer">
                  Kampanyayı hemen aktif et
                </label>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-accent hover:bg-accent/90 text-background font-bold rounded-lg transition-colors"
                >
                  {editingId ? 'Değişiklikleri Kaydet' : 'Kampanyayı Başlat'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
