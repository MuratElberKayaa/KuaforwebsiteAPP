import { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export function PortfolioAdminTab() {
  const {
    portfolioItems,
    addPortfolioItem,
    deletePortfolioItem,
    services,
    team,
  } = useAdmin();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Look modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<any>('balayage');
  const [categoryLabel, setCategoryLabel] = useState('Balayage');
  const [image, setImage] = useState('');
  const [stylistName, setStylistName] = useState('Selin Varol');
  const [serviceName, setServiceName] = useState('Artisanal Balayage');
  const [description, setDescription] = useState('');

  const categories = [
    { id: 'all', label: 'Tüm Çalışmalar' },
    { id: 'balayage', label: 'Balayage' },
    { id: 'renk', label: 'Renk & Ton' },
    { id: 'kesim', label: 'Kesim' },
    { id: 'gelin', label: 'Gelin Saçı' },
    { id: 'styling', label: 'Styling' },
    { id: 'erkek', label: 'Erkek' },
    { id: 'bakim', label: 'Bakım' },
  ];

  const filteredItems = portfolioItems.filter((p) => {
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stylistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image) return;

    addPortfolioItem({
      title,
      category,
      categoryLabel,
      image,
      stylistName,
      serviceName,
      description,
    });

    setIsModalOpen(false);
    setTitle('');
    setImage('');
    setDescription('');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#16161a] border border-[#26262b] p-4 rounded-xl">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-accent" />
            Portfolyo & Lookbook Yönetimi
          </h1>
          <p className="text-xs text-white/50 mt-0.5">
            Toplam {portfolioItems.length} yayınlanmış stüdyo çalışması
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Çalışma veya stilist ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#202025] border border-[#2e2e36] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-accent w-48 sm:w-56"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent/90 text-background font-semibold text-xs rounded-lg transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Çalışma Yükle</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
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

      {/* Portfolio Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#16161a] border border-[#26262b] rounded-xl overflow-hidden flex flex-col justify-between hover:border-accent/40 transition-colors"
          >
            <div className="aspect-3/4 relative overflow-hidden bg-black/40">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2">
                <span className="text-[10px] bg-black/70 backdrop-blur-xs text-accent font-bold px-2 py-0.5 rounded border border-white/10 uppercase">
                  {item.categoryLabel}
                </span>
              </div>
            </div>

            <div className="p-3 space-y-1.5 text-xs">
              <h3 className="font-bold text-white truncate">{item.title}</h3>
              <p className="text-[11px] text-accent truncate">
                {item.serviceName}
              </p>
              <div className="flex items-center justify-between text-[11px] text-white/50 pt-1 border-t border-white/5">
                <span className="truncate">{item.stylistName}</span>
                <button
                  onClick={() => {
                    if (confirm(`"${item.title}" çalışmasını silmek istediğinize emin misiniz?`)) {
                      deletePortfolioItem(item.id);
                    }
                  }}
                  className="p-1 text-rose-400 hover:bg-rose-500/20 rounded transition-colors"
                  title="Sil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Look Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-[#16161a] border border-[#26262b] rounded-2xl p-6 space-y-4 animate-fade-in text-xs text-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#26262b]">
              <h3 className="text-sm font-bold text-white">
                Yeni Portfolyo Görseli Yükle
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Çalışma Başlığı *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örn: Champagne Silk Balayage"
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      setCategory(val);
                      const labels: any = {
                        balayage: 'Balayage',
                        renk: 'Renk & Ton',
                        kesim: 'Kesim',
                        gelin: 'Gelin Saçı',
                        styling: 'Styling',
                        erkek: 'Erkek',
                        bakim: 'Bakım',
                      };
                      setCategoryLabel(labels[val] || 'Stil');
                    }}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden"
                  >
                    <option value="balayage">Balayage</option>
                    <option value="renk">Renk & Ton</option>
                    <option value="kesim">Kesim</option>
                    <option value="gelin">Gelin Saçı</option>
                    <option value="styling">Styling</option>
                    <option value="erkek">Erkek</option>
                    <option value="bakim">Bakım</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Uygulayan Uzman
                  </label>
                  <select
                    value={stylistName}
                    onChange={(e) => setStylistName(e.target.value)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden"
                  >
                    {team.map((st) => (
                      <option key={st.id} value={st.name}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Hizmet Adı
                </label>
                <select
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden"
                >
                  {services.map((srv) => (
                    <option key={srv.id} value={srv.name}>
                      {srv.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Görsel URL *
                </label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Açıklama & Detaylar
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Kullanılan teknik ve tonlama notu..."
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-accent hover:bg-accent/90 text-background font-bold rounded-lg transition-colors"
                >
                  Yayınla
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
