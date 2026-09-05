import { useState } from 'react';
import {
  UserCheck,
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  Building2,
  Award,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { StaffMember } from '../../types';

export function TeamTab() {
  const { team, branches, addStaff, updateStaff, deleteStaff } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [role, setRole] = useState('Master Colorist');
  const [category, setCategory] = useState<'color' | 'cut' | 'styling' | 'bridal' | 'men' | 'care'>('color');
  const [experienceYears, setExperienceYears] = useState(8);
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [specialtiesText, setSpecialtiesText] = useState('Artisanal Balayage, Babylights');
  const [selectedBranchIds, setSelectedBranchIds] = useState<string[]>(['branch-nisantasi']);

  const filteredTeam = team.filter((st) => {
    const matchSearch =
      searchQuery === '' ||
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.specialties.some((sp) => sp.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchSearch;
  });

  const handleOpenAddModal = () => {
    setEditingStaffId(null);
    setName('');
    setSlug('');
    setRole('Master Colorist');
    setCategory('color');
    setExperienceYears(8);
    setAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
    setBio('');
    setSpecialtiesText('Artisanal Balayage, Gloss Ritüelleri');
    setSelectedBranchIds(['branch-nisantasi']);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (staff: StaffMember) => {
    setEditingStaffId(staff.id);
    setName(staff.name);
    setSlug(staff.slug);
    setRole(staff.role);
    setCategory(staff.category);
    setExperienceYears(staff.experienceYears);
    setAvatar(staff.avatar);
    setBio(staff.bio);
    setSpecialtiesText(staff.specialties.join(', '));
    setSelectedBranchIds(staff.branchIds);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const specialties = specialtiesText.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingStaffId) {
      updateStaff(editingStaffId, {
        name,
        slug: generatedSlug,
        role,
        category,
        experienceYears,
        avatar,
        bio,
        specialties,
        branchIds: selectedBranchIds,
      });
    } else {
      addStaff({
        name,
        slug: generatedSlug,
        role,
        category,
        experienceYears,
        avatar,
        bio,
        specialties,
        branchIds: selectedBranchIds,
        rating: 5.0,
        reviewCount: 1,
      });
    }
    setIsModalOpen(false);
  };

  const toggleBranch = (bId: string) => {
    setSelectedBranchIds((prev) =>
      prev.includes(bId) ? prev.filter((id) => id !== bId) : [...prev, bId]
    );
  };

  const getBranchNames = (ids: string[]) => {
    return ids
      .map((id) => branches.find((b) => b.id === id)?.name || id)
      .join(', ');
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#16161a] border border-[#26262b] p-4 rounded-xl">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-accent" />
            Ekip & Uzman Yönetimi
          </h1>
          <p className="text-xs text-white/50 mt-0.5">
            Toplam {team.length} uzman kuaför ve stilist
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Uzman veya unvan ara..."
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
            <span>Yeni Uzman</span>
          </button>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeam.map((st) => (
          <div
            key={st.id}
            className="bg-[#16161a] border border-[#26262b] rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-accent/40 transition-colors"
          >
            <div className="flex items-start gap-3">
              <img
                src={st.avatar}
                alt={st.name}
                className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white truncate">
                    {st.name}
                  </h3>
                  <div className="flex items-center gap-1 text-accent text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-accent" />
                    {st.rating.toFixed(1)}
                  </div>
                </div>

                <p className="text-xs text-accent font-medium mt-0.5">{st.role}</p>
                <p className="text-[11px] text-white/50 flex items-center gap-1 mt-1">
                  <Award className="w-3 h-3 text-white/40" />
                  {st.experienceYears} Yıl Deneyim
                </p>
              </div>
            </div>

            {/* Specialties & Branches */}
            <div className="space-y-1.5 text-xs">
              <div className="flex flex-wrap gap-1">
                {st.specialties.map((sp, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-white/70 border border-white/5"
                  >
                    {sp}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-white/40 truncate">
                <Building2 className="w-3 h-3 text-accent shrink-0" />
                <span className="truncate">{getBranchNames(st.branchIds)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-[#26262b] flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEditModal(st)}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white rounded-md text-xs font-medium border border-white/5 flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3 text-accent" />
                Düzenle
              </button>
              <button
                onClick={() => {
                  if (confirm(`"${st.name}" uzmanını silmek istediğinize emin misiniz?`)) {
                    deleteStaff(st.id);
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

      {/* Add / Edit Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-[#16161a] border border-[#26262b] rounded-2xl p-6 space-y-4 animate-fade-in text-xs text-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-[#26262b]">
              <h3 className="text-sm font-bold text-white">
                {editingStaffId ? 'Uzman Bilgilerini Düzenle' : 'Yeni Uzman Ekle'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Örn: Selin Varol"
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Unvan *
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Master Colorist & Balayage Director"
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden"
                  >
                    <option value="color">Renk & Balayage</option>
                    <option value="cut">Kesim & Tasarım</option>
                    <option value="styling">Styling</option>
                    <option value="bridal">Gelin Saçı</option>
                    <option value="men">Erkek Grooming</option>
                    <option value="care">Saç Bakım & Spa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/60 mb-1 font-medium">
                    Deneyim Yılı
                  </label>
                  <input
                    type="number"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Fotoğraf URL
                </label>
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Uzmanlıklar (Virgülle ayırın)
                </label>
                <input
                  type="text"
                  value={specialtiesText}
                  onChange={(e) => setSpecialtiesText(e.target.value)}
                  placeholder="Artisanal Balayage, Babylights, Hair Botox"
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Görev Yaptığı Şubeler
                </label>
                <div className="space-y-1.5 p-2.5 bg-[#202025] border border-[#2e2e36] rounded-lg">
                  {branches.map((b) => (
                    <label
                      key={b.id}
                      className="flex items-center gap-2 cursor-pointer text-white/80 hover:text-white"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBranchIds.includes(b.id)}
                        onChange={() => toggleBranch(b.id)}
                        className="w-4 h-4 accent-accent"
                      />
                      <span>{b.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white/60 mb-1 font-medium">
                  Biyografi
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Uzmanın kariyeri ve vizyonu..."
                  className="w-full bg-[#202025] border border-[#2e2e36] rounded-lg p-2.5 text-white focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-accent hover:bg-accent/90 text-background font-bold rounded-lg transition-colors"
                >
                  {editingStaffId ? 'Değişiklikleri Kaydet' : 'Uzmanı Ekle'}
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

