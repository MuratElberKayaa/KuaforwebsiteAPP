import { useState } from 'react';
import {
  Scissors,
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  Clock,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { ServiceItem } from '../../types';

export function ServicesTab() {
  const { services, addService, updateService, deleteService } = useAdmin();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState<'hair' | 'color' | 'care' | 'bridal' | 'men'>('color');
  const [categoryName, setCategoryName] = useState('Renk & Işıltı');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [priceStartingFrom, setPriceStartingFrom] = useState(3500);
  const [image, setImage] = useState('');
  const [isSignature, setIsSignature] = useState(false);

  const categories = [
    { id: 'all', label: 'Tüm Hizmetler' },
    { id: 'color', label: 'Renk & Balayage' },
    { id: 'hair', label: 'Kesim & Şekillendirme' },
    { id: 'care', label: 'Bakım & Ritüel' },
    { id: 'bridal', label: 'Gelin & Couture' },
    { id: 'men', label: 'Erkek Grooming' },
  ];

  const filteredServices = services.filter((s) => {
    const matchCat = categoryFilter === 'all' || s.categoryId === categoryFilter;
    const matchSearch =
      searchQuery === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenAddModal = () => {
    setEditingServiceId(null);
    setName('');
    setSlug('');
    setCategoryId('color');
    setCategoryName('Renk & Işıltı');
    setSubtitle('');
    setDescription('');
    setDurationMinutes(90);
    setPriceStartingFrom(3500);
    setImage('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80');
    setIsSignature(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setName(service.name);
    setSlug(service.slug);
    setCategoryId(service.categoryId);
    setCategoryName(service.categoryName);
    setSubtitle(service.subtitle);
    setDescription(service.description);
    setDurationMinutes(service.durationMinutes);
    setPriceStartingFrom(service.priceStartingFrom);
    setImage(service.image);
    setIsSignature(service.isSignature);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingServiceId) {
      updateService(editingServiceId, {
        name,
        slug: generatedSlug,
        categoryId,
        categoryName,
        subtitle,
        description,
        durationMinutes,
        priceStartingFrom,
        image,
        isSignature,
      });
    } else {
      addService({
        name,
        slug: generatedSlug,
        categoryId,
        categoryName,
        subtitle,
        description,
        durationMinutes,
        priceStartingFrom,
        currency: '₺',
        image,
        isSignature,
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
            <Scissors className="w-5 h-5 text-accent" />
            Hizmet Yönetimi & Fiyatlandırma
          </h1>
          <p className="text-xs text-white/50 mt-0.5">
            Toplam {services.length} hizmet listeleniyor
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Hizmet ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#202025] border border-[#2e2e36] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-accent w-48 sm:w-56"
            />
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent/90 text-background font-semibold text-xs rounded-lg transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Hizmet</span>
          </button>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-[#16161a] border border-[#26262b] p-2.5 rounded-xl text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
              categoryFilter === cat.id
                ? 'bg-accent text-background font-bold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Table */}
      <div className="bg-[#16161a] border border-[#26262b] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1c1c22] text-white/50 border-b border-[#26262b] uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Görsel & Hizmet</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Süre</th>
                <th className="py-3 px-4">Başlangıç Fiyatı</th>
                <th className="py-3 px-4">İmza (Signature)</th>
                <th className="py-3 px-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#26262b] text-white/80">
              {filteredServices.map((srv) => (
                <tr key={srv.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={srv.image}
                        alt={srv.name}
                        className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-white block">
                          {srv.name}
                        </span>
                        <span className="text-[11px] text-white/40 block truncate max-w-xs">
                          {srv.subtitle}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-white/70">{srv.categoryName}</td>

                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-white/80 font-medium">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      {srv.durationMinutes} dk
                    </span>
                  </td>

                  <td className="py-3 px-4 font-bold text-accent">
                    {srv.priceStartingFrom.toLocaleString('tr-TR')} ₺
                  </td>

                  <td className="py-3 px-4">
                    {srv.isSignature ? (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-accent/20 text-accent font-bold px-2 py-0.5 rounded border border-accent/40">
                        <Star className="w-3 h-3 fill-accent" />
                        İmza Deneyim
                      </span>
                    ) : (
                      <span className="text-[11px] text-white/30">Standart</span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEditModal(srv)}
                        className="p-1.5 bg-white/5 hover:bg-white/10 text-white rounded-md border border-white/5"
                        title="Düzenle"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-accent" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`"${srv.name}" hizmetini silmek istediğinize emin misiniz?`)) {
                            deleteService(srv.id);
                          }
                        }}
                        className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-md border border-rose-500/20"
                        title="Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-[#16161a] border border-[#26262b] rounded-2xl p-6 space-y-4 animate-fade-in text-xs text-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-[#26262b]">
              <h3 className="text-sm font-bold text-white">
                {editingServiceId ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}
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
                  Hizmet Adı *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: Artisanal Balayage"
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Kategori
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => {
                      const val = e.target.value as 'hair' | 'color' | 'care' | 'bridal' | 'men';
                      setCategoryId(val);
                      const catNames: Record<'hair' | 'color' | 'care' | 'bridal' | 'men', string> = {
                        color: 'Renk & Işıltı',
                        hair: 'Kesim & Şekillendirme',
                        care: 'Bakım & Ritüel',
                        bridal: 'Gelin & Couture',
                        men: 'Erkek Grooming',
                      };
                      setCategoryName(catNames[val]);
                    }}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden"
                  >
                    <option value="color">Renk & Işıltı</option>
                    <option value="hair">Kesim & Şekillendirme</option>
                    <option value="care">Bakım & Ritüel</option>
                    <option value="bridal">Gelin & Couture</option>
                    <option value="men">Erkek Grooming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Süre (Dakika) *
                  </label>
                  <input
                    type="number"
                    required
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Başlangıç Fiyatı (₺) *
                  </label>
                  <input
                    type="number"
                    required
                    value={priceStartingFrom}
                    onChange={(e) => setPriceStartingFrom(Number(e.target.value))}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="artisanal-balayage"
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Kısa Alt Başlık
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Yüz hatlarınıza özel serbest el ışıltı tekniği"
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Görsel URL
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
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
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isSignature"
                  checked={isSignature}
                  onChange={(e) => setIsSignature(e.target.checked)}
                  className="w-4 h-4 accent-accent"
                />
                <label htmlFor="isSignature" className="text-white/80 cursor-pointer">
                  Bu hizmeti <strong>İmza (Signature Experience)</strong> olarak işaretle
                </label>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-accent hover:bg-accent/90 text-background font-bold rounded-lg transition-colors"
                >
                  {editingServiceId ? 'Değişiklikleri Kaydet' : 'Hizmeti Ekle'}
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
