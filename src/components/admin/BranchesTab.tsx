import { useState } from 'react';
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { BranchItem } from '../../types';

export function BranchesTab() {
  const { branches, addBranch, updateBranch, deleteBranch } = useAdmin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [city, setCity] = useState('İstanbul');
  const [district, setDistrict] = useState('Nişantaşı');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [hours, setHours] = useState('Pzt - Cmt: 09:30 - 20:00');
  const [image, setImage] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [featuresText, setFeaturesText] = useState('Vale Park Hizmeti, VIP Özel Suit, Kahve Barı');

  const handleOpenAddModal = () => {
    setEditingBranchId(null);
    setName('');
    setSlug('');
    setCity('İstanbul');
    setDistrict('Nişantaşı');
    setAddress('Abdi İpekçi Cad. No: 42');
    setPhone('+90 (212) 234 50 60');
    setWhatsapp('+90 (532) 100 20 30');
    setHours('Pzt - Cmt: 09:30 - 20:00 (Pazar: 10:00 - 18:00)');
    setImage('https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=85');
    setGoogleMapsUrl('https://maps.google.com/?q=Nisantasi+Istanbul');
    setFeaturesText('Vale Park Hizmeti, VIP Özel Suit, Kahve & Şampanya Barı');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (branch: BranchItem) => {
    setEditingBranchId(branch.id);
    setName(branch.name);
    setSlug(branch.slug);
    setCity(branch.city);
    setDistrict(branch.district);
    setAddress(branch.address);
    setPhone(branch.phone);
    setWhatsapp(branch.whatsapp);
    setHours(branch.hours);
    setImage(branch.image);
    setGoogleMapsUrl(branch.googleMapsUrl);
    setFeaturesText(branch.features.join(', '));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const features = featuresText.split(',').map((f) => f.trim()).filter(Boolean);

    if (editingBranchId) {
      updateBranch(editingBranchId, {
        name,
        slug: generatedSlug,
        city,
        district,
        address,
        phone,
        whatsapp,
        hours,
        image,
        googleMapsUrl,
        features,
      });
    } else {
      addBranch({
        name,
        slug: generatedSlug,
        city,
        district,
        address,
        phone,
        whatsapp,
        hours,
        image,
        googleMapsUrl,
        features,
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
            <Building2 className="w-5 h-5 text-accent" />
            Şube Yönetimi & Lokasyonlar
          </h1>
          <p className="text-xs text-white/50 mt-0.5">
            Toplam {branches.length} aktif stüdyo ve salon lokasyonu
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent/90 text-background font-semibold text-xs rounded-lg transition-colors shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Şube Ekle</span>
        </button>
      </div>

      {/* Branches Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {branches.map((b) => (
          <div
            key={b.id}
            className="bg-[#16161a] border border-[#26262b] rounded-xl overflow-hidden hover:border-accent/40 transition-colors flex flex-col justify-between"
          >
            <div>
              {/* Image & Title */}
              <div className="h-40 relative overflow-hidden">
                <img
                  src={b.image}
                  alt={b.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#16161a] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] bg-accent text-background font-bold px-2 py-0.5 rounded uppercase">
                    {b.city} / {b.district}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    {b.name}
                  </h3>
                </div>
              </div>

              {/* Details */}
              <div className="p-4 space-y-2.5 text-xs text-white/70">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-white/80">{b.address}</span>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <a
                    href={`tel:${b.phone}`}
                    className="flex items-center gap-1 text-accent hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {b.phone}
                  </a>
                  <a
                    href={`https://wa.me/${b.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-emerald-400 hover:underline"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                </div>

                <div className="flex items-center gap-2 text-white/50 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>{b.hours}</span>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {b.features.map((f, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-white/60 border border-white/5"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-[#26262b] flex items-center justify-between">
              <a
                href={b.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-accent hover:underline flex items-center gap-1"
              >
                <span>Haritada Gör</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEditModal(b)}
                  className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white rounded-md text-xs font-medium border border-white/5 flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3 text-accent" />
                  Düzenle
                </button>
                <button
                  onClick={() => {
                    if (confirm(`"${b.name}" şubesini silmek istediğinize emin misiniz?`)) {
                      deleteBranch(b.id);
                    }
                  }}
                  className="p-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-md border border-rose-500/20"
                  title="Sil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Branch Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-[#16161a] border border-[#26262b] rounded-2xl p-6 space-y-4 animate-fade-in text-xs text-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-[#26262b]">
              <h3 className="text-sm font-bold text-white">
                {editingBranchId ? 'Şube Bilgilerini Düzenle' : 'Yeni Şube Ekle'}
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
                  Şube Adı *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: Nişantaşı Flagship Studio"
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Şehir
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Semt / İlçe
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Açık Adres
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Cadde, sokak, no, kat..."
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+90 (212) 234 50 60"
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    WhatsApp Hattı
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+90 (532) 100 20 30"
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Çalışma Saatleri
                </label>
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="Pzt - Cmt: 09:30 - 20:00"
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
                  Google Haritalar URL
                </label>
                <input
                  type="url"
                  value={googleMapsUrl}
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Öne Çıkan Özellikler (Virgülle ayırın)
                </label>
                <input
                  type="text"
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Vale Park, VIP Suit, Bar"
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-accent hover:bg-accent/90 text-background font-bold rounded-lg transition-colors"
                >
                  {editingBranchId ? 'Değişiklikleri Kaydet' : 'Şubeyi Kaydet'}
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
